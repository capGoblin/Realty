"use client";
import { Disclosure } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Blockies from "react-blockies";
import { useStore } from "../store/store";
import ThemeChanger from "./DarkSwitch";

export const Navbar = () => {
  const navigation = ["Properties", "Investments"];
  const [pubKey, setPubKey] = useState("");

  const {
    setOwner,
    setInvestor,
    owner,
    investor,
    isOwner,
    contract,
    setContract,
  } = useStore();

  const connectWallet = async () => {
    if (!(window as any).diam) {
      console.error("Diam Wallet extension is not installed!");
      return;
    }
    let address;
    try {
      const res = await (window as any).diam.connect();
      console.log({ res });
      address = res.message[0];
      if (
        address === "GB23V5BG7ILGKJUXXLXTAORRZEE7A2WJPLY26ACQGMSDXOWQCSC4IGRQ"
      ) {
        setOwner({ publicKey: address, secretKey: "" });
      } else {
        setInvestor({ publicKey: address, secretKey: "" });
      }
      setContract({
        publicKey: "GCOXCQA6LT4QFAYKL5GF3VQJWCSNEOQZR2QC2SFVWFOLC4PXZEUD3AH7",
        secretKey: "SBYTIRE52246KMHGSQBUUDUTLLB4SLKBOSQ24OXGRBPHWJ5JDGCEZ3SG",
      });

      setPubKey(address);
      // setAddress(address);
      // const response = await fetch("https://fractal-shares-back-end.vercel.app/storeAddress", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ address }),
      // });
      //   const data = await response.json();
      //   if (response.ok) {
      //     toast.success("Wallet Connected!");
      //   } else {
      //     toast.error("Failed to store wallet address!");
      //     console.error(dataconnectWallet().message);
      //   }
      // } catch (error) {
      //   console.error("Failed to connect wallet:", error);
      //   toast.error("Failed to connect wallet!");
      // }
    } catch (error) {}

    return address;
  };

  const handleCreate = async () => {
    try {
      let publicKey;
      let secretKey;
      let contractPubKey, contractSecKey;
      let response;

      connectWallet();

      // if (!contract) {
      //   response = await axios.post("/api/create-account", {
      //     createContract: true,
      //   });
      //   console.log({ response });
      //   publicKey = response.data.publicKey;
      //   secretKey = response.data.secretKey;
      //   contractPubKey = response.data.contractPubKey;
      //   contractSecKey = response.data.contractSecKey;
      // } else {
      //   response = await axios.post("/api/create-account", {
      //     createContract: false,
      //   });
      //   console.log({ response });
      //   publicKey = response.data.publicKey;
      //   secretKey = response.data.secretKey;
      // }

      // if (!contract) {
      //   setOwner({ publicKey, secretKey });
      // } else {
      //   setInvestor({ publicKey, secretKey });
      //   console.log("here");
      // }

      // if (!contract) {
      //   setContract({ publicKey: contractPubKey, secretKey: contractSecKey });
      // }
    } catch (error) {}
  };

  return (
    <div className="w-full">
      <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-0">
        {/* Logo  */}
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex flex-wrap items-center justify-between w-full lg:w-auto">
                <Link href="/">
                  <span className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-100">
                    <span>
                      <Image
                        src="/img/logo1.jpeg"
                        alt="R"
                        width="32"
                        height="32"
                        className="w-8"
                      />
                    </span>
                    <span>Realty</span>
                  </span>
                </Link>

                <Disclosure.Button
                  aria-label="Toggle Menu"
                  className="px-2 py-1 ml-auto text-gray-500 rounded-md lg:hidden hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:text-gray-300 dark:focus:bg-trueGray-700"
                >
                  <svg
                    className="w-6 h-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    {open && (
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                      />
                    )}
                    {!open && (
                      <path
                        fillRule="evenodd"
                        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                      />
                    )}
                  </svg>
                </Disclosure.Button>

                <Disclosure.Panel className="flex flex-wrap w-full my-5 lg:hidden">
                  <>
                    {navigation.map((item, index) => (
                      <Link
                        key={index}
                        href="/"
                        className="w-full px-4 py-2 -ml-4 text-gray-500 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 dark:focus:bg-gray-800 focus:outline-none"
                      >
                        {item}
                      </Link>
                    ))}
                    <Link
                      href="/"
                      className="w-full px-6 py-2 mt-3 text-center text-white bg-indigo-600 rounded-md lg:ml-5"
                    >
                      Get Started
                    </Link>
                  </>
                </Disclosure.Panel>
              </div>
            </>
          )}
        </Disclosure>

        {/* menu  */}
        <div className="hidden text-center lg:flex lg:items-center">
          <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
            {navigation.map((menu, index) => (
              <li className="mr-3 nav__item" key={index}>
                <Link
                  href={`/${menu.toLowerCase()}`}
                  className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-gray-800"
                >
                  {menu}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden mr-3 space-x-4 lg:flex nav__item">
          {pubKey ? (
            <div
              className="bg-blue-600 py-2 px-4 text-white rounded-full transition duration-300"
              onClick={() => setPubKey("")}
            >
              <span className="flex items-center">
                <Blockies seed={pubKey} className="rounded-full h-8 w-8 mr-2" />
                {`${pubKey?.slice(0, 6)}...${pubKey?.slice(-6)}`}{" "}
              </span>
            </div>
          ) : (
            <button
              className="shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-8 py-2 bg-[#0070f3] rounded-3xl text-white font-light transition duration-200 ease-linear"
              onClick={handleCreate}
            >
              Connect Wallet
            </button>
          )}

          {/* <ConnectButton /> */}

          <ThemeChanger />
        </div>
      </nav>
    </div>
  );
};
