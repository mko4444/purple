"use client";

import { ConnectKitButton } from "connectkit";
import abbreviateAddress from "util/abbreviateAddress";

export default function CustomConnectKitButton() {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, hide, address, ensName, chain }) => {
        return (
          <button onClick={show} className="filled">
            {isConnected ? abbreviateAddress(address) : "Sign In"}
          </button>
        );
      }}
    </ConnectKitButton.Custom>
  );
}
