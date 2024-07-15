"use client";
import React from "react";
import { Button } from "@repo/ui/components/ui/button";
import { Badge } from "@repo/ui/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@repo/ui/components/ui/card";
import {
  Keypair,
  Horizon,
  Networks,
  TransactionBuilder,
  BASE_FEE,
  Operation,
  Asset,
} from "diamante-sdk-js";
import Link from "next/link";
import { useStore } from "../../store/store";

const server = new Horizon.Server("https://diamtestnet.diamcircle.io/");
const Investments = () => {
  const { propertyState, investor } = useStore();

  const convertToDIAM = (amount: number) => {
    return amount / 10000;
  };

  const convertToToken = (amount: number) => {
    const perToken =
      (Number(propertyState[0]?.fundAmount) || 0) /
      (Number(propertyState[0]?.tokens) || 1000);
    return amount / perToken;
  };

  const fundsInvested = parseFloat(propertyState[0]?.fundsInvested || "0");
  const calculationResult = fundsInvested
    ? (fundsInvested * 0.1) / (Number(propertyState[0]?.tokens) || 1000)
    : 0;

  const handleYield = async () => {
    const diam =
      convertToDIAM(calculationResult) < 1
        ? convertToDIAM(calculationResult)
        : 98;

    const formattedDiam = diam.toFixed(7).toString();

    const resTransferToOwner = await transfer(
      "GD4X6G3MXFNIXZPS4C4446BKAD77ABYXDKBLHR7QMLCOLKOS4J573JDW",
      "SBPCPNJRS4ITRSYDAYRCGS5CGTM3DARI6V2ZGBQCZVVM7MTQLIWJLMRJ",
      investor.publicKey,
      "",
      "",
      "2",
    );

    const res = await mint(
      investor.publicKey,
      "",
      investor.publicKey,
      propertyState[0]?.tokenName + "NFT",
      "0.0000001",
    );

    console.log("resTransferToOwner", resTransferToOwner);
  };
  return (
    <>
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-primary text-primary-foreground">
            <CardHeader>
              <CardTitle>Total Invested</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">
                ${propertyState[0]?.fundsInvested}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-secondary text-secondary-foreground">
            <CardHeader>
              <CardTitle>Total Monthly Yield</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">${calculationResult}</div>
            </CardContent>
          </Card>
          <Card className="bg-muted text-muted-foreground">
            <CardHeader>
              <CardTitle>Total Yield Earned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">${calculationResult}</div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-24">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between">
                Investment Details{" "}
                {/* <div className="mt-8 flex justify-end"> */}
                <Button onClick={handleYield}>Claim Yield</Button>
                {/* </div> */}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="grid gap-2">
                  <div className="text-sm font-medium text-muted-foreground">
                    Property 1
                  </div>
                  <div className="text-lg font-bold">
                    ${propertyState[0]?.fundsInvested}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Monthly Yield: ${calculationResult}
                  </div>
                </div>
                {/* <div className="grid gap-2">
                  <div className="text-sm font-medium text-muted-foreground">
                    Property 2
                  </div>
                  <div className="text-lg font-bold">$75,000</div>
                  <div className="text-sm text-muted-foreground">
                    Monthly Yield: $375
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="text-sm font-medium text-muted-foreground">
                    Property 3
                  </div>
                  <div className="text-lg font-bold">$75,000</div>
                  <div className="text-sm text-muted-foreground">
                    Monthly Yield: $375
                  </div>
                </div> */}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* <div className="flex w-full lg:w-1/4 lg:justify-end"> */}
      {/* <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] transition duration-700 ease-in-out transform hover:scale-105"
            src="/portfolio.svg"
            alt="Portfolio Image"
            width={600}
            height={150}
            priority
          /> */}
      {/* </div> */}
      {/* <Card className="rounded-lg">
        <div className="relative group">
          <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
            <span className="sr-only">View Curator</span>
          </Link>
          <img
            src="/placeholder.svg"
            alt="Curator Image"
            width={500}
            height={300}
            className="object-cover w-full aspect-[5/3] rounded-t-lg group-hover:opacity-80 transition-opacity"
          />
        </div>
        <CardContent className="p-6 bg-background">
          <div className="flex items-center justify-between">
            <div className="grid gap-1">
              <div className="font-semibold">Acme Renovations</div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <StarIcon className="w-4 h-4 fill-primary" />
                <span>4.8</span>
                <span>·</span>
                <span>123 reviews</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPinIcon className="w-4 h-4" />
              <span>San Francisco, CA</span>
            </div>
          </div>
          <Button size="lg" className="w-full mt-4">
            Hire
          </Button>
        </CardContent>
      </Card> */}
    </>
  );
};

export default Investments;

function MapPinIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function StarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export async function transfer(
  distributorPubKey: any,
  distributorSecretKey: any,
  receiverPubKey: any,
  asset_name: any,
  issuerPubKey: any,
  amountToTransfer: any,
) {
  // dist -> owner
  // issuer-> contract
  // rece -> investor
  const account = await server.loadAccount(distributorPubKey);
  let asset;
  if (asset_name) {
    asset = new Asset(asset_name, issuerPubKey);
  } else {
    asset = Asset.native();
  }

  const tx = new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase: Networks.TESTNET,
  })
    .addOperation(
      Operation.payment({
        destination: receiverPubKey,
        asset: asset,
        amount: amountToTransfer,
      }),
    )
    .setTimeout(0)
    .build();

  let result;
  tx.sign(Keypair.fromSecret(distributorSecretKey));
  result = await server.submitTransaction(tx);

  if (result.successful) {
    console.log("transfered");
  }

  return result;
}

export async function mint(
  distributorPubKey: any,
  distributorSecretKey: any,
  receiverPubKey: any,
  asset_name: any,
  amountToMint: any,
) {
  const account = await server.loadAccount(distributorPubKey);

  const asset = new Asset(asset_name, distributorPubKey);

  const tx = new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase: Networks.TESTNET,
  })
    .addOperation(
      Operation.payment({
        destination: receiverPubKey,
        asset: asset,
        amount: amountToMint,
      }),
    )
    .setTimeout(0)
    .build();

  const xdr = (tx as any).toXDR("base64");
  const signResp = await (window as any).diam.sign(
    xdr,
    true,
    "Diamante Testnet",
  );
  // const result = await server.submitTransaction(tx);

  // if (result.successful) {
  //   console.log("minted");
  // }

  return signResp;
}
