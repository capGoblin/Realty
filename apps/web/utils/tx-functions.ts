import {
  Keypair,
  Horizon,
  Networks,
  TransactionBuilder,
  BASE_FEE,
  Operation,
  Asset,
} from "diamante-sdk-js";

const server = new Horizon.Server("https://diamtestnet.diamcircle.io/");

// trust line with contract to owner
export async function setupReceiver(
  distributorPubKey: any,
  receiverPubKey: any,
  receiverSecretKey: any,
  asset_name: any,
) {
  const account = await server.loadAccount(receiverPubKey);

  const asset = new Asset(asset_name, distributorPubKey);

  const tx = new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase: Networks.TESTNET,
  })
    .addOperation(
      Operation.changeTrust({
        asset: asset,
      }),
    )
    .setTimeout(0)
    .build();

  tx.sign(Keypair.fromSecret(receiverSecretKey));
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

  tx.sign(Keypair.fromSecret(distributorSecretKey));

  const result = await server.submitTransaction(tx);

  if (result.successful) {
    console.log("minted");
  }

  return result;
}

// trust line with contract to investor
export async function setupReceiverInvestor(
  distributorPubKey: any,
  receiverPubKey: any,
  receiverSecretKey: any,
  asset_name: any,
) {
  const account = await server.loadAccount(receiverPubKey);

  const asset = new Asset(asset_name, distributorPubKey);

  const tx = new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase: Networks.TESTNET,
  })
    .addOperation(
      Operation.changeTrust({
        asset: asset,
      }),
    )
    .setTimeout(0)
    .build();

  // tx.sign(DiamSdk.Keypair.fromSecret(receiverSecretKey));
  const xdr = (tx as any).toXDR("base64");
  const signResp = await (window as any).diam.sign(
    xdr,
    true,
    "Diamante Testnet",
  );

  // const result = await server.submitTransaction(tx);

  if (signResp.successful) {
    console.log("Trustline created");
  }

  return signResp;
}

// transfer with owner to investor and
// transfer with investor to owner
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
  if (asset_name) {
    tx.sign(Keypair.fromSecret(distributorSecretKey));
    result = await server.submitTransaction(tx);
  } else {
    const xdr = (tx as any).toXDR("base64");
    const signResp = await (window as any).diam.sign(
      xdr,
      true,
      "Diamante Testnet",
    );
    result = signResp;
  }

  if (result.successful) {
    console.log("transfered");
  }

  return result;
}
