"use client";

import React, { useState } from "react";
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

const page = ({ params }: { params: { userId: string; propId: string } }) => {
  const [onClick, setOnClick] = useState(false);
  return (
    <>
      <div className="flex flex-col mt-12 ml-20 justify-center items-center">
        <div className="space-y-28">
          <div className="gap-10 space-y-12">
            <div className="flex flex-col gap-8 items-center">
              <div className="flex gap-6">
                <h1 className="font-bold text-3xl">2 Bed, 1 Bath Condo</h1>
                <Badge variant="outline">Construction</Badge>
              </div>
              <h3 className="text-muted-foreground text-2xl max-w-lg">
                {" "}
                New construction condo in a vibrant city neighborhood.
              </h3>
            </div>
            <img
              src="/placeholder.svg"
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
                <p className="text-4xl font-bold">$500,000</p>
              </div>
              <div className="bg-blue-600 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-2">Funds Invested</h3>
                <p className="text-4xl font-bold">$375,000</p>
              </div>
              <div className="bg-blue-600 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-2">Investors</h3>
                <p className="text-4xl font-bold">42</p>
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
            <Dialog>
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
                    Make changes to your profile here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="amount" className="text-right">
                      Amount
                    </Label>
                    <Input
                      id="amount"
                      // value="Pedro Duarte"
                      className="col-span-3"
                    />
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
                  <Button type="submit">Save changes</Button>
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
