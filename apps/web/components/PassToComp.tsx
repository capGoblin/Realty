import React, { useEffect, useState } from "react";
import { useStore } from "../store/store";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@repo/ui/components/ui/dialog";
import { Button } from "@repo/ui/components/ui/button";
import { Label } from "@repo/ui/components/ui/label";
import { Input } from "@repo/ui/components/ui/input";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { Badge } from "@repo/ui/components/ui/badge";
import axios from "axios";
import { setupReceiver, mint } from "../utils/tx-functions";

type PassToCompProps = {
  propertyName: string;
  description: string;
  image: File | null;
  fundAmount: string;
  tokens: string;
  numberOfInvestors: string;
  saveState: boolean;
};

const PassToComp = () => {
  const { propertyState, setPropertyState, owner, contract } = useStore();
  const [open, setOpen] = useState(false);

  const [propertyName, setPropertyName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [fundAmount, setFundAmount] = useState("");
  const [tokens, setTokens] = useState("");
  const [tokenName, setTokenName] = useState("");

  const handleInputChange = (e: any) => {
    const { id, value, files } = e.target;
    console.log({ id, value, files });
    switch (id) {
      case "name":
        setPropertyName(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "image":
        setImage(files[0]);
        break;
      case "fund-amount":
        setFundAmount(value);
        break;
      case "tokens":
        setTokens(value);
        break;
      case "tok_name":
        setTokenName(value);
        break;
      default:
        break;
    }
  };

  const handleAddProperty = async (e: any) => {
    // e.preventDefault();
    console.log(propertyName);
    console.log(description);
    console.log(image);
    console.log(fundAmount);
    console.log(tokens);

    setPropertyState([
      ...propertyState,
      {
        propertyName,
        description,
        image,
        fundAmount,
        tokens,
        numberOfInvestors: "0",
        fundsInvested: "0",
        tokenName,
      },
    ]);

    // const response = await axios.post("/api/list-property", {
    //   tokens: tokens,
    //   publicKey: owner.publicKey,
    // });
    // const res = await setupReceiver(
    //   contract?.publicKey,
    //   contract?.publicKey,
    //   contract?.secretKey,
    //   tokenName,
    // );

    // if (res.successful) {
    //   const mintRes = await mint(
    //     contract?.publicKey,
    //     contract?.secretKey,
    //     contract?.publicKey,
    //     tokenName,
    //     tokens,
    //   );

    //   if (mintRes.successful) {
    //     console.log("Mint successful", res.hash);
    //   }
    // } else {
    //   console.error("Mint failed but trustline created");
    // }

    // console.log(contract);
    const response = await axios.post("/api/mint-to-owner", {
      assetName: tokenName,
      owner: contract,
      amountToMint: tokens,
      contract,
    });
    console.log({ response });

    setOpen(false);
  };

  const convertToDIAM = (amount: number) => {
    return amount / 10000;
  };

  // const handleCreate = async () => {
  //   setPropertyState([
  //     ...propertyState,
  //     {
  //       propertyName,
  //       description,
  //       image,
  //       fundAmount,
  //       tokens,
  //       numberOfInvestors,
  //     },
  //   ]);
  //   console.log("Property State", propertyState);
  // };

  // useEffect(() => {
  //   if (saveState) {
  //     handleCreate();
  //     console.log("Saved");
  //   }
  // }, [saveState]);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,102,255,0.88)] px-8 py-2 bg-[#0070f3] rounded-xl text-white font-medium transition duration-200 ease-linear hover:scale-105">
            Add Property
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Property</DialogTitle>
            <DialogDescription>
              Fill out the form to list a new property.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Property Name</Label>
              <Input
                id="name"
                placeholder="Enter property name"
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the property"
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Property Image</Label>
              <Input id="image" type="file" onChange={handleInputChange} />
            </div>
            <div className="grid gap-2 relative">
              <Label htmlFor="fund-amount" onChange={handleInputChange}>
                Fund Amount Needed in USD
              </Label>
              <Input
                id="fund-amount"
                type="number"
                placeholder="Enter fund amount"
                onChange={handleInputChange}
              />
              <span className="absolute right-11 mt-7 flex items-center text-gray-400">
                {fundAmount ? `${convertToDIAM(Number(fundAmount))} DIAM` : ""}
              </span>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tok_name">Token Name</Label>
              <Input
                id="tok_name"
                type="string"
                placeholder="Enter tokens name"
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tokens">Number of Tokens to Mint</Label>
              <Input
                id="tokens"
                type="number"
                placeholder="Enter token count"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleAddProperty}>
              Add Property
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PassToComp;
