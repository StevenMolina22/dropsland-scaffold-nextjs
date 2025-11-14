import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { Client } from "@stellar/stellar-sdk/contract";
import {
  loadContractMetadata,
  type ContractMetadata,
} from "../util/loadContractMetada";

interface WebpackRequireContext {
  keys(): string[];
  <T = unknown>(id: string): T;
}

declare const require: {
  context(
    directory: string,
    useSubdirectories: boolean,
    regExp: RegExp,
  ): WebpackRequireContext;
};

const contractModulesContext = require.context(
  "../../contracts",
  false,
  /\.ts$/,
);

export type ContractModule = {
  default: Client;
  metadata?: ContractMetadata;
};

export type ContractMap = Record<string, ContractModule>;
export type ContractsQueryData = {
  loadedContracts: ContractMap;
  failed: Record<string, string>;
};

const loadContracts = async (): Promise<ContractsQueryData> => {
  const loadedContracts: ContractMap = {};
  const failed: Record<string, string> = {};

  for (const path of contractModulesContext.keys()) {
    const filename =
      path.split("/").pop()?.replace("./", "")?.replace(".ts", "") || "";
    if (filename && filename === "util") continue;

    try {
      // 1. Renamed 'module' to 'loadedModule'
      const loadedModule: unknown = contractModulesContext(path);

      // Type Guard
      if (
        loadedModule &&
        typeof loadedModule === "object" &&
        "default" in loadedModule &&
        typeof (loadedModule as ContractModule).default?.options?.contractId ===
          "string"
      ) {
        const contractModule = loadedModule as ContractModule; // This cast is now safe
        const metadata = await loadContractMetadata(
          contractModule.default.options.contractId,
        );
        loadedContracts[filename] = { ...contractModule, metadata };
      } else {
        throw new Error(`Invalid contract module structure at ${path}`);
      }
    } catch (error) {
      // 2. This is the correct, type-safe way to handle the catch
      if (error instanceof Error) {
        failed[filename] = error.message;
      } else {
        failed[filename] = String(error);
      }
    }
  }

  return { loadedContracts, failed };
};

export function useContracts(): UseQueryResult<ContractsQueryData> {
  return useQuery<ContractsQueryData>({
    queryKey: ["contracts"],
    queryFn: loadContracts,
    staleTime: Infinity,
  });
}
