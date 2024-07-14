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
  const { propertyState, setPropertyState, isOwner, setIsOwner } = useStore();
  const [open, setOpen] = useState(false);

  const [propertyName, setPropertyName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [fundAmount, setFundAmount] = useState("");
  const [tokens, setTokens] = useState("");

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
      },
    ]);

    setOpen(false);
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
          <Button>Add Property</Button>
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
            <div className="grid gap-2">
              <Label htmlFor="fund-amount" onChange={handleInputChange}>
                Fund Amount Needed
              </Label>
              <Input
                id="fund-amount"
                type="number"
                placeholder="Enter fund amount"
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
