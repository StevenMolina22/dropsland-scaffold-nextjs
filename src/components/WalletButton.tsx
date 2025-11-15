import { useState } from "react";
import { useWallet } from "@/hooks/useWallet";
import { useWalletBalance } from "@/hooks/useWalletBalance";
import { connectWallet, disconnectWallet } from "@/util/wallet";
import { Button } from "./ui/button.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog.tsx";
import { Avatar, AvatarFallback } from "./ui/avatar.tsx";

export const WalletButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { address, isPending } = useWallet();
  const { xlm, isLoading } = useWalletBalance();
  const buttonLabel = isPending ? "Loading..." : "Connect";

  if (!address) {
    return (
      <Button
        type="button"
        size="sm"
        onClick={() => void connectWallet()}
        className="whitespace-nowrap"
        disabled={isPending}
      >
        {buttonLabel}
      </Button>
    );
  }

  const shortAddress = `${address.slice(0, 6)}…${address.slice(-4)}`;

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <div className="flex items-center gap-3 text-sm">
        <p className="hidden text-xs font-medium uppercase tracking-wide text-muted-foreground/80 sm:block">
          Wallet Balance:{" "}
          <span className="text-foreground">
            {isLoading ? "…" : `${xlm} XLM`}
          </span>
        </p>
        <DialogTrigger asChild>
          <button
            type="button"
            className="focus-visible:ring-ring/60 inline-flex items-center gap-3 rounded-full border border-border/60 bg-[#0b0f1a]/80 px-3 py-1 text-left text-xs font-semibold uppercase tracking-wide text-foreground transition hover:border-accent focus-visible:outline-none focus-visible:ring-2"
          >
            <Avatar className="size-9 border border-border/60 bg-[#111827]">
              <AvatarFallback className="text-[0.6rem] font-semibold uppercase tracking-wider text-accent">
                {address.slice(-2)}
              </AvatarFallback>
            </Avatar>
            <span className="hidden sm:inline-flex">{shortAddress}</span>
          </button>
        </DialogTrigger>
      </div>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Disconnect wallet</DialogTitle>
          <DialogDescription>
            Connected as{" "}
            <span className="font-mono break-all text-foreground">
              {address}
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="rounded-md border border-border/60 bg-muted/10 p-3 font-mono text-xs text-muted-foreground break-all">
          {address}
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={() => {
              void disconnectWallet().then(() => setIsDialogOpen(false));
            }}
          >
            Disconnect
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => setIsDialogOpen(false)}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
