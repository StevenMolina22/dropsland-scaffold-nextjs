"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Layout, Code, Card, Button, Input } from "@stellar/design-system";
import { Client } from "@stellar/stellar-sdk/contract";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ContractForm } from "../debug/components/ContractForm.tsx";
import { Box } from "./layout/Box.tsx";
import { useContracts, type ContractMap } from "../debug/hooks/useContracts.ts";
import RenderContractMetadata from "../debug/components/RenderContractMetadata.tsx";

const Debugger: React.FC = () => {
  const { data, isLoading } = useContracts();
  const mutableContracts = data?.loadedContracts;
  const mutableFailures = data?.failed;
  const contractMap = useMemo<ContractMap>(
    () => mutableContracts ?? {},
    [mutableContracts],
  );
  const failedContracts = useMemo<Record<string, string>>(
    () => mutableFailures ?? {},
    [mutableFailures],
  );
  const router = useRouter();
  const params = useParams<{ contractName?: string }>();
  const activeContractName =
    typeof params?.contractName === "string" ? params.contractName : undefined;

  const [selectedContract, setSelectedContract] = useState<string>("");
  const [isDetailExpanded, setIsDetailExpanded] = useState(false);

  const contractKeys = useMemo(
    () =>
      Array.from(
        new Set([...Object.keys(contractMap), ...Object.keys(failedContracts)]),
      ),
    [contractMap, failedContracts],
  );

  useEffect(() => {
    if (isLoading || contractKeys.length === 0) {
      return;
    }

    if (activeContractName && contractKeys.includes(activeContractName)) {
      setSelectedContract(activeContractName);
      return;
    }

    const fallbackContract = contractKeys[0];
    setSelectedContract(fallbackContract);

    if (!activeContractName) {
      void router.replace(`/debug/${fallbackContract}`);
    }
  }, [activeContractName, contractKeys, isLoading, router]);

  if (isLoading) {
    return (
      <Layout.Content>
        <Layout.Inset>
          <p>Loading contracts...</p>
        </Layout.Inset>
      </Layout.Content>
    );
  }

  if (contractKeys.length === 0) {
    return (
      <Layout.Content>
        <Layout.Inset>
          <p>No contracts found in src/contracts/</p>
          <p>
            Do you have any contracts defined in your root{" "}
            <Code size="sm">contracts</Code> folder, and defined in your
            environments.toml file?
          </p>
          <p>
            Use <Code size="sm">stellar scaffold generate contract</Code> to
            install contracts from the{" "}
            <a href="https://github.com/OpenZeppelin/stellar-contracts">
              OpenZeppelin Stellar Contracts
            </a>{" "}
            repository, or visit the{" "}
            <a href="https://wizard.openzeppelin.com/stellar">
              OpenZeppelin Wizard
            </a>{" "}
            to interactively build your contract.
          </p>
        </Layout.Inset>
      </Layout.Content>
    );
  }

  return (
    <Layout.Content>
      {/* Top Info Box */}
      <Layout.Inset>
        <h2>Debug Contracts</h2>
        <p>
          You can debug & interact with your deployed contracts here. Check{" "}
          <Code size="md">src/contracts/*.ts</Code>
        </p>
        <hr />
      </Layout.Inset>

      {/* Contract Selector Pills */}
      <Layout.Inset>
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            marginBottom: "1rem",
            marginTop: "1rem",
            flexWrap: "wrap",
          }}
        >
          {contractKeys.map((key) => {
            const isActive = key === selectedContract;
            return (
              <Link
                key={key}
                href={`/debug/${key}`}
                style={{
                  textDecoration: "none",
                }}
              >
                <Button variant={isActive ? "primary" : "tertiary"} size="sm">
                  {key}
                </Button>
              </Link>
            );
          })}
        </div>
      </Layout.Inset>

      {/* Show error or contract details */}
      {(!selectedContract ||
        (!contractMap[selectedContract] &&
          !failedContracts[selectedContract])) && (
        <Layout.Inset>
          <p>No contract selected or contract not found.</p>
        </Layout.Inset>
      )}

      {failedContracts[selectedContract] && (
        <Layout.Inset>
          <h2>{selectedContract}</h2>
          <p style={{ color: "red" }}>
            Failed to import contract: {failedContracts[selectedContract]}
          </p>
        </Layout.Inset>
      )}

      {contractMap[selectedContract] && (
        <>
          <Layout.Inset>
            <div style={{ marginTop: "0 2rem" }}>
              <div style={{ display: "flex", flexFlow: "column", gap: "1rem" }}>
                {/* Contract detail card */}
                <div
                  style={{
                    flexBasis: "30%",
                    minWidth: "100%",
                    alignSelf: "flex-start",
                  }}
                >
                  <Card variant="primary">
                    <Box gap="md">
                      <h3>{selectedContract}</h3>

                      <Input
                        label="Contract ID"
                        id="contract-id"
                        fieldSize="md"
                        copyButton={{
                          position: "right",
                        }}
                        readOnly
                        value={
                          (
                            contractMap[selectedContract]
                              ?.default as unknown as Client
                          )?.options?.contractId || ""
                        }
                      />

                      {isDetailExpanded && (
                        <>
                          <RenderContractMetadata
                            metadata={contractMap[selectedContract]?.metadata}
                          />
                        </>
                      )}
                    </Box>
                    <Button
                      variant="tertiary"
                      size="sm"
                      onClick={() => setIsDetailExpanded(!isDetailExpanded)}
                      style={{ justifySelf: "flex-end", marginTop: "1rem" }}
                    >
                      {isDetailExpanded ? "Hide Details" : "Show Details"}
                    </Button>
                  </Card>
                </div>

                {/* Contract methods and interactions */}
                <div style={{ flex: 1 }}>
                  <ContractForm
                    key={selectedContract}
                    contractClient={contractMap[selectedContract]?.default}
                    contractClientError={null}
                  />
                </div>
              </div>
            </div>
          </Layout.Inset>
        </>
      )}
    </Layout.Content>
  );
};

export default Debugger;
