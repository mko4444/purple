import Web3 from "web3";
import {
  auctionHouseContractAddress,
  testnetAuctionHouseContractAddress,
} from "./consts";
import { auctionAbi } from "@/data/contract/abis";

export const getProvider = async () => {
  let provider;

  if (window.ethereum && Array.isArray(window.ethereum.providers)) {
    // Find MetaMask among the available providers
    provider = window.ethereum.providers.find((p: any) => p.isMetaMask);

    if (!provider) {
      console.log("MetaMask not detected among providers!");
      return null;
    }
  } else {
    console.log("Ethereum providers not detected!");
    return null;
  }

  const currentNetworkId = await provider.request({ method: "net_version" });

  // Chain IDs
  const GOERLI_NETWORK_ID = "5";
  const MAINNET_NETWORK_ID = "1";

  let desiredNetworkId =
    process.env.NEXT_PUBLIC_IS_TEST === "true"
      ? GOERLI_NETWORK_ID
      : MAINNET_NETWORK_ID;

  if (currentNetworkId !== desiredNetworkId) {
    try {
      // Request to switch to the desired network
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [
          { chainId: "0x" + parseInt(desiredNetworkId).toString(16) }, // Convert network ID to hex
        ],
      });
    } catch (switchError) {
      console.error(
        `Failed to switch to ${
          process.env.NEXT_PUBLIC_IS_TEST === "true"
            ? "Goerli Testnet"
            : "Mainnet"
        }:`,
        switchError
      );
      return null;
    }
  }

  try {
    await provider.request({ method: "eth_requestAccounts" });
  } catch (accessError) {
    console.log("User denied account access:", accessError);
    return null;
  }

  return provider;
};

export const createBid = async (
  address: string, // user's address
  bidAmount: number,
  tokenId: number
) => {
  const provider = await getProvider();

  if (!provider) {
    console.log("Provider or MetaMask not detected");
    return;
  }

  let auctionAddress =
    process.env.NEXT_PUBLIC_IS_TEST !== "true"
      ? auctionHouseContractAddress
      : testnetAuctionHouseContractAddress;

  const web3 = new Web3(provider);
  const contract = new web3.eth.Contract(auctionAbi, auctionAddress);

  try {
    let value = web3.utils.toWei(bidAmount.toString(), "ether");
    // Call the contract's createBid function
    return new Promise(async (resolve, reject) => {
      try {
        let gas = 15000000;
        try {
          gas =
            parseInt(
              await contract.methods
                .createBid(tokenId)
                .estimateGas({ value, from: address })
            ) * 1.05;
        } catch (err) {
          console.log(err);
        }

        await contract.methods
          .createBid(tokenId)
          .send({
            from: address,
            value,
            maxFeePerGas: null,
            maxPriorityFeePerGas: null,
            gas,
          })
          .on("receipt", (receipt) => {
            resolve({ ok: true, receipt, error: null });
          })
          .on("error", (error) => {
            resolve({ ok: false, error, receipt: null });
          });
      } catch (error) {
        console.error("Error sending transaction:", error);
        resolve({ ok: false, error, receipt: null });
      }
    });
  } catch (error) {
    console.error("Error sending transaction:", error);
    return { ok: false, error, receipt: null };
  }
};

export const settleCurrentAndCreateNewAuction = async (address: string) => {
  const provider = await getProvider();

  if (!provider) {
    console.error("Provider or MetaMask not detected");
    return;
  }

  const web3 = new Web3(provider);
  let auctionAddress =
    process.env.NEXT_PUBLIC_IS_TEST !== "true"
      ? auctionHouseContractAddress
      : testnetAuctionHouseContractAddress;
  const contract = new web3.eth.Contract(auctionAbi, auctionAddress);
  try {
    return new Promise(async (resolve, reject) => {
      try {
        let gas = 15000000;
        try {
          gas =
            parseInt(
              await contract.methods
                .createBid(tokenId)
                .estimateGas({ value, from: address })
            ) * 1.05;
        } catch (err) {
          console.log(err);
        }
        await contract.methods
          .settleCurrentAndCreateNewAuction()
          .send({
            from: address,
            maxFeePerGas: null,
            maxPriorityFeePerGas: null,
            gas,
          })
          .on("receipt", (receipt) => {
            resolve({ ok: true, receipt, error: null });
          })
          .on("error", (error) => {
            resolve({ error, receipt: null, ok: false });
          });
      } catch (error) {
        console.error("Error sending transaction:", error);
        resolve({ error, receipt: null, ok: false });
      }
    });
  } catch (error) {
    console.error("Error sending transaction:", error);
    return { ok: false, error, receipt: null };
  }
};
