// import React from "react";
// import { Button } from "@repo/ui/components/ui/button";
// import { Badge } from "@repo/ui/components/ui/badge";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
// } from "@repo/ui/components/ui/card";
// import Link from "next/link";

// const Curators = () => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-16 mt-8 md:mt-12 m-20">
//       <Card className="rounded-lg">
//         <div className="relative group">
//           <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
//             <span className="sr-only">View Curator</span>
//           </Link>
//           <img
//             src="/placeholder.svg"
//             alt="Curator Image"
//             width={500}
//             height={300}
//             className="object-cover w-full aspect-[5/3] rounded-t-lg group-hover:opacity-80 transition-opacity"
//           />
//         </div>
//         <CardContent className="p-6 bg-background">
//           <div className="flex items-center justify-between">
//             <div className="grid gap-1">
//               <div className="font-semibold">Acme Renovations</div>
//               <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                 <StarIcon className="w-4 h-4 fill-primary" />
//                 <span>4.8</span>
//                 <span>·</span>
//                 <span>123 reviews</span>
//               </div>
//             </div>
//             <div className="flex items-center gap-2 text-sm text-muted-foreground">
//               <MapPinIcon className="w-4 h-4" />
//               <span>San Francisco, CA</span>
//             </div>
//           </div>
//           <Button size="lg" className="w-full mt-4">
//             Hire
//           </Button>
//         </CardContent>
//       </Card>
//       <Card className="rounded-lg">
//         <div className="relative group">
//           <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
//             <span className="sr-only">View Curator</span>
//           </Link>
//           <img
//             src="/placeholder.svg"
//             alt="Curator Image"
//             width={500}
//             height={300}
//             className="object-cover w-full aspect-[5/3] rounded-t-lg group-hover:opacity-80 transition-opacity"
//           />
//         </div>
//         <CardContent className="p-6 bg-background">
//           <div className="flex items-center justify-between">
//             <div className="grid gap-1">
//               <div className="font-semibold">Acme Renovations</div>
//               <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                 <StarIcon className="w-4 h-4 fill-primary" />
//                 <span>4.8</span>
//                 <span>·</span>
//                 <span>123 reviews</span>
//               </div>
//             </div>
//             <div className="flex items-center gap-2 text-sm text-muted-foreground">
//               <MapPinIcon className="w-4 h-4" />
//               <span>San Francisco, CA</span>
//             </div>
//           </div>
//           <Button size="lg" className="w-full mt-4">
//             Hire
//           </Button>
//         </CardContent>
//       </Card>
//       <Card className="rounded-lg">
//         <div className="relative group">
//           <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
//             <span className="sr-only">View Curator</span>
//           </Link>
//           <img
//             src="/placeholder.svg"
//             alt="Curator Image"
//             width={500}
//             height={300}
//             className="object-cover w-full aspect-[5/3] rounded-t-lg group-hover:opacity-80 transition-opacity"
//           />
//         </div>
//         <CardContent className="p-6 bg-background">
//           <div className="flex items-center justify-between">
//             <div className="grid gap-1">
//               <div className="font-semibold">Acme Renovations</div>
//               <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                 <StarIcon className="w-4 h-4 fill-primary" />
//                 <span>4.8</span>
//                 <span>·</span>
//                 <span>123 reviews</span>
//               </div>
//             </div>
//             <div className="flex items-center gap-2 text-sm text-muted-foreground">
//               <MapPinIcon className="w-4 h-4" />
//               <span>San Francisco, CA</span>
//             </div>
//           </div>
//           <Button size="lg" className="w-full mt-4">
//             Hire
//           </Button>
//         </CardContent>
//       </Card>
//       <Card className="rounded-lg">
//         <div className="relative group">
//           <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
//             <span className="sr-only">View Curator</span>
//           </Link>
//           <img
//             src="/placeholder.svg"
//             alt="Curator Image"
//             width={500}
//             height={300}
//             className="object-cover w-full aspect-[5/3] rounded-t-lg group-hover:opacity-80 transition-opacity"
//           />
//         </div>
//         <CardContent className="p-6 bg-background">
//           <div className="flex items-center justify-between">
//             <div className="grid gap-1">
//               <div className="font-semibold">Acme Renovations</div>
//               <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                 <StarIcon className="w-4 h-4 fill-primary" />
//                 <span>4.8</span>
//                 <span>·</span>
//                 <span>123 reviews</span>
//               </div>
//             </div>
//             <div className="flex items-center gap-2 text-sm text-muted-foreground">
//               <MapPinIcon className="w-4 h-4" />
//               <span>San Francisco, CA</span>
//             </div>
//           </div>
//           <Button size="lg" className="w-full mt-4">
//             Hire
//           </Button>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Curators;

// function MapPinIcon(props: any) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
//       <circle cx="12" cy="10" r="3" />
//     </svg>
//   );
// }

// function StarIcon(props: any) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
//     </svg>
//   );
// }

// function XIcon(props: any) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M18 6 6 18" />
//       <path d="m6 6 12 12" />
//     </svg>
//   );
// }
