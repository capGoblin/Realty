import { Button } from "@repo/ui/components/ui/button";

import { createWeb3Modal } from "@web3modal/ethers/react";
import { defaultConfig } from "@web3modal/ethers/react";

import { Navbar } from "../components/NavBar";

// // 1. Get projectId
// const projectId = "YOUR_PROJECT_ID";

// // 2. Set chains
// const zg = {
//   chainId: 16600,
//   name: "0g Newton Testnet",
//   currency: "A0GI",
//   explorerUrl: "https://chainscan-newton.0g.ai",
//   rpcUrl: "https://rpc-testnet.0g.ai",
// };

// // 3. Create a metadata object
// const metadata = {
//   name: "Realty",
//   description: "Your description",
//   url: "https://example.com",
//   icons: ["icon1.png", "icon2.png"],
// };

// // 4. Create Ethers config
// const ethersConfig = defaultConfig({
//   /*Required*/
//   metadata,
// });

// // 5. Create a Web3Modal instance
// createWeb3Modal({
//   ethersConfig,
//   chains: [zg],
//   projectId,
// });

export default function Page() {
  return (
    <main>
      <Navbar />
      <Button className="bg-red-500">Click me</Button>
    </main>
  );
}
