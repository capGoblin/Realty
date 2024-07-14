import { NextResponse, NextRequest } from "next/server";
import DiamSdk from "diamante-sdk-js";
// import { useStore } from "../../../store/store";

const server = new DiamSdk.Horizon.Server("https://diamtestnet.diamcircle.io/");
export const GET = async () => {
  return NextResponse.json(
    { message: "Hello, Next.js Version 13!" },
    { status: 200 },
  );
};

export const POST = async (request: NextRequest) => {
  // const { contractPubKey, setContractPubKey } = useStore();
  const body = await request.json();
  // console.log({ body });

  try {
    let contractPubKey;
    let contractSecKey;
    const { publicKey, secretKey } = await generateAccount();
    if (body.createContract) {
      const { publicKey, secretKey } = await generateAccount();
      contractPubKey = publicKey;
      contractSecKey = secretKey;
    }

    // Return the keys directly in the NextResponse
    return NextResponse.json(
      {
        message: "Operation successful",
        publicKey: publicKey,
        secretKey: secretKey,
        contractPubKey,
        contractSecKey,
      },
      { status: 200 },
    ); // Ensure the status code and keys are part of the same object
  } catch (error) {
    console.error("Error in register:", error);
    // Correctly return the error using NextResponse
    return NextResponse.json(
      { error: "Error on creating Account" },
      { status: 500 },
    );
  }
};

const generateAccount = async () => {
  try {
    const keypair = DiamSdk.Keypair.random();
    const fundAccount = async (publicKey: any) => {
      const response = await fetch(
        `https://friendbot.diamcircle.io/?addr=${publicKey}`,
      );
      if (!response.ok) {
        throw new Error(
          `Failed to activate account ${publicKey}: ${response.statusText}`,
        );
      }
      return response.json();
    };

    await Promise.all([fundAccount(keypair.publicKey())]);
    console.log("Generated account:", keypair.publicKey());
    return {
      publicKey: keypair.publicKey(),
      secretKey: keypair.secret(),
    };
  } catch (error) {
    console.error("Error generating account:", error);
    throw error;
  }
};
