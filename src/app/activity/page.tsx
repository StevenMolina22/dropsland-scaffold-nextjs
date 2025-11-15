"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ActivityType = "all" | "tokens" | "nfts" | "music" | "community";

type ActivityItem = {
  id: string;
  type:
    | "token_purchase"
    | "nft_mint"
    | "music_upload"
    | "community_interaction";
  title: string;
  description: string;
  timestamp: string;
  artist?: string;
};

const activityFilters: Array<{ id: ActivityType; label: string }> = [
  { id: "all", label: "All" },
  { id: "tokens", label: "Tokens" },
  { id: "nfts", label: "NFTs" },
  { id: "music", label: "Music" },
  { id: "community", label: "Community" },
];

const activities: ActivityItem[] = [
  {
    id: "1",
    type: "token_purchase",
    title: "Token Purchase",
    description: "Purchased TOKEN1 from Artist Name",
    timestamp: "2 hours ago",
    artist: "Artist Name",
  },
  {
    id: "2",
    type: "nft_mint",
    title: "NFT Minted",
    description: "Minted exclusive NFT from Artist Name",
    timestamp: "5 hours ago",
    artist: "Artist Name",
  },
  {
    id: "3",
    type: "music_upload",
    title: "New Track Uploaded",
    description: "Artist Name uploaded a new track: 'Track Title'",
    timestamp: "1 day ago",
    artist: "Artist Name",
  },
  {
    id: "4",
    type: "community_interaction",
    title: "Community Update",
    description:
      "New perk unlocked: Early access to Artist Name's latest release",
    timestamp: "2 days ago",
    artist: "Artist Name",
  },
];

const getActivityIcon = (type: ActivityItem["type"]) => {
  switch (type) {
    case "token_purchase":
      return "💰";
    case "nft_mint":
      return "🖼️";
    case "music_upload":
      return "🎵";
    case "community_interaction":
      return "👥";
    default:
      return "📋";
  }
};

const Activity: React.FC = () => {
  const [filter, setFilter] = useState<ActivityType>("all");

  const filteredActivities =
    filter === "all"
      ? activities
      : activities.filter((activity) => {
          switch (filter) {
            case "tokens":
              return activity.type === "token_purchase";
            case "nfts":
              return activity.type === "nft_mint";
            case "music":
              return activity.type === "music_upload";
            case "community":
              return activity.type === "community_interaction";
            default:
              return true;
          }
        });

  return (
    <div className="container mx-auto space-y-8 px-4 py-10">
      <section className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
          Track Everything
        </p>
        <h1 className="text-4xl font-bold text-white">Activity</h1>
        <p className="text-muted-foreground">
          Purchases, mints, uploads, and community moments captured on-chain.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Filter by Type</h2>
        <div className="flex flex-wrap gap-2">
          {activityFilters.map((tab) => (
            <Button
              key={tab.id}
              type="button"
              variant={filter === tab.id ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(tab.id)}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </section>

      {filteredActivities.length > 0 ? (
        <div className="space-y-4">
          {filteredActivities.map((activity) => (
            <Card
              key={activity.id}
              className="border-border/60 bg-background/70"
            >
              <CardContent className="flex flex-col gap-4 py-6 sm:flex-row sm:items-start">
                <div className="flex size-12 items-center justify-center rounded-full border border-border/50 bg-background/40 text-xl">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="space-y-2">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <CardTitle className="text-xl text-white">
                        {activity.title}
                      </CardTitle>
                      <CardDescription>{activity.timestamp}</CardDescription>
                    </div>
                    {activity.artist && (
                      <Button
                        type="button"
                        size="sm"
                        variant="secondary"
                        disabled
                      >
                        View {activity.artist}
                      </Button>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {activity.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-border/60 bg-background/70">
          <CardContent className="py-8 text-center text-sm text-muted-foreground">
            No activity yet. Start collecting, minting, or uploading to see a
            trail here.
          </CardContent>
        </Card>
      )}

      <Card className="border-border/60 bg-background/70">
        <CardHeader>
          <CardTitle>Activity Types</CardTitle>
          <CardDescription>What you&apos;ll see in this feed.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            <span className="font-semibold text-white">Token Purchases:</span>{" "}
            When you buy artist tokens with USDC.
          </p>
          <p>
            <span className="font-semibold text-white">NFT Mints:</span> When
            you collect limited visuals or membership passes.
          </p>
          <p>
            <span className="font-semibold text-white">Music Uploads:</span>{" "}
            Fresh tracks shipping from your favorite creators.
          </p>
          <p>
            <span className="font-semibold text-white">Community:</span>{" "}
            Unlocks, announcements, and token-gated news.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Activity;
