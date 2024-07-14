import { NextResponse, NextRequest } from "next/server";
import DiamSdk from "diamante-sdk-js";

const server = new DiamSdk.Horizon.Server("https://diamtestnet.diamcircle.io/");

export const GET = async () => {
  return NextResponse.json(
    { message: "Hello, Next.js Version 13!" },
    { status: 200 },
  );
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const { assetName, investor, tokens, contractPubKey, owner, nativeToken } =
    body;
  const investorPublicKey = investor.publicKey;
  const investorSecretKey = investor.secretKey;
  const ownerPublicKey = owner.publicKey;
  const ownerSecretKey = owner.secretKey;
  // console.log({ body });

  try {
    const res = await setupReceiverInvestor(
      contractPubKey,
      investorPublicKey,
      investorSecretKey,
      assetName,
    );
    if (res.successful) {
      const resTransferToInvestor = await transfer(
        ownerPublicKey,
        ownerSecretKey,
        investorPublicKey,
        assetName,
        contractPubKey,
        String(tokens),
      );

      if (resTransferToInvestor.successful) {
        const resTransferToOwner = await transfer(
          investorPublicKey,
          investorSecretKey,
          ownerPublicKey,
          "",
          contractPubKey,
          String(nativeToken),
        );

        if (resTransferToOwner.successful) {
          return NextResponse.json(
            {
              messageToIn: "Transfer to investor successful",
              hashToIn: resTransferToInvestor.hash,
              messageToOwn: "Transfer to owner successful",
              hashToOwn: resTransferToOwner.hash,
            },
            { status: 200 },
          );
        }
      } else {
        return NextResponse.json(
          { message: "Transfer to investor failed" },
          { status: 500 },
        );
      }
    } else {
      return NextResponse.json(
        { message: "Transfer to investor failed but trustline created" },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Error in register:", error);
    // Correctly return the error using NextResponse
    return NextResponse.json(
      { error: "Error on invest in property" },
      { status: 500 },
    );
  }
};

// trust line with contract to investor
async function setupReceiverInvestor(
  distributorPubKey: any,
  receiverPubKey: any,
  receiverSecretKey: any,
  asset_name: any,
) {
  const account = await server.loadAccount(receiverPubKey);

  const asset = new DiamSdk.Asset(asset_name, distributorPubKey);

  const tx = new DiamSdk.TransactionBuilder(account, {
    fee: DiamSdk.BASE_FEE,
    networkPassphrase: DiamSdk.Networks.TESTNET,
  })
    .addOperation(
      DiamSdk.Operation.changeTrust({
        asset: asset,
      }),
    )
    .setTimeout(0)
    .build();

  tx.sign(DiamSdk.Keypair.fromSecret(receiverSecretKey));

  const result = await server.submitTransaction(tx);

  if (result.successful) {
    console.log("Trustline created");
  }

  return result;
}

// transfer with owner to investor and
// transfer with investor to owner
async function transfer(
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
    asset = new DiamSdk.Asset(asset_name, issuerPubKey);
  } else {
    asset = DiamSdk.Asset.native();
  }

  const tx = new DiamSdk.TransactionBuilder(account, {
    fee: DiamSdk.BASE_FEE,
    networkPassphrase: DiamSdk.Networks.TESTNET,
  })
    .addOperation(
      DiamSdk.Operation.payment({
        destination: receiverPubKey,
        asset: asset,
        amount: amountToTransfer,
      }),
    )
    .setTimeout(0)
    .build();

  tx.sign(DiamSdk.Keypair.fromSecret(distributorSecretKey));

  const result = await server.submitTransaction(tx);

  if (result.successful) {
    console.log("transfered");
  }

  return result;
}
