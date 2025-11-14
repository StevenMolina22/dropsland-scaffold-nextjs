import React, { useTransition } from "react";
import { useWallet } from "@/hooks/useWallet.ts";
import { getFriendbotUrl } from "@/util/friendbot";
import { useWalletBalance } from "@/hooks/useWalletBalance.ts";
import { Button } from "./ui/button.tsx";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip.tsx";
import { toast } from "sonner";

const FundAccountButton: React.FC = () => {
  const [isPending, startTransition] = useTransition();
  const { isFunded, isLoading } = useWalletBalance();
  const { address } = useWallet();

  if (!address) return null;

  const handleFundAccount = () => {
    startTransition(async () => {
      try {
        const response = await fetch(getFriendbotUrl(address));

        if (response.ok) {
          toast.success("Account funded successfully!");
        } else {
          const body: unknown = await response.json();
          if (
            body !== null &&
            typeof body === "object" &&
            "detail" in body &&
            typeof body.detail === "string"
          ) {
            toast.error(`Error funding account: ${body.detail}`);
          } else {
            toast.error("Error funding account: Unknown error");
          }
        }
      } catch {
        toast.error("Error funding account. Please try again.");
      }
    });
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          disabled={isPending || isLoading || isFunded}
          onClick={handleFundAccount}
          variant="default"
          size="sm"
        >
          Fund Account
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {isFunded
          ? "Account is already funded"
          : "Fund your account using the Stellar Friendbot"}
      </TooltipContent>
    </Tooltip>
  );
};

export default FundAccountButton;
