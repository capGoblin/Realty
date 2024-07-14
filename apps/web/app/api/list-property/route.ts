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
  const astroDollar = new DiamSdk.Asset("AstroDollar", body.publicKey);

  console.log({ body });

  // Do something

  return NextResponse.json(
    { message: "Operation successful" },
    { status: 200 },
  );
};
