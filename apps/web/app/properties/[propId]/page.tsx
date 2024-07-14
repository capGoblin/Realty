"use client";

import React, { useState, useEffect } from "react";
import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@repo/ui/components/ui/dialog";
import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";
import { useStore } from "../../../store/store";
import axios from "axios";

const page = ({ params }: { params: { propId: string } }) => {
  const { investor, owner, contract } = useStore();
  const [onClick, setOnClick] = useState(false);
  const { propertyState } = useStore();
  const [imageUrl, setImageUrl] = useState("");
  const [investAmount, setInvestAmount] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const property = propertyState[Number(params.propId)];
    console.log(params.propId);
    console.log({ property });
    console.log(propertyState);
    if (property && property.image) {
      const url = URL.createObjectURL(property.image);
      setImageUrl(url);

      // Cleanup function to revoke the created URL
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [params.propId, propertyState]);

  const handleInvestment = async () => {
    console.log(investAmount);
    const tokens = convertToToken(Number(investAmount));
    const nativeToken = convertToDIAM(Number(investAmount));
    const tokenName = propertyState[Number(params.propId)]?.tokenName;
    const contractPubKey = contract?.publicKey;
    const response = await axios.post("/api/invest-in-property", {
      assetName: tokenName,
      investor,
      tokens,
      contractPubKey,
      owner,
      nativeToken,
    });
    console.log({ response });

    setOpen(false);
  };

  const convertToDIAM = (amount: number) => {
    return amount / 10000;
  };

  const convertToToken = (amount: number) => {
    const perToken =
      (Number(propertyState[Number(params.propId)]?.fundAmount) || 0) /
      (Number(propertyState[Number(params.propId)]?.tokens) || 1);
    return amount / perToken;
  };

  return (
    <>
      <div className="flex flex-col mt-12 ml-20 justify-center items-center">
        <div className="space-y-28">
          <div className="gap-10 space-y-12">
            <div className="flex flex-col gap-8 items-center">
              <div className="flex gap-6">
                <h1 className="font-bold text-3xl">
                  {propertyState[Number(params.propId)]?.propertyName}
                </h1>
                <Badge variant="outline">Construction</Badge>
              </div>
              <h3 className="text-muted-foreground text-2xl max-w-lg">
                {" "}
                {propertyState[Number(params.propId)]?.description}
              </h3>
            </div>
            <img
              src={imageUrl}
              width={900}
              height={700}
              alt="Property Image"
              className="rounded-xl object-cover aspect-video bg-slate-400"
            />
          </div>
          <div className="mb-8 sm:mb-12 lg:mb-16 flex flex-col items-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Funding Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-14">
              <div className="bg-blue-600 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-2">Total Funding Needed</h3>
                <p className="text-4xl font-bold">
                  <p className="text-4xl font-bold">
                    <div className="text-center">
                      ${propertyState[Number(params.propId)]?.fundAmount}
                      {/* </div> */}
                      <br />
                      {/* <div className="text-center"> */}(
                      {propertyState[Number(params.propId)]?.fundAmount
                        ? Math.round(
                            Number(
                              propertyState[Number(params.propId)]?.fundAmount,
                            ) / 10000,
                          )
                        : 0}{" "}
                      DIAM)
                    </div>
                  </p>
                </p>
              </div>
              <div className="bg-blue-600 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-2 text-center">
                  Funds Invested
                </h3>
                <p className="text-4xl font-bold">
                  <div className="text-center">
                    ${propertyState[Number(params.propId)]?.fundsInvested}
                    {/* </div> */}
                    <br />
                    {/* <div className="text-center"> */}(
                    {propertyState[Number(params.propId)]?.fundsInvested
                      ? Math.round(
                          Number(
                            propertyState[Number(params.propId)]?.fundsInvested,
                          ) / 10000,
                        )
                      : 0}{" "}
                    DIAM)
                  </div>
                </p>
              </div>
              <div className="bg-blue-600 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-2 text-center">
                  Investors
                </h3>
                <p className="text-4xl font-bold">
                  <div className="flex text-center items-center justify-center pt-4">
                    {propertyState[Number(params.propId)]?.numberOfInvestors
                      ? propertyState[Number(params.propId)]?.numberOfInvestors
                      : 0}
                  </div>
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Location Preview
            </h2>
            <div className="mt-14">
              <img
                src="/placeholder.svg"
                width="800"
                height="400"
                alt="Location Map"
                className="mx-auto aspect-[2/1] overflow-hidden rounded-xl object-cover bg-slate-400"
              />
            </div>
          </div>
          <div className="flex flex-col items-center">
            {" "}
            {/* {onClick ? ( */}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger>
                {" "}
                <button
                  className="h-14 w-36 px-8 py-2 rounded-xl bg-gradient-to-r from-blue-300 to-blue-700 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl hover:w-40 hover:h-16 transition-all duration-500"
                  // onClick={() => setOnClick(!onClick)}
                >
                  Invest
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Enter Investment Amount</DialogTitle>
                  <DialogDescription>
                    You will get {convertToToken(Number(investAmount))}{" "}
                    {propertyState[Number(params.propId)]?.tokenName}, for (
                    {convertToDIAM(Number(investAmount))}) DIAM
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4 relative">
                    <Label htmlFor="amount" className="text-right">
                      Amount in USD
                    </Label>
                    <Input
                      id="amount"
                      // value="Pedro Duarte"
                      className="col-span-3"
                      onChange={(e) => setInvestAmount(e.target.value)}
                    />
                    <span className="absolute right-4 flex items-center text-gray-400">
                      {investAmount
                        ? `${convertToDIAM(Number(investAmount))} DIAM`
                        : ""}
                    </span>
                  </div>
                  {/* <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Username
                    </Label>
                    <Input
                      id="username"
                      value="@peduarte"
                      className="col-span-3"
                    />
                  </div> */}
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleInvestment}>
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            {/* ) : ( */}
            {/* )} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
