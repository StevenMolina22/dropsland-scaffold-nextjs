import React from "react";
import { useWallet } from "@/hooks/useWallet";
import { stellarNetwork } from "../contracts/util";
import { cn } from "@/lib/utils";

// Format network name with first letter capitalized
const formatNetworkName = (name: string) =>
  // TODO: This is a workaround until @creit-tech/stellar-wallets-kit uses the new name for a local network.
  name === "STANDALONE"
    ? "Local"
    : name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

const appNetwork = formatNetworkName(stellarNetwork);

const NetworkPill: React.FC = () => {
  const { network, address } = useWallet();

  // Check if there's a network mismatch
  const walletNetwork = formatNetworkName(network ?? "");
  const isNetworkMismatch = walletNetwork !== appNetwork;

  let title = "";
  let status: "neutral" | "error" | "success" = "neutral";

  if (!address) {
    title = "Connect your wallet using this network.";
  } else if (isNetworkMismatch) {
    title = `Wallet is on ${walletNetwork}, connect to ${appNetwork} instead.`;
    status = "error";
  } else {
    status = "success";
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide transition",
        status === "success" &&
          "border-emerald-400/40 bg-emerald-400/10 text-emerald-200",
        status === "error" && "border-red-400/40 bg-red-500/10 text-red-200",
        status === "neutral" &&
          "border-border/60 bg-background/50 text-muted-foreground",
      )}
      title={title}
    >
      <span
        className={cn(
          "size-2.5 rounded-full",
          status === "success" && "bg-emerald-400",
          status === "error" && "bg-red-400",
          status === "neutral" && "bg-muted-foreground/70",
        )}
      />
      <span>{appNetwork}</span>
    </div>
  );
};

export default NetworkPill;
