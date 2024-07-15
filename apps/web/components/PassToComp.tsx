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
  const [isLoading, setLoading] = useState(false);

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
    setLoading(true);

    const response = await axios.post("/api/mint-to-owner", {
      assetName: tokenName,
      owner: contract,
      amountToMint: tokens,
      contract,
    });
    console.log({ response });

    setLoading(false);

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
            {isLoading ? (
              <Button type="button" className="" disabled>
                <div role="status" className="mr-2">
                  <svg
                    aria-hidden="true"
                    className="inline w-4 h-4 text-gray-200 animate-spin dark:text-blue-400 fill-blue-50"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>{" "}
                Processing...
              </Button>
            ) : (
              <Button type="submit" onClick={handleAddProperty}>
                Add Property
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PassToComp;
