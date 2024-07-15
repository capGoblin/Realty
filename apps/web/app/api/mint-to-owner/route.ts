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
  const { assetName, owner, amountToMint, contract } = body;
  const ownerPublicKey = owner.publicKey;
  const ownerSecretKey = owner.secretKey;
  const contractPublicKey = contract.publicKey;
  const contractSecretKey = contract.secretKey;
  console.log({ body });

  try {
    // const res = await setupReceiver(
    //   contractPublicKey,
    //   ownerPublicKey,
    //   ownerSecretKey,
    //   assetName,
    // );
    // if (res.successful) {
    const res = await mint(
      contractPublicKey,
      contractSecretKey,
      ownerPublicKey,
      assetName,
      amountToMint,
    );

    if (res.successful) {
      return NextResponse.json(
        { message: "Mint to owner successful", hash: res.hash },
        { status: 200 },
      );
    }
    // } else {
    //   return NextResponse.json(
    //     { message: "Mint to owner failed but trustline created" },
    //     { status: 500 },
    //   );
    // }

    // const { publicKey, secretKey } = await generateAccount();
    // Return the keys directly in the NextResponse
    // return NextResponse.json(
    //   {
    //     message: "Operation successful",
    //     publicKey: publicKey,
    //     secretKey: secretKey,
    //   },
    //   { status: 200 },
    // ); // Ensure the status code and keys are part of the same object
  } catch (error) {
    console.error("Error in register:", error);
    // Correctly return the error using NextResponse
    return NextResponse.json(
      { error: "Error on minting to owner" },
      { status: 500 },
    );
  }
};

// trust line with contract to owner
async function setupReceiver(
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
  // const xdr = (tx as any).toXDR("base64");
  // const signResp = await (window as any).diam.sign(
  //   xdr,
  //   true,
  //   "Diamante Testnet",
  // );

  const result = await server.submitTransaction(tx);

  if (result.successful) {
    console.log("Trustline created");
  }

  return result;
}

// mint from contract to owner
async function mint(
  distributorPubKey: any,
  distributorSecretKey: any,
  receiverPubKey: any,
  asset_name: any,
  amountToMint: any,
) {
  const account = await server.loadAccount(distributorPubKey);

  const asset = new DiamSdk.Asset(asset_name, distributorPubKey);

  const tx = new DiamSdk.TransactionBuilder(account, {
    fee: DiamSdk.BASE_FEE,
    networkPassphrase: DiamSdk.Networks.TESTNET,
  })
    .addOperation(
      DiamSdk.Operation.payment({
        destination: receiverPubKey,
        asset: asset,
        amount: amountToMint,
      }),
    )
    .setTimeout(0)
    .build();

  tx.sign(DiamSdk.Keypair.fromSecret(distributorSecretKey));

  const result = await server.submitTransaction(tx);

  if (result.successful) {
    console.log("minted");
  }

  return result;
}
