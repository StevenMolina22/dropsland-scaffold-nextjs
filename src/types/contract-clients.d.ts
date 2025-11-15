declare module "factory" {
  import type {
    AssembledTransaction,
    Client as BaseContractClient,
    ClientOptions as BaseClientOptions,
    MethodOptions,
    Result,
  } from "@stellar/stellar-sdk/contract";

  export enum TokenType {
    Sac = 0,
    Custom = 1,
    Fungible = 2,
    Nft = 3,
  }

  export interface RegistryEntry {
    token_type: TokenType;
    issuer: string;
  }

  export type ClientOptions = BaseClientOptions;

  export class Client extends BaseContractClient {
    constructor(options: ClientOptions);
    readonly options: ClientOptions;
    get_all_tokens(
      params?: unknown,
      options?: MethodOptions,
    ): Promise<{ result: Result<string[]> }>;
    get_token_info(params: {
      token_addr: string;
    }): Promise<{ result: Result<RegistryEntry> }>;
    create_nft(params: {
      owner: string;
      name: string;
      symbol: string;
      base_uri: string;
    }): Promise<AssembledTransaction<Result<string>>>;
  }
}

declare module "dj_nft" {
  import type {
    AssembledTransaction,
    Client as BaseContractClient,
    ClientOptions as BaseClientOptions,
    Result,
  } from "@stellar/stellar-sdk/contract";

  export interface ClientOptions extends BaseClientOptions {
    publicKey?: string;
  }

  export class Client extends BaseContractClient {
    constructor(options: ClientOptions);
    readonly options: ClientOptions;
    balance(params: {
      account: string;
    }): Promise<{ result: string | number | undefined }>;
    get_owner_token_id(params: {
      owner: string;
      index: number;
    }): Promise<{ result: string | number | undefined }>;
    award_item(params: {
      to: string;
    }): Promise<AssembledTransaction<Result<string>>>;
  }
}
