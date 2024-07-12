import React from "react";
import { Button } from "@repo/ui/components/ui/button";
import { Badge } from "@repo/ui/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@repo/ui/components/ui/card";

const Properties = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-16 mt-8 md:mt-12 m-20">
      <Card className="p-4 rounded-lg">
        <CardHeader>
          <img
            src="/placeholder.svg"
            width={400}
            height={225}
            alt="Property Image"
            className="rounded-lg object-cover aspect-video"
          />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">2 Bed, 1 Bath Condo</h3>
              <Badge variant="outline">Construction</Badge>
            </div>
            <p className="text-muted-foreground">
              New construction condo in a vibrant city neighborhood.
            </p>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <DollarSignIcon className="w-5 h-5 text-primary" />
                <span className="font-medium">$250,000</span>
              </div>
              <div className="flex items-center gap-2">
                <UsersIcon className="w-5 h-5 text-primary" />
                <span className="font-medium">20 Investors</span>
              </div>
              <Button size="lg" variant="outline">
                View Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="p-4 rounded-lg">
        <CardHeader>
          <img
            src="/placeholder.svg"
            width={400}
            height={225}
            alt="Property Image"
            className="rounded-lg object-cover aspect-video"
          />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">2 Bed, 1 Bath Condo</h3>
              <Badge variant="secondary">Construction</Badge>
            </div>
            <p className="text-muted-foreground">
              New construction condo in a vibrant city neighborhood.
            </p>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <DollarSignIcon className="w-5 h-5 text-primary" />
                <span className="font-medium">$250,000</span>
              </div>
              <div className="flex items-center gap-2">
                <UsersIcon className="w-5 h-5 text-primary" />
                <span className="font-medium">20 Investors</span>
              </div>
              <Button size="lg" variant="outline">
                View Details
              </Button>{" "}
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="p-4 rounded-lg">
        <CardHeader>
          <img
            src="/placeholder.svg"
            width={400}
            height={225}
            alt="Property Image"
            className="rounded-lg object-cover aspect-video"
          />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">2 Bed, 1 Bath Condo</h3>
              <Badge variant="secondary">Construction</Badge>
            </div>
            <p className="text-muted-foreground">
              New construction condo in a vibrant city neighborhood.
            </p>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <DollarSignIcon className="w-5 h-5 text-primary" />
                <span className="font-medium">$250,000</span>
              </div>
              <div className="flex items-center gap-2">
                <UsersIcon className="w-5 h-5 text-primary" />
                <span className="font-medium">20 Investors</span>
              </div>
              <Button size="lg" variant="outline">
                View Details
              </Button>{" "}
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="p-4 rounded-lg">
        <CardHeader>
          <img
            src="/placeholder.svg"
            width={400}
            height={225}
            alt="Property Image"
            className="rounded-lg object-cover aspect-video"
          />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">2 Bed, 1 Bath Condo</h3>
              <Badge variant="secondary">Construction</Badge>
            </div>
            <p className="text-muted-foreground">
              New construction condo in a vibrant city neighborhood.
            </p>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <DollarSignIcon className="w-5 h-5 text-primary" />
                <span className="font-medium">$250,000</span>
              </div>
              <div className="flex items-center gap-2">
                <UsersIcon className="w-5 h-5 text-primary" />
                <span className="font-medium">20 Investors</span>
              </div>
              <Button size="lg" variant="outline">
                View Details
              </Button>{" "}
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="p-4 rounded-lg">
        <CardHeader>
          <img
            src="/placeholder.svg"
            width={400}
            height={225}
            alt="Property Image"
            className="rounded-lg object-cover aspect-video"
          />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">2 Bed, 1 Bath Condo</h3>
              <Badge variant="secondary">Construction</Badge>
            </div>
            <p className="text-muted-foreground">
              New construction condo in a vibrant city neighborhood.
            </p>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <DollarSignIcon className="w-5 h-5 text-primary" />
                <span className="font-medium">$250,000</span>
              </div>
              <div className="flex items-center gap-2">
                <UsersIcon className="w-5 h-5 text-primary" />
                <span className="font-medium">20 Investors</span>
              </div>
              <Button size="lg" variant="outline">
                View Details
              </Button>{" "}
            </div>
          </div>
        </CardContent>
      </Card>
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
