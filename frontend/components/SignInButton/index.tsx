"use client";

import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";
import useSWR from "swr";
import farcaster from "@/lib/farcaster";
import abbreviateAddress from "@/util/abbreviateAddress";
import Image from "next/image";

export default function SignInButton() {
  const { address } = useAccount();
  const { data: user } = useSWR(
    address ? `/api/user/${address}` : null,
    () => address && farcaster.lookupUserByVerification(address)
  );

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, address, ensName }) => {
        if (isConnected && !!user) {
          return (
            <button className="filled" onClick={show} style={{ cursor: "pointer" }}>
              <Image
                alt=""
                src={user?.pfp?.url ?? "/placeholder.png"}
                height={16}
                width={16}
                style={{ borderRadius: ".25rem", objectFit: "cover" }}
              />
              {user?.displayName}
              <label style={{ opacity: 0.66 }}>@{user?.username}</label>
            </button>
          );
        }

        if (isConnected) {
          return (
            <button className="filled" onClick={show} style={{ cursor: "pointer" }}>
              {ensName ?? abbreviateAddress(address as string)}
            </button>
          );
        }

        return (
          <button className="filled" onClick={show} style={{}}>
            Sign In
          </button>
        );
      }}
    </ConnectKitButton.Custom>
  );
}

// import { useCheckSigner, useToken, useSigner } from "@farsign/hooks";
// import { Dispatch, SetStateAction, useEffect, useState } from "react";
// import Dialog from "components/Dialog";
// import QRCode from "react-qr-code";
// import farcaster from "@/lib/farcaster";
// import Image from "next/image";
// import Link from "next/link";

// const CLIENT_NAME = "Purple";

// export default function SignInButton() {
//   const [isConnected, setIsConnected] = useCheckSigner(CLIENT_NAME);
//   const [signedInUser, setSignedInUser] = useState<any>(null);
//   const [token] = useToken(CLIENT_NAME);
//   const [signer] = useSigner(CLIENT_NAME, token);

//   useEffect(() => {
//     if (signer.isConnected === true) {
//       (setIsConnected as Dispatch<SetStateAction<boolean>>)(true);
//     }
//     if (signer?.signerRequest?.fid) {
//       farcaster.lookupUserByFid(signer.signerRequest.fid).then(setSignedInUser);
//     } else {
//       setSignedInUser(null);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [signer]);

//   return isConnected ? (
//     <Link href={`https://warpcast.com/${signedInUser?.username}`}>
//       <button className="filled">
//         <Image alt="user" src={signedInUser?.pfp?.url} height={18} width={18} style={{ borderRadius: 100 }} />
//         {signedInUser?.displayName || signedInUser?.username || "Sign In"}
//       </button>
//     </Link>
//   ) : (
//     <Dialog
//       style={{
//         height: 280,
//         width: 280,
//         borderRadius: "1rem",
//         padding: "1rem",
//       }}
//       trigger="Sign In"
//       triggerClassName="filled"
//       disabled={!!signedInUser}
//     >
//       <QRCode
//         // bgColor={background}
//         // fgColor={color}
//         style={{ height: "auto", maxWidth: "100%", width: "100%" }}
//         value={token?.deepLink}
//       />
//     </Dialog>
//   );
// }
