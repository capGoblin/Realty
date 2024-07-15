"use client";

import React, { useEffect, useState } from "react";
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
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@repo/ui/components/ui/card";
import Link from "next/link";
import { useStore } from "../../store/store";
import PassToComp from "../../components/PassToComp";

const Properties = () => {
  const { propertyState, setPropertyState } = useStore();

  // const [propertyName, setPropertyName] = useState("");
  // const [description, setDescription] = useState("");
  // const [image, setImage] = useState(null);
  // const [fundAmount, setFundAmount] = useState("");
  // const [tokens, setTokens] = useState("");
  // const [saveProperty, setSaveProperty] = useState(false);

  // const handleInputChange = (e: any) => {
  //   const { id, value, files } = e.target;
  //   console.log({ id, value, files });
  //   switch (id) {
  //     case "name":
  //       setPropertyName(value);
  //       break;
  //     case "description":
  //       setDescription(value);
  //       break;
  //     case "image":
  //       setImage(files[0]);
  //       break;
  //     case "fund-amount":
  //       setFundAmount(value);
  //       break;
  //     case "tokens":
  //       setTokens(value);
  //       break;
  //     default:
  //       break;
  //   }
  // };

  // const handleAddProperty = async (e: any) => {
  //   // e.preventDefault();
  //   console.log(propertyName);
  //   console.log(description);
  //   console.log(image);
  //   console.log(fundAmount);
  //   console.log(tokens);

  //   setPropertyState([
  //     ...propertyState,
  //     {
  //       propertyName,
  //       description,
  //       image,
  //       fundAmount,
  //       tokens,
  //       numberOfInvestors: "0",
  //     },
  //   ]);

  //   setSaveProperty(true);
  //   console.log("Property State", saveProperty);
  //   console.log(propertyState);
  // };

  // useEffect(() => {
  //   console.log(propertyState);
  // }, [propertyState]);

  return (
    <div className="w-full mx-auto px-72">
      <div className="flex items-center justify-between mb-12 mt-12">
        <h1 className="text-3xl font-bold">Property Listings</h1>
        <PassToComp />
        {/* <Dialog>
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
              <Button onClick={handleAddProperty}>Add Property</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog> */}
        {/* <Link
          href="#"
          className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-md shadow-sm text-sm font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          prefetch={false}
        >
          Add Property
        </Link> */}
      </div>
      {/* {saveProperty && (
        <PassToComp
          propertyName={propertyName}
          description={description}
          image={image}
          fundAmount={fundAmount}
          tokens={tokens}
          numberOfInvestors={"0"}
          saveState={true}
        />
      )} */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-16 mt-8 md:mt-12">
        {/* {propertyState.map((property, index) => (
          <Card key={index} className="p-1 rounded-lg">
            <CardHeader>
              <img
                src={URL.createObjectURL(property.image!)}
                width={400}
                height={225}
                alt="Property Image"
                className="rounded-lg object-cover aspect-video"
              />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">
                    {property.propertyName}
                  </h3>
                  <Badge variant="secondary">Construction</Badge>
                </div>
                <p className="text-muted-foreground">{property.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <DollarSignIcon className="w-5 h-5 text-primary" />
                    <span className="font-medium">{property.fundAmount}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UsersIcon className="w-5 h-5 text-primary" />
                    <span className="font-medium">
                      {property.numberOfInvestors}
                    </span>
                  </div>
                </div>
                <Link href={`/properties/${index}`}>
                  <Button size="lg" variant="outline" className="w-full">
                    View Details
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))} */}
        <Card className="rounded-lg">
          <CardHeader>
            <img
              src="/img/digitized-miami-mansion.png"
              width={400}
              height={225}
              alt="Property Image"
              className="rounded-lg object-cover aspect-video"
            />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">5 Bed, 6 Bath Mansion</h3>
                <Badge variant="secondary">Renovation</Badge>
              </div>
              <p className="text-muted-foreground">
                Luxurious estate nestled in a prestigious suburban enclave,
                featuring expansive grounds and panoramic views
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <DollarSignIcon className="w-5 h-5 text-primary" />
                  <span className="font-medium">250000</span>
                </div>
                <div className="flex items-center gap-2">
                  <UsersIcon className="w-5 h-5 text-primary" />
                  <span className="font-medium">1 Investor</span>
                </div>
              </div>
              <Button size="lg" variant="outline" className="w-full">
                View Details
              </Button>{" "}
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-lg">
          <CardHeader>
            <img
              src="/img/nyc-condo.png"
              width={400}
              height={225}
              alt="Property Image"
              className="rounded-lg object-cover aspect-video"
            />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                  1 Bed, 1 Bath Apartment
                </h3>
                <Badge variant="secondary">Renovation</Badge>
              </div>
              <p className="text-muted-foreground">
                Cozy apartment located close to public transportation and
                shopping centers.
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <DollarSignIcon className="w-5 h-5 text-primary" />
                  <span className="font-medium">300,000</span>
                </div>
                <div className="flex items-center gap-2">
                  <UsersIcon className="w-5 h-5 text-primary" />
                  <span className="font-medium">12 Investors</span>
                </div>
              </div>
              <Button size="lg" variant="outline" className="w-full">
                View Details
              </Button>{" "}
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-lg">
          <CardHeader>
            <img
              src="/img/ny-highrise-condo.png"
              width={400}
              height={225}
              alt="Property Image"
              className="rounded-lg object-cover aspect-video"
            />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">4 Bed, 3 Bath Villa</h3>
                <Badge variant="secondary">Construction</Badge>
              </div>
              <p className="text-muted-foreground">
                Luxurious villa with a private pool and stunning views of the
                countryside.
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <DollarSignIcon className="w-5 h-5 text-primary" />
                  <span className="font-medium">2,000,0000</span>
                </div>
                <div className="flex items-center gap-2">
                  <UsersIcon className="w-5 h-5 text-primary" />
                  <span className="font-medium">20 Investors</span>
                </div>
              </div>
              <Button size="lg" variant="outline" className="w-full">
                View Details
              </Button>{" "}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Properties;

function DollarSignIcon(props: any) {
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
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function UsersIcon(props: any) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
