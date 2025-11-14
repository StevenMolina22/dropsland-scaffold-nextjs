This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
.github/
  workflows/
    node.yml
.husky/
  pre-commit
contracts/
  fungible-allowlist/
    src/
      contract.rs
      lib.rs
      test.rs
    Cargo.toml
  guess-the-number/
    src/
      error.rs
      lib.rs
      test.rs
      xlm.rs
    Cargo.toml
  nft-enumerable/
    src/
      contract.rs
      lib.rs
      test.rs
    Cargo.toml
src/
  components/
    layout/
      Box.tsx
    ConnectAccount.tsx
    FundAccountButton.tsx
    GuessTheNumber.tsx
    NetworkPill.tsx
    WalletButton.tsx
  contracts/
    util.ts
  debug/
    components/
      ContractForm.tsx
      ErrorResponse.tsx
      ErrorText.tsx
      InvokeContractForm.tsx
      JsonSchemaRenderer.tsx
      LabelHeading.tsx
      MetadataCard.tsx
      PositiveIntPicker.tsx
      PrettyJson.tsx
      PrettyJsonTextarea.tsx
      PrettyJsonTransaction.tsx
      RenderArrayType.tsx
      RenderContractMetadata.tsx
      RenderOneOf.tsx
      RenderPrimitivesType.tsx
      RenderTupleType.tsx
      TransactionSuccessCard.tsx
      TxResponse.tsx
      ValidationResponseCard.tsx
      XdrJsonViewer.tsx
    hooks/
      useAccountSequenceNumber.ts
      useCheckTxSignatures.ts
      useContracts.ts
      usePrevious.ts
      useRpcPrepareTx.ts
      useSimulateTx.ts
      useSubmitRpcTx.ts
    types/
      types.ts
    util/
      arrayItem.ts
      capitalizeString.ts
      delay.ts
      dereferenceSchema.ts
      fetchTxSignatures.ts
      formatAmount.ts
      getNetworkHeaders.ts
      getWasmContractData.ts
      isEmptyObject.ts
      jsonSchema.ts
      loadContractMetada.ts
      parseToLosslessJson.ts
      prettifyJsonString.ts
      sanitizeArray.ts
      sanitizeObject.ts
      signatureHint.ts
      sorobanUtils.ts
      StellarXdr.ts
      trim.ts
      xdrFraction.ts
      xdrUtils.ts
    validate/
      methods/
        getAccountThresholdError.ts
        getAmountError.ts
        getArrayOfStringsError.ts
        getAssetCodeError.ts
        getAssetError.ts
        getAssetMultiError.ts
        getBipPathError.ts
        getClaimableBalanceIdError.ts
        getClaimaintsError.ts
        getContractIdError.ts
        getDataNameError.ts
        getDataUrlError.ts
        getDataValueError.ts
        getEventsFiltersError.ts
        getHomeDomainError.ts
        getI128Error.ts
        getI256Error.ts
        getI32Error.ts
        getI64Error.ts
        getMemoError.ts
        getNumberFractionError.ts
        getOptionsSignerError.ts
        getPositiveIntError.ts
        getPositiveNumberError.ts
        getPublicKeyError.ts
        getRevokeSponsorshipError.ts
        getSecretKeyError.ts
        getTimeBoundsError.ts
        getTransactionHashError.ts
        getU128Error.ts
        getU256Error.ts
        getU32Error.ts
        getU64Error.ts
        getXdrError.ts
      index.ts
  hooks/
    useNotification.ts
    useSubscription.ts
    useWallet.ts
    useWalletBalance.ts
  layout/
    Layout.tsx
  pages/
    Debugger.tsx
    Home.tsx
  providers/
    NotificationProvider.css
    NotificationProvider.tsx
    WalletProvider.tsx
  util/
    contract.ts
    friendbot.ts
    storage.ts
    wallet.ts
  App.tsx
  index.css
  main.tsx
  vite-env.d.ts
.env.example
.gitattributes
.gitignore
Cargo.toml
CODE_OF_CONDUCT.md
CONTRIBUTING.md
environments.toml
eslint.config.js
index.html
LICENSE
package.json
README.md
rust-toolchain.toml
SECURITY.md
tsconfig.app.json
tsconfig.json
tsconfig.node.json
vite.config.ts
```

# Files

## File: .github/workflows/node.yml
````yaml
name: Build and Test

on:
  push:
    branches: ["main"]
  pull_request:

env:
  CARGO_TERM_COLOR: always
  PKG_CONFIG_PATH: /usr/lib/pkgconfig
  PUBLIC_STELLAR_NETWORK: local

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/cache@v3
        with:
          path: |
            ~/.cargo/bin/
            runner/.cargo/bin/
            ~/.cargo/registry/index/
            ~/.cargo/registry/cache/
            ~/.cargo/git/db/
            target/
          key: ${{ runner.os }}-cargo-${{ hashFiles('**/Cargo.lock') }}
      - run: rustup target add wasm32v1-none
      - name: Start Stellar Quickstart
        uses: stellar/quickstart@main
        with:
          tag: testing
          network: local
      - run: sudo apt-get update && sudo apt-get install -y libudev-dev libdbus-1-dev pkg-config
      - name: Install cargo-binstall
        uses: cargo-bins/cargo-binstall@v1.15.6
      - name: Check for stellar-scaffold binary
        run: |
          if ! command -v stellar-scaffold &> /dev/null; then
            echo "stellar-scaffold not found, installing..."
            cargo binstall stellar-scaffold-cli
          else
            echo "stellar-scaffold already installed. Clear cache to force reinstall."
          fi
      - run: npm ci
      - run: npm run lint
      - run: npx prettier . --check
      - name: Build clients before building the project
        run: STELLAR_SCAFFOLD_ENV=development stellar-scaffold build --build-clients
      - run: npm run install:contracts
      - run: npm run build
      - name: Run tests
        run: npm test --if-present
````

## File: .husky/pre-commit
````
npx lint-staged
````

## File: contracts/fungible-allowlist/src/contract.rs
````rust
//! Fungible AllowList Example Contract.

//! This contract showcases how to integrate the AllowList extension with a
//! SEP-41-compliant fungible token. It includes essential features such as
//! controlled token transfers by an admin who can allow or disallow specific
//! accounts.

use soroban_sdk::{contract, contractimpl, symbol_short, Address, Env, String};
use stellar_access::access_control::{self as access_control, AccessControl};
use stellar_macros::{default_impl, only_role};
use stellar_tokens::fungible::{
    allowlist::{AllowList, FungibleAllowList},
    burnable::FungibleBurnable,
    Base, FungibleToken,
};

#[contract]
pub struct ExampleContract;

#[contractimpl]
impl ExampleContract {
    pub fn __constructor(e: &Env, admin: Address, manager: Address, initial_supply: i128) {
        Base::set_metadata(
            e,
            18,
            String::from_str(e, "AllowList Token"),
            String::from_str(e, "ALT"),
        );

        access_control::set_admin(e, &admin);

        // create a role "manager" and grant it to `manager`
        access_control::grant_role_no_auth(e, &admin, &manager, &symbol_short!("manager"));

        // Allow the admin to transfer tokens
        AllowList::allow_user(e, &admin);

        // Mint initial supply to the admin
        Base::mint(e, &admin, initial_supply);
    }
}

#[default_impl]
#[contractimpl]
impl FungibleToken for ExampleContract {
    type ContractType = AllowList;
}
#[contractimpl]
impl FungibleAllowList for ExampleContract {
    fn allowed(e: &Env, account: Address) -> bool {
        AllowList::allowed(e, &account)
    }

    #[only_role(operator, "manager")]
    fn allow_user(e: &Env, user: Address, operator: Address) {
        AllowList::allow_user(e, &user)
    }

    #[only_role(operator, "manager")]
    fn disallow_user(e: &Env, user: Address, operator: Address) {
        AllowList::disallow_user(e, &user)
    }
}

#[default_impl]
#[contractimpl]
impl AccessControl for ExampleContract {}

#[default_impl]
#[contractimpl]
impl FungibleBurnable for ExampleContract {}
````

## File: contracts/fungible-allowlist/src/lib.rs
````rust
#![no_std]
#![allow(dead_code)]

mod contract;

#[cfg(test)]
mod test;
````

## File: contracts/fungible-allowlist/src/test.rs
````rust
extern crate std;

use soroban_sdk::{testutils::Address as _, Address, Env};

use crate::contract::{ExampleContract, ExampleContractClient};

fn create_client<'a>(
    e: &Env,
    admin: &Address,
    manager: &Address,
    initial_supply: &i128,
) -> ExampleContractClient<'a> {
    let address = e.register(ExampleContract, (admin, manager, initial_supply));
    ExampleContractClient::new(e, &address)
}

#[test]
#[should_panic(expected = "Error(Contract, #113)")]
fn cannot_transfer_before_allow() {
    let e = Env::default();
    let admin = Address::generate(&e);
    let manager = Address::generate(&e);
    let user1 = Address::generate(&e);
    let user2 = Address::generate(&e);
    let initial_supply = 1_000_000;
    let client = create_client(&e, &admin, &manager, &initial_supply);
    let transfer_amount = 1000;

    // Verify initial state - admin is allowed, others are not
    assert!(client.allowed(&admin));
    assert!(!client.allowed(&user1));
    assert!(!client.allowed(&user2));

    // Admin can't transfer to user1 initially (user1 not allowed)
    e.mock_all_auths();
    client.transfer(&admin, &user1, &transfer_amount);
}

#[test]
fn transfer_to_allowed_account_works() {
    let e = Env::default();
    let admin = Address::generate(&e);
    let manager = Address::generate(&e);
    let user1 = Address::generate(&e);
    let user2 = Address::generate(&e);
    let initial_supply = 1_000_000;
    let client = create_client(&e, &admin, &manager, &initial_supply);
    let transfer_amount = 1000;

    e.mock_all_auths();

    // Verify initial state - admin is allowed, others are not
    assert!(client.allowed(&admin));
    assert!(!client.allowed(&user1));
    assert!(!client.allowed(&user2));

    // Allow user1
    client.allow_user(&user1, &manager);
    assert!(client.allowed(&user1));

    // Now admin can transfer to user1
    client.transfer(&admin, &user1, &transfer_amount);
    assert_eq!(client.balance(&user1), transfer_amount);
}

#[test]
#[should_panic(expected = "Error(Contract, #113)")]
fn cannot_transfer_after_disallow() {
    let e = Env::default();
    let admin = Address::generate(&e);
    let manager = Address::generate(&e);
    let user1 = Address::generate(&e);
    let user2 = Address::generate(&e);
    let initial_supply = 1_000_000;
    let client = create_client(&e, &admin, &manager, &initial_supply);
    let transfer_amount = 1000;

    e.mock_all_auths();

    // Verify initial state - admin is allowed, others are not
    assert!(client.allowed(&admin));
    assert!(!client.allowed(&user1));
    assert!(!client.allowed(&user2));

    // Allow user1
    client.allow_user(&user1, &manager);
    assert!(client.allowed(&user1));

    // Now admin can transfer to user1
    client.transfer(&admin, &user1, &transfer_amount);
    assert_eq!(client.balance(&user1), transfer_amount);

    // Disallow user1
    client.disallow_user(&user1, &manager);
    assert!(!client.allowed(&user1));

    // Admin can't transfer to user1 after disallowing
    client.transfer(&admin, &user1, &100);
}

#[test]
fn allowlist_transfer_from_override_works() {
    let e = Env::default();
    let admin = Address::generate(&e);
    let manager = Address::generate(&e);
    let user1 = Address::generate(&e);
    let user2 = Address::generate(&e);
    let initial_supply = 1_000_000;
    let client = create_client(&e, &admin, &manager, &initial_supply);
    let transfer_amount = 1000;

    e.mock_all_auths();

    // Verify initial state - admin is allowed, others are not
    assert!(client.allowed(&admin));
    assert!(!client.allowed(&user1));
    assert!(!client.allowed(&user2));

    // Allow user2
    client.allow_user(&user2, &manager);
    assert!(client.allowed(&user2));

    // Now admin can transfer to user1
    client.approve(&admin, &user1, &transfer_amount, &1000);
    client.transfer_from(&user1, &admin, &user2, &transfer_amount);
    assert_eq!(client.balance(&user2), transfer_amount);
}

#[test]
fn allowlist_approve_override_works() {
    let e = Env::default();
    let admin = Address::generate(&e);
    let manager = Address::generate(&e);
    let user1 = Address::generate(&e);
    let user2 = Address::generate(&e);
    let initial_supply = 1_000_000;
    let client = create_client(&e, &admin, &manager, &initial_supply);
    let transfer_amount = 1000;

    e.mock_all_auths();

    // Verify initial state - admin is allowed, others are not
    assert!(client.allowed(&admin));
    assert!(!client.allowed(&user1));
    assert!(!client.allowed(&user2));

    // Allow user1
    client.allow_user(&user1, &manager);
    assert!(client.allowed(&user1));

    // Approve user2 to transfer from user1
    client.approve(&user1, &user2, &transfer_amount, &1000);
    assert_eq!(client.allowance(&user1, &user2), transfer_amount);
}
````

## File: contracts/fungible-allowlist/Cargo.toml
````toml
[package]
name = "fungible-allowlist-example"
edition.workspace = true
license.workspace = true
repository.workspace = true
publish = false
version.workspace = true

[lib]
crate-type = ["cdylib"]
doctest = false

[dependencies]
soroban-sdk = { workspace = true }
stellar-access = { workspace = true }
stellar-macros = { workspace = true }
stellar-tokens = { workspace = true }

[dev-dependencies]
soroban-sdk = { workspace = true, features = ["testutils"] }
````

## File: contracts/guess-the-number/src/error.rs
````rust
#[soroban_sdk::contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum Error {
    /// The contract failed to transfer XLM to the guesser
    FailedToTransferToGuesser = 1,
    /// The guesser failed to transfer XLM to the contract
    FailedToTransferFromGuesser = 2,
    /// The contract has no balance to transfer to the guesser
    NoBalanceToTransfer = 3,
    
}
````

## File: contracts/guess-the-number/src/lib.rs
````rust
#![no_std]
use soroban_sdk::{contract, contractimpl, symbol_short, Address, BytesN, Env, Symbol};

mod error;
mod xlm;

use error::Error;

#[contract]
pub struct GuessTheNumber;

const THE_NUMBER: &Symbol = &symbol_short!("n");
pub const ADMIN_KEY: &Symbol = &symbol_short!("ADMIN");

#[contractimpl]
impl GuessTheNumber {
    /// Constructor to initialize the contract with an admin and a random number
    pub fn __constructor(env: &Env, admin: Address) {
        // Require auth from the admin to make the transfer
        admin.require_auth();
        // This is for testing purposes. Ensures that the XLM contract set up for unit testing and local network
        xlm::register(env, &admin);
        // Send the contract an amount of XLM to play with
        xlm::token_client(env).transfer(
            &admin,
            env.current_contract_address(),
            &xlm::to_stroops(1),
        );
        // Set the admin in storage
        Self::set_admin(env, admin);
        // Set a random number between 1 and 10
        Self::reset_number(env);
    }

    /// Update the number. Only callable by admin.
    pub fn reset(env: &Env) {
        Self::require_admin(env);
        Self::reset_number(env);
    }

    // Private function to reset the number to a new random value
    // which doesn't require auth from the admin
    fn reset_number(env: &Env) {
        let new_number: u64 = env.prng().gen_range(1..=10);
        env.storage().instance().set(THE_NUMBER, &new_number);
    }

    /// Guess a number between 1 and 10
    pub fn guess(env: &Env, a_number: u64, guesser: Address) -> Result<bool, Error> {
        let xlm_client = xlm::token_client(env);
        let contract_address = env.current_contract_address();
        let guessed_it = a_number == Self::number(env);
        if guessed_it {
            let balance = xlm_client.balance(&contract_address);
            if balance == 0 {
                return Err(Error::NoBalanceToTransfer);
            }
            // Methods `try_*` will return an error if the method fails
            // `.map_err` lets us convert the error to our custom Error type
            let _ = xlm_client
                .try_transfer(&contract_address, &guesser, &balance)
                .map_err(|_| Error::FailedToTransferToGuesser)?;
        } else {
            guesser.require_auth();
            let _ = xlm_client
                .try_transfer(&guesser, &contract_address, &xlm::to_stroops(1))
                .map_err(|_| Error::FailedToTransferFromGuesser)?;
        }
        Ok(guessed_it)
    }

    /// Admin can add more funds to the contract
    pub fn add_funds(env: &Env, amount: i128) {
        Self::require_admin(env);
        let contract_address = env.current_contract_address();
        // unwrap here is safe because the admin was set in the constructor
        let admin = Self::admin(env).unwrap();
        xlm::token_client(env).transfer(&admin, &contract_address, &amount);
    }

    /// Upgrade the contract to new wasm. Only callable by admin.
    pub fn upgrade(env: &Env, new_wasm_hash: BytesN<32>) {
        Self::require_admin(env);
        env.deployer().update_current_contract_wasm(new_wasm_hash);
    }

    /// readonly function to get the current number
    /// `pub(crate)` makes it accessible in the same crate, but not outside of it
    pub(crate) fn number(env: &Env) -> u64 {
        // We can unwrap because the number is set in the constructor
        // and then only reset by the admin
        unsafe { env.storage().instance().get(THE_NUMBER).unwrap_unchecked() }
    }

    /// Get current admin
    pub fn admin(env: &Env) -> Option<Address> {
        env.storage().instance().get(ADMIN_KEY)
    }

    /// Set a new admin. Only callable by admin.
    pub fn set_admin(env: &Env, admin: Address) {
        // Check if admin is already set
        if env.storage().instance().has(ADMIN_KEY) {
            panic!("admin already set");
        }
        env.storage().instance().set(ADMIN_KEY, &admin);
    }

    /// Private helper function to require auth from the admin
    fn require_admin(env: &Env) {
        let admin = Self::admin(env).expect("admin not set");
        admin.require_auth();
    }
}

mod test;
````

## File: contracts/guess-the-number/src/test.rs
````rust
#![cfg(test)]
// This lets use reference types in the std library for testing
extern crate std;

use super::*;
use soroban_sdk::{
    testutils::{Address as _, MockAuth, MockAuthInvoke},
    token::StellarAssetClient,
    Address, Env, IntoVal, Val, Vec,
};

fn init_test<'a>(env: &'a Env) -> (Address, StellarAssetClient<'a>, GuessTheNumberClient<'a>) {
    let admin = Address::generate(env);
    let client = generate_client(env, &admin);
    // This is needed because we want to call a function from within the context of the contract
    // In this case we want to get the address of the XLM contract registered by the constructor
    let sac_address = env.as_contract(&client.address, || xlm::contract_id(env));
    (admin, StellarAssetClient::new(env, &sac_address), client)
}

#[test]
fn constructed_correctly() {
    let env = &Env::default();
    let (admin, sac, client) = init_test(env);
    // Check that the admin is set correctly
    assert_eq!(client.admin(), Some(admin.clone()));
    // Check that the contract has a balance of 1 XLM
    assert_eq!(sac.balance(&client.address), xlm::to_stroops(1));
    // Need to use `as_contract` to call a function in the context of the contract
    // Since the method `number` is not in the client, but is visibile in the crate
    let number = env.as_contract(&client.address, || GuessTheNumber::number(env));
    assert_eq!(number, 4);
}

#[test]
fn only_admin_can_reset() {
    let env = &Env::default();
    let (admin, _, client) = init_test(env);
    let user = Address::generate(env);

    set_caller(&client, "reset", &user, ());
    assert!(client.try_reset().is_err());

    set_caller(&client, "reset", &admin, ());
    assert!(client.try_reset().is_ok());
}

#[test]
fn guess() {
    let env = &Env::default();
    let (_, sac, client) = init_test(env);
    // This lets you mock all auth when they become complicated when making cross contract calls.
    env.mock_all_auths();

    // Create a user to guess
    let alice = Address::generate(env);
    // Mint tokens to the user. On testnet you use friendbot to fund the account.
    sac.mint(&alice, &xlm::to_stroops(2));
    // Check that alice has the tokens
    assert_eq!(sac.balance(&alice), xlm::to_stroops(2));

    // Create another user with no funds
    let bob = Address::generate(env);

    // In the testing enviroment the random seed is always the same initially.
    // This tests a wrong guess so the balance should go down one XLM
    assert!(!client.guess(&3, &alice));
    assert_eq!(sac.balance(&alice), xlm::to_stroops(1));

    // Now we test a wrong guess but the user has no funds so  we get an error
    assert_eq!(
        client.try_guess(&3, &bob).unwrap_err(),
        Ok(Error::FailedToTransferFromGuesser)
    );

    // Now we test a correct guess, the balance should go up by the initial 1 XLM + the 1 XLM from the contract
    assert!(client.guess(&4, &alice));
    assert_eq!(sac.balance(&alice), xlm::to_stroops(3));

    assert_eq!(
        client.try_guess(&4, &alice).unwrap_err(),
        Ok(Error::NoBalanceToTransfer)
    );
}

#[test]
fn add_funds() {
    let env = &Env::default();
    let (_, sac, client) = init_test(env);
    // This lets you mock all auth when they become complicated when making cross contract calls.
    env.mock_all_auths();

    // Create a user to guess
    let alice = Address::generate(env);
    // Mint tokens to the user. On testnet you use friendbot to fund the account.
    sac.mint(&alice, &xlm::to_stroops(2));
    // Now we test a correct guess, the balance should go up by the initial 1 XLM + the 1 XLM from the contract
    assert!(client.guess(&4, &alice));
    assert_eq!(sac.balance(&alice), xlm::to_stroops(3));
    assert_eq!(sac.balance(&client.address), 0);

    client.add_funds(&xlm::to_stroops(5));
    assert_eq!(sac.balance(&client.address), xlm::to_stroops(5));

    // Since we didn't reset the number, the guess should still be correct
    assert!(client.guess(&4, &alice));
    assert_eq!(sac.balance(&alice), xlm::to_stroops(8));
    assert_eq!(sac.balance(&client.address), 0);
}

#[test]
fn reset_and_guess() {
    let env = &Env::default();
    let (_, sac, client) = init_test(env);
    // This lets you mock all auth when they become complicated when making cross contract calls.
    env.mock_all_auths();

    // Create a user to guess
    let alice = Address::generate(env);
    // Mint tokens to the user. On testnet you use friendbot to fund the account.
    sac.mint(&alice, &xlm::to_stroops(2));

    // Reset the number
    client.reset();

    // Guess again, this should be correct now
    assert!(client.guess(&10, &alice));
}

fn generate_client<'a>(env: &Env, admin: &Address) -> GuessTheNumberClient<'a> {
    let contract_id = Address::generate(env);
    env.mock_all_auths();
    let contract_id = env.register_at(&contract_id, GuessTheNumber, (admin,));
    env.set_auths(&[]); // clear auths
    GuessTheNumberClient::new(env, &contract_id)
}

// This lets you mock the auth context for a function call
fn set_caller<T>(client: &GuessTheNumberClient, fn_name: &str, caller: &Address, args: T)
where
    T: IntoVal<Env, Vec<Val>>,
{
    // clear previous auth mocks
    client.env.set_auths(&[]);

    let invoke = &MockAuthInvoke {
        contract: &client.address,
        fn_name,
        args: args.into_val(&client.env),
        sub_invokes: &[],
    };

    // mock auth as passed-in address
    client.env.mock_auths(&[MockAuth {
        address: &caller,
        invoke,
    }]);
}
````

## File: contracts/guess-the-number/src/xlm.rs
````rust
#[cfg(test)]
mod xlm {
    use super::*;
    const XLM_KEY: &soroban_sdk::Symbol = &soroban_sdk::symbol_short!("XLM");

    pub fn contract_id(env: &soroban_sdk::Env) -> soroban_sdk::Address {
        env.storage()
            .instance()
            .get::<_, soroban_sdk::Address>(XLM_KEY)
            .expect("XLM contract not initialized. Please deploy the XLM contract first.")
    }

    pub fn register(
        env: &soroban_sdk::Env,
        admin: &soroban_sdk::Address,
    ) -> soroban_sdk::testutils::StellarAssetContract {
        let sac = env.register_stellar_asset_contract_v2(admin.clone());
        env.storage().instance().set(XLM_KEY, &sac.address());
        stellar_asset_client(env).mint(admin, &to_stroops(10_000));
        sac
    }

    #[allow(unused)]
    pub fn stellar_asset_client<'a>(
        env: &soroban_sdk::Env,
    ) -> soroban_sdk::token::StellarAssetClient<'a> {
        soroban_sdk::token::StellarAssetClient::new(&env, &contract_id(env))
    }
    /// Create a Stellar Asset Client for the asset which provides an admin interface
    pub fn token_client<'a>(env: &soroban_sdk::Env) -> soroban_sdk::token::TokenClient<'a> {
        soroban_sdk::token::TokenClient::new(&env, &contract_id(env))
    }
}
const ONE_XLM: i128 = 1_000_000_0; // 1 XLM in stroops;

pub const fn to_stroops(num: u64) -> i128 {
    (num as i128) * ONE_XLM
}

#[cfg(not(test))]
stellar_registry::import_asset!("xlm");

#[allow(unused)]
pub const SERIALIZED_ASSET: [u8; 4] = [0, 0, 0, 0];

pub use xlm::*;
mod register {
    
    #[allow(unused)]
    #[cfg(not(test))]
    pub fn register(env: &soroban_sdk::Env, admin: &soroban_sdk::Address) {
        let balance = super::token_client(env).try_balance(&env.current_contract_address());
        if balance.is_err()  {
            env.deployer().with_stellar_asset(super::SERIALIZED_ASSET).deploy();
        }
    }
}

#[allow(unused_imports)]
pub use register::*;
````

## File: contracts/guess-the-number/Cargo.toml
````toml
[package]
name = "guess-the-number"
description = "Admin sets up the pot, anyone can guess to win it"
edition.workspace = true
license.workspace = true
repository.workspace = true
publish = false
version.workspace = true

[package.metadata.stellar]
# Set contract metadata for authors, homepage, and version based on the Cargo.toml package values
cargo_inherit = true 

[lib]
crate-type = ["cdylib"]
doctest = false

[dependencies]
soroban-sdk = "23.0.3"
stellar-registry = "0.0.4"

[dev-dependencies]
stellar-xdr = { version = "23.0.0", features = ["curr", "serde"] }
soroban-sdk = { version = "23.0.3", features = ["testutils"] }
````

## File: contracts/nft-enumerable/src/contract.rs
````rust
//! Non-Fungible Enumerable Example Contract.
//!
//! Demonstrates an example usage of the Enumerable extension, allowing for
//! enumeration of all the token IDs in the contract as well as all the token
//! IDs owned by each account.

use soroban_sdk::{contract, contractimpl, contracttype, Address, Env, String};
use stellar_macros::default_impl;
use stellar_tokens::non_fungible::{
    burnable::NonFungibleBurnable,
    enumerable::{Enumerable, NonFungibleEnumerable},
    Base, NonFungibleToken,
};

#[contracttype]
pub enum DataKey {
    Owner,
}

#[contract]
pub struct ExampleContract;

#[contractimpl]
impl ExampleContract {
    pub fn __constructor(e: &Env, owner: Address) {
        e.storage().instance().set(&DataKey::Owner, &owner);
        Base::set_metadata(
            e,
            String::from_str(e, "www.mytoken.com"),
            String::from_str(e, "My Token"),
            String::from_str(e, "TKN"),
        );
    }

    pub fn mint(e: &Env, to: Address) -> u32 {
        let owner: Address =
            e.storage().instance().get(&DataKey::Owner).expect("owner should be set");
        owner.require_auth();
        Enumerable::sequential_mint(e, &to)
    }
}

#[default_impl]
#[contractimpl]
impl NonFungibleToken for ExampleContract {
    type ContractType = Enumerable;
}

#[default_impl]
#[contractimpl]
impl NonFungibleEnumerable for ExampleContract {}

#[default_impl]
#[contractimpl]
impl NonFungibleBurnable for ExampleContract {}
````

## File: contracts/nft-enumerable/src/lib.rs
````rust
#![no_std]
#![allow(dead_code)]

mod contract;
#[cfg(test)]
mod test;
````

## File: contracts/nft-enumerable/src/test.rs
````rust
extern crate std;

use soroban_sdk::{testutils::Address as _, Address, Env};

use crate::contract::{ExampleContract, ExampleContractClient};

fn create_client<'a>(e: &Env, owner: &Address) -> ExampleContractClient<'a> {
    let address = e.register(ExampleContract, (owner,));
    ExampleContractClient::new(e, &address)
}

#[test]
fn enumerable_transfer_override_works() {
    let e = Env::default();

    let owner = Address::generate(&e);

    let recipient = Address::generate(&e);

    let client = create_client(&e, &owner);

    e.mock_all_auths();
    client.mint(&owner);
    client.transfer(&owner, &recipient, &0);
    assert_eq!(client.balance(&owner), 0);
    assert_eq!(client.balance(&recipient), 1);
    assert_eq!(client.get_owner_token_id(&recipient, &0), 0);
}

#[test]
fn enumerable_burn_works() {
    let e = Env::default();
    let owner = Address::generate(&e);
    let client = create_client(&e, &owner);
    e.mock_all_auths();
    client.mint(&owner);
    client.burn(&owner, &0);
    assert_eq!(client.balance(&owner), 0);
    client.mint(&owner);
    assert_eq!(client.balance(&owner), 1);
    assert_eq!(client.get_owner_token_id(&owner, &0), 1);
}
````

## File: contracts/nft-enumerable/Cargo.toml
````toml
[package]
name = "nft-enumerable-example"
edition.workspace = true
license.workspace = true
repository.workspace = true
publish = false
version.workspace = true

[lib]
crate-type = ["cdylib"]
doctest = false

[dependencies]
soroban-sdk = { workspace = true }
stellar-tokens = { workspace = true }
stellar-macros = { workspace = true }

[dev-dependencies]
soroban-sdk = { workspace = true, features = ["testutils"] }
````

## File: src/components/layout/Box.tsx
````typescript
import React from "react";

// Define gap values (you may need to adjust these based on your design system)
const gapValues = {
  xs: "0.25rem", // 4px
  sm: "0.5rem", // 8px
  md: "1rem", // 16px
  lg: "1.5rem", // 24px
  xl: "2rem", // 32px
  xxl: "3rem", // 48px
};

export const Box = ({
  gap,
  children,
  customValue,
  addlClassName,
  direction = "column",
  justify = "baseline",
  align = "stretch",
  wrap,
  style,
  ...props
}: (
  | { gap: "xs" | "sm" | "md" | "lg" | "xl" | "xxl"; customValue?: undefined }
  | { gap: "custom"; customValue: string }
) & {
  children: React.ReactElement | React.ReactElement[] | React.ReactNode;
  addlClassName?: string;
  direction?: "column" | "row" | "column-reverse" | "row-reverse";
  justify?:
    | "center"
    | "space-between"
    | "space-around"
    | "end"
    | "left"
    | "right"
    | "baseline";
  align?: "center" | "end" | "start" | "baseline" | "stretch";
  wrap?: "nowrap" | "wrap";
  style?: React.CSSProperties;
}) => {
  const boxStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: direction,
    justifyContent: justify,
    alignItems: align,
    gap: gap === "custom" ? customValue : gapValues[gap],
    ...(wrap ? { flexWrap: wrap } : {}),
    ...style,
  };

  return (
    <div className={addlClassName} style={boxStyle} {...props}>
      {children}
    </div>
  );
};
````

## File: src/components/ConnectAccount.tsx
````typescript
import React from "react";
import { stellarNetwork } from "../contracts/util";
import FundAccountButton from "./FundAccountButton";
import { WalletButton } from "./WalletButton";
import NetworkPill from "./NetworkPill";

const ConnectAccount: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "10px",
        verticalAlign: "middle",
      }}
    >
      <WalletButton />
      {stellarNetwork !== "PUBLIC" && <FundAccountButton />}
      <NetworkPill />
    </div>
  );
};

export default ConnectAccount;
````

## File: src/components/FundAccountButton.tsx
````typescript
import React, { useState, useTransition } from "react";
import { useNotification } from "../hooks/useNotification.ts";
import { useWallet } from "../hooks/useWallet.ts";
import { Button, Tooltip } from "@stellar/design-system";
import { getFriendbotUrl } from "../util/friendbot";
import { useWalletBalance } from "../hooks/useWalletBalance.ts";

const FundAccountButton: React.FC = () => {
  const { addNotification } = useNotification();
  const [isPending, startTransition] = useTransition();
  const { isFunded, isLoading } = useWalletBalance();
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const { address } = useWallet();

  if (!address) return null;

  const handleFundAccount = () => {
    startTransition(async () => {
      try {
        const response = await fetch(getFriendbotUrl(address));

        if (response.ok) {
          addNotification("Account funded successfully!", "success");
        } else {
          const body: unknown = await response.json();
          if (
            body !== null &&
            typeof body === "object" &&
            "detail" in body &&
            typeof body.detail === "string"
          ) {
            addNotification(`Error funding account: ${body.detail}`, "error");
          } else {
            addNotification("Error funding account: Unknown error", "error");
          }
        }
      } catch {
        addNotification("Error funding account. Please try again.", "error");
      }
    });
  };

  return (
    <div
      onMouseEnter={() => setIsTooltipVisible(true)}
      onMouseLeave={() => setIsTooltipVisible(false)}
    >
      <Tooltip
        isVisible={isTooltipVisible}
        isContrast
        title="Fund Account"
        placement="bottom"
        triggerEl={
          <Button
            disabled={isPending || isLoading || isFunded}
            onClick={handleFundAccount}
            variant="primary"
            size="md"
          >
            Fund Account
          </Button>
        }
      >
        <div style={{ width: "13em" }}>
          {isFunded
            ? "Account is already funded"
            : "Fund your account using the Stellar Friendbot"}
        </div>
      </Tooltip>
    </div>
  );
};

export default FundAccountButton;
````

## File: src/components/GuessTheNumber.tsx
````typescript
import { useState } from "react";
import { Button, Code, Input, Text } from "@stellar/design-system";
import { useWallet } from "../hooks/useWallet";
import game from "../contracts/guess_the_number";
import { Box } from "../components/layout/Box";

export const GuessTheNumber = () => {
  const [guessedIt, setGuessedIt] = useState<boolean>();
  const [theGuess, setTheGuess] = useState<number>();
  const { address } = useWallet();

  if (!address) {
    return (
      <Text as="p" size="md">
        Connect wallet to play the guessing game
      </Text>
    );
  }

  const submitGuess = async () => {
    if (!theGuess || !address) return;
    const { result } = await game.guess({
      a_number: BigInt(theGuess),
      guesser: address,
    });
    if (result.isErr()) {
      console.error(result.unwrapErr());
    } else {
      setGuessedIt(result.unwrap());
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void submitGuess();
      }}
    >
      {guessedIt ? (
        <>
          <Text as="p" size="lg">
            You got it!
          </Text>
          <Text as="p" size="lg">
            Set a new number by calling <Code size="md">reset</Code> from the
            CLI as the admin.
          </Text>
        </>
      ) : (
        <Box gap="sm" direction="row" align="end" justify="end" wrap="wrap">
          <Input
            label="Guess a number from 1 to 10!"
            id="guess"
            fieldSize="lg"
            error={guessedIt === false && "Wrong! Guess again."}
            onChange={(e) => {
              setGuessedIt(undefined);
              setTheGuess(Number(e.target.value));
            }}
          />
          <Button
            type="submit"
            disabled={!theGuess}
            style={{ marginTop: 8 }}
            variant="primary"
            size="md"
          >
            Submit Guess
          </Button>
        </Box>
      )}
      <Text as="p" size="lg">
        &nbsp; {/* Not sure the SDS way to add consistent spacing at the end */}
      </Text>
    </form>
  );
};
````

## File: src/components/NetworkPill.tsx
````typescript
import React from "react";
import { Icon } from "@stellar/design-system";
import { useWallet } from "../hooks/useWallet";
import { stellarNetwork } from "../contracts/util";

// Format network name with first letter capitalized
const formatNetworkName = (name: string) =>
  // TODO: This is a workaround until @creit-tech/stellar-wallets-kit uses the new name for a local network.
  name === "STANDALONE"
    ? "Local"
    : name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

const appNetwork = formatNetworkName(stellarNetwork);

const bgColor = "#F0F2F5";
const textColor = "#4A5362";

const NetworkPill: React.FC = () => {
  const { network, address } = useWallet();

  // Check if there's a network mismatch
  const walletNetwork = formatNetworkName(network ?? "");
  const isNetworkMismatch = walletNetwork !== appNetwork;

  let title = "";
  let color = "#2ED06E";
  if (!address) {
    title = "Connect your wallet using this network.";
    color = "#C1C7D0";
  } else if (isNetworkMismatch) {
    title = `Wallet is on ${walletNetwork}, connect to ${appNetwork} instead.`;
    color = "#FF3B30";
  }

  return (
    <div
      style={{
        backgroundColor: bgColor,
        color: textColor,
        padding: "4px 10px",
        borderRadius: "16px",
        fontSize: "12px",
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
        gap: "4px",
        cursor: isNetworkMismatch ? "help" : "default",
      }}
      title={title}
    >
      <Icon.Circle color={color} />
      {appNetwork}
    </div>
  );
};

export default NetworkPill;
````

## File: src/components/WalletButton.tsx
````typescript
import { useState } from "react";
import { Button, Text, Modal, Profile } from "@stellar/design-system";
import { useWallet } from "../hooks/useWallet";
import { useWalletBalance } from "../hooks/useWalletBalance";
import { connectWallet, disconnectWallet } from "../util/wallet";

export const WalletButton = () => {
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);
  const { address, isPending } = useWallet();
  const { xlm, ...balance } = useWalletBalance();
  const buttonLabel = isPending ? "Loading..." : "Connect";

  if (!address) {
    return (
      <Button variant="primary" size="md" onClick={() => void connectWallet()}>
        {buttonLabel}
      </Button>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "5px",
        opacity: balance.isLoading ? 0.6 : 1,
      }}
    >
      <Text as="div" size="sm">
        Wallet Balance: {xlm} XLM
      </Text>

      <div id="modalContainer">
        <Modal
          visible={showDisconnectModal}
          onClose={() => setShowDisconnectModal(false)}
          parentId="modalContainer"
        >
          <Modal.Heading>
            Connected as{" "}
            <code style={{ lineBreak: "anywhere" }}>{address}</code>. Do you
            want to disconnect?
          </Modal.Heading>
          <Modal.Footer itemAlignment="stack">
            <Button
              size="md"
              variant="primary"
              onClick={() => {
                void disconnectWallet().then(() =>
                  setShowDisconnectModal(false),
                );
              }}
            >
              Disconnect
            </Button>
            <Button
              size="md"
              variant="tertiary"
              onClick={() => {
                setShowDisconnectModal(false);
              }}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <Profile
        publicAddress={address}
        size="md"
        isShort
        onClick={() => setShowDisconnectModal(true)}
      />
    </div>
  );
};
````

## File: src/contracts/util.ts
````typescript
import { z } from "zod";
import { WalletNetwork } from "@creit.tech/stellar-wallets-kit";
import { Network, NetworkType } from "../debug/types/types";

const envSchema = z.object({
  PUBLIC_STELLAR_NETWORK: z.enum([
    "PUBLIC",
    "FUTURENET",
    "TESTNET",
    "LOCAL",
    "STANDALONE", // deprecated in favor of LOCAL
  ] as const),
  PUBLIC_STELLAR_NETWORK_PASSPHRASE: z.nativeEnum(WalletNetwork),
  PUBLIC_STELLAR_RPC_URL: z.string(),
  PUBLIC_STELLAR_HORIZON_URL: z.string(),
});

const parsed = envSchema.safeParse(import.meta.env);

const env: z.infer<typeof envSchema> = parsed.success
  ? parsed.data
  : {
      PUBLIC_STELLAR_NETWORK: "LOCAL",
      PUBLIC_STELLAR_NETWORK_PASSPHRASE: WalletNetwork.STANDALONE,
      PUBLIC_STELLAR_RPC_URL: "http://localhost:8000/rpc",
      PUBLIC_STELLAR_HORIZON_URL: "http://localhost:8000",
    };

export const stellarNetwork =
  env.PUBLIC_STELLAR_NETWORK === "STANDALONE"
    ? "LOCAL"
    : env.PUBLIC_STELLAR_NETWORK;
export const networkPassphrase = env.PUBLIC_STELLAR_NETWORK_PASSPHRASE;

const stellarEncode = (str: string) => {
  return str.replace(/\//g, "//").replace(/;/g, "/;");
};

export const labPrefix = () => {
  switch (stellarNetwork) {
    case "LOCAL":
      return `http://localhost:8000/lab/transaction-dashboard?$=network$id=custom&label=Custom&horizonUrl=${stellarEncode(horizonUrl)}&rpcUrl=${stellarEncode(rpcUrl)}&passphrase=${stellarEncode(networkPassphrase)};`;
    case "PUBLIC":
      return `https://lab.stellar.org/transaction-dashboard?$=network$id=mainnet&label=Mainnet&horizonUrl=${stellarEncode(horizonUrl)}&rpcUrl=${stellarEncode(rpcUrl)}&passphrase=${stellarEncode(networkPassphrase)};`;
    case "TESTNET":
      return `https://lab.stellar.org/transaction-dashboard?$=network$id=testnet&label=Testnet&horizonUrl=${stellarEncode(horizonUrl)}&rpcUrl=${stellarEncode(rpcUrl)}&passphrase=${stellarEncode(networkPassphrase)};`;
    case "FUTURENET":
      return `https://lab.stellar.org/transaction-dashboard?$=network$id=futurenet&label=Futurenet&horizonUrl=${stellarEncode(horizonUrl)}&rpcUrl=${stellarEncode(rpcUrl)}&passphrase=${stellarEncode(networkPassphrase)};`;
    default:
      return `https://lab.stellar.org/transaction-dashboard?$=network$id=testnet&label=Testnet&horizonUrl=${stellarEncode(horizonUrl)}&rpcUrl=${stellarEncode(rpcUrl)}&passphrase=${stellarEncode(networkPassphrase)};`;
  }
};

// NOTE: needs to be exported for contract files in this directory
export const rpcUrl = env.PUBLIC_STELLAR_RPC_URL;

export const horizonUrl = env.PUBLIC_STELLAR_HORIZON_URL;

const networkToId = (network: string): NetworkType => {
  switch (network) {
    case "PUBLIC":
      return "mainnet";
    case "TESTNET":
      return "testnet";
    case "FUTURENET":
      return "futurenet";
    default:
      return "custom";
  }
};

export const network: Network = {
  id: networkToId(stellarNetwork),
  label: stellarNetwork.toLowerCase(),
  passphrase: networkPassphrase,
  rpcUrl: rpcUrl,
  horizonUrl: horizonUrl,
};
````

## File: src/debug/components/ContractForm.tsx
````typescript
import { Alert, Card, Text } from "@stellar/design-system";
import { contract } from "@stellar/stellar-sdk";

import { Box } from "../../components/layout/Box";

import { InvokeContractForm } from "./InvokeContractForm";
import { useWallet } from "../../hooks/useWallet";

export const ContractForm = ({
  contractClient,
  contractClientError,
}: {
  contractClient: contract.Client;
  contractClientError: Error | null;
}) => {
  const { address: userPk } = useWallet();

  const contractSpecFuncs = contractClient.spec?.funcs();

  const renderFunctionCard = () =>
    contractSpecFuncs
      ?.filter((func) => !func.name().toString().includes("__"))
      ?.map((func) => {
        const funcName = func.name().toString();

        return (
          <InvokeContractForm
            key={funcName}
            funcName={funcName}
            contractClient={contractClient}
          />
        );
      });

  const renderError = () => (
    <Alert variant="error" placement="inline" title="Error">
      {contractClientError?.message}
    </Alert>
  );

  return (
    <Box gap="md">
      {!userPk ? (
        <Alert variant="warning" placement="inline" title="Connect wallet">
          A connected wallet is required to invoke this contract. Please connect
          your wallet to proceed.
        </Alert>
      ) : null}
      <Card variant="secondary">
        <Box gap="lg" data-testid="invoke-contract-container">
          <Text as="h2" size="md" weight="semi-bold">
            Invoke Contract
          </Text>

          {contractSpecFuncs ? renderFunctionCard() : null}
          {contractClientError ? renderError() : null}
        </Box>
      </Card>
    </Box>
  );
};
````

## File: src/debug/components/ErrorResponse.tsx
````typescript
import {
  AccountRequiresMemoError,
  BadResponseError,
} from "@stellar/stellar-sdk";

import { Box } from "../../components/layout/Box";
import { TxResponse } from "./TxResponse";
import { ValidationResponseCard } from "./ValidationResponseCard";
import { PrettyJson } from "./PrettyJson";

import {
  SubmitHorizonError,
  SubmitRpcError,
  SubmitRpcErrorStatus,
} from "../types/types";
import { Alert } from "@stellar/design-system";

export const HorizonErrorResponse = ({
  error,
}: {
  error: SubmitHorizonError;
}) => {
  let message = "",
    extras = null;
  if (error instanceof AccountRequiresMemoError) {
    message = "This destination requires a memo.";
    extras = (
      <Box gap="xs" data-testid="submit-tx-horizon-error-memo">
        <TxResponse label="Destination account:" value={error.accountId} />
        <TxResponse label="Operation index:" value={error.operationIndex} />
      </Box>
    );
  } else if (
    error?.response &&
    error.response.data?.extras?.result_codes &&
    error.response.data?.extras.result_xdr
  ) {
    const { result_codes, result_xdr } = error.response.data.extras;
    message = error.message;
    extras = (
      <Box gap="xs" data-testid="submit-tx-horizon-error-extras">
        <TxResponse
          label="extras.result_codes:"
          value={JSON.stringify(result_codes)}
        />

        <TxResponse label="Result XDR:" value={result_xdr} />
      </Box>
    );
  } else {
    message =
      error instanceof BadResponseError
        ? "Received a bad response when submitting."
        : "An unknown error occurred.";
    extras = (
      <Box gap="xs" data-testid="submit-tx-horizon-error">
        <TxResponse
          label="original error:"
          value={JSON.stringify(error, null, 2)}
        />
      </Box>
    );
  }

  return (
    <ValidationResponseCard
      variant="error"
      title="Error!"
      summary={
        <Alert variant="error" placement="inline" title="Failed Execution">
          {message}
        </Alert>
      }
      detailedResponse={extras}
    />
  );
};

export const RpcErrorResponse = ({ error }: { error: SubmitRpcError }) => {
  const getSubtitle = (status: SubmitRpcErrorStatus) => {
    switch (status) {
      case "DUPLICATE":
        return "Duplicate transaction";
      case "TIMEOUT":
        return "Transaction timed out";
      case "TRY_AGAIN_LATER":
      case "ERROR":
      case "FAILED":
      default:
        return "Transaction failed";
    }
  };

  const errorFields = () => {
    const { hash, errorResult, diagnosticEvents } = error.result;

    return (
      <>
        {hash ? (
          <Box gap="xs">
            <TxResponse label="Transaction hash:" value={hash} />
          </Box>
        ) : null}
        {errorResult ? (
          <Box gap="xs" data-testid="submit-tx-rpc-error">
            <TxResponse
              label="Error result:"
              item={<PrettyJson json={errorResult} />}
            />
          </Box>
        ) : null}
        {diagnosticEvents ? (
          <Box gap="xs">
            <TxResponse
              label="Diagnostic events:"
              item={<PrettyJson json={diagnosticEvents} />}
            />
          </Box>
        ) : null}
      </>
    );
  };

  return (
    <ValidationResponseCard
      variant="error"
      title="Transaction Submission Error!"
      subtitle={getSubtitle(error.status)}
      detailedResponse={errorFields()}
    />
  );
};
````

## File: src/debug/components/ErrorText.tsx
````typescript
import { Text } from "@stellar/design-system";

export const ErrorText = ({
  errorMessage,
  size,
}: {
  errorMessage: string;
  size: "sm" | "md" | "lg";
}) => {
  return (
    <Text as="div" size={size} addlClassName="FieldNote--error">
      {errorMessage}
    </Text>
  );
};
````

## File: src/debug/components/InvokeContractForm.tsx
````typescript
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Icon,
  Text,
  Textarea,
  Tooltip,
} from "@stellar/design-system";
import { BASE_FEE, contract } from "@stellar/stellar-sdk";
import { JSONSchema7 } from "json-schema";
import { Box } from "../../components/layout/Box";
import { useAccountSequenceNumber } from "../hooks/useAccountSequenceNumber";
import { useRpcPrepareTx } from "../hooks/useRpcPrepareTx";
import { useSimulateTx } from "../hooks/useSimulateTx";
import { useSubmitRpcTx } from "../hooks/useSubmitRpcTx";
import { isEmptyObject } from "../util/isEmptyObject";
import { dereferenceSchema } from "../util/dereferenceSchema";
import { getNetworkHeaders } from "../util/getNetworkHeaders";
import { getTxnToSimulate } from "../util/sorobanUtils";
import {
  AnyObject,
  SorobanInvokeValue,
  TransactionBuildParams,
  DereferencedSchemaType,
} from "../types/types";
import { useWallet } from "../../hooks/useWallet";
import { ErrorText } from "./ErrorText";
import { PrettyJsonTransaction } from "./PrettyJsonTransaction";
import { TransactionSuccessCard } from "./TransactionSuccessCard";
import { RpcErrorResponse } from "./ErrorResponse";
import { network } from "../../contracts/util";
import { JsonSchemaRenderer } from "./JsonSchemaRenderer";
import { ValidationResponseCard } from "./ValidationResponseCard";
import { Api } from "@stellar/stellar-sdk/rpc";

const pageBodyStyles = {
  content: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "1rem", // 16px
    padding: "1rem", // 16px
    backgroundColor: "var(--sds-clr-gray-03)",
    borderRadius: "0.5rem", // 8px
  },
  contentError: {
    border: "1px solid var(--sds-clr-red-06)",
  },
  scrollable: {
    maxWidth: "100%",
    maxHeight: "37.5rem", // 600px
    overflow: "auto" as const,
  },
};

export const InvokeContractForm = ({
  contractClient,
  funcName,
}: {
  contractClient: contract.Client;
  funcName: string;
}) => {
  const { address: userPk, signTransaction } = useWallet();

  const contractSpec = contractClient.spec;
  const contractId = contractClient.options.contractId;

  const [invokeError, setInvokeError] = useState<{
    message: string;
    methodType: string;
  } | null>(null);
  const [isExtensionLoading, setIsExtensionLoading] = useState(false);
  const [formValue, setFormValue] = useState<SorobanInvokeValue>({
    contract_id: contractId,
    function_name: funcName,
    args: {},
  });
  const [formError, setFormError] = useState<AnyObject>({});
  // Based on whether the function requires input arguments
  const [isGetFunction, setIsGetFunction] = useState(false);
  // Based on reads and writes to the contract
  // Can only be determined based on the simulation result
  const [isWriteFn, setIsWriteFn] = useState<boolean | undefined>(undefined);
  const [dereferencedSchema, setDereferencedSchema] =
    useState<DereferencedSchemaType | null>(null);
  // used to delay the simulation until after the sequence number is fetched
  const [isSimulationQueued, setSimulationQueued] = useState(false);
  // Used to delay a submit until after a simulation is complete
  const [isSubmitQueued, setSubmissionQueued] = useState(false);

  const [isReadTooltipVisible, setIsReadTooltipVisible] = useState(false);

  const hasNoFormErrors = isEmptyObject(formError);

  const {
    data: sequenceNumberData,
    isFetching: isFetchingSequenceNumber,
    isLoading: isLoadingSequenceNumber,
    refetch: fetchSequenceNumber,
  } = useAccountSequenceNumber({
    publicKey: userPk || "",
    horizonUrl: network.horizonUrl,
    headers: getNetworkHeaders(network, "horizon"),
    uniqueId: funcName,
    enabled: !!userPk,
  });

  const {
    mutate: simulateTx,
    data: simulateTxData,
    isError: isSimulateTxError,
    isPending: isSimulateTxPending,
    reset: resetSimulateTx,
  } = useSimulateTx();

  const {
    mutate: prepareTx,
    isPending: isPrepareTxPending,
    data: prepareTxData,
    reset: resetPrepareTx,
  } = useRpcPrepareTx();

  const {
    data: submitRpcResponse,
    mutate: submitRpc,
    error: submitRpcError,
    isPending: isSubmitRpcPending,
    isSuccess: isSubmitRpcSuccess,
    reset: resetSubmitRpc,
  } = useSubmitRpcTx();

  const responseSuccessEl = useRef<HTMLDivElement | null>(null);
  const responseErrorEl = useRef<HTMLDivElement | null>(null);

  const signTx = async (xdr: string): Promise<string | null> => {
    if (!signTransaction || !userPk) {
      return null;
    }

    setIsExtensionLoading(true);

    if (userPk) {
      try {
        const result = await signTransaction(xdr || "", {
          address: userPk,
          networkPassphrase: network.passphrase,
        });

        if (result.signedTxXdr && result.signedTxXdr !== "") {
          return result.signedTxXdr;
        }
      } catch (error: unknown) {
        if (error instanceof Error && error.message) {
          setInvokeError({ message: error.message, methodType: "sign" });
        }
      } finally {
        setIsExtensionLoading(false);
      }
    }
    return null;
  };

  useEffect(() => {
    if (contractSpec) {
      const schema = dereferenceSchema(
        contractSpec?.jsonSchema(funcName),
        funcName,
      );

      setDereferencedSchema(schema);
    }
  }, [contractSpec, funcName]);

  const isSuccessfulSimulation =
    simulateTxData &&
    "result" in simulateTxData &&
    !simulateTxData.result.error;

  const isFailedSimulation =
    simulateTxData && "result" in simulateTxData && simulateTxData.result.error;

  useEffect(() => {
    if (isSuccessfulSimulation) {
      const result =
        simulateTxData.result as Api.RawSimulateTransactionResponse;
      const simulationChangesState =
        result.stateChanges && result.stateChanges.length > 0;

      if (isSubmitQueued && !isSimulationQueued && prepareTxData) {
        void triggerSubmit();
      }

      if (simulationChangesState) {
        setIsWriteFn(true);
        return;
      }

      setIsWriteFn(false);
      return;
    }

    if (isFailedSimulation) {
      setSubmissionQueued(false);
      setIsWriteFn(undefined);
    }
  }, [simulateTxData, isSimulationQueued, prepareTxData]);

  useEffect(() => {
    if (isSimulationQueued && !isFetchingSequenceNumber) {
      void triggerSimulate();
    }
  }, [sequenceNumberData, isFetchingSequenceNumber]);

  const handleChange = (value: SorobanInvokeValue) => {
    setInvokeError(null);
    setFormValue(value);
    resetSimulateTx();
    resetPrepareTx();
    resetSubmitRpc();
  };

  const isSimulating =
    isLoadingSequenceNumber ||
    isFetchingSequenceNumber ||
    isSimulateTxPending ||
    isPrepareTxPending;

  const resetSubmitState = () => {
    if (submitRpcError || submitRpcResponse) {
      resetSubmitRpc();
    }
  };

  const resetSimulateState = () => {
    if (isSimulateTxError || (simulateTxData && "result" in simulateTxData)) {
      resetSimulateTx();
    }
  };

  const handleSimulate = async () => {
    setInvokeError(null);
    resetSimulateState();
    resetSubmitState();
    resetPrepareTx();

    setSimulationQueued(true);

    await fetchSequenceNumber();
  };

  const handleSubmit = async () => {
    setSubmissionQueued(true);
    return handleSimulate();
  };

  const triggerSubmit = async () => {
    setSubmissionQueued(false);

    if (!prepareTxData?.transactionXdr) {
      setInvokeError({
        message: "No transaction data available to sign",
        methodType: "submit",
      });
      return;
    }
    resetSimulateState();
    resetSubmitState();

    try {
      const signedTxXdr = await signTx(prepareTxData.transactionXdr);
      if (!signedTxXdr) {
        throw new Error(
          "Transaction signing failed - no signed transaction received",
        );
      }
      submitRpc({
        rpcUrl: network.rpcUrl,
        transactionXdr: signedTxXdr,
        networkPassphrase: network.passphrase,
        headers: getNetworkHeaders(network, "rpc"),
      });
    } catch (error: unknown) {
      setInvokeError({
        message: (error as Error)?.message || "Failed to sign transaction",
        methodType: "submit",
      });
    }
  };

  const triggerSimulate = () => {
    try {
      if (!sequenceNumberData) {
        throw new Error("Failed to fetch sequence number. Please try again.");
      }

      const txnParams: TransactionBuildParams = {
        source_account: userPk || "",
        fee: BASE_FEE,
        seq_num: sequenceNumberData,
        cond: {
          time: {
            min_time: "0",
            max_time: "0",
          },
        },
        memo: {},
      };

      const sorobanOperation = {
        operation_type: "invoke_contract_function",
        params: {
          contract_id: formValue.contract_id,
          function_name: formValue.function_name,
          args: formValue.args,
        },
      };

      const { xdr, error: simulateError } = getTxnToSimulate(
        formValue,
        txnParams,
        sorobanOperation,
        network.passphrase,
      );

      if (xdr) {
        simulateTx({
          rpcUrl: network.rpcUrl,
          transactionXdr: xdr,
          headers: getNetworkHeaders(network, "rpc"),
        });

        // using prepareTransaction instead of assembleTransaction because
        // assembleTransaction requires an auth, but signing for simulation is rare
        prepareTx({
          rpcUrl: network.rpcUrl,
          transactionXdr: xdr,
          networkPassphrase: network.passphrase,
          headers: getNetworkHeaders(network, "rpc"),
        });
      }

      if (simulateError) {
        setInvokeError({ message: simulateError, methodType: "simulate" });
      }
    } catch (error: unknown) {
      setInvokeError({
        message:
          (error as Error)?.message ||
          "Failed to simulate transaction. Please try again.",
        methodType: "simulate",
      });
    }

    setSimulationQueued(false);
  };

  const renderReadWriteBadge = (isWriteFn: boolean | undefined) => {
    if (isWriteFn === undefined) return null;

    const badge = (
      <Badge
        icon={isWriteFn ? <Icon.Pencil01 /> : <Icon.Eye />}
        variant={isWriteFn ? "secondary" : "success"}
        iconPosition="left"
      >
        {isWriteFn ? "Write" : "Read"}
      </Badge>
    );

    return !isWriteFn ? (
      <div
        onMouseEnter={() => setIsReadTooltipVisible(true)}
        onMouseLeave={() => setIsReadTooltipVisible(false)}
        style={{ cursor: "pointer" }}
      >
        <Tooltip
          isVisible={isReadTooltipVisible}
          isContrast
          title="Read Only"
          placement="right-end"
          triggerEl={badge}
        >
          {`When a transaction doesn't change the state of the contract, it is
               considered a read operation. \nIn this scenario, it is not
               necessary to submit the transaction to the network, as it does not
               modify any data. \nYou can simply simulate the transaction to see
               the results without incurring any costs.`}
        </Tooltip>
      </div>
    ) : (
      badge
    );
  };

  const renderTitle = (name: string) => (
    <>
      <Box gap="sm" direction="row">
        <Text size="sm" as="div" weight="bold">
          {name}
        </Text>
        {renderReadWriteBadge(isWriteFn)}
      </Box>
    </>
  );

  const renderRustDoc = (description?: string) => {
    if (!description) return null;

    return (
      <Textarea
        id={`invoke-contract-description-${funcName}`}
        label="Rustdoc"
        infoText="This description is auto-generated from the contract's Rust documentation. It can be edited in the contract's source code."
        infoTextIcon={<Icon.InfoCircle />}
        fieldSize="sm"
        wrap="on"
        rows={description.length > 100 ? 4 : 1}
        value={description}
        spellCheck="false"
        readOnly
      >
        {description}
      </Textarea>
    );
  };

  const isEmptySchema =
    Object.entries(dereferencedSchema?.properties || {}).length === 0;

  useEffect(() => {
    if (dereferencedSchema && !dereferencedSchema?.required.length) {
      setIsGetFunction(true);
    } else {
      setIsGetFunction(false);
    }
  }, [dereferencedSchema]);

  const renderSchema = () => {
    if (!contractSpec || !contractSpec.jsonSchema) {
      return null;
    }

    return (
      <Box gap="md">
        <Box gap="sm" direction="row" justify="space-between" align="center">
          {renderTitle(funcName)}
          {isEmptySchema && renderButtons()}
        </Box>
        {renderRustDoc(dereferencedSchema?.description)}
        {formValue.contract_id &&
          formValue.function_name &&
          dereferencedSchema &&
          !isEmptySchema && (
            <JsonSchemaRenderer
              name={funcName}
              schema={dereferencedSchema as JSONSchema7}
              onChange={handleChange}
              formError={formError}
              setFormError={setFormError}
              parsedSorobanOperation={formValue}
              isWriteFn={isWriteFn}
            />
          )}
      </Box>
    );
  };

  const renderResponse = () => {
    const { result: simulateResult } = simulateTxData || {};
    const { result: submitResult } = submitRpcResponse || {};

    const result = simulateResult || submitResult;

    const simulationSummary = isSuccessfulSimulation ? (
      <Alert variant="success" placement="inline" title="Successful Simulation">
        {`The Simulation succeeded with
        ${
          (
            simulateResult as Api.RawSimulateTransactionResponse
          ).results?.filter(
            (r) => "returnValueJson" in r && r.returnValueJson !== "void",
          ).length || 0
        }
        returned value(s).`}
      </Alert>
    ) : isFailedSimulation ? (
      <Alert variant="error" placement="inline" title="Simulation Failed">
        {simulateResult?.error}`
      </Alert>
    ) : null;

    if (result && !isSuccessfulTxExection) {
      return (
        <ValidationResponseCard
          variant="primary"
          title="Response"
          note={<></>}
          summary={simulationSummary}
          detailedResponse={
            <Box gap="md">
              <div
                data-testid="invoke-contract-simulate-tx-response"
                style={{
                  ...pageBodyStyles.content,
                  ...pageBodyStyles.scrollable,
                  ...(result && "error" in result
                    ? pageBodyStyles.contentError
                    : {}),
                }}
              >
                <PrettyJsonTransaction
                  json={result}
                  xdr={result && "xdr" in result}
                />
              </div>
            </Box>
          }
        />
      );
    }

    return null;
  };

  const isSuccessfulTxExection =
    isSubmitRpcSuccess && submitRpcResponse && network.id;

  const renderSuccess = () => {
    if (isSuccessfulTxExection) {
      return (
        <div ref={responseSuccessEl}>
          <TransactionSuccessCard response={submitRpcResponse} />
        </div>
      );
    }

    return null;
  };

  const renderError = () => {
    if (submitRpcError) {
      return (
        <div ref={responseErrorEl}>
          <RpcErrorResponse error={submitRpcError} />
        </div>
      );
    }

    if (invokeError?.message) {
      return (
        <div ref={responseErrorEl}>
          <ErrorText
            errorMessage={`${invokeError.methodType}: ${invokeError.message}`}
            size="sm"
          />
        </div>
      );
    }

    return null;
  };

  const renderButtons = () => (
    <Box gap="sm" direction="row" align="end" justify="end" wrap="wrap">
      <Button
        size="md"
        variant="tertiary"
        disabled={isSimulationDisabled()}
        isLoading={isSimulating}
        onClick={() => void handleSimulate()}
      >
        Simulate
      </Button>

      <Button
        size="md"
        variant="secondary"
        isLoading={isExtensionLoading || isSubmitRpcPending}
        disabled={isSubmitDisabled}
        onClick={() => void handleSubmit()}
      >
        Submit
      </Button>
    </Box>
  );

  const isSimulationDisabled = () => {
    const disabled = !isGetFunction && !Object.keys(formValue.args).length;
    return !userPk || !hasNoFormErrors || disabled;
  };

  const isSubmitDisabled =
    !!invokeError?.message ||
    isSimulating ||
    !userPk ||
    !hasNoFormErrors ||
    isSimulationDisabled();
  return (
    <Card>
      <div className="ContractInvoke">
        <Box gap="md" direction={isEmptyObject({ a: true }) ? "row" : "column"}>
          {renderSchema()}
          {!isEmptySchema && renderButtons()}
          <>{renderResponse()}</>
          <>{renderSuccess()}</>
          <>{renderError()}</>
        </Box>
      </div>
    </Card>
  );
};
````

## File: src/debug/components/JsonSchemaRenderer.tsx
````typescript
/* eslint-disable react-x/no-array-index-key */
import React from "react";
import { Card, Text } from "@stellar/design-system";
import type { JSONSchema7 } from "json-schema";

import { jsonSchema } from "../util/jsonSchema";

import { Box } from "../../components/layout/Box";
import { LabelHeading } from "./LabelHeading";

import { AnyObject, JsonSchemaFormProps } from "../types/types";

import { renderPrimitivesType } from "./RenderPrimitivesType";
import { renderArrayType } from "./RenderArrayType";
import { renderOneOf } from "./RenderOneOf";

export const JsonSchemaRenderer = ({
  name,
  schema,
  path = [],
  onChange,
  parsedSorobanOperation,
  formError,
  setFormError,
}: JsonSchemaFormProps) => {
  const schemaType = jsonSchema.getSchemaType(schema as AnyObject);

  // function schema always starts with an object type
  if (!schemaType) {
    return null;
  }

  if (schemaType === "object") {
    return (
      <Box gap="md" key={`${name}-${path.join(".")}`}>
        {Object.entries(schema.properties || {}).map(
          ([key, propertySchema], index) => {
            const propertySchemaType = jsonSchema.getSchemaType(
              propertySchema as AnyObject,
            );
            const propertySchemaObject = jsonSchema.isSchemaObject(
              propertySchema as AnyObject,
            )
              ? propertySchema
              : undefined;

            if (propertySchemaType === "object" && propertySchemaObject) {
              return (
                <React.Fragment key={`${key}-${index}`}>
                  <LabelHeading size="md" infoText={schema.description}>
                    {key}
                  </LabelHeading>

                  {(propertySchemaObject as AnyObject)?.description ? (
                    <Text as="div" size="xs">
                      {
                        (propertySchemaObject as AnyObject)
                          .description as string
                      }
                    </Text>
                  ) : null}

                  <Box gap="md">
                    <Card>
                      <JsonSchemaRenderer
                        name={path.length > 0 ? path.join(".") : key}
                        path={[...path, key]}
                        schema={propertySchema as JSONSchema7}
                        onChange={onChange}
                        parsedSorobanOperation={parsedSorobanOperation}
                        formError={formError}
                        setFormError={setFormError}
                      />
                    </Card>
                  </Box>
                </React.Fragment>
              );
            }

            return (
              <JsonSchemaRenderer
                key={`${key}-${index}`}
                name={key}
                schema={propertySchema as JSONSchema7}
                path={[...path, key]}
                onChange={onChange}
                parsedSorobanOperation={parsedSorobanOperation}
                formError={formError}
                setFormError={setFormError}
              />
            );
          },
        )}
      </Box>
    );
  }

  if (schemaType === "array") {
    return renderArrayType({
      schema,
      path,
      parsedSorobanOperation,
      onChange,
      renderer: JsonSchemaRenderer,
      formError,
      setFormError,
    });
  }

  if (schemaType === "oneOf") {
    return renderOneOf({
      name,
      schema,
      path,
      parsedSorobanOperation,
      onChange,
      renderer: JsonSchemaRenderer,
      formError,
      setFormError,
    });
  }

  // Recursion Base Case
  return renderPrimitivesType({
    name,
    path,
    schema,
    parsedSorobanOperation,
    onChange,
    formError,
    setFormError,
  });
};
````

## File: src/debug/components/LabelHeading.tsx
````typescript
import { Icon, Tooltip } from "@stellar/design-system";

export const LabelHeading = ({
  children,
  size,
  labelSuffix,
  infoText,
  infoLink,
}: {
  children: React.ReactNode;
  size: "sm" | "md" | "lg";
  labelSuffix?: string | React.ReactNode;
  infoText?: string | React.ReactNode;
  infoLink?: string;
}) => (
  <div className="Label__wrapper">
    <div className={`Label Label--${size}`}>
      {children}
      {labelSuffix ? (
        <span className="Label__suffix">({labelSuffix})</span>
      ) : null}
    </div>

    {infoLink ? (
      <a
        href={infoLink}
        className="Label__infoButton"
        rel="noreferrer noopener"
        target="_blank"
      >
        <Icon.InfoCircle />
      </a>
    ) : null}

    {infoText ? (
      <Tooltip
        triggerEl={
          <div className="Label__infoButton" role="button">
            <Icon.InfoCircle />
          </div>
        }
      >
        {infoText}
      </Tooltip>
    ) : null}
  </div>
);
````

## File: src/debug/components/MetadataCard.tsx
````typescript
const MetadataCard = ({
  title,
  content,
}: {
  title?: string;
  content: string;
}) => {
  return (
    <div
      style={{
        backgroundColor: "#F3F3F3",
        padding: "0.8rem",
        borderRadius: "8px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "fit-content",
        border: "1px solid #E2E2E2",
      }}
    >
      <div
        style={{
          fontSize: "0.85rem",
          color: "#333",
          marginBottom: "0.15rem",
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: "1rem",
          fontWeight: "bold",
          color: "#000",
        }}
      >
        {content}
      </div>
    </div>
  );
};

export default MetadataCard;
````

## File: src/debug/components/PositiveIntPicker.tsx
````typescript
import React from "react";
import { Icon, Input, InputProps } from "@stellar/design-system";

interface PositiveIntPickerProps extends Omit<InputProps, "fieldSize"> {
  id: string;
  fieldSize?: "sm" | "md" | "lg";
  labelSuffix?: string | React.ReactNode;
  label: string | React.ReactNode;
  value: string;
  placeholder?: string;
  error: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  disabled?: boolean;
}

export const PositiveIntPicker = ({
  id,
  fieldSize = "md",
  labelSuffix,
  label,
  value,
  error,
  onChange,
  readOnly,
  disabled,
  ...props
}: PositiveIntPickerProps) => {
  return (
    <Input
      id={id}
      fieldSize={fieldSize}
      label={label}
      labelSuffix={labelSuffix}
      value={value}
      error={error}
      onChange={onChange}
      readOnly={readOnly}
      disabled={disabled}
      infoLinkIcon={<Icon.InfoCircle />}
      {...props}
    />
  );
};
````

## File: src/debug/components/PrettyJson.tsx
````typescript
/* eslint-disable react-x/no-nested-component-definitions */
import React, { useState } from "react";
import { Icon, Link, Loader } from "@stellar/design-system";

import { isEmptyObject } from "../util/isEmptyObject";

import { AnyObject } from "../types/types";

export type CustomKeyValueLinkMap = {
  [key: string]: {
    text?: string;
    getHref: (value: string, key?: string) => string;
    condition?: (
      val: string,
      parentKey?: string,
      isRpcResponse?: boolean,
    ) => boolean;
  };
};

type PrettyJsonProps = {
  json: unknown;
  customKeyValueLinkMap?: CustomKeyValueLinkMap;
  customValueRenderer?: (
    item: unknown,
    key: string,
    parentKey?: string,
  ) => React.ReactNode | null;
  customKeyRenderer?: (item: unknown, key: string) => React.ReactNode | null;
  isLoading?: boolean;
  isCollapsible?: boolean;
};

type Char = "{" | "}" | "[" | "]";

// CSS-in-JS styles
const styles = {
  prettyJson: {
    fontFamily: "var(--sds-ff-monospace)",
    fontSize: "14px",
    lineHeight: "20px",
    fontWeight: "var(--sds-fw-medium)",
    letterSpacing: "-0.5px",
  } as React.CSSProperties,
  loaderContainer: {
    display: "flex",
    justifyContent: "center",
  } as React.CSSProperties,
  nested: {
    paddingLeft: "16px",
  } as React.CSSProperties,
  inline: {
    display: "flex",
    gap: "4px",
    position: "relative",
  } as React.CSSProperties,
  clickable: {
    cursor: "pointer",
  } as React.CSSProperties,
  valueString: {
    color: "var(--sds-clr-navy-11)",
  } as React.CSSProperties,
  valueNumber: {
    color: "var(--sds-clr-lime-11)",
  } as React.CSSProperties,
  valueBoolean: {
    color: "var(--sds-clr-pink-11)",
  } as React.CSSProperties,
  defaultColor: {
    color: "var(--sds-clr-gray-12)",
  } as React.CSSProperties,
  key: {
    whiteSpace: "nowrap",
    color: "var(--sds-clr-gray-12)",
  } as React.CSSProperties,
  expandIcon: {
    width: "20px",
    height: "20px",
    position: "absolute",
    top: "50%",
    left: "-20px",
    transform: "translate(0, -40%)",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  } as React.CSSProperties,
  expandIconSvg: {
    display: "block",
    width: "16px",
    height: "16px",
    stroke: "var(--sds-clr-gray-10)",
  } as React.CSSProperties,
  expandSize: {
    color: "var(--sds-clr-gray-09)",
    fontSize: "12px",
    marginLeft: "4px",
  } as React.CSSProperties,
  successColor: {
    color: "var(--sds-clr-green-11)",
  } as React.CSSProperties,
  errorColor: {
    color: "var(--sds-clr-red-11)",
  } as React.CSSProperties,
};

const isValidUrl = (url: string) => {
  if (!url.startsWith("http")) {
    return false;
  }

  try {
    new URL(url);
    return true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return false;
  }
};

export const PrettyJson = ({
  json,
  customKeyValueLinkMap,
  customValueRenderer,
  customKeyRenderer,
  isLoading,
  isCollapsible = true,
}: PrettyJsonProps) => {
  if (typeof json !== "object") {
    return null;
  }

  const isRpcResponse = Object.keys(json as AnyObject)[0] === "jsonrpc";

  const ItemCount = ({ itemList }: { itemList: unknown[] }) => (
    <div style={styles.expandSize}>{getItemSizeLabel(itemList)}</div>
  );

  const Collapsible = ({
    itemKey,
    itemList,
    char,
    children,
  }: {
    itemKey?: string;
    itemList: unknown[];
    char: Char;
    children: React.ReactNode;
  }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const customRender =
      itemKey && customKeyRenderer
        ? customKeyRenderer(children, itemKey)
        : null;

    return (
      <div style={styles.nested}>
        <div
          style={{
            ...styles.inline,
            ...(isCollapsible ? styles.clickable : {}),
          }}
          {...(isCollapsible
            ? {
                onClick: () => setIsExpanded(!isExpanded),
              }
            : {})}
        >
          {isCollapsible ? (
            <div style={styles.expandIcon}>
              <div style={styles.expandIconSvg}>
                {isExpanded ? <Icon.MinusSquare /> : <Icon.PlusSquare />}
              </div>
            </div>
          ) : null}
          {itemKey ? <Key>{itemKey}</Key> : null}
          <Bracket char={char} isCollapsed={!isExpanded} />
          {isCollapsible ? <ItemCount itemList={itemList} /> : null}
          {customRender}
        </div>
        {isExpanded ? (
          <div>
            {children}
            <div>
              <Bracket char={getClosingChar(char)} />
              <Comma />
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  const getItemSizeLabel = (items: unknown[]) => {
    const size = items.length;
    return size === 1 ? `${size} item` : `${size} items`;
  };

  const render = (item: unknown, parentKey?: string): React.ReactElement => {
    const renderValue = (item: unknown, key: string, parentKey?: string) => {
      const custom = customKeyValueLinkMap?.[key];

      if (custom) {
        if (
          custom.condition &&
          typeof item === "string" &&
          !custom.condition(item, parentKey, isRpcResponse)
        ) {
          return render(item, key);
        }

        if (typeof item === "string") {
          const href = custom.getHref(item, key);

          return (
            <Link
              href={href || item}
              {...(href ? { target: "_blank" } : {})}
              isUnderline
            >
              {custom.text || item}
            </Link>
          );
        }
      }

      const customValue = customValueRenderer
        ? customValueRenderer(item, key, parentKey)
        : null;

      return customValue ?? render(item, key);
    };

    switch (typeof item) {
      case "object":
        return (
          <React.Fragment key={parentKey}>
            {Object.entries(item as object).map(([key, value]) => {
              const keyProp = parentKey ? `${parentKey}-${key}` : key;

              if (typeof value === "object") {
                if (value === null) {
                  return (
                    <div key={keyProp} style={styles.inline}>
                      <div style={styles.nested}>
                        <Key>{key}</Key>
                      </div>
                      <Value>
                        null
                        <Comma />
                      </Value>
                    </div>
                  );
                }

                if (Array.isArray(value)) {
                  if (value.length === 0) {
                    return (
                      <div key={keyProp} style={styles.inline}>
                        <div style={styles.nested}>
                          <Key>{key}</Key>
                        </div>
                        <Value>
                          {`[]`}
                          <Comma />
                        </Value>
                      </div>
                    );
                  }

                  return (
                    <Collapsible
                      key={keyProp}
                      itemKey={key}
                      itemList={value}
                      char="["
                    >
                      {value.map((v, index) => {
                        if (typeof v === "object") {
                          if (v === null) {
                            return (
                              <div
                                // eslint-disable-next-line react-x/no-array-index-key -- No stable ID available for JSON values
                                key={`${keyProp}-${index}`}
                                style={styles.nested}
                              >
                                <Value>
                                  null
                                  <Comma />
                                </Value>
                              </div>
                            );
                          }

                          if (Array.isArray(v)) {
                            return (
                              <Collapsible
                                // eslint-disable-next-line react-x/no-array-index-key -- No stable ID available for JSON values
                                key={`${keyProp}-${index}`}
                                itemList={Object.keys(v)}
                                char="["
                              >
                                {v.map((v2) => {
                                  return render(v2);
                                })}
                              </Collapsible>
                            );
                          }
                          return (
                            <Collapsible
                              // eslint-disable-next-line react-x/no-array-index-key -- No stable ID available for JSON values
                              key={`${keyProp}-${index}`}
                              itemList={Object.keys(v as AnyObject)}
                              char="{"
                            >
                              {render(v, key)}
                            </Collapsible>
                          );
                        }

                        return render(v, key);
                      })}
                    </Collapsible>
                  );
                }

                if (value && isEmptyObject(value as AnyObject)) {
                  return (
                    <div key={keyProp} style={styles.inline}>
                      <div style={styles.nested}>
                        <Key>{key}</Key>
                      </div>
                      <Value>
                        {`{}`}
                        <Comma />
                      </Value>
                    </div>
                  );
                }

                return (
                  <Collapsible
                    key={keyProp}
                    itemKey={key}
                    itemList={Object.keys(value as AnyObject)}
                    char="{"
                  >
                    {render(value, key)}
                  </Collapsible>
                );
              }

              return (
                <div key={keyProp} style={styles.inline}>
                  <div style={styles.nested}>
                    <Key>{key}</Key>
                  </div>
                  {renderValue(value, key, parentKey)}
                </div>
              );
            })}
          </React.Fragment>
        );
      case "string":
        return renderStringValue({
          item,
          parentKey,
          customValueRenderer,
        });
      case "function":
        return (
          <Value>
            {`${JSON.stringify(item)}`}
            <Comma />
          </Value>
        );
      default:
        return (
          <Value>
            <ValueType type={typeof item}>{`${item as string}`}</ValueType>
            <Comma />
          </Value>
        );
    }
  };

  if (isLoading) {
    return (
      <div style={styles.loaderContainer}>
        <Loader />
      </div>
    );
  }

  return (
    <div style={styles.prettyJson}>
      <Bracket char="{" />
      {render(json)}
      <Bracket char="}" />
    </div>
  );
};

// =============================================================================
// Components
// =============================================================================
const Key = ({ children }: { children: string }) => (
  <div style={styles.key}>
    {`"${children}"`}
    <Colon />
  </div>
);

const Value = ({
  children,
  customStyle,
}: {
  children: React.ReactNode;
  customStyle?: React.CSSProperties;
}) => <div style={{ ...styles.defaultColor, ...customStyle }}>{children}</div>;

const ValueType = ({
  children,
  type,
}: {
  children: React.ReactNode;
  type: string;
}) => {
  const getTypeStyle = () => {
    switch (type) {
      case "string":
        return styles.valueString;
      case "number":
      case "bigint":
        return styles.valueNumber;
      case "boolean":
        return styles.valueBoolean;
      default:
        return styles.defaultColor;
    }
  };

  return <span style={getTypeStyle()}>{children}</span>;
};

const Quotes = ({ isVisible = true }: { isVisible?: boolean }) =>
  isVisible ? <span style={styles.defaultColor}>{'"'}</span> : null;

const Colon = () => <span style={styles.defaultColor}>{":"}</span>;

const Comma = () => <span style={styles.defaultColor}>{","}</span>;

const Bracket = ({
  char,
  children,
  isCollapsed,
}: {
  char: Char;
  children?: React.ReactNode;
  isCollapsed?: boolean;
}) => (
  <span style={styles.defaultColor}>
    {char}
    {children}
    {isCollapsed ? `...${getClosingChar(char)}` : null}
  </span>
);

// =============================================================================
// Helpers
// =============================================================================
const getClosingChar = (char: Char) => (char === "[" ? "]" : "}");

const renderStringValue = ({
  item,
  customStyle,
  itemType,
  parentKey,
  customValueRenderer,
}: {
  item: string;
  customStyle?: React.CSSProperties;
  itemType?: "number" | "string";
  parentKey?: string;
  customValueRenderer?: (
    item: unknown,
    key: string,
    parentKey?: string,
  ) => React.ReactNode | null;
}) => {
  const customValue =
    customValueRenderer && customValueRenderer(item, "", parentKey);

  if (customValue) {
    return (
      <Value customStyle={customStyle}>
        <>{customValue}</>
        <Comma />
      </Value>
    );
  }

  let type = ["number", "bigint"].includes(typeof item) ? "number" : "string";
  let value = item;

  if (typeof item === "bigint") {
    value = BigInt(item).toString();
  }

  if (itemType) {
    type = itemType;
  }

  const valueStyle = {
    ...customStyle,
  };

  return (
    <Value customStyle={valueStyle}>
      {typeof item === "string" && isValidUrl(item) ? (
        <>
          <Quotes />
          <Link href={item} isUnderline>
            {item}
          </Link>
          <Quotes />
        </>
      ) : (
        <>
          <Quotes isVisible={type === "string"} />
          <ValueType type={type}>{value}</ValueType>
          <Quotes isVisible={type === "string"} />
        </>
      )}
      <Comma />
    </Value>
  );
};

PrettyJson.renderStringValue = renderStringValue;
````

## File: src/debug/components/PrettyJsonTextarea.tsx
````typescript
import { PrettyJson } from "./PrettyJson";
import { Box } from "../../components/layout/Box";
import { LabelHeading } from "./LabelHeading";
import { AnyObject } from "../types/types";

const styles = {
  jsonContainer: {
    border: "1px solid var(--sds-input-color-border-disabled)",
    borderRadius: "0.375rem", // 6px
    maxHeight: "13.75rem", // 220px
    overflow: "auto" as const,
    padding: "0.5rem 0.75rem", // 8px 12px
  } as React.CSSProperties,
};

export const PrettyJsonTextarea = ({
  json,
  label,
}: {
  json: AnyObject;
  label: string;
  isCodeWrapped?: boolean;
}) => {
  return (
    <Box gap="sm">
      <LabelHeading size="md">{label}</LabelHeading>
      <div style={styles.jsonContainer}>
        <PrettyJson json={json} isCollapsible={false} />
      </div>
    </Box>
  );
};
````

## File: src/debug/components/PrettyJsonTransaction.tsx
````typescript
import { useEffect } from "react";
import { toSafeNumberOrThrow } from "lossless-json";

import { PrettyJson } from "./PrettyJson";
import { signatureHint } from "../util/signatureHint";
import { xdrUtils } from "../util/xdrUtils";
import { formatAmount } from "../util/formatAmount";
import { getNetworkHeaders } from "../util/getNetworkHeaders";

import { useCheckTxSignatures } from "../hooks/useCheckTxSignatures";

import { AnyObject } from "../types/types";
import { network } from "../../contracts/util";

type PrettyJsonTransactionProps = {
  xdr: string;
  json: AnyObject;
};

export const PrettyJsonTransaction = ({
  xdr,
  json,
}: PrettyJsonTransactionProps) => {
  const { data, isFetching, isLoading, refetch } = useCheckTxSignatures({
    xdr,
    networkPassphrase: network.passphrase,
    networkUrl: network.horizonUrl,
    headers: getNetworkHeaders(network, "horizon"),
  });

  const isTx = Boolean(json?.tx || json?.tx_fee_bump);

  useEffect(() => {
    // Check transaction signatures
    if (isTx) {
      void refetch();
    }
  }, [isTx, refetch]);

  const customValueRenderer = (
    item: unknown,
    key: string,
    parentKey?: string,
  ): React.ReactNode => {
    // Signature hint
    if (parentKey === "signatures" && key === "hint") {
      return PrettyJson.renderStringValue({
        item: signatureHint(item as string),
      });
    }

    // Signature check
    if (data && parentKey === "signatures" && key === "signature") {
      const match =
        typeof item === "string"
          ? data.find((s) => s.sig.equals(Buffer.from(item, "hex")))
          : undefined;

      if (match) {
        return PrettyJson.renderStringValue({
          item: item as string,
        });
      }

      return item as string;
    }

    // Amount
    const amountKeys = [
      "amount",
      "buy_amount",
      "starting_balance",
      "send_max",
      "send_amount",
      "dest_min",
      "dest_amount",
      "limit",
    ];

    if (amountKeys.includes(key)) {
      const parsedAmount = xdrUtils.fromAmount(item as string);
      let formattedAmount = "";

      try {
        formattedAmount = formatAmount(toSafeNumberOrThrow(parsedAmount));
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        // It might fail for BigInt
        formattedAmount = formatAmount(Number(parsedAmount));
      }

      if (formattedAmount) {
        return PrettyJson.renderStringValue({
          item: `${formattedAmount} (raw: ${item as string})`,
          itemType: "number",
        });
      }

      return PrettyJson.renderStringValue({ item: item as string });
    }

    // Manage data
    if (parentKey === "manage_data") {
      if (key === "data_name") {
        return PrettyJson.renderStringValue({
          item: `${item as string} (hex: ${Buffer.from(item as string).toString("base64")})`,
        });
      }

      if (key === "data_value") {
        return PrettyJson.renderStringValue({
          item: `${Buffer.from(item as string, "hex").toString()} (hex: ${Buffer.from(item as string, "hex").toString("base64")})`,
        });
      }
    }

    return null;
  };

  const customKeyRenderer = (item: unknown, key: string) => {
    if (key === "signatures" && Array.isArray(item) && item.length > 0) {
      return <div className="PrettyJson__key__note">· Signatures Checked</div>;
    }

    return null;
  };

  return (
    <PrettyJson
      json={json}
      customValueRenderer={customValueRenderer}
      customKeyRenderer={customKeyRenderer}
      isLoading={isLoading || isFetching}
    />
  );
};
````

## File: src/debug/components/RenderArrayType.tsx
````typescript
/* eslint-disable react-x/no-array-index-key */
import type { JSONSchema7 } from "json-schema";
import { Button, Card, Icon, Text } from "@stellar/design-system";
import { get } from "lodash";

import { jsonSchema } from "../util/jsonSchema";

import { Box } from "../../components/layout/Box";
import { LabelHeading } from "./LabelHeading";

import type {
  AnyObject,
  JsonSchemaFormProps,
  SorobanInvokeValue,
} from "../types/types";
import { arrayItem } from "../util/arrayItem";

export const renderArrayType = ({
  schema,
  path,
  parsedSorobanOperation,
  renderer,
  onChange,
  formError,
  setFormError,
}: {
  schema: JSONSchema7;
  path: string[];
  parsedSorobanOperation: SorobanInvokeValue;
  renderer: (props: JsonSchemaFormProps) => React.ReactNode;
  onChange: (value: SorobanInvokeValue) => void;
  formError: AnyObject;
  setFormError: (error: AnyObject) => void;
}) => {
  const name = path.join(".");
  const invokeContractBaseProps = {
    contract_id: parsedSorobanOperation.contract_id,
    function_name: parsedSorobanOperation.function_name,
  };

  const schemaItems = jsonSchema.getSchemaItems(schema);

  const nestedArgsItems = get(parsedSorobanOperation.args, name);

  const disableAddButton =
    jsonSchema.isTuple(schema as AnyObject) ||
    (Array.isArray(nestedArgsItems) &&
      typeof schemaItems === "object" &&
      schemaItems &&
      "maxItems" in schemaItems &&
      schemaItems.maxItems === nestedArgsItems.length);

  if (jsonSchema.isTuple(schema as AnyObject) && Array.isArray(schemaItems)) {
    return schemaItems.map((item: JSONSchema7, index: number) => {
      // will render primitive/array/all the types
      const nestedPath = [name, index].join(".");

      return renderer({
        name: nestedPath,
        schema: item,
        path: [nestedPath],
        parsedSorobanOperation,
        onChange,
        formError,
        setFormError,
      } as JsonSchemaFormProps);
    });
  }

  return (
    <Box gap="md" key={`${name}`}>
      <LabelHeading size="md" infoText={schema.description}>
        {name}
      </LabelHeading>

      {schema.description ? (
        <Text as="div" size="xs">
          {schema.description}
        </Text>
      ) : null}

      {Array.isArray(nestedArgsItems) &&
        nestedArgsItems.length > 0 &&
        nestedArgsItems.map((args: unknown, index: number) => {
          const nestedPathTitle = [name, index].join(".");
          const argHeader = [name, index].join("[").concat("]");

          return (
            <Box gap="md" key={`${name}-${index}`}>
              <Card>
                <Box gap="md" key={`${name}-${index}`}>
                  {/* Map Type (scSpecTypeMap) */}
                  {jsonSchema.isSchemaObject(schema.items as AnyObject) &&
                  (schema.items as AnyObject).type === "object" ? (
                    <>
                      <LabelHeading size="lg">{argHeader}</LabelHeading>

                      {Object.keys(args as object).map((arg) => {
                        // will return the nested path for the item
                        // ex. requests.0.address
                        const nestedPath = [nestedPathTitle, arg].join(".");

                        return renderer({
                          name: nestedPath,
                          schema: (schemaItems as AnyObject)?.[
                            arg
                          ] as JSONSchema7,
                          path: [nestedPath],
                          parsedSorobanOperation,
                          onChange,
                          formError,
                          setFormError,
                        });
                      })}
                    </>
                  ) : (
                    <Box gap="md">
                      {/* Vec Type (scSpecTypeVec) */}
                      {renderer({
                        name: nestedPathTitle,
                        schema: schemaItems as JSONSchema7,
                        path: [nestedPathTitle],
                        parsedSorobanOperation,
                        onChange,
                        formError,
                        setFormError,
                      })}
                    </Box>
                  )}

                  {/* delete button */}
                  <Box gap="sm" direction="row" align="center">
                    <Button
                      size="md"
                      variant="tertiary"
                      icon={<Icon.Trash01 />}
                      type="button"
                      onClick={() => {
                        const updatedList = arrayItem.delete(
                          get(
                            parsedSorobanOperation.args,
                            path.join("."),
                          ) as AnyObject[],
                          index,
                        );

                        const updatedArgs = jsonSchema.setDeepValue(
                          parsedSorobanOperation.args,
                          path.join("."),
                          updatedList as unknown as AnyObject,
                        );

                        onChange({
                          ...invokeContractBaseProps,
                          args: updatedArgs,
                        });
                      }}
                    ></Button>
                  </Box>
                </Box>
              </Card>
            </Box>
          );
        })}

      {!disableAddButton ? (
        <Box gap="md" direction="row" align="center">
          <Button
            variant="secondary"
            size="md"
            onClick={() => {
              const template = getTemplate({ schema });

              const args =
                (get(
                  parsedSorobanOperation.args,
                  path.join("."),
                ) as AnyObject[]) || [];
              args.push(template);

              const updatedList = jsonSchema.setDeepValue(
                parsedSorobanOperation.args,
                path.join("."),
                args as unknown as AnyObject,
              );

              onChange({
                ...invokeContractBaseProps,
                args: {
                  ...updatedList,
                },
              });
            }}
            type="button"
          >
            Add {name}
          </Button>
        </Box>
      ) : null}
    </Box>
  );
};

const getTemplate = ({ schema }: { schema: JSONSchema7 }) => {
  let template: AnyObject = {};

  const schemaItems = jsonSchema.getSchemaItems(schema);

  if (
    jsonSchema.isSchemaObject(schema.items as AnyObject) &&
    (schema.items as AnyObject).type === "object"
  ) {
    template = Object.keys((schemaItems as object) || {}).reduce(
      (acc: Record<string, string | AnyObject>, key) => {
        // Good example:
        // CDVQVKOY2YSXS2IC7KN6MNASSHPAO7UN2UR2ON4OI2SKMFJNVAMDX6DP
        // submit function with object args
        if (key === "additionalProperties") {
          return acc;
        }

        acc[key] = {};
        return acc;
      },
      {},
    );
  }

  return template;
};
````

## File: src/debug/components/RenderContractMetadata.tsx
````typescript
import React from "react";
import { Box } from "../../components/layout/Box";
import { ContractMetadata } from "../util/loadContractMetada";
import {
  Badge,
  Card,
  Input,
  Label,
  Link,
  Table,
  Text,
} from "@stellar/design-system";

interface RenderContractMetadataProps {
  metadata?: ContractMetadata;
}

const metaDocsLink =
  "https://developers.stellar.org/docs/learn/fundamentals/contract-development/overview#contract-meta";

enum ContractMetadataType {
  SCEnvMetaEntry = "SCEnvMetaEntry",
  SCMetaEntry = "SCMetaEntry",
}

interface TableItem {
  metaType: ContractMetadataType;
  val: string;
  key: string;
  id: string;
}
const RenderContractMetadata: React.FC<RenderContractMetadataProps> = ({
  metadata,
}) => {
  if (!metadata) return null;

  const formatTableItems = (
    data: unknown,
    metaType: ContractMetadataType,
  ): TableItem[] => {
    if (typeof data !== "object" || data === null) {
      return [];
    }
    return Object.entries(data).map(([key, value]) => ({
      key: String(key),
      val: value as string,
      id: String(key),
      metaType: metaType,
    }));
  };

  const getTableData = (): TableItem[] => {
    const tableEntries: TableItem[] = [
      ...formatTableItems(
        metadata.contractmetav0,
        ContractMetadataType.SCMetaEntry,
      ),
      ...formatTableItems(
        metadata.contractenvmetav0,
        ContractMetadataType.SCEnvMetaEntry,
      ),
    ];
    return tableEntries;
  };

  const renderTextCell = (item: string) => (
    <td
      style={{
        paddingLeft: "1rem",
        paddingRight: "1rem",
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
      }}
    >
      <Text as="p" size="xs">
        {item}
      </Text>
    </td>
  );

  const renderBadgeCell = (item: string) => (
    <td
      style={{
        paddingLeft: "1rem",
        paddingRight: "1rem",
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
      }}
    >
      <Badge size="sm" variant="secondary">
        {item}
      </Badge>
    </td>
  );

  const renderRow = (key: string, val: string, type: ContractMetadataType) => (
    <>
      {renderBadgeCell(type)}
      {renderTextCell(key)}
      {renderTextCell(val)}
    </>
  );

  return (
    <>
      <Input
        label="Contract Wasm Hash"
        id="contract-wasm-hash"
        fieldSize="md"
        copyButton={{
          position: "right",
        }}
        readOnly
        value={metadata?.wasmHash}
      />

      <Box gap="sm" direction="column">
        <Label size="sm" htmlFor="contract-metadata">
          Contract Metadata
        </Label>
        <Card variant="primary">
          <Text as="span" size="xs">
            This section contains the metadata of the contract, which is a
            collection of key-value pairs that provide additional information
            about the contract. This data is added to the contract during
            compilation and can be retrieved directly from the WASM file. See{" "}
            <Link href={metaDocsLink} target="_blank" rel="noopener noreferrer">
              Contract Metadata Documentation
            </Link>{" "}
            for further details.
          </Text>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              marginTop: "1.5rem",
            }}
          >
            <Table
              breakpoint={300}
              hideNumberColumn
              columnLabels={[
                { id: "type", label: "Type" },
                { id: "key", label: "Key" },
                { id: "value", label: "Value" },
              ]}
              data={getTableData()}
              renderItemRow={(item: TableItem) =>
                renderRow(item.key, item.val, item.metaType)
              }
            />
          </div>
        </Card>
      </Box>
    </>
  );
};

export default RenderContractMetadata;
````

## File: src/debug/components/RenderOneOf.tsx
````typescript
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { JSONSchema7 } from "json-schema";
import { get } from "lodash";
import { Select } from "@stellar/design-system";

import { Box } from "../../components/layout/Box";

import { jsonSchema } from "../util/jsonSchema";

import {
  AnyObject,
  JsonSchemaFormProps,
  SorobanInvokeValue,
} from "../types/types";
import { renderTupleType } from "./RenderTupleType";

// oneOf is used for union and enum types
// https://github.com/stellar/js-stellar-sdk/blob/master/src/contract/spec.ts
export const renderOneOf = ({
  name,
  schema,
  path,
  parsedSorobanOperation,
  renderer,
  onChange,
  formError,
  setFormError,
}: {
  name: string;
  schema: JSONSchema7;
  path: string[];
  parsedSorobanOperation: SorobanInvokeValue;
  renderer: (props: JsonSchemaFormProps) => React.ReactNode;
  onChange: (value: SorobanInvokeValue) => void;
  formError: AnyObject;
  setFormError: (error: AnyObject) => void;
}) => {
  if (!schema?.oneOf) {
    return null;
  }

  const invokeContractBaseProps = {
    contract_id: parsedSorobanOperation.contract_id,
    function_name: parsedSorobanOperation.function_name,
  };

  const keyName = Object.keys(parsedSorobanOperation.args)[0];

  let tagName;

  if (path.length > 1) {
    tagName = get(parsedSorobanOperation.args[keyName], path.join("."))?.tag;
  } else {
    tagName = (parsedSorobanOperation.args[keyName] as AnyObject)?.tag;
  }

  const selectedSchema = schema.oneOf.find(
    (oneOf) =>
      jsonSchema.isSchemaObject(oneOf as AnyObject) &&
      (oneOf as AnyObject)?.title === tagName,
  );

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const pathSegments = path[0].split(".");

    if (pathSegments.length > 1) {
      const keyName = Object.keys(parsedSorobanOperation.args)[0];

      const updatedPath =
        keyName === pathSegments[0]
          ? pathSegments.slice(1).join(".")
          : pathSegments.join(".");

      const updatedTupleList = jsonSchema.setDeepValue(
        parsedSorobanOperation.args[keyName] as AnyObject,
        updatedPath,
        {
          tag: e.target.value,
          // values: [],
        },
      );

      onChange({
        ...invokeContractBaseProps,
        args: {
          ...parsedSorobanOperation.args,
          [keyName]: updatedTupleList,
        },
      });
    } else {
      onChange({
        ...invokeContractBaseProps,
        args: {
          ...parsedSorobanOperation.args,
          [name]: {
            tag: e.target.value,
            // values: [],
          },
        },
      });
    }
  };

  return (
    <Box gap="md" key={`${path.join(".")}`}>
      <Select
        id="json-schema-form-renderer-one-of"
        fieldSize="md"
        label={name}
        value={
          (get(parsedSorobanOperation.args, path.join(".")) as AnyObject)
            ?.tag as string
        }
        onChange={onSelectChange}
      >
        {/* title is the tag */}
        <option value="">Select</option>

        {schema.oneOf.map((oneOf, index) => {
          if (typeof oneOf === "boolean") return null;

          return (
            <option
              id={oneOf?.title}
              value={oneOf?.title}
              // eslint-disable-next-line react-x/no-array-index-key -- Schema items may have duplicate titles
              key={`${oneOf?.title}-${index}`}
            >
              {oneOf?.title}
            </option>
          );
        })}
      </Select>

      {selectedSchema &&
      jsonSchema.isSchemaObject(selectedSchema as AnyObject) &&
      jsonSchema.isTaggedUnion(selectedSchema as JSONSchema7)
        ? renderTupleType({
            path,
            schema: selectedSchema as JSONSchema7,
            onChange,
            parsedSorobanOperation,
            renderer,
            formError,
            setFormError,
          })
        : null}
    </Box>
  );
};
````

## File: src/debug/components/RenderPrimitivesType.tsx
````typescript
import React from "react";
import { Badge, Icon, Input, Select, Text } from "@stellar/design-system";
import type { JSONSchema7 } from "json-schema";
import { get } from "lodash";

import { jsonSchema } from "../util/jsonSchema";

import { validate } from "../validate";

import { PositiveIntPicker } from "./PositiveIntPicker";

import type { AnyObject, SorobanInvokeValue } from "../types/types";
import { convertSpecTypeToScValType } from "../util/sorobanUtils";

export const renderPrimitivesType = ({
  name,
  schema,
  path,
  parsedSorobanOperation,
  onChange,
  formError,
  setFormError,
}: {
  name: string;
  schema: Partial<JSONSchema7>;
  path: string[];
  parsedSorobanOperation: SorobanInvokeValue;
  onChange: (value: SorobanInvokeValue) => void;
  formError: AnyObject;
  setFormError: (error: AnyObject) => void;
}) => {
  const { description } = schema;

  const schemaType = jsonSchema.getSchemaType(schema);

  const nestedItemLabel =
    path.length > 0 ? jsonSchema.getNestedItemLabel(path.join(".")) : path;

  const formErrorKey = [
    parsedSorobanOperation.function_name,
    path.join("."),
  ].join(".");

  const renderTypeBadge = (icon?: React.ReactNode) => (
    <Badge variant="tertiary" icon={icon}>
      {(schemaType as string).toLowerCase()}
    </Badge>
  );

  const sharedProps = {
    id: path.join("."),
    label: (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyItems: "space-between",
          alignSelf: "stretch",

          width: "100%",

          gap: "0.5rem",
        }}
      >
        {renderTypeBadge()}
        <Text size="sm" as="div" weight="bold">
          {nestedItemLabel}
        </Text>
      </div>
    ),
    value:
      ((get(parsedSorobanOperation.args, path.join(".")) as AnyObject)
        ?.value as string) || "",
    error: (formError?.[formErrorKey] as string) || undefined,
  };

  const invokeContractBaseProps = {
    contract_id: parsedSorobanOperation.contract_id,
    function_name: parsedSorobanOperation.function_name,
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    schemaType: string,
  ) => {
    const scValType = convertSpecTypeToScValType(schemaType);

    if (path.length > 0) {
      const updatedList = jsonSchema.setDeepValue(
        parsedSorobanOperation.args,
        path.join("."),
        {
          value: e.target.value,
          type: scValType,
        },
      );

      onChange({
        ...invokeContractBaseProps,
        args: {
          ...updatedList,
        },
      });
    } else {
      onChange({
        ...invokeContractBaseProps,
        args: {
          ...parsedSorobanOperation.args,
          [name]: { value: e.target.value, type: scValType },
        },
      });
    }
  };

  const handleValidate = (
    e: React.ChangeEvent<HTMLInputElement>,
    schemaType: string,
    validateFn?:
      | ((value: string, required?: boolean) => string | false)
      | ((value: string, required?: boolean) => string | false)[],
  ) => {
    let error;

    if (Array.isArray(validateFn)) {
      const errors = validateFn.map((fn) => fn(e.target.value));
      const hasNoError = jsonSchema.hasAnyValidationPassed(errors);

      if (schemaType === "Address") {
        error = hasNoError ? "" : "Invalid Public key or contract ID";
      } else {
        error = hasNoError ? "" : errors.join(" ");
      }
    } else {
      error = validateFn?.(e.target.value);
    }

    if (error) {
      setFormError({
        ...formError,
        [formErrorKey]: error ? error : "",
      });
    } else {
      const newFormError = { ...formError };
      delete newFormError[formErrorKey];
      setFormError(newFormError);
    }
  };

  switch (schemaType) {
    case "Address":
      return (
        <>
          <Input
            {...sharedProps}
            onChange={(e) => {
              handleChange(e, schemaType);
              handleValidate(e, schemaType, [
                validate.getPublicKeyError,
                validate.getContractIdError,
              ]);
            }}
            key={path.join(".")}
            infoText={description || ""}
            leftElement={<Icon.User03 />}
            note={<>{description}</>}
            fieldSize="md"
          />
        </>
      );
    case "U32":
      return (
        <PositiveIntPicker
          {...sharedProps}
          key={path.join(".")}
          onChange={(e) => {
            handleChange(e, schemaType);
            handleValidate(e, schemaType, validate.getU32Error);
          }}
        />
      );
    case "U64":
      return (
        <PositiveIntPicker
          {...sharedProps}
          key={path.join(".")}
          onChange={(e) => {
            handleChange(e, schemaType);
            handleValidate(e, schemaType, validate.getU64Error);
          }}
        />
      );
    case "U128":
      return (
        <PositiveIntPicker
          {...sharedProps}
          key={path.join(".")}
          onChange={(e) => {
            handleChange(e, schemaType);
            handleValidate(e, schemaType, validate.getU128Error);
          }}
        />
      );
    case "U256":
      return (
        <PositiveIntPicker
          {...sharedProps}
          key={path.join(".")}
          onChange={(e) => {
            handleChange(e, schemaType);
            handleValidate(e, schemaType, validate.getU256Error);
          }}
        />
      );
    case "I32":
      return (
        <Input
          {...sharedProps}
          key={path.join(".")}
          onChange={(e) => {
            handleChange(e, schemaType);
            handleValidate(e, schemaType, validate.getI32Error);
          }}
          fieldSize="md"
        />
      );
    case "I64":
      return (
        <Input
          {...sharedProps}
          key={path.join(".")}
          onChange={(e) => {
            handleChange(e, schemaType);
            handleValidate(e, schemaType, validate.getI64Error);
          }}
          fieldSize="md"
        />
      );
    case "I128":
      return (
        <Input
          {...sharedProps}
          key={path.join(".")}
          onChange={(e) => {
            handleChange(e, schemaType);
            handleValidate(e, schemaType, validate.getI128Error);
          }}
          fieldSize="md"
        />
      );
    case "I256":
      return (
        <Input
          {...sharedProps}
          key={path.join(".")}
          onChange={(e) => {
            handleChange(e, schemaType);
            handleValidate(e, schemaType, validate.getI256Error);
          }}
          fieldSize="md"
        />
      );
    case "Bool":
      return (
        <Select
          {...sharedProps}
          fieldSize="md"
          onChange={(e) => {
            handleChange(e, schemaType);
          }}
        >
          <option value="" disabled={true}>
            Select
          </option>
          <option value="true">true</option>
          <option value="false">false</option>
        </Select>
      );
    case "ScString":
    case "ScSymbol":
      return (
        <Input
          {...sharedProps}
          key={path.join(".")}
          onChange={(e) => {
            handleChange(e, schemaType);
            handleValidate(e, schemaType);
          }}
          note={<>{description}</>}
          fieldSize="md"
        />
      );
    case "DataUrl":
      return (
        <Input
          {...sharedProps}
          key={path.join(".")}
          onChange={(e) => {
            handleChange(e, schemaType);
            handleValidate(e, schemaType, validate.getDataUrlError);
          }}
          fieldSize="md"
        />
      );
    default:
      return null;
  }
};
````

## File: src/debug/components/RenderTupleType.tsx
````typescript
import { Card } from "@stellar/design-system";
import { JSONSchema7 } from "json-schema";

import { Box } from "../../components/layout/Box";
import { LabelHeading } from "./LabelHeading";

import {
  AnyObject,
  JsonSchemaFormProps,
  SorobanInvokeValue,
} from "../types/types";
import { get } from "lodash";

export const renderTupleType = ({
  path,
  schema,
  onChange,
  parsedSorobanOperation,
  renderer,
  formError,
  setFormError,
}: {
  path: string[];
  schema: JSONSchema7;
  onChange: (value: SorobanInvokeValue) => void;
  parsedSorobanOperation: SorobanInvokeValue;
  renderer: (props: JsonSchemaFormProps) => React.ReactNode;
  formError: AnyObject;
  setFormError: (error: AnyObject) => void;
}) => {
  const getKeyName = get(parsedSorobanOperation.args, path.join("."));

  if (!(getKeyName as AnyObject)?.tag || !schema.properties?.values) {
    return null;
  }

  // from the schema, the tag is "values"
  const label = "values";

  return (
    <Box gap="md">
      <LabelHeading size="md" infoText={schema.description}>
        {(getKeyName as AnyObject)?.tag as string}
      </LabelHeading>

      <Card>
        <Box gap="md">
          <LabelHeading size="md" infoText={schema.description}>
            {label}
          </LabelHeading>
          <Card>
            <Box gap="md">
              {renderer({
                name: label,
                schema: schema?.properties?.values as JSONSchema7,
                path: [...path, label],
                parsedSorobanOperation,
                onChange,
                formError,
                setFormError,
              })}
            </Box>
          </Card>
        </Box>
      </Card>
    </Box>
  );
};
````

## File: src/debug/components/TransactionSuccessCard.tsx
````typescript
import { Box } from "../../components/layout/Box";
import { TxResponse } from "./TxResponse";
import { ValidationResponseCard } from "./ValidationResponseCard";
import { SubmitRpcResponse } from "../types/types";

import { XdrJsonViewer } from "./XdrJsonViewer";
import { Alert } from "@stellar/design-system";

interface TransactionSuccessCardProps {
  response: SubmitRpcResponse;
}

export const TransactionSuccessCard = ({
  response,
}: TransactionSuccessCardProps) => {
  return (
    <ValidationResponseCard
      variant="success"
      title="Transaction submitted!"
      summary={
        <Alert
          variant="success"
          placement="inline"
          title="Successful Execution"
        >
          {" "}
          {`Transaction succeeded with ${response.operationCount} operation(s)`}
        </Alert>
      }
      note={<></>}
      detailedResponse={
        <Box gap="lg">
          <TxResponse
            data-testid="submit-tx-rpc-success-hash"
            label="Hash:"
            value={response.hash}
          />

          <TxResponse
            data-testid="submit-tx-rpc-success-ledger"
            label="Ledger number:"
            value={response.result.ledger.toString()}
          />
          <TxResponse
            data-testid="submit-tx-rpc-success-envelope-xdr"
            label="Transaction Envelope:"
            item={
              <XdrJsonViewer
                xdr={response.result.envelopeXdr.toXDR("base64").toString()}
                typeVariant="TransactionEnvelope"
              />
            }
          />

          <TxResponse
            data-testid="submit-tx-rpc-success-result-xdr"
            label="Transaction Result:"
            item={
              <XdrJsonViewer
                xdr={response.result.resultXdr.toXDR("base64").toString()}
                typeVariant="TransactionResult"
              />
            }
          />
          <TxResponse
            data-testid="submit-tx-rpc-success-result-meta-xdr"
            label="Transaction Result Meta:"
            item={
              <XdrJsonViewer
                xdr={response.result.resultMetaXdr.toXDR("base64").toString()}
                typeVariant="TransactionMeta"
              />
            }
          />

          <TxResponse label="Fee:" value={response.fee} />
        </Box>
      }
    />
  );
};
````

## File: src/debug/components/TxResponse.tsx
````typescript
import { Box } from "../../components/layout/Box";

const styles = {
  value: {
    marginLeft: "var(--sds-gap-sm)",
  } as React.CSSProperties,
  link: {
    color: "var(--sds-clr-gray-12)",
    wordBreak: "break-all" as const,
    fontWeight: "var(--sds-fw-regular)",
  } as React.CSSProperties,
};

export const TxResponse = ({
  label,
  value,
  item,
}: {
  label: string;
  value?: string | number;
  item?: React.ReactNode;
}) => (
  <Box gap="xs">
    <div>{label.toLocaleUpperCase()}</div>
    <div style={styles.value}>
      <div style={styles.link}>{value || item}</div>
    </div>
  </Box>
);
````

## File: src/debug/components/ValidationResponseCard.tsx
````typescript
import { Button, Card, Link, Text } from "@stellar/design-system";
import { Box } from "../../components/layout/Box";
import { useState } from "react";
import { labPrefix } from "../../contracts/util";

type ValidationResponseCard = {
  variant: "primary" | "success" | "error";
  title: string | React.ReactNode;
  summary?: string | React.ReactNode;
  detailedResponse: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  note?: string | React.ReactNode;
  footerLeftEl?: React.ReactNode;
  footerRightEl?: React.ReactNode;
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
  },
  title: (variant: "primary" | "success" | "error") => ({
    color:
      variant === "success"
        ? "var(--sds-clr-green-11)"
        : variant === "error"
          ? "var(--sds-clr-red-11)"
          : "var(--sds-clr-gray-12)",
  }),
  subtitle: {
    color: "var(--sds-clr-gray-11)",
  } as React.CSSProperties,
  note: {
    color: "var(--sds-clr-gray-11)",
  } as React.CSSProperties,
  content: {
    fontSize: "14px",
    lineHeight: "20px",
    color: "var(--sds-clr-gray-12)",
    fontFamily: "var(--sds-ff-monospace)",
    fontWeight: "var(--sds-fw-medium)",
    padding: "1rem",
    wordWrap: "break-word" as const,
    overflowY: "auto" as const,
  } as React.CSSProperties,
  footer: {
    flexWrap: "wrap" as const,
  } as React.CSSProperties,
  footerButtons: {
    flexWrap: "wrap" as const,
  } as React.CSSProperties,
  responsiveButtons: {
    "@media (max-width: 440px)": {
      width: "100%",
      flex: 1,
    },
  } as React.CSSProperties,
};

export const ValidationResponseCard = ({
  variant,
  title,
  summary,
  detailedResponse,
  subtitle,
  note,
  footerLeftEl,
  footerRightEl,
}: ValidationResponseCard) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const txHash =
    typeof summary === "object" && summary !== null && "_owner" in summary
      ? ((
          summary as {
            _owner?: { memoizedProps?: { response?: { hash?: string } } };
          }
        )._owner?.memoizedProps?.response?.hash ?? "")
      : "";

  const renderSummary = () => {
    if (summary) {
      return (
        <Text
          as="div"
          size="sm"
          weight="semi-bold"
          style={
            {
              marginBottom: "1rem",
            } as React.CSSProperties
          }
        >
          {summary}
        </Text>
      );
    }
  };

  return (
    <Card>
      <Box gap="xs" style={styles.container}>
        <>
          <Text
            as="div"
            size="sm"
            weight="medium"
            style={styles.title(variant)}
          >
            {title}
          </Text>
          {subtitle ? (
            <Text as="div" size="xs" weight="medium" style={styles.subtitle}>
              {subtitle}
            </Text>
          ) : null}

          <div
            style={{ display: "flex", flexDirection: "column", gap: "2 rem" }}
          >
            {renderSummary()}
            <Box
              gap="xs"
              direction="row"
              style={{ alignSelf: "flex-end", marginBottom: "1rem" }}
            >
              <Button
                title="Expand"
                variant="tertiary"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? "Hide " : "Show "} Details
              </Button>
              {txHash ? (
                <Link
                  href={`${labPrefix()}&txDashboard$transactionHash=${txHash}`}
                  size="xs"
                >
                  See on lab
                </Link>
              ) : (
                <></>
              )}
            </Box>
            {isExpanded && (
              <Card variant="secondary" noPadding>
                <div style={styles.content}>
                  {detailedResponse}
                  <style>
                    {`
                  .ValidationResponseCard__content ul {
                    font-size: inherit;
                    line-height: inherit;
                    font-family: var(--sds-ff-monospace);
                    font-weight: var(--sds-fw-medium);
                    padding-left: 1rem;
                  }
                  @media screen and (max-width: 440px) {
                    .ValidationResponseCard__footer--leftEl,
                    .ValidationResponseCard__footer--rightEl {
                      width: 100%;
                    }
                    .ValidationResponseCard__footer--leftEl .Button,
                    .ValidationResponseCard__footer--rightEl .Button {
                      flex: 1;
                    }
                  }
                `}
                  </style>
                </div>
              </Card>
            )}
          </div>
          {footerLeftEl || footerRightEl || note ? (
            <Box gap="lg">
              <>
                {note ? (
                  <Text as="div" size="xs" weight="regular" style={styles.note}>
                    {note}
                  </Text>
                ) : null}

                {footerLeftEl || footerRightEl ? (
                  <Box
                    gap="sm"
                    direction="row"
                    align="center"
                    justify="space-between"
                    style={styles.footer}
                    wrap="wrap"
                  >
                    <>
                      {footerLeftEl ? (
                        <Box
                          gap="sm"
                          direction="row"
                          style={styles.footerButtons}
                          wrap="wrap"
                        >
                          <>{footerLeftEl}</>
                        </Box>
                      ) : null}

                      {footerRightEl ? (
                        <Box
                          gap="sm"
                          direction="row"
                          justify="right"
                          style={styles.footerButtons}
                          wrap="wrap"
                        >
                          <>{footerRightEl}</>
                        </Box>
                      ) : null}
                    </>
                  </Box>
                ) : null}
              </>
            </Box>
          ) : null}
        </>
      </Box>
    </Card>
  );
};
````

## File: src/debug/components/XdrJsonViewer.tsx
````typescript
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState } from "react";
import { PrettyJsonTextarea } from "./PrettyJsonTextarea";
import { decode, guess, initialize } from "../util/StellarXdr";
import { Code, Icon } from "@stellar/design-system";

interface Props {
  xdr: string;
  typeVariant?: string;
}

const variant = {
  toggled: {
    backgroundColor: "#f0f0f0",
    color: "#333",
    padding: "0.25rem 0.5rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    borderRadius: "4px",
  },
  untoggled: {
    backgroundColor: "#C9C8C8",
    color: "#333",
    padding: "0.25rem 0.5rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    borderRadius: "4px",
  },
};

await initialize();

export const XdrJsonViewer = ({ xdr, typeVariant }: Props) => {
  const [displayFormatted, setDisplayFormatted] = useState<"XDR" | "JSON">(
    "XDR",
  );

  const toggleDisplay = () => {
    setDisplayFormatted((prev) => (prev === "XDR" ? "JSON" : "XDR"));
  };

  let decodeTypeVariant = typeVariant;
  if (!decodeTypeVariant) {
    const validXdrTypes = guess(xdr);
    if (validXdrTypes.length === 0) {
      throw new Error("Invalid XDR type");
    }
    decodeTypeVariant = validXdrTypes[0];
  }

  const parsedJson = JSON.parse(decode(decodeTypeVariant, xdr));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {displayFormatted === "XDR" && <Code size="sm">{xdr}</Code>}
      {displayFormatted === "JSON" && (
        <PrettyJsonTextarea label="" isCodeWrapped={true} json={parsedJson} />
      )}
      <div
        style={{
          alignSelf: "flex-end",
          cursor: "pointer",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.25rem",
          borderRadius: "4px",
          backgroundColor: "#C9C8C8",
          color: "#333",
        }}
        title={`View as ${displayFormatted === "XDR" ? "JSON" : "XDR"}`}
        onClick={toggleDisplay}
      >
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <div
            style={
              displayFormatted === "XDR" ? variant.toggled : variant.untoggled
            }
          >
            <Icon.Code01 />
            XDR
          </div>
          <div
            style={
              displayFormatted === "JSON" ? variant.toggled : variant.untoggled
            }
          >
            <Icon.Brackets />
            JSON
          </div>
        </div>
      </div>
    </div>
  );
};
````

## File: src/debug/hooks/useAccountSequenceNumber.ts
````typescript
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/only-throw-error */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { MuxedAccount, StrKey } from "@stellar/stellar-sdk";
import { useQuery } from "@tanstack/react-query";
import { NetworkHeaders } from "../types/types";

export const useAccountSequenceNumber = ({
  publicKey,
  horizonUrl,
  headers,
  uniqueId,
  enabled = false,
}: {
  publicKey: string;
  horizonUrl: string;
  headers: NetworkHeaders;
  uniqueId?: string;
  enabled?: boolean;
}) => {
  const query = useQuery({
    queryKey: ["accountSequenceNumber", { publicKey, uniqueId }],
    queryFn: async () => {
      let sourceAccount = publicKey;

      if (StrKey.isValidMed25519PublicKey(publicKey)) {
        const muxedAccount = MuxedAccount.fromAddress(publicKey, "0");
        sourceAccount = muxedAccount.baseAccount().accountId();
      }

      try {
        const response = await fetch(
          `${horizonUrl}/accounts/${sourceAccount}`,
          { headers },
        );
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const responseJson = await response.json();

        if (responseJson?.status === 0) {
          throw `Unable to reach server at ${horizonUrl}.`;
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        if (responseJson?.status?.toString()?.startsWith("4")) {
          if (responseJson?.title === "Resource Missing") {
            throw "Account not found. Make sure the correct network is selected and the account is funded/created.";
          }

          throw (
            responseJson?.extras?.reason ||
            responseJson?.detail ||
            "Something went wrong when fetching the transaction sequence number. Please try again."
          );
        }

        return (BigInt(responseJson.sequence) + BigInt(1)).toString();
      } catch (e: unknown) {
        throw `${e as Error}. Check network configuration.`;
      }
    },
    enabled,
  });

  return query;
};
````

## File: src/debug/hooks/useCheckTxSignatures.ts
````typescript
import { useQuery } from "@tanstack/react-query";
import { fetchTxSignatures } from "../util/fetchTxSignatures";
import { NetworkHeaders } from "../types/types";

export const useCheckTxSignatures = ({
  xdr,
  networkPassphrase,
  networkUrl,
  headers,
}: {
  xdr: string;
  networkPassphrase: string;
  networkUrl: string;
  headers: NetworkHeaders;
}) => {
  const query = useQuery({
    queryKey: ["tx", "signatures"],
    queryFn: async () => {
      try {
        return await fetchTxSignatures({
          txXdr: xdr,
          networkPassphrase,
          networkUrl,
          headers,
        });
      } catch (e) {
        throw new Error(
          `There was a problem checking transaction signatures: ${e as Error}`,
        );
      }
    },
    enabled: false,
  });

  return query;
};
````

## File: src/debug/hooks/useContracts.ts
````typescript
import { useQuery } from "@tanstack/react-query";
import { Client } from "@stellar/stellar-sdk/contract";
import {
  loadContractMetadata,
  ContractMetadata,
} from "../util/loadContractMetada";

const contractModules = import.meta.glob("../../contracts/*.ts");

type ContractModule = {
  default: Client;
  metadata?: ContractMetadata;
};

type ContractMap = Record<string, ContractModule>;

const loadContracts = async () => {
  const loadedContracts: ContractMap = {};
  const failed: Record<string, string> = {};

  for (const [path, importFn] of Object.entries(contractModules)) {
    const filename = path.split("/").pop()?.replace(".ts", "") || "";
    if (filename && filename === "util") continue;

    try {
      const module = (await importFn()) as ContractModule;
      const metadata = await loadContractMetadata(
        module.default.options.contractId,
      );
      loadedContracts[filename] = { ...module, metadata };
    } catch (error) {
      failed[filename] = error instanceof Error ? error.message : String(error);
    }
  }

  return { loadedContracts, failed };
};

export function useContracts() {
  return useQuery({
    queryKey: ["contracts"],
    queryFn: loadContracts,
    staleTime: Infinity,
  });
}
````

## File: src/debug/hooks/usePrevious.ts
````typescript
import { useEffect, useRef } from "react";

export const usePrevious = <T>(value: T) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};
````

## File: src/debug/hooks/useRpcPrepareTx.ts
````typescript
/* eslint-disable @typescript-eslint/only-throw-error */
import { useMutation } from "@tanstack/react-query";
import { rpc as StellarRpc, TransactionBuilder } from "@stellar/stellar-sdk";

import { isEmptyObject } from "../util/isEmptyObject";
import {
  NetworkHeaders,
  PrepareRpcErrorResponse,
  PrepareRpcResponse,
} from "../types/types";

type PrepareRpcTxProps = {
  rpcUrl: string;
  transactionXdr: string;
  networkPassphrase: string;
  headers: NetworkHeaders;
};

// RPC's prepareTransaction method handles both
// simulating and assembling transactions
export const useRpcPrepareTx = () => {
  const mutation = useMutation<
    PrepareRpcResponse,
    PrepareRpcErrorResponse,
    PrepareRpcTxProps
  >({
    mutationFn: async ({
      rpcUrl,
      transactionXdr,
      networkPassphrase,
      headers,
    }: PrepareRpcTxProps) => {
      try {
        const transaction = TransactionBuilder.fromXDR(
          transactionXdr,
          networkPassphrase,
        );
        const rpcServer = new StellarRpc.Server(rpcUrl, {
          headers: isEmptyObject(headers) ? undefined : { ...headers },
          allowHttp: new URL(rpcUrl).hostname === "localhost",
        });
        const preparedTx = await rpcServer.prepareTransaction(transaction);

        return {
          transactionXdr: preparedTx.toXDR(),
        };
      } catch (e) {
        throw {
          result: e,
        };
      }
    },
  });

  return mutation;
};
````

## File: src/debug/hooks/useSimulateTx.ts
````typescript
/* eslint-disable @typescript-eslint/only-throw-error */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { useMutation } from "@tanstack/react-query";

import { NetworkHeaders } from "../types/types";

type SimulateTxProps = {
  rpcUrl: string;
  transactionXdr: string;
  instructionLeeway?: string;
  headers: NetworkHeaders;
};

export const useSimulateTx = () => {
  const mutation = useMutation({
    mutationFn: async ({
      rpcUrl,
      transactionXdr,
      instructionLeeway,
      headers,
    }: SimulateTxProps) => {
      try {
        const res = await fetch(rpcUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            method: "simulateTransaction",
            params: {
              xdrFormat: "json",
              transaction: transactionXdr,
              ...(instructionLeeway
                ? {
                    resourceConfig: {
                      instructionLeeway: Number(instructionLeeway),
                    },
                  }
                : {}),
            },
          }),
        });

        return await res.json();
      } catch (e) {
        throw {
          result: e,
        };
      }
    },
  });

  return mutation;
};
````

## File: src/debug/hooks/useSubmitRpcTx.ts
````typescript
/* eslint-disable @typescript-eslint/only-throw-error */
/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import { useMutation } from "@tanstack/react-query";
import { rpc as StellarRpc, TransactionBuilder } from "@stellar/stellar-sdk";
import { delay } from "../util/delay";
import { isEmptyObject } from "../util/isEmptyObject";
import {
  NetworkHeaders,
  SubmitRpcError,
  SubmitRpcResponse,
} from "../types/types";

type SubmitRpcTxProps = {
  rpcUrl: string;
  transactionXdr: string;
  networkPassphrase: string;
  headers: NetworkHeaders;
};

export const useSubmitRpcTx = () => {
  const mutation = useMutation<
    SubmitRpcResponse,
    SubmitRpcError,
    SubmitRpcTxProps
  >({
    mutationFn: async ({
      rpcUrl,
      transactionXdr,
      networkPassphrase,
      headers,
    }: SubmitRpcTxProps) => {
      try {
        const transaction = TransactionBuilder.fromXDR(
          transactionXdr,
          networkPassphrase,
        );
        const rpcServer = new StellarRpc.Server(rpcUrl, {
          headers: isEmptyObject(headers) ? undefined : { ...headers },
          allowHttp: new URL(rpcUrl).hostname === "localhost",
        });
        const sentTx = await rpcServer.sendTransaction(transaction);

        if (sentTx.status !== "PENDING") {
          throw { status: sentTx.status, result: sentTx };
        }

        let txResponse;
        const MAX_ATTEMPTS = 10;
        let attempts = 0;

        while (attempts++ < MAX_ATTEMPTS && txResponse?.status !== "SUCCESS") {
          txResponse = await rpcServer.getTransaction(sentTx.hash);

          switch (txResponse.status) {
            case "FAILED":
              throw { status: "FAILED", result: txResponse };
            case "NOT_FOUND":
              await delay(1000);
              continue;
            case "SUCCESS":
            default:
            // Do nothing
          }
        }

        if (attempts >= MAX_ATTEMPTS || txResponse?.status !== "SUCCESS") {
          throw { status: "TIMEOUT", result: txResponse };
        }

        const submittedTx = TransactionBuilder.fromXDR(
          txResponse.envelopeXdr,
          networkPassphrase,
        );
        // TS doesn't recognize operations property even though it is there
        const operations = submittedTx?.operations || [];

        return {
          hash: sentTx.hash,
          result: txResponse,
          operationCount: operations.length,
          fee: submittedTx.fee,
        };
      } catch (e) {
        throw {
          status: "ERROR",
          result: {
            status: "ERROR",
            latestLedger: "",
            latestLedgerCloseTime: "",
            errorResult: e,
          },
        };
      }
    },
  });

  return mutation;
};
````

## File: src/debug/types/types.ts
````typescript
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import React from "react";
import {
  MemoType,
  NetworkError,
  rpc as StellarRpc,
  xdr,
} from "@stellar/stellar-sdk";
import type { JSONSchema7, JSONSchema7Definition } from "json-schema";

// =============================================================================
// Generic
// =============================================================================
export type AnyObject = { [key: string]: unknown };
export type EmptyObj = Record<PropertyKey, never>;
export type ThemeColorType = "sds-theme-dark" | "sds-theme-light";
export type LabSettings = Record<string, string>;

// =============================================================================
// Helpers
// =============================================================================
// Key union type from object keys
export type KeysOfUnion<T> = T extends infer P ? keyof P : never;

// =============================================================================
// Network
// =============================================================================
export type NetworkType = "testnet" | "mainnet" | "futurenet" | "custom";

export type Network = {
  id: NetworkType;
  label: string;
  horizonUrl: string;
  horizonHeaderName?: string;
  horizonHeaderValue?: string;
  rpcUrl: string;
  rpcHeaderName?: string;
  rpcHeaderValue?: string;
  passphrase: string;
};

export type NetworkHeaders = Record<string, string>;

export type StatusPageComponent = {
  [key: string]: unknown;
  id: string;
  name: string;
};

export type StatusPageIncident = {
  [key: string]: unknown;
  id: string;
  name: string;
  body: string;
};

export type StatusPageScheduled = {
  [key: string]: unknown;
  id: string;
  name: string;
  scheduled_for: string;
  components: StatusPageComponent[];
  incident_updates: StatusPageIncident[];
};

// =============================================================================
// Account
// =============================================================================
export type MuxedAccount = {
  id: string | undefined;
  baseAddress: string | undefined;
  muxedAddress: string | undefined;
};

export type MuxedAccountFieldType = MuxedAccount & {
  error: string;
};

// =============================================================================
// Asset
// =============================================================================
export type AssetType =
  | "native"
  | "issued"
  | "credit_alphanum4"
  | "credit_alphanum12"
  | "liquidity_pool_shares"
  | "pool_share";

export type AssetString = {
  id: AssetType;
  label: string;
  value: string | undefined;
};

export type AssetObjectValue = {
  type: AssetType | undefined;
  code: string;
  issuer: string;
};

export type AssetPoolShareObjectValue = {
  type: AssetType | undefined;
  asset_a: AssetObjectValue;
  asset_b: AssetObjectValue;
  fee: string;
};

export type AssetSinglePoolShareValue = {
  type: "pool_share";
  pool_share: string | undefined;
};

export type AssetObject = {
  id: AssetType;
  label: string;
  value:
    | AssetObjectValue
    | AssetPoolShareObjectValue
    | AssetSinglePoolShareValue;
};

export type AssetError = {
  code?: string;
  issuer?: string;
};

export type AssetPoolShareError = {
  asset_a?: AssetError;
  asset_b?: AssetError;
};

// =============================================================================
// Transaction
// =============================================================================
export type TimeBoundsValue = {
  min_time: number | string | undefined;
  max_time: number | string | undefined;
};

export type TxnOperation = {
  operation_type: string;
  params: AnyObject;
  source_account?: string;
};

export type OperationError = {
  operationType: string;
  error: { [key: string]: string };
  missingFields: string[];
  customMessage: string[];
};

export type OpBuildingError = { label?: string; errorList?: string[] };

export type LedgerErrorResponse = {
  message: string;
  errorCode: number;
};

export type PrepareRpcResponse = {
  transactionXdr: string;
};

export type PrepareRpcErrorResponse = {
  result: StellarRpc.Api.SimulateTransactionErrorResponse;
};

export type SubmitRpcResponse = {
  hash: string;
  result: StellarRpc.Api.GetSuccessfulTransactionResponse;
  operationCount: number;
  fee: string;
};

export type SubmitRpcErrorStatus =
  | "TIMEOUT"
  | "FAILED"
  | "DUPLICATE"
  | "TRY_AGAIN_LATER"
  | "ERROR";

export type SubmitRpcError = {
  status: SubmitRpcErrorStatus;
  result: {
    status: SubmitRpcErrorStatus;
    latestLedger: number;
    latestLedgerCloseTime: number;
    hash?: string;
    ledger?: number;
    createdAt?: number;
    applicationOrder?: number;
    feeBump?: boolean;
    envelopeXdr?: xdr.TransactionEnvelope;
    resultXdr?: xdr.TransactionResult;
    resultMetaXdr?: xdr.TransactionMeta;
    errorResult?: xdr.TransactionResult;
    diagnosticEvents?: xdr.DiagnosticEvent[];
  };
};

export type SubmitHorizonError = NetworkError & {
  response: {
    data?: {
      extras?: {
        result_codes?: string;
        result_xdr?: string;
      };
    };
  };
};

export type TransactionBuildParams = {
  source_account: string;
  fee: string;
  seq_num: string;
  cond: {
    time: {
      min_time: string;
      max_time: string;
    };
  };
  memo:
    | string
    | {
        [T in Exclude<MemoType, "none">]?: string;
      }
    | EmptyObj;
};

// =============================================================================
// Component
// =============================================================================
export type InfoCard = {
  id: string;
  title: string;
  description: string;
  buttonLabel: string;
  buttonIcon?: React.ReactNode;
  buttonAction: () => void;
};

// =============================================================================
// Operations
// =============================================================================
export type OptionFlag = {
  id: string;
  label: string;
  value: number;
};

export type OptionSigner = {
  type: string;
  key: string | undefined;
  weight: string | undefined;
};

export type NumberFractionValue = {
  type: string | undefined;
  value: string | FractionValue | undefined;
};

export type FractionValue = {
  n: string | undefined;
  d: string | undefined;
};

export type RevokeSponsorshipValue = {
  type: SponsorshipType | string;
  data: AnyObject;
};

export type ScValPrimitiveType =
  | "U32"
  | "U64"
  | "U128"
  | "U256"
  | "I32"
  | "I64"
  | "I128"
  | "I256"
  | "Address"
  | "ScString"
  | "ScSymbol"
  | "DataUrl"
  | "Bool";

export type JsonSchemaFormProps = {
  name: string;
  schema: JSONSchema7;
  path?: string[];
  onChange: (value: SorobanInvokeValue) => void;
  index?: number;
  requiredFields?: string[];
  isWriteFn?: boolean;
  parsedSorobanOperation: SorobanInvokeValue;
  formError: AnyObject;
  setFormError: (error: AnyObject) => void;
};

export type SponsorshipType =
  | "account"
  | "trustline"
  | "offer"
  | "data"
  | "claimable_balance"
  | "signer";

// =============================================================================
// Soroban Operations
// =============================================================================
export type SorobanOpType =
  | "extend_footprint_ttl"
  | "restore_footprint"
  | "invoke_contract_function";

export type SorobanInvokeValue = {
  contract_id: string;
  function_name: string;
  args: AnyObject;
};

// =============================================================================
// RPC
// =============================================================================
export type FiltersType = "system" | "contract" | "diagnostic";

export type FiltersObject = {
  type: FiltersType;
  contract_ids: string[];
  topics: string[];
};

export type XdrType = "TransactionEnvelope" | "LedgerKey" | "ScVal";

export type LedgerKeyType =
  | "account"
  | "trustline"
  | "offer"
  | "data"
  | "claimable_balance"
  | "liquidity_pool"
  | "contract_data"
  | "contract_code"
  | "config_setting"
  | "ttl";

export type LedgerKeyEntryTypeProps =
  | "accountID"
  | "asset"
  | "sellerID"
  | "offerID"
  | "dataName"
  | "balanceID"
  | "liquidityPoolID"
  | "contract"
  | "key"
  | "durability"
  | "hash"
  | "configSettingID"
  | "keyHash";

export type LedgerKeyFieldsType = {
  id: LedgerKeyType;
  label: string;
  fields: string;
  custom?: AnyObject;
};

export type ConfigSettingIdType =
  | "contract_max_size_bytes"
  | "contract_compute_v0"
  | "contract_ledger_cost_v0"
  | "contract_historical_data_v0"
  | "contract_events_v0"
  | "contract_bandwidth_v0"
  | "contract_cost_params_cpu_instructions"
  | "contract_cost_params_memory_bytes"
  | "contract_data_key_size_bytes"
  | "contract_data_entry_size_bytes"
  | "state_archival"
  | "contract_execution_lanes"
  | "bucketlist_size_window"
  | "eviction_iterator";

export type XdrFormatType = "json" | "base64";

// =============================================================================
// Local storage items
// =============================================================================
export type LocalStorageSavedNetwork = {
  id: NetworkType;
  label: string;
  horizonUrl?: string;
  rpcUrl?: string;
  passphrase?: string;
};

export interface LocalStorageSavedItem {
  timestamp: number;
  network: LocalStorageSavedNetwork;
  name: string;
}

export interface SavedKeypair extends LocalStorageSavedItem {
  publicKey: string;
  secretKey: string;
}

export interface SavedTransaction extends LocalStorageSavedItem {
  params?: TransactionBuildParams;
  operations?: TxnOperation[];
  xdr: string;
  page: SavedTransactionPage;
  shareableUrl: string | undefined;
}

export interface SavedContract extends LocalStorageSavedItem {
  contractId: string;
  shareableUrl: string;
}

export type SavedTransactionPage = "build" | "sign" | "simulate" | "submit";

export interface SavedEndpointHorizon extends LocalStorageSavedItem {
  url: string;
  method: string;
  route: string;
  params: AnyObject;
  shareableUrl: string | undefined;
}

export interface SavedRpcMethod extends LocalStorageSavedItem {
  url: string;
  method: string;
  rpcMethod: string;
  route: string;
  params: AnyObject;
  shareableUrl: string | undefined;
  payload: AnyObject;
}

// =============================================================================
// Smart Contract Explorer
// =============================================================================
export type ContractInfoApiResponse = {
  contract: string;
  created: number;
  creator: string;
  account?: string;
  payments?: number;
  trades?: number;
  wasm?: string;
  storage_entries?: number;
  validation?: {
    status?: "verified" | "unverified";
    repository?: string;
    commit?: string;
    package?: string;
    make?: string;
    ts?: number;
  };
  versions?: number;
  salt?: string;
  asset?: string;
  code?: string;
  issuer?: string;
  functions?: {
    invocations: number;
    subinvocations: number;
    function: string;
  }[];
};

export type ContractVersionHistoryResponseItem = {
  operation: string;
  paging_token: string;
  ts: number;
  wasm: string;
};

export type ContractStorageDurability = "instance" | "persistent" | "temporary";

export type ContractStorageResponseItem = {
  durability: ContractStorageDurability;
  key: string;
  paging_token: string;
  ttl: number;
  updated: number;
  value: unknown;
  expired?: boolean;
};

export type ContractStorageProcessedItem<T> = T & {
  keyJson?: AnyObject | null;
  valueJson?: AnyObject | null;
};

export type ContractListRecord = {
  account: string;
  contract: string;
  created: number;
  creator: string;
  paging_token: string;
  payments: number;
  trades: number;
  wasm: string;
};

export type WasmData = {
  sourceRepo: string;
  build: {
    attestation: string;
    attestationUrl: string;
    commit: unknown;
    commitUrl: string;
    summary: unknown;
    summaryUrl: unknown;
    workflowFile: unknown;
    workflowFileUrl: string;
  };
};

// =============================================================================
// Data table
// =============================================================================
export type SortDirection = "default" | "asc" | "desc";

export type DataTableHeader = {
  id: string;
  value: string;
  isSortable?: boolean;
  filter?: string[];
};

export type DataTableCell = {
  value: React.ReactNode;
  isBold?: boolean;
  isWrap?: boolean;
  isOverflow?: boolean;
};

// =============================================================================
// Smart contract Wasm binary
// =============================================================================
export const CONTRACT_SECTIONS = [
  "contractmetav0",
  "contractenvmetav0",
  "contractspecv0",
] as const;

export type ContractSectionName = (typeof CONTRACT_SECTIONS)[number];

export type ContractData = {
  sc_env_meta_kind_interface_version?: ContractData | null;
  sc_meta_v0?: ContractData | null;
  xdr?: string[];
  json?: string[];
  text?: string[];
};
export type ContractSections = Record<ContractSectionName, ContractData>;

export type DereferencedSchemaType = {
  name: string;
  description: string;
  properties: Record<string, JSONSchema7Definition>;
  required: string[];
  additionalProperties: JSONSchema7Definition | DereferencedSchemaType;
  type: string;
};
````

## File: src/debug/util/arrayItem.ts
````typescript
const isValidItemIndex = (array: unknown[], itemIndex: number) => {
  // No items in the array
  if (array.length === 0) {
    return false;
  }

  // Invalid item index
  if (itemIndex < 0 || itemIndex > array.length - 1) {
    return false;
  }

  return true;
};

const addItem = <T>(array: unknown[], item: T) => {
  return [...array, item];
};

const deleteItem = (array: unknown[], itemIndex: number) => {
  if (!isValidItemIndex(array, itemIndex)) {
    return array;
  }

  const itemArray = [...array];
  itemArray.splice(itemIndex, 1);

  return itemArray;
};

const duplicateItem = (array: unknown[], itemIndexToDuplicate: number) => {
  if (!isValidItemIndex(array, itemIndexToDuplicate)) {
    return array;
  }

  return [...array, array[itemIndexToDuplicate]];
};

const moveItem = (
  array: unknown[],
  itemIndex: number,
  direction: "before" | "after",
) => {
  if (!isValidItemIndex(array, itemIndex)) {
    return array;
  }

  // Can't move before the first item
  if (itemIndex === 0 && direction === "before") {
    return array;
  }

  // Can't move after the last item
  if (itemIndex === array.length - 1 && direction === "after") {
    return array;
  }

  const itemArray = [...array];
  const el = itemArray.splice(itemIndex, 1)[0];
  const moveTo = direction === "after" ? itemIndex + 1 : itemIndex - 1;

  itemArray.splice(moveTo, 0, el);
  return itemArray;
};

const updateItem = (array: unknown[], itemIndex: number, newItem: unknown) => {
  if (!isValidItemIndex(array, itemIndex)) {
    return array;
  }

  const itemArray = [...array];
  itemArray[itemIndex] = newItem;

  return itemArray;
};

export const arrayItem = {
  add: addItem,
  delete: deleteItem,
  duplicate: duplicateItem,
  move: moveItem,
  update: updateItem,
};
````

## File: src/debug/util/capitalizeString.ts
````typescript
export const capitalizeString = (text: string) =>
  (text && text[0].toUpperCase() + text.slice(1)) || text;
````

## File: src/debug/util/delay.ts
````typescript
export const delay = async (ms: number = 500) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
````

## File: src/debug/util/dereferenceSchema.ts
````typescript
// https://jsonforms.io/api/core/interfaces/jsonschema7.html
import type { JSONSchema7, JSONSchema7Definition } from "json-schema";
import type { DereferencedSchemaType } from "../types/types";
import type { ScValPrimitiveType } from "../types/types";

const resolveNestedSchema = (
  schema: unknown,
  fullSchema: JSONSchema7,
): unknown => {
  if (!schema) return schema;

  if (typeof schema !== "object") return schema;

  if (Array.isArray(schema)) {
    return schema.map((item) => resolveNestedSchema(item, fullSchema));
  }

  if ("$ref" in schema && schema.$ref) {
    const refPath = (schema.$ref as string).replace("#/definitions/", "");
    const refSchema = fullSchema?.definitions?.[refPath];

    if (!refSchema || typeof refSchema === "boolean") return schema;

    // we want to keep primitive types as is to use it in nativeToScVal function later
    const isScPrimitive = [
      "U32",
      "U64",
      "U128",
      "U256",
      "I32",
      "I64",
      "I128",
      "I256",
      "Address",
      "ScString",
      "ScSymbol",
      "DataUrl",
      "Bool",
    ] as ScValPrimitiveType[];

    const finalSchema = isScPrimitive.includes(refPath as ScValPrimitiveType)
      ? {
          type: refPath,
          description: refSchema?.description ?? "",
        }
      : resolveNestedSchema(refSchema, fullSchema);

    return finalSchema;
  }

  if ("oneOf" in schema && schema.oneOf && Array.isArray(schema.oneOf)) {
    return {
      ...schema,
      oneOf: schema.oneOf.map((item: unknown) =>
        resolveNestedSchema(item, fullSchema),
      ),
    };
  }

  if ("items" in schema && schema.items) {
    return {
      ...schema,
      items: resolveNestedSchema(schema.items, fullSchema),
    };
  }

  if ("type" in schema && schema.type === "boolean") {
    return {
      ...schema,
      type: "Bool",
    };
  }

  if ("properties" in schema && schema.properties) {
    const resolvedProps: Record<string, unknown> = {};
    Object.entries(schema.properties).forEach(([key, value]) => {
      resolvedProps[key] = resolveNestedSchema(value, fullSchema);
    });
    return {
      ...schema,
      properties: resolvedProps,
    };
  }

  // Return the schema as is if no special handling needed
  return "properties" in schema ? schema.properties : undefined;
};

/**
 * dereferences the schema for the given method name
 * @param fullSchema - the full schema
 * @param methodName - the method name
 * @returns the dereferenced schema
 */
export const dereferenceSchema = (
  fullSchema: JSONSchema7,
  methodName: string,
): DereferencedSchemaType => {
  if (!fullSchema || !fullSchema.definitions) {
    throw new Error("Full schema is required");
  }
  // Get the method schema
  const methodSchema = fullSchema.definitions[methodName];

  if (!methodSchema || typeof methodSchema === "boolean") {
    throw new Error(`Method ${methodName} not found in schema`);
  }
  const methodSchemaObj = methodSchema;

  // Get the args properties and required fields implemented under `argsAndRequired`
  // https://github.com/stellar/js-stellar-sdk/blob/38115a16ed3fbc5d868ae8b1ab3042cf8a0c3399/src/contract/spec.ts
  const argsProperties = methodSchemaObj.properties?.args as JSONSchema7;
  const requiredFields = argsProperties?.required ?? [];
  const resolvedSchema = resolveNestedSchema(argsProperties, fullSchema);

  return {
    name: methodName,
    description: methodSchemaObj.description ?? "",
    properties:
      typeof resolvedSchema === "object" &&
      resolvedSchema &&
      "properties" in resolvedSchema
        ? (resolvedSchema.properties as Record<string, JSONSchema7Definition>)
        : {},
    required: requiredFields,
    additionalProperties: methodSchemaObj.additionalProperties ?? false,
    type: "object",
  };
};
````

## File: src/debug/util/fetchTxSignatures.ts
````typescript
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NetworkHeaders } from "../types/types";
import {
  FeeBumpTransaction,
  hash,
  Keypair,
  StrKey,
  TransactionBuilder,
} from "@stellar/stellar-sdk";

export const fetchTxSignatures = async ({
  txXdr,
  networkUrl,
  networkPassphrase,
  headers,
}: {
  txXdr: string;
  networkUrl: string;
  networkPassphrase: string;
  headers: NetworkHeaders;
}) => {
  try {
    let tx = TransactionBuilder.fromXDR(txXdr, networkPassphrase);

    type SourceAccount = {
      [key: string]: {
        weight: number;
        key: string;
        type: string;
      }[];
    };

    type GroupedSignature = [{ sig: Buffer }[], Buffer];

    type SigObj = {
      sig: Buffer;
      isValid?: boolean;
    };

    // Extract all source accounts from transaction (base transaction, and all operations)
    const sourceAccounts: SourceAccount = {};

    // tuple of signatures and transaction hash. This is needed to handle
    // inner signatures in a fee bump transaction
    const groupedSignatures: GroupedSignature[] = [];

    // Inner transaction
    if (tx instanceof FeeBumpTransaction) {
      sourceAccounts[convertMuxedAccountToEd25519Account(tx.feeSource)] = [];
      groupedSignatures.push([
        tx.signatures.map((x) => ({ sig: x.signature() })),
        tx.hash(),
      ]);

      tx = tx.innerTransaction;
    }

    sourceAccounts[convertMuxedAccountToEd25519Account(tx.source)] = [];

    tx.operations.forEach((op) => {
      if (op.source) {
        sourceAccounts[convertMuxedAccountToEd25519Account(op.source)] = [];
      }
    });

    groupedSignatures.push([
      tx.signatures.map((x) => ({ sig: x.signature() })),
      tx.hash(),
    ]);

    const accounts = Object.keys(sourceAccounts);

    // Get all signers per source account
    for (let i = 0; i < accounts.length; i++) {
      const srcAccount = accounts[i];

      try {
        const res = await fetch(`${networkUrl}/accounts/${srcAccount}`, {
          headers,
        });
        const resJson = await res.json();

        if (sourceAccounts[srcAccount] && resJson?.signers) {
          sourceAccounts[srcAccount] = resJson.signers;
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        // Do nothing
      }
    }

    const allSigners = Object.values(sourceAccounts).reduce((res, cur) => {
      return [...res, ...cur];
    }, []);

    return groupedSignatures.reduce((result: SigObj[], group) => {
      const [sigs, txHash] = group;

      // We are only interested in checking if each of the signatures can be verified for some valid
      // signer for any of the source accounts in the transaction -- we are not taking into account
      // weights, or even if this signer makes sense.
      for (let i = 0; i < sigs.length; i++) {
        const sigObj: SigObj = sigs[i];

        let isValid = false;

        for (let j = 0; j < allSigners.length; j++) {
          const signer = allSigners[j];

          // By nature of pre-authorized transaction, we won't ever receive a pre-auth
          // tx hash in signatures array, so we can ignore pre-authorized transactions here.
          switch (signer.type) {
            case "sha256_hash":
              // eslint-disable-next-line no-case-declarations
              const hashXSigner = StrKey.decodeSha256Hash(signer.key);
              // eslint-disable-next-line no-case-declarations
              const hashXSignature = hash(sigObj.sig);
              isValid = hashXSigner.equals(hashXSignature);
              break;
            case "ed25519_public_key":
              // eslint-disable-next-line no-case-declarations
              const keypair = Keypair.fromPublicKey(signer.key);
              isValid = keypair.verify(txHash, sigObj.sig);
              break;
            default:
            // Do nothing
          }

          if (isValid) {
            break;
          }
        }

        sigObj.isValid = isValid;

        result.push(sigObj);
      }

      return result;
    }, []);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return [];
  }
};

const convertMuxedAccountToEd25519Account = (account: string) => {
  // TODO: handle muxed account
  return account;
};
````

## File: src/debug/util/formatAmount.ts
````typescript
export const formatAmount = (amount: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 7,
  });

  return formatter.format(amount);
};
````

## File: src/debug/util/getNetworkHeaders.ts
````typescript
import { EmptyObj, Network } from "../types/types";

export const getNetworkHeaders = (
  network: Network | EmptyObj,
  method: "horizon" | "rpc",
) => {
  if (method === "rpc" && network.rpcHeaderName) {
    return { [network.rpcHeaderName]: network.rpcHeaderValue || "" };
  } else if (method === "horizon" && network.horizonHeaderName) {
    return {
      [network.horizonHeaderName]: network.horizonHeaderValue || "",
    };
  }

  return {};
};
````

## File: src/debug/util/getWasmContractData.ts
````typescript
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as StellarXdr from "./StellarXdr";
import { prettifyJsonString } from "./prettifyJsonString";
import {
  CONTRACT_SECTIONS,
  ContractData,
  ContractSectionName,
} from "../types/types";

export const getWasmContractData = async (wasmBytes: Buffer) => {
  try {
    const mod = await WebAssembly.compile(wasmBytes as BufferSource);

    const result: Record<ContractSectionName, ContractData> = {
      contractmetav0: {},
      contractenvmetav0: {},
      contractspecv0: {},
    };

    // Make sure the StellarXdr is available
    await StellarXdr.initialize();

    for (const sectionName of CONTRACT_SECTIONS) {
      const sections = WebAssembly.Module.customSections(mod, sectionName);

      if (sections.length > 0) {
        for (let i = 0; i < sections.length; i++) {
          const sectionData = sectionResult(sectionName, sections[i]);

          if (sectionData) {
            result[sectionName] = sectionData;
          }
        }
      }
    }

    return result;
  } catch (e) {
    console.error("Error getting wasm contract data:", e);
    return null;
  }
};

const sectionResult = (
  sectionName: ContractSectionName,
  section: ArrayBuffer,
) => {
  const sectionData = new Uint8Array(section);
  const sectionXdr = Buffer.from(sectionData).toString("base64");
  const { json, xdr } = getJsonAndXdr(sectionName, sectionXdr);

  return {
    xdr,
    json,
    // TODO: add text format
  };
};

const TYPE_VARIANT: Record<ContractSectionName, string> = {
  contractenvmetav0: "ScEnvMetaEntry",
  contractmetav0: "ScMetaEntry",
  contractspecv0: "ScSpecEntry",
};

const getJsonAndXdr = (sectionName: ContractSectionName, xdr: string) => {
  try {
    const jsonStringArray = StellarXdr.decode_stream(
      TYPE_VARIANT[sectionName],
      xdr,
    );

    return {
      json: jsonStringArray.map((s: string) => prettifyJsonString(s)),
      xdr: jsonStringArray.map((s: string) =>
        StellarXdr.encode(TYPE_VARIANT[sectionName], s),
      ),
    };
  } catch (e) {
    return { json: [], xdr: [] };
  }
};
````

## File: src/debug/util/isEmptyObject.ts
````typescript
import { AnyObject } from "../types/types";

export const isEmptyObject = (obj: AnyObject) => {
  return Object.keys(obj).length === 0;
};
````

## File: src/debug/util/jsonSchema.ts
````typescript
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import type { JSONSchema7 } from "json-schema";

import type { AnyObject } from "../types/types";
import { set } from "lodash";

/**
 * For a path like 'requests.1.request_type':
 *
 * obj = {
 *   requests: [
 *     { address: "", amount: "", request_type: "" },
 *     { address: "", amount: "", request_type: "" }
 *   ]
 * }
 *
 * path = "requests.1.request_type"
 * val = e.target.value
 *
 * This will update the value of requests[1].request_type
 */
const setDeepValue = (
  obj: AnyObject,
  path: string,
  val: AnyObject,
): AnyObject => {
  if (!obj) return {};
  const newObj = JSON.parse(JSON.stringify(obj));
  return set(newObj, path, val);
};

const isTaggedUnion = (schema: JSONSchema7): boolean => {
  return Boolean(
    schema.properties?.tag &&
      schema.properties?.values &&
      schema.required?.includes("tag") &&
      schema.required?.includes("values"),
  );
};

const getNestedItemLabel = (path: string): string => {
  const keys = parsePath(path);

  return keys[keys.length - 1] ? keys[keys.length - 1].toString() : "";
};

const parsePath = (path: string): (string | number)[] =>
  path.split(".").map((key) => {
    const parsed = Number(key);

    return isNaN(parsed) ? key : parsed;
  });

const getSchemaType = (prop: AnyObject) => {
  if (!prop) return undefined;

  if (prop.$ref) {
    return (prop.$ref as string).replace("#/definitions/", "");
  }

  if (prop.oneOf) {
    return "oneOf";
  }

  return prop.type;
};

const isSchemaObject = (
  schema: JSONSchema7 | AnyObject,
): schema is JSONSchema7 =>
  schema && typeof schema === "object" && !Array.isArray(schema);

const getSchemaItems = (schema: JSONSchema7 | AnyObject) => {
  if (schema.items && typeof schema.items !== "boolean") {
    if ((schema.items as AnyObject).properties) {
      return (schema.items as AnyObject).properties;
    }
    return schema.items;
  }
  return {};
};

const getSchemaProperty = (
  schema: JSONSchema7 | AnyObject,
  key: string,
): JSONSchema7 | undefined => {
  if (!isSchemaObject(schema) || !schema.properties) return undefined;
  const prop = schema.properties[key];
  return isSchemaObject(prop as JSONSchema7)
    ? (prop as JSONSchema7)
    : undefined;
};

const isTuple = (schema: AnyObject) => {
  return schema.type === "array" && Array.isArray(schema.items);
};

const hasAnyValidationPassed = (errors: (string | false)[]): boolean =>
  errors.some((error) => error === false);

const deleteNestedItemError = (
  nestedKey: string[],
  formError: AnyObject,
  nameIndex: string,
) => {
  const newFormError = { ...formError };

  for (const item of nestedKey) {
    const deletedPath = [nameIndex, item].join(".");
    delete newFormError[deletedPath];
  }

  return newFormError;
};

export const jsonSchema = {
  setDeepValue,
  isSchemaObject,
  getNestedItemLabel,
  getSchemaType,
  getSchemaItems,
  getSchemaProperty,
  isTuple,
  isTaggedUnion,
  hasAnyValidationPassed,
  deleteNestedItemError,
};
````

## File: src/debug/util/loadContractMetada.ts
````typescript
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Server } from "@stellar/stellar-sdk/rpc";
import { network } from "../../contracts/util";
import { Contract } from "@stellar/stellar-sdk";
import { decode_stream, encode, initialize } from "./StellarXdr";
import {
  CONTRACT_SECTIONS,
  ContractData,
  ContractSectionName,
} from "../types/types";
import { prettifyJsonString } from "./prettifyJsonString";

export interface ContractMetadata {
  contractmetav0?: { [key: string]: string };
  contractenvmetav0?: { [key: string]: string };
  wasmHash?: string;
  wasmBinary?: string;
}

export const loadContractMetadata = async (contractId: string) => {
  try {
    const wasmHash = await loadWasmHash(contractId);
    if (!wasmHash) {
      throw new Error(`Failed to load WASM hash for contract ${contractId}`);
    }
    const wasm = await loadWasmBinary(wasmHash);
    if (!wasm) {
      throw new Error(`Failed to load WASM binary for hash ${wasmHash}`);
    }

    const wasmData = await getWasmContractData(wasm);

    const metadata = {
      contractmetav0:
        wasmData && wasmData.contractmetav0
          ? (wasmData.contractmetav0 as unknown)
          : undefined,

      contractenvmetav0:
        wasmData && wasmData.contractenvmetav0
          ? (wasmData.contractenvmetav0 as unknown)
          : undefined,
      wasmHash,
      wasmBinary: wasm.toString("hex"),
    };

    return { ...metadata } as ContractMetadata;
  } catch (error) {
    console.error(`Failed to load contract metadata for ${contractId}:`, error);
    return {};
  }
};

const loadWasmHash = async (contractId: string) => {
  try {
    const server = new Server(network.rpcUrl, { allowHttp: true });

    const contractLedgerKey = new Contract(contractId).getFootprint();
    const response = await server.getLedgerEntries(contractLedgerKey);
    if (!response.entries.length || !response.entries[0]?.val) {
      throw new Error(`No entries found for contract ${contractId}`);
    }
    const wasmHash = response.entries[0].val
      .contractData()
      .val()
      .instance()
      .executable()
      .wasmHash()
      .toString("hex");

    return wasmHash;
  } catch (error) {
    console.error(`Failed to load contract metadata for ${contractId}:`, error);
    return null;
  }
};

const loadWasmBinary = async (wasmHash: string) => {
  try {
    const server = new Server(network.rpcUrl, { allowHttp: true });

    return await server.getContractWasmByHash(wasmHash, "hex");
  } catch (error) {
    console.error(`Failed to load contract metadata for ${wasmHash}:`, error);
    return null;
  }
};

export const getWasmContractData = async (wasmBytes: Buffer) => {
  try {
    const mod = await WebAssembly.compile(wasmBytes as BufferSource);
    const result: Record<ContractSectionName, ContractData> = {
      contractmetav0: {},
      contractenvmetav0: {},
      contractspecv0: {},
    };

    // Make sure the StellarXdr is available
    await initialize();

    for (const sectionName of CONTRACT_SECTIONS) {
      const sections = WebAssembly.Module.customSections(mod, sectionName);

      if (sections.length > 0) {
        for (let i = 0; i < sections.length; i++) {
          const sectionData = sectionResult(sectionName, sections[i]);

          if (sectionData) {
            let sectionContent = {};
            sectionData.json.forEach((json) => {
              const sectionDataJson = JSON.parse(json);
              Object.keys(sectionDataJson).map((key) =>
                sectionDataJson[key].key
                  ? (sectionContent = {
                      ...sectionContent,

                      [sectionDataJson[key].key]: sectionDataJson[key].val,
                    })
                  : Object.keys(sectionDataJson[key]).map((innerKey) => {
                      sectionContent = {
                        ...sectionContent,
                        [innerKey]: sectionDataJson[key][innerKey],
                      };
                    }),
              );
            });

            result[sectionName] = {
              ...result[sectionName],
              ...sectionContent,
            };
          }
        }
      }
    }

    return result;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return null;
  }
};

const sectionResult = (
  sectionName: ContractSectionName,
  section: ArrayBuffer,
) => {
  const sectionData = new Uint8Array(section);
  const sectionXdr = Buffer.from(sectionData).toString("base64");
  const { json, xdr } = getJsonAndXdr(sectionName, sectionXdr);

  return {
    xdr,
    json,
    // TODO: add text format
  };
};

const TYPE_VARIANT: Record<ContractSectionName, string> = {
  contractenvmetav0: "ScEnvMetaEntry",
  contractmetav0: "ScMetaEntry",
  contractspecv0: "ScSpecEntry",
};

const getJsonAndXdr = (sectionName: ContractSectionName, xdr: string) => {
  try {
    const jsonStringArray = decode_stream(TYPE_VARIANT[sectionName], xdr);

    return {
      json: jsonStringArray.map((s) => prettifyJsonString(s)),
      xdr: jsonStringArray.map((s) => encode(TYPE_VARIANT[sectionName], s)),
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return { json: [], xdr: [] };
  }
};
````

## File: src/debug/util/parseToLosslessJson.ts
````typescript
import { parse, isNumber } from "lossless-json";
import { AnyObject } from "../types/types";

export const parseToLosslessJson = (stringObj: string) => {
  return parse(stringObj, null, (value) => {
    if (isNumber(value)) {
      return BigInt(value);
    }

    return value;
  }) as AnyObject;
};
````

## File: src/debug/util/prettifyJsonString.ts
````typescript
import { stringify } from "lossless-json";
import { parseToLosslessJson } from "./parseToLosslessJson";

export const prettifyJsonString = (jsonString: string): string => {
  try {
    const parsedJson = parseToLosslessJson(jsonString);
    return stringify(parsedJson, null, 2) || "";
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return jsonString;
  }
};
````

## File: src/debug/util/sanitizeArray.ts
````typescript
export const sanitizeArray = (array: unknown[]) => {
  return array.filter((i) => Boolean(i));
};
````

## File: src/debug/util/sanitizeObject.ts
````typescript
import { isEmptyObject } from "./isEmptyObject";
import { AnyObject } from "../types/types";

export const sanitizeObject = <T extends AnyObject>(
  obj: T,
  noEmptyObj = false,
) => {
  return Object.keys(obj).reduce((res, param) => {
    const paramValue = obj[param];

    const emptyObj = noEmptyObj && isEmptyObject(paramValue as AnyObject);

    if (paramValue && !emptyObj) {
      return { ...res, [param]: paramValue };
    }

    return res;
  }, {} as T);
};
````

## File: src/debug/util/signatureHint.ts
````typescript
import { Keypair } from "@stellar/stellar-sdk";

export const signatureHint = (value: string) => {
  // strkey encoding is using base32 encoding. Encoded public key consists of:
  //
  //  * 1 byte version byte (0x30 encoded as `G`)
  //  * 32 bytes public key
  //  * 2 bytes checksum
  //
  // Because base32 symbols are 5-bit, more than one symbol is needed to represent a single byte.
  // Signature Hint is the last 4 bytes of the public key. So we need to try to show as many 5-bit
  // chunks as possible included between bytes 30 and 33 (included).
  //
  // byte 1: ##### ###
  // byte 2:          ## ##### #
  // byte 3:                    #### ####
  // byte 4:                             # ##### ##
  // byte 5:                                       ### #####  <---------- 40 bits / full alignment
  // byte 6:                                                ##### ###
  // byte 7:                                                         ## ##### #
  //
  // .....
  //
  // byte 26: ##### ###
  // byte 27:          ## ##### #
  // byte 28:                    #### ####                    full b32 symbols
  // byte 29:                             # ##### ##    |--------------------------|
  // byte 30:                                       ### 48###                      |
  // byte 31:                  Signature Hint start |        49### 50#             |    Signature Hint end
  // byte 32:                                                         ## 51### 5   |    |
  // byte 33:                                                                   2### 53##
  // byte 34:                                                                            # 54### 55
  // byte 35:                                                                                      ### 56###

  const hintBytes = Buffer.from(value, "hex");
  const partialPublicKey = Buffer.concat([Buffer.alloc(28, 0), hintBytes]);

  const keypair = new Keypair({
    type: "ed25519",
    publicKey: partialPublicKey,
  });

  return `G${Buffer.alloc(46, "-").toString()}${keypair.publicKey().substring(47, 52)}${Buffer.alloc(4, "-").toString()}`;
};
````

## File: src/debug/util/sorobanUtils.ts
````typescript
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Address,
  Contract,
  Operation,
  TransactionBuilder,
  xdr,
  Account,
  Memo,
  SorobanDataBuilder,
  Transaction,
  BASE_FEE,
  nativeToScVal,
  OperationOptions,
} from "@stellar/stellar-sdk";

// import { TransactionBuildParams } from "@/store/createStore";
import {
  AnyObject,
  SorobanInvokeValue,
  SorobanOpType,
  TxnOperation,
} from "../types/types";
import { TransactionBuildParams } from "../types/types";

export const isSorobanOperationType = (operationType: string) =>
  [
    "extend_footprint_ttl",
    "restore_footprint",
    "invoke_contract_function",
    "invokeHostFunction",
  ].includes(operationType);

// https://developers.stellar.org/docs/learn/glossary#ledgerkey
// https://developers.stellar.org/docs/build/guides/archival/restore-data-js
// Setup contract data xdr that will be used to build Soroban Transaction Data
// Used for Soroban Operation "restore_footprint" and "extend_footprint_ttl"
// "invoke_contract_function" uses the returned soroban transaction data from simulateTransaction
export const getContractDataXDR = ({
  contractAddress,
  dataKey,
  durability,
}: {
  contractAddress: string;
  dataKey: string;
  durability: string;
}) => {
  const contract: Contract = new Contract(contractAddress);
  const address: Address = Address.fromString(contract.contractId());
  const xdrBinary = Buffer.from(dataKey, "base64");

  const getXdrDurability = (durability: string) => {
    switch (durability) {
      case "persistent":
        return xdr.ContractDataDurability.persistent();
      // https://developers.stellar.org/docs/build/guides/storage/choosing-the-right-storage#temporary-storage
      // TTL for the temporary data can be extended; however,
      // it is unsafe to rely on the extensions to preserve data since
      // there is always a risk of losing temporary data
      case "temporary":
        return xdr.ContractDataDurability.temporary();
      default:
        return xdr.ContractDataDurability.persistent();
    }
  };

  return xdr.LedgerKey.contractData(
    new xdr.LedgerKeyContractData({
      contract: address.toScAddress(),
      key: xdr.ScVal.fromXDR(xdrBinary),
      durability: getXdrDurability(durability),
    }),
  );
};

export const getSorobanTxData = ({
  contractDataXDR,
  operationType,
  fee,
}: {
  contractDataXDR: xdr.LedgerKey;
  operationType: SorobanOpType;
  fee: string;
}): xdr.SorobanTransactionData | undefined => {
  switch (operationType) {
    case "extend_footprint_ttl":
      return buildSorobanData({
        readOnlyXdrLedgerKey: [contractDataXDR],
        resourceFee: fee,
      });
    case "restore_footprint":
      return buildSorobanData({
        readWriteXdrLedgerKey: [contractDataXDR],
        resourceFee: fee,
      });
    default:
      return undefined;
  }
};

export const buildTxWithSorobanData = ({
  sorobanData,
  params,
  sorobanOp,
  networkPassphrase,
}: {
  sorobanData?: xdr.SorobanTransactionData | string;
  params: TransactionBuildParams;
  sorobanOp: TxnOperation;
  networkPassphrase: string;
}): Transaction => {
  // decrement seq number by 1 because TransactionBuilder.build()
  // will increment the seq number by 1 automatically
  const txSeq = (BigInt(params.seq_num) - BigInt(1)).toString();
  const account = new Account(params.source_account, txSeq);

  // https://developers.stellar.org/docs/learn/fundamentals/fees-resource-limits-metering
  const totalTxFee =
    BigInt(params.fee) + BigInt(String(sorobanOp.params.resource_fee));

  const getMemoValue = (memoType: string, memoValue: string) => {
    switch (memoType) {
      case "text":
        return Memo.text(memoValue);
      case "id":
        return Memo.id(memoValue);
      case "hash":
        return Memo.hash(memoValue);
      case "return":
        return Memo.return(memoValue);
      default:
        return Memo.none();
    }
  };

  const getTimeboundsValue = (timebounds: {
    min_time: string;
    max_time: string;
  }) => {
    return {
      minTime: timebounds.min_time,
      maxTime: timebounds.max_time,
    };
  };

  const getSorobanOp = (operationType: string) => {
    switch (operationType) {
      case "extend_footprint_ttl":
        return Operation.extendFootprintTtl({
          extendTo: Number(sorobanOp.params.extend_ttl_to),
          source: sorobanOp.source_account,
        });
      case "restore_footprint":
        return Operation.restoreFootprint({});
      case "invoke_contract_function":
        return Operation.invokeContractFunction({
          contract: sorobanOp.params.contract_id,
          function: sorobanOp.params.function_name,
          args: sorobanOp.params.args,
          auth: sorobanOp.params.auth,
          source: sorobanOp.source_account,
        } as OperationOptions.InvokeContractFunction);
      default:
        throw new Error(`Unsupported Soroban operation type: ${operationType}`);
    }
  };

  const transaction = new TransactionBuilder(account, {
    fee: totalTxFee.toString(),
    timebounds: getTimeboundsValue(params.cond.time),
  });

  if (Object.keys(params.memo).length > 0) {
    const [type, val] = Object.entries(params.memo)[0];
    transaction.addMemo(getMemoValue(type, val));
  }

  return transaction
    .setNetworkPassphrase(networkPassphrase)
    .setSorobanData(sorobanData || "")
    .addOperation(getSorobanOp(sorobanOp.operation_type))
    .build();
};

export const getTxnToSimulate = (
  value: SorobanInvokeValue,
  txnParams: TransactionBuildParams,
  operation: TxnOperation,
  networkPassphrase: string,
): { xdr: string; error: string } => {
  try {
    const argsToScVals = getScValsFromArgs(value.args, []);
    const builtXdr = buildTxWithSorobanData({
      params: txnParams,
      sorobanOp: {
        ...operation,
        params: {
          ...operation.params,
          contract_id: value.contract_id,
          function_name: value.function_name,
          args: argsToScVals,
          resource_fee: BASE_FEE, // bogus resource fee for simulation purpose
        },
      },
      networkPassphrase,
    });

    return { xdr: builtXdr.toXDR(), error: "" };
  } catch (e: unknown) {
    return { xdr: "", error: (e as Error).message };
  }
};

const isMap = (arg: unknown) => {
  try {
    return (
      Array.isArray(arg) &&
      arg.every((obj: AnyObject) => {
        // Check if object has exactly two keys: "0" and "1"
        const keys = Object.keys(obj as object);
        if (keys.length !== 2 || !keys.includes("0") || !keys.includes("1")) {
          return false;
        }

        // Check if "0" key has value and type
        if (
          !obj["0"] ||
          typeof obj["0"] !== "object" ||
          !("value" in obj["0"]) ||
          !("type" in obj["0"])
        ) {
          return false;
        }

        // "1" can be either a simple value with type, or a complex value (array, enum, etc)
        return true;
      })
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e: unknown) {
    return false;
  }
};

const getScValFromArg = (arg: unknown, scVals: xdr.ScVal[]): xdr.ScVal => {
  // Handle array of arrays with numeric objects
  if (Array.isArray(arg) && arg.length > 0) {
    const arrayScVals = arg.map((subArray) => {
      if (Array.isArray(subArray) && isMap(subArray)) {
        const { mapVal, mapType } = convertObjectToMap(subArray);

        if (Object.keys(mapVal).length > 1) {
          const items = Object.keys(mapVal);

          const mapScValOne = nativeToScVal(mapVal[items[0]], {
            type: mapType[items[0]],
          });

          scVals.push(mapScValOne);

          const mapScValTwo = nativeToScVal(mapVal[items[1]], {
            type: mapType[items[1]],
          });

          scVals.push(mapScValTwo);
        }

        return nativeToScVal(mapVal, { type: mapType });
      }
      return getScValFromArg(subArray, scVals);
    });

    return xdr.ScVal.scvVec(arrayScVals);
  }

  return getScValsFromArgs({ arg: arg as AnyObject }, scVals || [])[0];
};

const convertValuesToScVals = (
  values: unknown[],
  scVals: xdr.ScVal[],
): xdr.ScVal[] => {
  return values.map((v) => {
    return getScValFromArg(v, scVals);
  });
};

const convertEnumToScVal = (
  obj: Record<string, unknown>,
  scVals?: xdr.ScVal[],
) => {
  // TUPLE CASE
  if (obj.tag && obj.values) {
    const tagVal = nativeToScVal(obj.tag, { type: "symbol" });
    const valuesVal = convertValuesToScVals(
      obj.values as unknown[],
      scVals || [],
    );
    const tupleScValsVec = xdr.ScVal.scvVec([tagVal, ...valuesVal]);

    return tupleScValsVec;
  }

  // ENUM CASE
  const tagVec = [obj.tag];
  return nativeToScVal(tagVec, { type: "symbol" });
};

const convertObjectToScVal = (obj: Record<string, unknown>): xdr.ScVal => {
  const convertedValue: Record<string, unknown> = {};
  const typeHints: Record<string, unknown> = {};
  // obj input example:
  //  {
  //    "address": {
  //      "value": "CDVQVKOY2YSXS2IC7KN6MNASSHPAO7UN2UR2ON4OI2SKMFJNVAMDX6DP",
  //      "type": "Address"
  //    },
  //    "amount": {
  //      "value": "2",
  //      "type": "I128"
  //    },
  //    "request_type": {
  //      "value": "4",
  //      "type": "U32"
  //    }
  //  }

  //  for an array of objects, `nativeToScVal` expects the following type for `val`:
  //  https://stellar.github.io/js-stellar-sdk/global.html#nativeToScVal
  //  {
  //     "address": "CDVQVKOY2YSXS2IC7KN6MNASSHPAO7UN2UR2ON4OI2SKMFJNVAMDX6DP",
  //     "amount": "2",
  //     "request_type": "2"
  //  }
  //  for `type`, it expects the following type:
  //   {
  //     "address": [
  //       "symbol", // matching the key type
  //       "address" // matching the value type
  //     ],
  //     "amount": [
  //       "symbol", // matching the key type
  //       "i128" // matching the value type
  //     ],
  //     "request_type": [
  //       "symbol", // matching the key type
  //       "u32" // matching the value type
  //     ]
  //  }

  for (const key in obj) {
    if (
      obj[key] &&
      typeof obj[key] === "object" &&
      "type" in obj[key] &&
      obj[key].type === "bool" &&
      "value" in obj[key] &&
      typeof obj[key].value === "string"
    ) {
      convertedValue[key] = obj[key].value === "true" ? true : false;
      typeHints[key] = ["symbol"];
    } else {
      convertedValue[key] = (obj[key] as AnyObject).value;
      typeHints[key] = ["symbol", (obj[key] as AnyObject).type];
    }
  }

  return nativeToScVal(convertedValue, { type: typeHints });
};

type MapPair = {
  "0": { value: string; type: string };
  "1": { value?: string; type?: string } | unknown[] | boolean;
};

const convertObjectToMap = (
  mapArray: MapPair[],
): { mapVal: Record<string, unknown>; mapType: Record<string, unknown> } => {
  const mapVal = mapArray.reduce(
    (acc: Record<string, unknown>, pair: MapPair) => {
      if (Array.isArray(pair["1"])) {
        const valueScVal = getScValFromArg(pair["1"], []);
        acc[pair["0"].value] = valueScVal;
      } else {
        acc[pair["0"].value] =
          (pair["1"] as { value: string }).value === "true";
      }
      return acc;
    },
    {},
  );

  const mapType = mapArray.reduce(
    (acc: Record<string, unknown>, pair: MapPair) => {
      acc[pair["0"].value] = [
        pair["0"].type,
        (pair["1"] as { type: string }).type,
      ];
      return acc;
    },
    {},
  );

  return { mapVal, mapType };
};

type TupleValue = {
  value: unknown;
  type: string;
};

const convertTupleToScVal = (tupleArray: TupleValue[]) => {
  const tupleScVals = tupleArray.map((v) => {
    if (v.type === "bool") {
      const boolValue = v.value === "true";
      return nativeToScVal(boolValue);
    }
    if (v.type === "bytes" && typeof v.value === "string") {
      return nativeToScVal(new Uint8Array(Buffer.from(v.value, "base64")));
    }
    return nativeToScVal(v.value, { type: v.type });
  });

  // JS SDK's nativeToScval doesn't support an array of different types
  // so we need to use xdr.ScVal.scvVec
  return xdr.ScVal.scvVec(tupleScVals);
};

type PrimitiveArg = { type: string; value: unknown };
type EnumArg = { tag: string; values?: unknown[] };

const getScValFromPrimitive = (v: PrimitiveArg) => {
  if (v.type === "bool") {
    const boolValue = v.value === "true";
    return nativeToScVal(boolValue);
  }
  if (v.type === "bytes" && typeof v.value === "string") {
    return nativeToScVal(new Uint8Array(Buffer.from(v.value, "base64")));
  }
  return nativeToScVal(v.value, { type: v.type });
};

const getScValsFromArgs = (
  args: SorobanInvokeValue["args"],
  scVals: xdr.ScVal[] = [],
): xdr.ScVal[] => {
  // PRIMITIVE CASE
  if (
    Object.values(args).every(
      (v): v is PrimitiveArg =>
        typeof v === "object" && v !== null && "type" in v && "value" in v,
    )
  ) {
    const primitiveScVals = Object.values(args).map((v) =>
      getScValFromPrimitive(v as PrimitiveArg),
    );
    return primitiveScVals;
  }

  // ENUM (VOID AND COMPLEX ONE LIKE TUPLE) CASE
  if (
    Object.values(args).some(
      (v): v is EnumArg => typeof v === "object" && v !== null && "tag" in v,
    )
  ) {
    const enumScVals = Object.values(args).map((v) =>
      convertEnumToScVal(v as EnumArg, scVals),
    );
    return enumScVals;
  }

  for (const argKey in args) {
    const argValue = args[argKey];

    // Check if it's an array of map objects
    if (Array.isArray(argValue)) {
      // MAP CASE
      if (isMap(argValue)) {
        const { mapVal, mapType } = convertObjectToMap(argValue);
        const mapScVal = nativeToScVal(mapVal, { type: mapType });
        scVals.push(mapScVal);
        return scVals;
      }

      // VEC CASE #1: array of objects or complicated tuple case
      if (argValue.some((v) => typeof Object.values(v)[0] === "object")) {
        const arrayScVals = argValue.map((v) => {
          if (v.tag) {
            return convertEnumToScVal(v, scVals);
          }
          return convertObjectToScVal(v);
        });

        const tupleScValsVec = xdr.ScVal.scvVec(arrayScVals);

        scVals.push(tupleScValsVec);
        return scVals;
      }

      // VEC CASE #2: array of primitives
      const isVecArray = argValue.every((v) => {
        return v.type === argValue[0].type;
      });

      if (isVecArray) {
        const arrayScVals = argValue.reduce((acc, v) => {
          if (v.type === "bool") {
            acc.push(v.value === "true" ? true : false);
          } else if (v.type === "bytes") {
            acc.push(new Uint8Array(Buffer.from(v.value, "base64")));
          } else {
            acc.push(v.value);
          }
          return acc;
        }, []);

        const scVal = nativeToScVal(arrayScVals, {
          type: argValue[0].type,
        });

        scVals.push(scVal);
        return scVals;
      }

      // TUPLE CASE
      const isTupleArray = argValue.every((v: AnyObject) => v.type && v.value);
      if (isTupleArray) {
        const tupleScValsVec = convertTupleToScVal(argValue);

        scVals.push(tupleScValsVec);
        return scVals;
      }
    }

    // OBJECT CASE
    if (
      Object.values(argValue as object).every(
        (v: AnyObject) => v.type && v.value,
      )
    ) {
      const convertedObj = convertObjectToScVal(argValue as AnyObject);
      scVals.push(nativeToScVal(convertedObj));
      return scVals;
    }

    if (
      typeof argValue === "object" &&
      argValue &&
      "type" in argValue &&
      "value" in argValue &&
      argValue.type &&
      argValue.value
    ) {
      scVals.push(getScValFromPrimitive(argValue as PrimitiveArg));
    }
  }

  return scVals;
};

// supports building xdr.SorobanTransactionData that
// will be included in TransactionBuilder.setSorobanData()
// used in "extend_footprint_ttl" and "restore_footprint" operation
// https://stellar.github.io/js-stellar-sdk/SorobanDataBuilder.html
const buildSorobanData = ({
  readOnlyXdrLedgerKey = [],
  readWriteXdrLedgerKey = [],
  resourceFee,
  //   instructions
  //   ReadableByteStreamController,
}: {
  readOnlyXdrLedgerKey?: xdr.LedgerKey[];
  readWriteXdrLedgerKey?: xdr.LedgerKey[];
  resourceFee: string;
}) => {
  return new SorobanDataBuilder()
    .setReadOnly(readOnlyXdrLedgerKey)
    .setReadWrite(readWriteXdrLedgerKey)
    .setResourceFee(resourceFee)
    .build();
};

export const convertSpecTypeToScValType = (type: string) => {
  switch (type) {
    case "Address":
      return "address";
    case "U32":
      return "u32";
    case "U64":
      return "u64";
    case "U128":
      return "u128";
    case "U256":
      return "u256";
    case "I32":
      return "i32";
    case "I64":
      return "i64";
    case "I128":
      return "i128";
    case "I256":
      return "i256";
    case "ScString":
      return "string";
    case "ScSymbol":
      return "symbol";
    case "DataUrl":
      return "bytes";
    case "Bool":
      return "bool";
    default:
      return type;
  }
};
````

## File: src/debug/util/StellarXdr.ts
````typescript
import init, {
  decode,
  encode,
  guess,
  decode_stream,
} from "@stellar/stellar-xdr-json";

// A wrapper for the Stellar XDR JSON
declare global {
  interface Window {
    __STELLAR_XDR_INIT__?: boolean;
  }
}

const initialize = async () => {
  if (!window.__STELLAR_XDR_INIT__) {
    await init();
    window.__STELLAR_XDR_INIT__ = true;
  }
};

export { initialize, decode, decode_stream, encode, guess };
````

## File: src/debug/util/trim.ts
````typescript
// Regex explained: https://regexr.com/4v6jg
export const trim = (str: string, c = "\\s") =>
  str.replace(new RegExp(`^([${c}]*)(.*?)([${c}]*)$`), "$2");
````

## File: src/debug/util/xdrFraction.ts
````typescript
// This content is copied from js-stellar-base (src/util/continued_fraction.js)
import BigNumber from "bignumber.js";

const MAX_INT = ((1 << 31) >>> 0) - 1;

export function best_r(rawNumber: string | number | BigNumber) {
  let number = new BigNumber(rawNumber);
  let a;
  let f;
  const fractions = [
    [new BigNumber(0), new BigNumber(1)],
    [new BigNumber(1), new BigNumber(0)],
  ];
  let i = 2;

  while (true) {
    if (number.gt(MAX_INT)) {
      break;
    }
    a = number.integerValue(BigNumber.ROUND_FLOOR);
    f = number.minus(a);
    const h = a.times(fractions[i - 1][0]).plus(fractions[i - 2][0]);
    const k = a.times(fractions[i - 1][1]).plus(fractions[i - 2][1]);
    if (h.gt(MAX_INT) || k.gt(MAX_INT)) {
      break;
    }
    fractions.push([h, k]);
    if (f.eq(0)) {
      break;
    }
    number = new BigNumber(1).div(f);
    i += 1;
  }
  const [n, d] = fractions[fractions.length - 1];

  if (n.isZero() || d.isZero()) {
    throw new Error("Couldn't find approximation");
  }

  return [n.toNumber(), d.toNumber()];
}
````

## File: src/debug/util/xdrUtils.ts
````typescript
// XDR helpers from js-stellar-base
import { xdr } from "@stellar/stellar-sdk";
import BigNumber from "bignumber.js";
import { best_r } from "./xdrFraction";

const ONE = 10000000;

function toXDRAmount(value: string) {
  // Using BigNumber to handle decimal point values
  return BigInt(new BigNumber(value).times(ONE).toString());
}

function fromXDRAmount(value: string) {
  return new BigNumber(value).div(ONE).toFixed(7);
}

function toXDRPrice(price: string) {
  const approx = best_r(price);

  return {
    n: parseInt(approx[0].toString(), 10),
    d: parseInt(approx[1].toString(), 10),
  };
}

function fromXDRPrice(price: xdr.Price) {
  const n = new BigNumber(price.n());
  return n.div(new BigNumber(price.d())).toString();
}

export const xdrUtils = {
  toAmount: toXDRAmount,
  fromAmount: fromXDRAmount,
  toPrice: toXDRPrice,
  fromPrice: fromXDRPrice,
};
````

## File: src/debug/validate/methods/getAccountThresholdError.ts
````typescript
import { getPositiveIntError } from "./getPositiveIntError";

export const getAccountThresholdError = (value: string) => {
  const intError = getPositiveIntError(value);

  if (intError) {
    return intError;
  }

  if (Number(value) > 255) {
    return "Expected an integer between 0 and 255 (inclusive).";
  }

  return false;
};
````

## File: src/debug/validate/methods/getAmountError.ts
````typescript
export const getAmountError = (value: string) => {
  if (value.toString().charAt(0) === "-") {
    return "Amount can only be a positive number.";
  } else if (!value.toString().match(/^[0-9]*(\.[0-9]+){0,1}$/g)) {
    return "Amount can only contain numbers and a period for the decimal point.";
  } else if (value.toString().match(/\.([0-9]){8,}$/g)) {
    return "Amount can only support a precision of 7 decimals.";
  }

  return false;
};
````

## File: src/debug/validate/methods/getArrayOfStringsError.ts
````typescript
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export const getArrayOfStringsError = (value: string) => {
  if (typeof value !== "string") {
    return "Expected an array of strings.";
  }

  try {
    if (value.length > 0) {
      const parsedValue = JSON.parse(value);

      if (Array.isArray(parsedValue)) {
        for (const item of parsedValue) {
          if (typeof item !== "string") {
            return "All values in the array must be a string.";
          }
        }
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return "Expected an array.";
  }
  return false;
};
````

## File: src/debug/validate/methods/getAssetCodeError.ts
````typescript
import { AssetType } from "../../types/types";

export const getAssetCodeError = (
  code: string,
  assetType: AssetType | undefined,
  isRequired?: boolean,
) => {
  if (!code) {
    return isRequired ? "Asset code is required." : false;
  }

  let minLength;
  let maxLength;

  switch (assetType) {
    case "credit_alphanum4":
      minLength = 1;
      maxLength = 4;
      break;
    case "credit_alphanum12":
      minLength = 5;
      maxLength = 12;
      break;
    default:
      minLength = 1;
      maxLength = 12;
  }

  if (!code.match(/^[a-zA-Z0-9]+$/g)) {
    return "Asset code must consist of only letters and numbers.";
  } else if (code.length < minLength || code.length > maxLength) {
    return `Asset code must be between ${minLength} and ${maxLength} characters long.`;
  }

  return false;
};
````

## File: src/debug/validate/methods/getAssetError.ts
````typescript
import { isEmptyObject } from "../../util/isEmptyObject";
import {
  AssetError,
  AssetObjectValue,
  AssetPoolShareError,
  AssetPoolShareObjectValue,
} from "../../types/types";
import { getAssetCodeError } from "./getAssetCodeError";
import { getPublicKeyError } from "./getPublicKeyError";

export const getAssetError = (
  asset: AssetObjectValue | AssetPoolShareObjectValue | undefined,
): AssetError | AssetPoolShareError | false => {
  if (!asset?.type) {
    return false;
  }

  let invalid = {};

  if (asset?.type === "liquidity_pool_shares") {
    const poolSharesAssetVal = asset as AssetPoolShareObjectValue;

    invalid = Object.entries(poolSharesAssetVal).reduce((res, cur) => {
      const [key, val] = cur;

      if (["asset_a", "asset_b"].includes(key)) {
        const validatedAsset = validateAsset(val as AssetObjectValue);

        return isEmptyObject(validatedAsset)
          ? res
          : { ...res, [key]: validatedAsset };
      }

      return res;
    }, {} as AssetPoolShareError);
  } else {
    invalid = validateAsset(asset as AssetObjectValue);
  }

  return isEmptyObject(invalid) ? false : invalid;
};

const validateAsset = (asset: AssetObjectValue) => {
  if (asset?.type === "native") {
    return {};
  }

  return Object.entries({
    code: getAssetCodeError(asset?.code || "", asset?.type),
    issuer: getPublicKeyError(asset?.issuer || ""),
  }).reduce((res, cur) => {
    const [key, value] = cur;

    if (value) {
      return { ...res, [key]: value };
    }

    return res;
  }, {} as AssetError);
};
````

## File: src/debug/validate/methods/getAssetMultiError.ts
````typescript
import { isEmptyObject } from "../../util/isEmptyObject";
import { getAssetCodeError } from "./getAssetCodeError";
import { getPublicKeyError } from "./getPublicKeyError";
import { AssetObjectValue } from "../../types/types";
import { sanitizeArray } from "../../util/sanitizeArray";

export const getAssetMultiError = (
  assets: AssetObjectValue[] | undefined,
  isRequired?: boolean,
) => {
  const errors = assets?.map((asset) => {
    if (asset?.type && asset.type === "native") {
      return false;
    }

    const invalid = Object.entries({
      code: getAssetCodeError(asset?.code || "", asset?.type, isRequired),
      issuer: getPublicKeyError(asset?.issuer || "", isRequired),
    }).reduce((res, cur) => {
      const [key, value] = cur;

      if (value) {
        return { ...res, [key]: value };
      }

      return res;
    }, {});

    return isEmptyObject(invalid) ? false : invalid;
  });

  const sanitized = sanitizeArray(errors || []);

  return sanitized.length === 0 ? false : errors;
};
````

## File: src/debug/validate/methods/getBipPathError.ts
````typescript
export const getBipPathError = (value: string) => {
  const regexp = /44'\/148'\/(\d+)'/;
  const match = regexp.exec(value);

  if (!(match && match[1].length > 0)) {
    return "Invalid BIP path. Please provide it in format 44'/148'/x'. We call 44'/148'/0' the primary account";
  }

  return false;
};
````

## File: src/debug/validate/methods/getClaimableBalanceIdError.ts
````typescript
export const getClaimableBalanceIdError = (value: string) => {
  // 8b discriminant + 64b string
  if (value && value.length !== 8 + 64) {
    return "Claimable Balance ID is invalid.";
  }

  return false;
};
````

## File: src/debug/validate/methods/getClaimaintsError.ts
````typescript
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { isEmptyObject } from "../../util/isEmptyObject";
import { sanitizeObject } from "../../util/sanitizeObject";
import { sanitizeArray } from "../../util/sanitizeArray";
import { AnyObject } from "../../types/types";

import { getPublicKeyError } from "./getPublicKeyError";
import { getPositiveIntError } from "./getPositiveIntError";

export const getClaimaintsError = (val: AnyObject[]) => {
  if (!val || val.length === 0) {
    return false;
  }

  const invalid: (AnyObject | undefined)[] = [];

  val.forEach((claimant) => {
    const validate = {
      destination: claimant.destination
        ? getPublicKeyError(claimant.destination as string)
        : false,
      predicate:
        claimant.predicate && !isEmptyObject(claimant.predicate as AnyObject)
          ? validatePredicate(claimant.predicate as AnyObject)
          : false,
    };

    const sanitized = sanitizeObject(validate);

    invalid.push(isEmptyObject(sanitized) ? undefined : sanitized);
  });

  const sanitized = sanitizeArray(invalid);

  if (sanitized.length === 0) {
    return false;
  }

  return invalid.length > 0 ? invalid : false;
};

const validatePredicate = (predicate: AnyObject) => {
  const valid = validateEntry(predicate, {});

  return isEmptyObject(valid) ? undefined : valid;
};

const validateEntry = (
  entry: AnyObject,
  result: { [path: string]: string },
  parent?: string,
): AnyObject => {
  Object.entries(entry).forEach((entry) => {
    const [key, value] = entry;
    const path = parent ? `${parent}.${key}` : key;

    if (typeof value === "string") {
      const invalid = getPositiveIntError(value);

      if (invalid) {
        result[path] = invalid;
      }
    } else if (Array.isArray(value)) {
      value.forEach((v, idx) => validateEntry(v, result, `${path}[${idx}]`));
    } else if (typeof value === "object") {
      if (!isEmptyObject(value as AnyObject)) {
        validateEntry(value as AnyObject, result, path);
      }
    }
  });

  return result;
};
````

## File: src/debug/validate/methods/getContractIdError.ts
````typescript
import { StrKey } from "@stellar/stellar-sdk";

export const getContractIdError = (value: string) => {
  if (!StrKey.isValidContract(value)) {
    return "Invalid contract ID. Please enter a valid contract ID.";
  }

  return false;
};
````

## File: src/debug/validate/methods/getDataNameError.ts
````typescript
export const getDataNameError = (value: string) => {
  if (value.toString().length > 64) {
    return `Entry name can only contain a maximum of 64 characters. ${value.length} entered.`;
  }

  return false;
};
````

## File: src/debug/validate/methods/getDataUrlError.ts
````typescript
// Primitive Definition DataUrl comes from
// https://github.com/stellar/js-stellar-sdk/blob/master/src/contract/spec.ts#L159-L164
export const getDataUrlError = (value: string, isRequired?: boolean) => {
  if (!value) {
    if (isRequired) {
      return "This field is required.";
    } else {
      return false;
    }
  }
  // Check if value is a string
  if (typeof value !== "string") {
    return "Value must be a string";
  }

  // Check pattern for base64 data URL
  const dataUrlPattern =
    /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
  if (!dataUrlPattern.test(value)) {
    return "Value must be a valid base64 encoded string";
  }

  return false;
};
````

## File: src/debug/validate/methods/getDataValueError.ts
````typescript
export const getDataValueError = (value: string) => {
  const valueSize = Buffer.from(value).length;

  if (valueSize > 64) {
    return `Entry value can only contain a maximum of 64 bytes. ${valueSize} bytes entered.`;
  }

  return false;
};
````

## File: src/debug/validate/methods/getEventsFiltersError.ts
````typescript
import { FiltersObject } from "../../types/types";

import { getArrayOfStringsError } from "./getArrayOfStringsError";
import { getContractIdError } from "./getContractIdError";

export const getEventsFiltersError = (value: FiltersObject) => {
  const invalid = { contractId: false, topics: false };

  if (!value) {
    return true;
  }

  const is_contract_ids_empty = value.contract_ids.every(
    (id) => id.length === 0,
  );
  const is_topics_empty = value.contract_ids.every(
    (topic) => topic.length === 0,
  );

  if (is_contract_ids_empty) {
    invalid.contractId = true;
  }

  if (is_topics_empty) {
    invalid.topics = true;
  }

  value.contract_ids.forEach((val) => {
    if (val.length > 0) {
      const is_invalid = Boolean(getContractIdError(val));
      invalid.contractId = is_invalid;
    }
  });

  value.topics.forEach((val) => {
    if (val.length > 0) {
      const is_invalid = Boolean(getArrayOfStringsError(val));
      invalid.topics = is_invalid;
    }
  });

  return invalid.contractId || invalid.topics;
};
````

## File: src/debug/validate/methods/getHomeDomainError.ts
````typescript
export const getHomeDomainError = (value: string) => {
  const charLen = value.toString().length;

  if (charLen > 32) {
    return `Max length of home domain is 32 characters (got ${charLen}).`;
  }

  return false;
};
````

## File: src/debug/validate/methods/getI128Error.ts
````typescript
// Primitive Definition I128 comes from
// https://github.com/stellar/js-stellar-sdk/blob/master/src/contract/spec.ts#L128-L133
export const getI128Error = (value: string, isRequired?: boolean) => {
  if (!value) {
    if (isRequired) {
      return "This field is required.";
    } else {
      return false;
    }
  }
  // Check pattern for I128
  const i128Pattern = /^(-?[1-9][0-9]*|0)$/;
  if (!i128Pattern.test(value)) {
    return "Value must be a valid i128 integer";
  }

  // Check length constraints
  if (value.length < 1 || value.length > 40) {
    return "Value must be between 1 and 40 characters long";
  }

  try {
    const num = BigInt(value);
    const MIN_I128 = BigInt("-170141183460469231731687303715884105728");
    const MAX_I128 = BigInt("170141183460469231731687303715884105727");

    if (num < MIN_I128 || num > MAX_I128) {
      return "Value must be a valid i128 integer (-170141183460469231731687303715884105728 to 170141183460469231731687303715884105727)";
    }
  } catch {
    return "Value must be a valid i128 integer";
  }

  return false;
};
````

## File: src/debug/validate/methods/getI256Error.ts
````typescript
// Primitive Definition I256 comes from
// https://github.com/stellar/js-stellar-sdk/blob/master/src/contract/spec.ts#L140-L145
export const getI256Error = (value: string, isRequired?: boolean) => {
  if (!value) {
    if (isRequired) {
      return "This field is required.";
    } else {
      return false;
    }
  }
  // Check pattern for I256
  const i256Pattern = /^(-?[1-9][0-9]*|0)$/;
  if (!i256Pattern.test(value)) {
    return "Value must be a valid i256 integer";
  }

  // Check length constraints
  if (value.length < 1 || value.length > 79) {
    return "Value must be between 1 and 79 characters long";
  }

  try {
    // Ensure it can be parsed as a BigInt
    BigInt(value);
  } catch {
    return "Value must be a valid i256 integer";
  }

  return false;
};
````

## File: src/debug/validate/methods/getI32Error.ts
````typescript
// Primitive Definition I32 comes from
// https://github.com/stellar/js-stellar-sdk/blob/master/src/contract/spec.ts#L105-L109
export const getI32Error = (value: string, isRequired?: boolean) => {
  if (!value) {
    if (isRequired) {
      return "This field is required.";
    } else {
      return false;
    }
  }

  try {
    const num = BigInt(value);
    const MIN_I32 = BigInt("-2147483648");
    const MAX_I32 = BigInt("2147483647");

    if (num < MIN_I32 || num > MAX_I32) {
      return "Value must be a valid i32 integer (-2147483648 to 2147483647)";
    }
  } catch {
    return "Value must be a valid i32 integer";
  }

  return false;
};
````

## File: src/debug/validate/methods/getI64Error.ts
````typescript
// Primitive Definition I64 comes from
// https://github.com/stellar/js-stellar-sdk/blob/master/src/contract/spec.ts#L116C2-L121C5
export const getI64Error = (value: string, isRequired?: boolean) => {
  if (!value) {
    if (isRequired) {
      return "This field is required.";
    } else {
      return false;
    }
  }
  // Check pattern for I64
  const i64Pattern = /^(-?[1-9][0-9]*|0)$/;
  if (!i64Pattern.test(value)) {
    return "Value must be a valid i64 integer";
  }

  // Check length constraints
  if (value.length < 1 || value.length > 21) {
    return "Value must be between 1 and 21 characters long";
  }

  try {
    const num = BigInt(value);
    const MIN_I64 = BigInt("-9223372036854775808");
    const MAX_I64 = BigInt("9223372036854775807");

    if (num < MIN_I64 || num > MAX_I64) {
      return "Value must be a valid i64 integer (-9223372036854775808 to 9223372036854775807)";
    }
  } catch {
    return "Value must be a valid i64 integer";
  }

  return false;
};
````

## File: src/debug/validate/methods/getMemoError.ts
````typescript
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { capitalizeString } from "../../util/capitalizeString";
import { MemoType, MemoValue, xdr } from "@stellar/stellar-sdk";

export const getMemoError = (
  memo:
    | {
        type: MemoType | string | undefined;
        value: MemoValue | string | undefined;
      }
    | undefined,
) => {
  if (!memo?.value) {
    return false;
  }

  switch (memo?.type) {
    case "text":
      // eslint-disable-next-line no-case-declarations
      const memoTextBytes = Buffer.byteLength(memo.value as string, "utf8");

      if (memoTextBytes > 28) {
        return `Memo Text accepts a string of up to 28 bytes. ${memoTextBytes} bytes entered.`;
      }

      return false;
    case "id":
      if (
        !memo.value?.toString().match(/^[0-9]*$/g) ||
        Number(memo.value) < 0
      ) {
        return "Memo ID accepts a positive integer.";
      }

      // Checking UnsignedHyper
      if (
        memo.value !== xdr.Uint64.fromString(memo.value as string).toString()
      ) {
        return `Memo ID is an unsigned 64-bit integer and the max valid
              value is 18446744073709551615`;
      }

      return false;
    case "hash":
    case "return":
      if (!memo.value?.toString().match(/^[0-9a-f]{64}$/gi)) {
        return `Memo ${capitalizeString(memo.type)} accepts a 32-byte hash in hexadecimal format (64 characters).`;
      }

      return false;
    default:
      return false;
  }
};
````

## File: src/debug/validate/methods/getNumberFractionError.ts
````typescript
import { FractionValue, NumberFractionValue } from "../../types/types";
import { getAmountError } from "./getAmountError";
import { getPositiveIntError } from "./getPositiveIntError";
import { sanitizeArray } from "../../util/sanitizeArray";

export const getNumberFractionError = (value: NumberFractionValue) => {
  if (!value.type || !value.value) {
    return false;
  }

  if (value.type === "number") {
    return getAmountError(value.value as string);
  }

  if (value.type === "fraction") {
    const val = value.value as FractionValue;
    const numValid = val.n ? getPositiveIntError(val.n) : false;
    const denValid = val.d ? getPositiveIntError(val.d) : false;

    const numError = numValid ? `Numerator: ${numValid}` : false;
    const denError = denValid ? `Denominator: ${denValid}` : false;

    return sanitizeArray([numError, denError]).join(" ") ?? false;
  }

  return false;
};
````

## File: src/debug/validate/methods/getOptionsSignerError.ts
````typescript
import { isEmptyObject } from "../../util/isEmptyObject";
import { sanitizeObject } from "../../util/sanitizeObject";
import { OptionSigner } from "../../types/types";

import { getAccountThresholdError } from "./getAccountThresholdError";
import { getPublicKeyError } from "./getPublicKeyError";

export const getOptionsSignerError = (signer: OptionSigner | undefined) => {
  if (!signer || !signer?.type) {
    return false;
  }

  const error: { key: string | boolean; weight: string | boolean } = {
    key: "",
    weight: getAccountThresholdError(signer?.weight || ""),
  };

  switch (signer.type) {
    case "ed25519PublicKey":
      error.key = signer.key ? getPublicKeyError(signer.key) : "";
      break;
    case "sha256Hash":
    case "preAuthTx":
      error.key = signer.key ? hasValidator(signer.key) : "";
      break;
    default:
    // Do nothing
  }

  const sanitized = sanitizeObject(error);

  return isEmptyObject(sanitized) ? false : sanitized;
};

const hasValidator = (value: string) => {
  if (!value.match(/^[0-9a-f]{64}$/gi)) {
    return "Accepts a 32-byte hash in hexadecimal format (64 characters).";
  }

  return false;
};
````

## File: src/debug/validate/methods/getPositiveIntError.ts
````typescript
export const getPositiveIntError = (value: string) => {
  if (value.toString().charAt(0) === "-") {
    return "Expected a positive number or zero.";
  } else if (!value.toString().match(/^[0-9]*$/g)) {
    return "Expected a whole number.";
  }

  return false;
};
````

## File: src/debug/validate/methods/getPositiveNumberError.ts
````typescript
export const getPositiveNumberError = (value: string) => {
  if (value.toString().charAt(0) === "-") {
    return "Expected a positive number or zero.";
  } else if (!value.toString().match(/^[0-9]*(\.[0-9]+){0,1}$/g)) {
    return "Expected a positive number with a period for the decimal point.";
  }

  return false;
};
````

## File: src/debug/validate/methods/getPublicKeyError.ts
````typescript
import { StrKey } from "@stellar/stellar-sdk";

export const getPublicKeyError = (publicKey: string, isRequired?: boolean) => {
  if (!publicKey) {
    if (isRequired) {
      return "Public key is required.";
    } else {
      return false;
    }
  }

  if (publicKey.startsWith("M")) {
    if (!StrKey.isValidMed25519PublicKey(publicKey)) {
      return "Muxed account address is invalid.";
    }
  } else if (!StrKey.isValidEd25519PublicKey(publicKey)) {
    return "Public key is invalid.";
  }

  return false;
};
````

## File: src/debug/validate/methods/getRevokeSponsorshipError.ts
````typescript
import { sanitizeObject } from "../../util/sanitizeObject";
import { isEmptyObject } from "../../util/isEmptyObject";
import {
  AnyObject,
  AssetObjectValue,
  AssetPoolShareObjectValue,
  OptionSigner,
  RevokeSponsorshipValue,
} from "../../types/types";

import { getPublicKeyError } from "./getPublicKeyError";
import { getAssetError } from "./getAssetError";
import { getPositiveIntError } from "./getPositiveIntError";
import { getDataNameError } from "./getDataNameError";
import { getClaimableBalanceIdError } from "./getClaimableBalanceIdError";
import { getOptionsSignerError } from "./getOptionsSignerError";

export const getRevokeSponsorshipError = (
  value: RevokeSponsorshipValue | undefined,
) => {
  if (!value || !value.data) {
    return false;
  }

  const cleanResponse = (validation: AnyObject | boolean) => {
    if (typeof validation === "boolean") {
      return validation;
    }

    const valid = sanitizeObject(validation);
    return isEmptyObject(valid) ? false : valid;
  };

  let response: AnyObject | boolean = false;

  switch (value.type) {
    case "account":
      response = {
        account_id: getPublicKeyError(value.data.account_id as string),
      };
      break;
    case "trustline":
      response = {
        account_id: getPublicKeyError(value.data.account_id as string),
        asset: getAssetError(
          value.data.asset as
            | undefined
            | AssetObjectValue
            | AssetPoolShareObjectValue,
        ),
      };
      break;
    case "offer":
      response = {
        seller_id: getPublicKeyError(value.data.seller_id as string),
        offer_id: getPositiveIntError((value.data.offer_id as string) || ""),
      };
      break;
    case "data":
      response = {
        account_id: getPublicKeyError(value.data.account_id as string),
        data_name: getDataNameError((value.data.data_name as string) || ""),
      };
      break;
    case "claimable_balance":
      response = {
        balance_id: getClaimableBalanceIdError(value.data.balance_id as string),
      };
      break;
    case "signer":
      response = {
        account_id: getPublicKeyError(value.data.account_id as string),
        signer: getOptionsSignerError(value.data.signer as OptionSigner),
      };
      break;
    default:
    // Do nothing
  }

  return cleanResponse(response);
};
````

## File: src/debug/validate/methods/getSecretKeyError.ts
````typescript
import { StrKey } from "@stellar/stellar-sdk";

export const getSecretKeyError = (value: string) => {
  if (!StrKey.isValidEd25519SecretSeed(value)) {
    return "Invalid secret key. Please check your secret key and try again.";
  }

  return false;
};
````

## File: src/debug/validate/methods/getTimeBoundsError.ts
````typescript
import { getPositiveIntError } from "./getPositiveIntError";
import { sanitizeObject } from "../../util/sanitizeObject";
import { isEmptyObject } from "../../util/isEmptyObject";
import { TimeBoundsValue } from "../../types/types";

export const getTimeBoundsError = ({ min_time, max_time }: TimeBoundsValue) => {
  const validated = sanitizeObject({
    min_time: min_time
      ? getPositiveIntError(min_time.toString())
      : (false as const),
    max_time: max_time
      ? getPositiveIntError(max_time.toString())
      : (false as const),
  });

  return isEmptyObject(validated) ? false : validated;
};
````

## File: src/debug/validate/methods/getTransactionHashError.ts
````typescript
export const getTransactionHashError = (hash: string | undefined) => {
  if (!hash) {
    return false;
  }

  if (hash.match(/^[0-9a-f]{64}$/g) === null) {
    return "Transaction hash is invalid.";
  }

  return false;
};
````

## File: src/debug/validate/methods/getU128Error.ts
````typescript
import { validate } from "../../validate";

// Primitive Definition U128 comes from
// https://github.com/stellar/js-stellar-sdk/blob/master/src/contract/spec.ts#L122-L127
export const getU128Error = (value: string, isRequired?: boolean) => {
  if (!value) {
    if (isRequired) {
      return "This field is required.";
    } else {
      return false;
    }
  }

  const error = validate.getPositiveIntError(value);

  if (error) {
    return error;
  }

  // Check pattern for U128
  const u128Pattern = /^([1-9][0-9]*|0)$/;
  if (!u128Pattern.test(value)) {
    return "Value must be a valid u128 integer";
  }

  // Check length constraints
  if (value.length < 1 || value.length > 39) {
    return "Value must be between 1 and 39 characters long";
  }

  try {
    // Ensure it can be parsed as a BigInt
    BigInt(value);
  } catch {
    return "Value must be a valid u128 integer";
  }

  return false;
};
````

## File: src/debug/validate/methods/getU256Error.ts
````typescript
import { validate } from "../../validate";

// Primitive Definition U256 comes from
// https://github.com/stellar/js-stellar-sdk/blob/master/src/contract/spec.ts#L134-L139
export const getU256Error = (value: string, isRequired?: boolean) => {
  if (!value) {
    if (isRequired) {
      return "This field is required.";
    } else {
      return false;
    }
  }

  const error = validate.getPositiveIntError(value);

  if (error) {
    return error;
  }

  // Check pattern for U256
  const u256Pattern = /^([1-9][0-9]*|0)$/;
  if (!u256Pattern.test(value)) {
    return "Value must be a valid u256 integer";
  }

  // Check length constraints
  if (value.length < 1 || value.length > 78) {
    return "Value must be between 1 and 78 characters long";
  }

  try {
    // Ensure it can be parsed as a BigInt
    BigInt(value);
  } catch {
    return "Value must be a valid u256 integer";
  }

  return false;
};
````

## File: src/debug/validate/methods/getU32Error.ts
````typescript
import { validate } from "../../validate";

// Primitive Definition U32 comes from
// https://github.com/stellar/js-stellar-sdk/blob/master/src/contract/spec.ts#L100-L104
const MAX_U32 = BigInt("4294967295");

export const getU32Error = (value: string, isRequired?: boolean) => {
  if (!value) {
    if (isRequired) {
      return "This field is required.";
    } else {
      return false;
    }
  }

  const error = validate.getPositiveIntError(value);

  if (error) {
    return error;
  }

  const num = BigInt(value);

  if (num < 0 || num > MAX_U32) {
    return "Value must be a valid u32 integer (0 to 4294967295)";
  }

  return false;
};
````

## File: src/debug/validate/methods/getU64Error.ts
````typescript
import { validate } from "../../validate";

// Primitive Definition U64 comes from
// https://github.com/stellar/js-stellar-sdk/blob/master/src/contract/spec.ts#L110-L115
const MAX_U64 = BigInt("18446744073709551615");

export const getU64Error = (value: string, isRequired?: boolean) => {
  if (!value) {
    if (isRequired) {
      return "This field is required.";
    } else {
      return false;
    }
  }

  const error = validate.getPositiveIntError(value);

  if (error) {
    return error;
  }

  // Use the original regex pattern
  const u64Pattern = /^([1-9][0-9]*|0)$/;

  // Check if the value matches the U64 pattern
  if (!u64Pattern.test(value)) {
    return "Value must be a valid u64 integer (0 to 18446744073709551615)";
  }

  try {
    const num = BigInt(value);
    if (num < 0 || num > MAX_U64) {
      return "Value must be a valid u64 integer (0 to 18446744073709551615)";
    }
  } catch {
    return "Value must be a valid u64 integer (0 to 18446744073709551615)";
  }

  return false;
};
````

## File: src/debug/validate/methods/getXdrError.ts
````typescript
import { trim } from "../../util/trim";
import { xdr as stellarXDR } from "@stellar/stellar-sdk";

import { XdrType } from "../../types/types";

const validateBase64 = (value: string) => {
  if (value.match(/^[-A-Za-z0-9+/=]*$/) === null) {
    return {
      result: "error",
      message: "The input is not valid base64 (a-zA-Z0-9+/=).",
    };
  }

  return { result: "success", message: "Valid Base64" };
};

export const getXdrError = (value: string, type?: XdrType) => {
  if (!value) {
    return undefined;
  }

  const defaultType = "Transaction Envelope";
  const selectedType = type || defaultType;

  const sanitizedXdr = trim(value);
  const base64Validation = validateBase64(sanitizedXdr);

  if (base64Validation.result !== "success") {
    return base64Validation;
  }

  try {
    if (type === "LedgerKey") {
      stellarXDR.LedgerKey.fromXDR(sanitizedXdr, "base64");
    } else {
      stellarXDR.TransactionEnvelope.fromXDR(sanitizedXdr, "base64");
    }

    // TODO: See, if we can make this response match all the other validations.
    // This is the only exception and might cause issues if we don't remember to
    // handle it.
    return {
      result: "success",
      message: `Valid ${selectedType} XDR`,
    };
  } catch (e) {
    return {
      result: "error",
      message: `Unable to parse input XDR into ${selectedType}`,
      originalError: e,
    };
  }
};
````

## File: src/debug/validate/index.ts
````typescript
import { getAccountThresholdError } from "./methods/getAccountThresholdError";
import { getAmountError } from "./methods/getAmountError";
import { getArrayOfStringsError } from "./methods/getArrayOfStringsError";
import { getAssetError } from "./methods/getAssetError";
import { getAssetCodeError } from "./methods/getAssetCodeError";
import { getAssetMultiError } from "./methods/getAssetMultiError";
import { getBipPathError } from "./methods/getBipPathError";
import { getClaimableBalanceIdError } from "./methods/getClaimableBalanceIdError";
import { getClaimaintsError } from "./methods/getClaimaintsError";
import { getContractIdError } from "./methods/getContractIdError";
import { getDataNameError } from "./methods/getDataNameError";
import { getDataValueError } from "./methods/getDataValueError";
import { getEventsFiltersError } from "./methods/getEventsFiltersError";
import { getHomeDomainError } from "./methods/getHomeDomainError";
import { getMemoError } from "./methods/getMemoError";
import { getNumberFractionError } from "./methods/getNumberFractionError";
import { getOptionsSignerError } from "./methods/getOptionsSignerError";
import { getPositiveIntError } from "./methods/getPositiveIntError";
import { getPositiveNumberError } from "./methods/getPositiveNumberError";
import { getPublicKeyError } from "./methods/getPublicKeyError";
import { getRevokeSponsorshipError } from "./methods/getRevokeSponsorshipError";
import { getSecretKeyError } from "./methods/getSecretKeyError";
import { getTimeBoundsError } from "./methods/getTimeBoundsError";
import { getTransactionHashError } from "./methods/getTransactionHashError";
import { getXdrError } from "./methods/getXdrError";
import { getU32Error } from "./methods/getU32Error";
import { getU64Error } from "./methods/getU64Error";
import { getU128Error } from "./methods/getU128Error";
import { getU256Error } from "./methods/getU256Error";
import { getI32Error } from "./methods/getI32Error";
import { getI64Error } from "./methods/getI64Error";
import { getI128Error } from "./methods/getI128Error";
import { getI256Error } from "./methods/getI256Error";
import { getDataUrlError } from "./methods/getDataUrlError";

export const validate = {
  getAccountThresholdError,
  getAmountError,
  getArrayOfStringsError,
  getAssetError,
  getAssetCodeError,
  getAssetMultiError,
  getBipPathError,
  getClaimableBalanceIdError,
  getClaimaintsError,
  getContractIdError,
  getDataNameError,
  getDataValueError,
  getEventsFiltersError,
  getHomeDomainError,
  getMemoError,
  getNumberFractionError,
  getOptionsSignerError,
  getPositiveIntError,
  getPositiveNumberError,
  getPublicKeyError,
  getRevokeSponsorshipError,
  getSecretKeyError,
  getTimeBoundsError,
  getTransactionHashError,
  getXdrError,
  getU32Error,
  getI32Error,
  getU64Error,
  getI64Error,
  getU128Error,
  getI128Error,
  getU256Error,
  getI256Error,
  getDataUrlError,
};
````

## File: src/hooks/useNotification.ts
````typescript
import { use } from "react";
import {
  NotificationContext,
  NotificationContextType,
} from "../providers/NotificationProvider";

export const useNotification = (): NotificationContextType => {
  const context = use(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider",
    );
  }
  return context;
};
````

## File: src/hooks/useSubscription.ts
````typescript
import * as React from "react";
import { Server, Api } from "@stellar/stellar-sdk/rpc";
import { xdr } from "@stellar/stellar-sdk";
import { rpcUrl, stellarNetwork } from "../contracts/util";

/**
 * Concatenated `${contractId}:${topic}`
 */
type PagingKey = string;

/**
 * Paging tokens for each contract/topic pair. These can be mutated directly,
 * rather than being stored as state within the React hook.
 */
const paging: Record<
  PagingKey,
  { lastLedgerStart?: number; pagingToken?: string }
> = {};

// NOTE: Server is configured using envvars which shouldn't change during runtime
const server = new Server(rpcUrl, { allowHttp: stellarNetwork === "LOCAL" });

/**
 * Subscribe to events for a given topic from a given contract, using a library
 * generated with `soroban contract bindings typescript`.
 *
 * Someday such generated libraries will include functions for subscribing to
 * the events the contract emits, but for now you can copy this hook into your
 * React project if you need to subscribe to events, or adapt this logic for
 * non-React use.
 */
export function useSubscription(
  contractId: string,
  topic: string,
  onEvent: (event: Api.EventResponse) => void,
  pollInterval = 5000,
) {
  const id = `${contractId}:${topic}`;
  paging[id] = paging[id] || {};

  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    let stop = false;

    async function pollEvents(): Promise<void> {
      try {
        if (!paging[id].lastLedgerStart) {
          const latestLedgerState = await server.getLatestLedger();
          paging[id].lastLedgerStart = latestLedgerState.sequence;
        }

        // lastLedgerStart is now guaranteed to be a number
        const lastLedger = paging[id].lastLedgerStart;

        const response = await server.getEvents(
          paging[id].pagingToken
            ? {
                cursor: paging[id].pagingToken,
                filters: [
                  {
                    contractIds: [contractId],
                    topics: [[xdr.ScVal.scvSymbol(topic).toXDR("base64")]],
                    type: "contract",
                  },
                ],
                limit: 10,
              }
            : {
                startLedger: lastLedger,
                endLedger: lastLedger + 100,
                filters: [
                  {
                    contractIds: [contractId],
                    topics: [[xdr.ScVal.scvSymbol(topic).toXDR("base64")]],
                    type: "contract",
                  },
                ],
                limit: 10,
              },
        );

        paging[id].pagingToken = undefined;
        if (response.latestLedger) {
          paging[id].lastLedgerStart = response.latestLedger;
        }
        if (response.events && response.events.length > 0) {
          response.events.forEach((event) => {
            try {
              onEvent(event);
            } catch (error) {
              console.error(
                "Poll Events: subscription callback had error: ",
                error,
              );
            }
          });
          // Store the cursor from the response for pagination
          if (response.cursor) {
            paging[id].pagingToken = response.cursor;
          }
        }
      } catch (error) {
        console.error("Poll Events: error: ", error);
      } finally {
        if (!stop) {
          timeoutId = setTimeout(() => void pollEvents(), pollInterval);
        }
      }
    }

    void pollEvents();

    return () => {
      if (timeoutId != null) clearTimeout(timeoutId);
      stop = true;
    };
  }, [contractId, topic, onEvent, id, pollInterval]);
}
````

## File: src/hooks/useWallet.ts
````typescript
import { use } from "react";
import { WalletContext } from "../providers/WalletProvider";

export const useWallet = () => {
  const ctx = use(WalletContext);
  if (!ctx) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return ctx;
};
````

## File: src/hooks/useWalletBalance.ts
````typescript
import { useCallback, useEffect, useState } from "react";
import { useWallet } from "./useWallet";
import { fetchBalance, type Balance } from "../util/wallet";

const formatter = new Intl.NumberFormat();

const checkFunding = (balances: Balance[]) =>
  balances.some(({ balance }) =>
    !Number.isNaN(Number(balance)) ? Number(balance) > 0 : false,
  );

type WalletBalance = {
  balances: Balance[];
  xlm: string;
  isFunded: boolean;
  isLoading: boolean;
  error: Error | null;
};

export const useWalletBalance = () => {
  const { address } = useWallet();
  const [state, setState] = useState<WalletBalance>({
    balances: [],
    xlm: "-",
    isFunded: false,
    isLoading: false,
    error: null,
  });

  const updateBalance = useCallback(async () => {
    if (!address) return;
    try {
      setState((prev) => ({ ...prev, isLoading: true }));
      const balances = await fetchBalance(address);
      const isFunded = checkFunding(balances);
      const native = balances.find(({ asset_type }) => asset_type === "native");
      setState({
        isLoading: false,
        balances,
        xlm: native?.balance ? formatter.format(Number(native.balance)) : "-",
        isFunded,
        error: null,
      });
    } catch (err) {
      if (err instanceof Error && err.message.match(/not found/i)) {
        setState({
          isLoading: false,
          balances: [],
          xlm: "-",
          isFunded: false,
          error: new Error("Error fetching balance. Is your wallet funded?"),
        });
      } else {
        console.error(err);
        setState({
          isLoading: false,
          balances: [],
          xlm: "-",
          isFunded: false,
          error: new Error("Unknown error fetching balance."),
        });
      }
    }
  }, [address]);

  useEffect(() => {
    void updateBalance();
  }, [updateBalance]);

  return {
    ...state,
    updateBalance,
  };
};
````

## File: src/layout/Layout.tsx
````typescript
import { Button, Icon, Layout } from "@stellar/design-system";
import ConnectAccount from "../components/ConnectAccount";
import { Outlet, NavLink } from "react-router-dom";

const AppLayout: React.FC = () => (
  <main>
    <Layout.Header
      projectId="My App"
      projectTitle="My App"
      contentRight={
        <>
          <nav>
            <NavLink
              to="/debug"
              style={{
                textDecoration: "none",
              }}
            >
              {({ isActive }) => (
                <Button
                  variant="tertiary"
                  size="md"
                  onClick={() => (window.location.href = "/debug")}
                  disabled={isActive}
                >
                  <Icon.Code02 size="md" />
                  Debugger
                </Button>
              )}
            </NavLink>
          </nav>
          <ConnectAccount />
        </>
      }
    />
    <Outlet />
    <Layout.Footer>
      <span>
        © {new Date().getFullYear()} My App. Licensed under the{" "}
        <a
          href="http://www.apache.org/licenses/LICENSE-2.0"
          target="_blank"
          rel="noopener noreferrer"
        >
          Apache License, Version 2.0
        </a>
        .
      </span>
    </Layout.Footer>
  </main>
);

export default AppLayout;
````

## File: src/pages/Debugger.tsx
````typescript
import React, { useState, useEffect } from "react";
import { Layout, Code, Card, Button, Input } from "@stellar/design-system";
import { Client } from "@stellar/stellar-sdk/contract";
import { ContractForm } from "../debug/components/ContractForm.tsx";
import { Box } from "../components/layout/Box.tsx";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useContracts } from "../debug/hooks/useContracts.ts";
import RenderContractMetadata from "../debug/components/RenderContractMetadata.tsx";

const Debugger: React.FC = () => {
  const { data, isLoading } = useContracts();
  const contractMap = data?.loadedContracts ?? {};
  const failedContracts = data?.failed ?? {};
  const navigate = useNavigate();

  const [selectedContract, setSelectedContract] = useState<string>("");
  const [isDetailExpanded, setIsDetailExpanded] = useState(false);
  const { contractName } = useParams<{ contractName?: string }>();

  const contractKeys = Array.from(
    new Set([...Object.keys(contractMap), ...Object.keys(failedContracts)]),
  );
  useEffect(() => {
    if (!isLoading && contractKeys.length > 0) {
      if (contractName && contractKeys.includes(contractName)) {
        setSelectedContract(contractName);
      } else {
        setSelectedContract(contractKeys[0]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contractName, isLoading, contractKeys.join(",")]);

  useEffect(() => {
    if (!isLoading && contractKeys.length > 0) {
      if (contractName && contractKeys.includes(contractName)) {
        setSelectedContract(contractName);
      } else if (!contractName) {
        // Redirect to the first contract if no contractName in URL
        void navigate(`/debug/${contractKeys[0]}`, { replace: true });
      } else {
        setSelectedContract(contractKeys[0]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contractName, isLoading, contractKeys.join(",")]);

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
          {contractKeys.map((key) => (
            <NavLink
              key={key}
              to={`/debug/${key}`}
              style={{
                textDecoration: "none",
              }}
            >
              {({ isActive }) => (
                <Button variant={isActive ? "primary" : "tertiary"} size="sm">
                  {key}
                </Button>
              )}
            </NavLink>
          ))}
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
          </Layout.Inset>{" "}
        </>
      )}
    </Layout.Content>
  );
};

export default Debugger;
````

## File: src/pages/Home.tsx
````typescript
const Home = () => <div>Hello World</div>;

export default Home;
````

## File: src/providers/NotificationProvider.css
````css
.notification-container {
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;
}

.notification {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
  opacity: 1;
}

.notification.slide-in {
  transform: translateY(0);
}

.notification.slide-out {
  transform: translateY(-20px);
  opacity: 0;
}
````

## File: src/providers/NotificationProvider.tsx
````typescript
import React, {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
} from "react";
import { Notification as StellarNotification } from "@stellar/design-system";
import "./NotificationProvider.css"; // Import CSS for sliding effect

type NotificationType =
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "warning";
interface Notification {
  id: string;
  message: string;
  type: NotificationType;
  isVisible: boolean;
}

interface NotificationContextType {
  addNotification: (message: string, type: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback(
    (message: string, type: NotificationType) => {
      const newNotification = {
        id: `${type}-${Date.now().toString()}`,
        message,
        type,
        isVisible: true,
      };
      setNotifications((prev) => [...prev, newNotification]);

      setTimeout(() => {
        setNotifications(markRead(newNotification.id));
      }, 2500); // Start transition out after 2.5 seconds

      setTimeout(() => {
        setNotifications(filterOut(newNotification.id));
      }, 5000); // Remove after 5 seconds
    },
    [],
  );

  const contextValue = useMemo(() => ({ addNotification }), [addNotification]);

  return (
    <NotificationContext value={contextValue}>
      {children}
      <div className="notification-container">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`notification ${notification.isVisible ? "slide-in" : "slide-out"}`}
          >
            <StellarNotification
              title={notification.message}
              variant={notification.type}
            />
          </div>
        ))}
      </div>
    </NotificationContext>
  );
};

function markRead(
  id: Notification["id"],
): React.SetStateAction<Notification[]> {
  return (prev) =>
    prev.map((notification) =>
      notification.id === id
        ? { ...notification, isVisible: true }
        : notification,
    );
}

function filterOut(
  id: Notification["id"],
): React.SetStateAction<Notification[]> {
  return (prev) => prev.filter((notification) => notification.id !== id);
}

export { NotificationContext };
export type { NotificationContextType };
````

## File: src/providers/WalletProvider.tsx
````typescript
import {
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { wallet } from "../util/wallet";
import storage from "../util/storage";

export interface WalletContextType {
  address?: string;
  network?: string;
  networkPassphrase?: string;
  isPending: boolean;
  signTransaction?: typeof wallet.signTransaction;
}

const initialState = {
  address: undefined,
  network: undefined,
  networkPassphrase: undefined,
};

const POLL_INTERVAL = 1000;

export const WalletContext = // eslint-disable-line react-refresh/only-export-components
  createContext<WalletContextType>({ isPending: true });

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] =
    useState<Omit<WalletContextType, "isPending">>(initialState);
  const [isPending, startTransition] = useTransition();
  const popupLock = useRef(false);
  const signTransaction = wallet.signTransaction.bind(wallet);

  const nullify = () => {
    updateState(initialState);
    storage.setItem("walletId", "");
    storage.setItem("walletAddress", "");
    storage.setItem("walletNetwork", "");
    storage.setItem("networkPassphrase", "");
  };

  const updateState = (newState: Omit<WalletContextType, "isPending">) => {
    setState((prev: Omit<WalletContextType, "isPending">) => {
      if (
        prev.address !== newState.address ||
        prev.network !== newState.network ||
        prev.networkPassphrase !== newState.networkPassphrase
      ) {
        return newState;
      }
      return prev;
    });
  };

  const updateCurrentWalletState = async () => {
    // There is no way, with StellarWalletsKit, to check if the wallet is
    // installed/connected/authorized. We need to manage that on our side by
    // checking our storage item.
    const walletId = storage.getItem("walletId");
    const walletNetwork = storage.getItem("walletNetwork");
    const walletAddr = storage.getItem("walletAddress");
    const passphrase = storage.getItem("networkPassphrase");

    if (
      !state.address &&
      walletAddr !== null &&
      walletNetwork !== null &&
      passphrase !== null
    ) {
      updateState({
        address: walletAddr,
        network: walletNetwork,
        networkPassphrase: passphrase,
      });
    }

    if (!walletId) {
      nullify();
    } else {
      if (popupLock.current) return;
      // If our storage item is there, then we try to get the user's address &
      // network from their wallet. Note: `getAddress` MAY open their wallet
      // extension, depending on which wallet they select!
      try {
        popupLock.current = true;
        wallet.setWallet(walletId);
        if (walletId !== "freighter" && walletAddr !== null) return;
        const [a, n] = await Promise.all([
          wallet.getAddress(),
          wallet.getNetwork(),
        ]);

        if (!a.address) storage.setItem("walletId", "");
        if (
          a.address !== state.address ||
          n.network !== state.network ||
          n.networkPassphrase !== state.networkPassphrase
        ) {
          storage.setItem("walletAddress", a.address);
          updateState({ ...a, ...n });
        }
      } catch (e) {
        // If `getNetwork` or `getAddress` throw errors... sign the user out???
        nullify();
        // then log the error (instead of throwing) so we have visibility
        // into the error while working on Scaffold Stellar but we do not
        // crash the app process
        console.error(e);
      } finally {
        popupLock.current = false;
      }
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let isMounted = true;

    // Create recursive polling function to check wallet state continuously
    const pollWalletState = async () => {
      if (!isMounted) return;

      await updateCurrentWalletState();

      if (isMounted) {
        timer = setTimeout(() => void pollWalletState(), POLL_INTERVAL);
      }
    };

    // Get the wallet address when the component is mounted for the first time
    startTransition(async () => {
      await updateCurrentWalletState();
      // Start polling after initial state is loaded

      if (isMounted) {
        timer = setTimeout(() => void pollWalletState(), POLL_INTERVAL);
      }
    });

    // Clear the timeout and stop polling when the component unmounts
    return () => {
      isMounted = false;
      if (timer) clearTimeout(timer);
    };
  }, [state]); // eslint-disable-line react-hooks/exhaustive-deps -- it SHOULD only run once per component mount

  const contextValue = useMemo(
    () => ({
      ...state,
      isPending,
      signTransaction,
    }),
    [state, isPending, signTransaction],
  );

  return <WalletContext value={contextValue}>{children}</WalletContext>;
};
````

## File: src/util/contract.ts
````typescript
/**
 * Shortens a contract ID string by keeping the first `prefixLength` characters,
 * an ellipsis, then the last `suffixLength` characters.
 * If the ID is shorter than or equal to `prefixLength + suffixLength`, returns it unchanged.
 */
export function shortenContractId(
  id: string,
  prefixLength = 5,
  suffixLength = 4,
): string {
  if (id.length <= prefixLength + suffixLength) {
    return id;
  }
  const start = id.slice(0, prefixLength);
  const end = id.slice(-suffixLength);
  return `${start}…${end}`;
}
````

## File: src/util/friendbot.ts
````typescript
import { stellarNetwork } from "../contracts/util";

// Utility to get the correct Friendbot URL based on environment
export function getFriendbotUrl(address: string) {
  switch (stellarNetwork) {
    case "LOCAL":
      // Use proxy in development for local
      return `/friendbot?addr=${address}`;
    case "FUTURENET":
      return `https://friendbot-futurenet.stellar.org/?addr=${address}`;
    case "TESTNET":
      return `https://friendbot.stellar.org/?addr=${address}`;
    default:
      throw new Error(
        `Unknown or unsupported PUBLIC_STELLAR_NETWORK for friendbot: ${stellarNetwork}`,
      );
  }
}
````

## File: src/util/storage.ts
````typescript
/**
 * A typed wrapper around localStorage largely borrowed from (but less capable
 * than) https://www.npmjs.com/package/typed-local-store
 *
 * Provides a fully-typed interface to localStorage, and is easy to modify for other storage strategies (i.e. sessionStorage)
 */

/**
 * Valid localStorage key names mapped to an arbitrary value of the correct
 * type. Used to provide both good typing AND good type-ahead, so that you can
 * see a list of valid storage keys while using this module elsewhere.
 */
type Schema = {
  walletId: string;
  walletAddress: string;
  walletNetwork: string;
  networkPassphrase: string;
};

/**
 * Typed interface that follows the Web Storage API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
 *
 * Implementation has been borrowed and simplified from https://www.npmjs.com/package/typed-local-store
 */
class TypedStorage<T> {
  private readonly storage: Storage;

  constructor() {
    this.storage = localStorage;
  }

  public get length(): number {
    return this.storage?.length;
  }

  public key<U extends keyof T>(index: number): U {
    return this.storage?.key(index) as U;
  }

  public getItem<U extends keyof T>(
    key: U,
    retrievalMode: "fail" | "raw" | "safe" = "fail",
  ): T[U] | null {
    const item = this.storage?.getItem(key.toString());

    if (item == null) {
      return item;
    }

    try {
      return JSON.parse(item) as T[U];
    } catch (error) {
      switch (retrievalMode) {
        case "safe":
          return null;
        case "raw":
          return item as unknown as T[U];
        default:
          throw error;
      }
    }
  }

  public setItem<U extends keyof T>(key: U, value: T[U]): void {
    this.storage?.setItem(key.toString(), JSON.stringify(value));
  }

  public removeItem<U extends keyof T>(key: U): void {
    this.storage?.removeItem(key.toString());
  }

  public clear(): void {
    this.storage?.clear();
  }
}

/**
 * Fully-typed wrapper around localStorage
 */
export default new TypedStorage<Schema>();
````

## File: src/util/wallet.ts
````typescript
import storage from "./storage";
import {
  ISupportedWallet,
  StellarWalletsKit,
  WalletNetwork,
  sep43Modules,
} from "@creit.tech/stellar-wallets-kit";
import { Horizon } from "@stellar/stellar-sdk";
import { networkPassphrase, stellarNetwork } from "../contracts/util";

const kit: StellarWalletsKit = new StellarWalletsKit({
  network: networkPassphrase as WalletNetwork,
  modules: sep43Modules(),
});

export const connectWallet = async () => {
  await kit.openModal({
    modalTitle: "Connect to your wallet",
    onWalletSelected: (option: ISupportedWallet) => {
      const selectedId = option.id;
      kit.setWallet(selectedId);

      // Now open selected wallet's login flow by calling `getAddress` --
      // Yes, it's strange that a getter has a side effect of opening a modal
      void kit.getAddress().then((address) => {
        // Once `getAddress` returns successfully, we know they actually
        // connected the selected wallet, and we set our localStorage
        if (address.address) {
          storage.setItem("walletId", selectedId);
          storage.setItem("walletAddress", address.address);
        } else {
          storage.setItem("walletId", "");
          storage.setItem("walletAddress", "");
        }
      });
      if (selectedId == "freighter" || selectedId == "hot-wallet") {
        void kit.getNetwork().then((network) => {
          if (network.network && network.networkPassphrase) {
            storage.setItem("walletNetwork", network.network);
            storage.setItem("networkPassphrase", network.networkPassphrase);
          } else {
            storage.setItem("walletNetwork", "");
            storage.setItem("networkPassphrase", "");
          }
        });
      }
    },
  });
};

export const disconnectWallet = async () => {
  await kit.disconnect();
  storage.removeItem("walletId");
};

function getHorizonHost(mode: string) {
  switch (mode) {
    case "LOCAL":
      return "http://localhost:8000";
    case "FUTURENET":
      return "https://horizon-futurenet.stellar.org";
    case "TESTNET":
      return "https://horizon-testnet.stellar.org";
    case "PUBLIC":
      return "https://horizon.stellar.org";
    default:
      throw new Error(`Unknown Stellar network: ${mode}`);
  }
}

export const fetchBalance = async (address: string) => {
  const horizon = new Horizon.Server(getHorizonHost(stellarNetwork), {
    allowHttp: stellarNetwork === "LOCAL",
  });

  const { balances } = await horizon.accounts().accountId(address).call();
  return balances;
};

export type Balance = Awaited<ReturnType<typeof fetchBalance>>[number];

export const wallet = kit;
````

## File: src/App.tsx
````typescript
import "./App.module.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Debugger from "./pages/Debugger.tsx";
import AppLayout from "./layout/Layout.tsx";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/debug" element={<Debugger />} />
        <Route path="/debug/:contractName" element={<Debugger />} />
      </Route>
    </Routes>
  );
}

export default App;
````

## File: src/index.css
````css
/* Import font for Stellar Design System */
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Inconsolata:wght@500&display=swap");
````

## File: src/main.tsx
````typescript
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "@stellar/design-system/build/styles.min.css";
import { WalletProvider } from "./providers/WalletProvider.tsx";
import { NotificationProvider } from "./providers/NotificationProvider.tsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <NotificationProvider>
      <QueryClientProvider client={queryClient}>
        <WalletProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </WalletProvider>
      </QueryClientProvider>
    </NotificationProvider>
  </StrictMode>,
);
````

## File: src/vite-env.d.ts
````typescript
/// <reference types="vite/client" />
````

## File: .env.example
````
# The environment to use `development`, `testing`, `staging`, `production`
STELLAR_SCAFFOLD_ENV=development

# Location of the config files for this project for the scaffold stellar CLI.
# Learn more at https://developers.stellar.org/docs/tools/cli/stellar-cli#stellar-config-dir
XDG_CONFIG_HOME=".config"

# Prefix with "PUBLIC_" to make available in frontend files
# Which Stellar network to use in the frontend: local, testnet, futurenet, or mainnet
# More on Stellar networks: https://developers.stellar.org/docs/networks

PUBLIC_STELLAR_NETWORK="LOCAL"
# The Stellar network passphrase, this is local
PUBLIC_STELLAR_NETWORK_PASSPHRASE="Standalone Network ; February 2017"
# The Stellar network RPC URL. this is local
PUBLIC_STELLAR_RPC_URL="http://localhost:8000/rpc"
# The Stellar Horizon URL. this is local
PUBLIC_STELLAR_HORIZON_URL="http://localhost:8000"

# PUBLIC_STELLAR_NETWORK="TESTNET"
# PUBLIC_STELLAR_NETWORK_PASSPHRASE="Test SDF Network ; September 2015"
# PUBLIC_STELLAR_RPC_URL="https://soroban-testnet.stellar.org"
# PUBLIC_STELLAR_HORIZON_URL="https://horizon-testnet.stellar.org"

# PUBLIC_STELLAR_NETWORK="MAINNET"
# PUBLIC_STELLAR_NETWORK_PASSPHRASE="Public Global Stellar Network ; September 2015"
# PUBLIC_STELLAR_RPC_URL=
# PUBLIC_STELLAR_HORIZON_URL=
````

## File: .gitattributes
````
Cargo.lock text -merge eol=lf linguist-generated=true -diff
package-lock.json linguist-generated=true -diff
````

## File: .gitignore
````
# stellar/soroban/Rust output
target
.soroban

# project identity and alias files will be in .config/stellar
.config

# test snapshot folders from sample contracts
test_snapshots

# build output
dist
dist-ssr

# dependencies
node_modules/

# logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# environment variables
.env
.env.*
!.env.example

# easy way to create temporary local-only files and folders
*.local.*

# macOS-specific files
.DS_Store

# generated contract clients
packages/*
# if you have other workspace packages, add them here
!packages/.gitkeep

# generated contract client imports
src/contracts/*
!src/contracts/util.ts
````

## File: Cargo.toml
````toml
[workspace]
members = ["contracts/*"]
resolver = "2"

[workspace.package]
authors = ["The Aha Company"]
edition = "2024"
license = "Apache-2.0"
repository = "https://github.com/theahaco/scaffold-stellar"
version = "0.0.1"

[workspace.dependencies.soroban-sdk]
version = "23.1.0"

[workspace.dependencies.stellar-access]
git = "https://github.com/OpenZeppelin/stellar-contracts"
tag = "v0.5.1"

[workspace.dependencies.stellar-macros]
git = "https://github.com/OpenZeppelin/stellar-contracts"
tag = "v0.5.1"

[workspace.dependencies.stellar-tokens]
git = "https://github.com/OpenZeppelin/stellar-contracts"
tag = "v0.5.1"

[profile.release]
opt-level = "z"
debug = false
lto = true
debug-assertions = false
codegen-units = 1
panic = "abort"
overflow-checks = true
strip = true

[profile.release-with-logs]
debug-assertions = true
inherits = "release"
````

## File: CODE_OF_CONDUCT.md
````markdown
We follow the Stellar and Stellar Development Foundation (SDF) code of conduct. See bellow:

# Code of Conduct

Stellar and the Stellar Development Foundation (SDF) are built fundamentally
around the idea of inclusiveness. We aim to work with and enable professionals,
volunteers, and users all over the world on every aspect of our mission —
including mentorship, teaching, and connecting people. Most of all, we aim to
create a thriving, open, and welcoming community that leaves people inspired.

Diversity of opinion, however, can also lead to communication issues and
unhappiness. To that end, we have a few ground rules that we ask people to
adhere to. This code applies equally to founders, mentors and those seeking
help and guidance.

This isn’t an exhaustive list of things that you can’t do. Rather, take it in
the spirit in which it’s intended - a guide to make it easier to enrich all of
us and the technical communities in which we participate.

This code of conduct applies to all spaces managed by the Stellar Development
Foundation. This includes Keybase, our mailing lists, the issue tracker, SDF
events, and any other forums created by the project team which the community
uses for communication. In addition, violations of this code outside these
spaces may affect a person’s ability to participate within them.

If you believe someone is violating the code of conduct, we ask that you report
it by emailing [conduct@stellar.org](mailto:conduct@stellar.org). For more
details please see our reporting guidelines below.

- **Be kind, cordial, courteous.** There’s no need to be mean or rude, or to show contempt towards
  others.
- **Be patient — especially with newcomers to the community.**
- **Be welcoming.** Seek diverse perspectives. Diversity of views and of people on teams powers
  innovation, even if it is not always comfortable. We strive to be a community that welcomes and
  supports people of all backgrounds and identities. This includes, but is not limited to members
  of any race, ethnicity, culture, national origin, color, immigration status, social and economic
  class, educational level, sex, sexual orientation, gender identity and expression, age, size,
  family status, political belief, religion, and mental and physical ability.
- **Be considerate and empathetic.** Your work will be used by other people, and you in turn will
  depend on the work of others. Any decision you take will affect users and colleagues, and you
  should take those consequences into account when making decisions. Remember that we’re a
  world-wide community, so you might not be communicating in someone else’s primary language.
- **Be direct but professional.** We are likely to have some discussions about if and when
  criticism is respectful and when it’s not. We _must_ be able to speak directly when we disagree
  and when we think we need to improve. We cannot withhold hard truths. Doing so respectfully is
  hard, doing so when others don’t seem to be listening is harder, and hearing such comments when
  one is the recipient can be even harder still. We need to be honest and direct, as well as
  respectful.
- **Be respectful.** Not all of us will agree all the time, but disagreement is no excuse for poor
  behavior and poor manners. We might all experience some frustration now and then, but we cannot
  allow that frustration to turn into a personal attack. It’s important to remember that a
  community where people feel uncomfortable or threatened is not a productive one. Members of the
  Stellar community should be respectful when dealing with other members as well as with people
  outside the Stellar community.
- **Be careful in the words that you choose.** There is no cost and a lot of benefit to taking a
  deep breath before communicating. We are a community of professionals, and we conduct ourselves
  professionally. Be kind to others. Do not insult or put down other participants. Harassment and
  other exclusionary behavior aren’t acceptable and could result in you getting banned. This
  includes, but is not limited to:
  - Violent threats or language directed against another person.
  - Discriminatory jokes and language.
  - Posting sexually explicit or violent material.
  - Posting (or threatening to post) other people’s personally identifying information (“doxing”).
  - Personal insults, especially those using racist or sexist terms.
  - Trolling, personal or political attacks.
  - Unwelcome sexual attention.
  - Public or private harassment.
  - Advocating for, or encouraging, any of the above behavior.
  - Repeated harassment of others. In general, if someone asks you to stop, then stop.
- **Be inquisitive**. Nobody knows everything! Asking questions early avoids many problems later,
  so questions are encouraged, though they may be directed to the appropriate forum. Those who are
  asked should be responsive and helpful, within the context of our shared goal of improving
  Stellar.
- **Be concise**. Keep in mind that what you write once will be read by hundreds of persons.
  Writing a short email means people can understand the conversation as efficiently as possible.
  Short emails should always strive to be empathetic, welcoming, friendly and patient. When a long
  explanation is necessary, consider adding a summary.
  - Try to bring new ideas to a conversation so that each response adds something unique to the
    thread, keeping in mind that the rest of the thread still contains the other messages with
    arguments that have already been made.
  - Try to stay on topic, especially in discussions that are already fairly large.
- **When we disagree, try to understand why.** Respect that people have differences of opinion and
  that every design or implementation choice carries a trade-off and numerous costs. There is
  seldom a right answer. Disagreements, both social and technical, happen all the time and Stellar
  is no exception. It is important that we resolve disagreements and differing views
  constructively. Finally, don’t forget that it is human to err and blaming each other doesn’t get
  us anywhere. Instead, focus on helping to resolve issues and learning from mistakes.
- Most of all, **be excellent to each other.**

## Contributions to Open Source Software

If you are contributing to a Stellar open source development project, which is managed by Stellar
Development Foundation ("Stellar OSS"), then you acknowledge that all your contributions are
contributed by you under the Apache 2.0 license. If your employer(s) has rights to intellectual
property that you create that includes your contributions to Stellar OSS, you represent that you
have received permission to make your contributions on behalf of that employer, that your employer
has waived such rights for your contributions to SDF, or that your employer has executed a separate
agreement with SDF.

## Diversity Statement

We encourage everyone to participate and are committed to building a community for all. We are
committed to being a community that everyone feels good about joining. Although we may not be able
to satisfy everyone, we all agree that everyone is equal. Whenever a participant has made a
mistake, we expect them to take responsibility for it. If someone has been harmed or offended, it
is our responsibility to listen carefully and respectfully, and do our best to right the wrong.

No matter how you identify yourself or how others perceive you: we welcome you. Although this list
cannot be exhaustive, we explicitly honor diversity in age, gender, gender identity or expression,
culture, ethnicity, language, national origin, political beliefs, profession, race, religion,
sexual orientation, socioeconomic status, and technical ability. We will not tolerate
discrimination based on any of the characteristics above, including participants with disabilities.

Though we welcome people fluent in all languages, Stellar’s development is conducted in English.
Standards for behavior in the Stellar community are detailed in the Code of Conduct above. We
expect participants in our community to meet these standards in all their interactions and to help
others to do so as well.

## Reporting CoC Issues

If you believe you’re experiencing an instance of abusive, harassing, or otherwise unacceptable
behavior that will not be tolerated as outlined above, please contact the project team by emailing
us at [conduct@stellar.org](mailto:conduct@stellar.org).

If you are unsure whether the incident is a violation, or whether the space where it happened is
covered by this Code of Conduct, we encourage you to still report it. We would much rather have a
few extra reports where we decide to take no action, rather than miss a report of an actual
violation. We do not look negatively on you if we find the incident is not a violation. And knowing
about incidents that are not violations, or happen outside our spaces, can also help us to improve
the Code of Conduct or the processes surrounding it.

In your report please include:

- Your contact info (so we can get in touch with you if we need to follow up)
- Names (real, nicknames, or pseudonyms) of any individuals involved. If there were other witnesses
  besides you, please try to include them as well.
- When and where the incident occurred. Please be as specific as possible.
- Your account of what occurred. If there is a publicly available record (e.g. a mailing list
  archive or a public Keybase logger) please include a link.
- Any extra context you believe existed for the incident.
- If you believe this incident is ongoing.
- Any other information you believe we should have.

**If you believe anyone is in physical danger, please notify appropriate law enforcement first.**
If you are unsure what law enforcement agency is appropriate, please include this in your report
and we will attempt to notify them.

Whether you’re a regular contributor or a newcomer, we care about making this community a safe
place for you and we’ve got your back. Likewise, please also report to us if you observe a
potentially dangerous situation, someone in distress, or violations of these guidelines, even if
the situation is not happening to you.

If you feel you have been unfairly accused of violating these guidelines, please follow the same
reporting process.

### Confidentiality

**All reports will be kept confidential**. In some cases we may determine that a public statement
will need to be made. If that’s the case, the identities of all the victims and reporters will
remain confidential unless those individuals instruct us otherwise. All complaints will be reviewed
and investigated and will result in a response that is deemed necessary and appropriate to the
circumstances.

Project maintainers who do not follow or enforce the Code of Conduct in good faith may face
temporary or permanent repercussions as determined by other members of the project’s leadership.

## Our Responsibilities

Project maintainers are responsible for clarifying the standards of acceptable behavior and are
expected to take appropriate and fair corrective action in response to any instances of
unacceptable behavior. This means that we will exclude you from interaction if you insult, demean
or harass anyone. That is not welcome behavior.

Project maintainers have the right and responsibility to remove, edit, or reject comments, commits,
code, wiki edits, issues, and other contributions that are not aligned to this Code of Conduct, or
to ban temporarily or permanently any contributor for other behaviors that they deem inappropriate,
threatening, offensive, or harmful.

### Enforcement

When a report is sent to the committee, we promise to acknowledge receipt within 24 hours (and will
aim for much quicker than that). The CoC committee will meet to review the incident and determine:

- What happened.
- Whether this event constitutes a code of conduct violation.
- Who the bad actor was.
- Whether this is an ongoing situation, or if there is a threat to anyone’s physical safety.

If this is determined to be an ongoing incident or a threat to physical safety, the working groups’
immediate priority will be to protect everyone involved. This means we may delay an “official”
response until we believe that the situation has ended and that everyone is physically safe.

Once the working group has a complete account of the events they will make a decision as to how to
respond. Responses may include:

- Nothing (if we determine no violation occurred).
- A private reprimand from the working group to the individual(s) involved.
- A public reprimand.
- An imposed vacation (i.e. asking someone to “take a week off” from a mailing list or Keybase).
- A permanent or temporary ban from some or all Stellar spaces (mailing lists, Keybase, etc.)
- A request for a public or private apology.

We’ll respond within one week to the person who filed the report with either a resolution or an
explanation of why the situation is not yet resolved.

Once we’ve determined our final action, we’ll contact the original reporter to let them know what
action (if any) we’ll be taking. We’ll take into account feedback from the reporter on the
appropriateness of our response, but we don’t guarantee we’ll act on it.

## Scope

This Code of Conduct applies within all project spaces, and it also applies when an individual is
representing the project or its community in public spaces. Examples of representing a project or
community include using an official project e-mail address, posting via an official social media
account, or acting as an appointed representative at an online or offline event. Representation of
a project may be further defined and clarified by project maintainers.

## Attribution

This Code of Conduct was adapted with modifications from the many great guides from the following
teams; we deeply appreciate your work.

- [Django CoC](https://www.djangoproject.com/conduct/)
- [Contributor Covenant CoC (Version 1.4)](https://www.contributor-covenant.org/version/1/4/code-of-conduct)
- [Rust CoC](https://www.rust-lang.org/policies/code-of-conduct)
- [CouchDB CoC](https://couchdb.apache.org/conduct.html)
- [Mozilla Community Participation Guidelines](https://www.mozilla.org/en-US/about/governance/policies/participation/)

This Code of Conduct is distributed under a
[Creative Commons Attribution-ShareAlike 4.0 license](https://creativecommons.org/licenses/by-sa/4.0/).
````

## File: CONTRIBUTING.md
````markdown
# Contributing

This is a guide to contributing to `scaffold-stellar-frontend` itself. Feel free to delete or modify it for your own project.
````

## File: environments.toml
````toml
### Development environment configuration
[development.network]
rpc-url = "http://localhost:8000/rpc"
network-passphrase = "Standalone Network ; February 2017"
run-locally = true # automatically start the local network container, if not already running

[[development.accounts]]
name = "me" # Required. Keys for this account will be saved to `./.stellar/identity`
default = true # Optional. Whether to use this account as the `--source` for commands that need one.

[development.contracts]
fungible_allowlist_example = { client = true, constructor_args = "--admin me --manager me --initial_supply 1000000000000000000000000" }
nft_enumerable_example = { client = true, constructor_args = "--owner me" }

# Rather than in one list, TOML allows specifying contracts in their own "sections"
[development.contracts.guess_the_number]
# Generate a contract client (NPM package) for this contract. This means:
#   - compile (build) the contract source to Wasm
#   - deploy the contract to the `network` specified above
#   - run any `init` script specified below
#   - generate an NPM client (also called the "TS Bindings") for the deployed
#     contract to the NPM workspace in `packages/*`
#   - import the contract for easy access in the frontend in `src/contracts`
#
# You can only use `client = true` when:
#   - the contract source must be part of the local Cargo workspace (in the
#     PROJECT_ROOT/contracts folder)
#   - The specified name here ("guess_the_number") must match the
#     underscored-version of the `name` in the contract's Cargo.toml.
#   - The environment is `development` or `testing`
client = true

# If your contract has a `__constructor`, specify your arguments to it here.
# These are the same arguments you could pass after the `--` in a call to
# `stellar contract deploy`
# Only available in `development` and `testing` environments
constructor_args = """
--admin me
"""

# Calls to the contract to make after it's deployed and initialized with
# `constructor_args`. Commands here will be appended to:
#
#     stellar contract invoke \
#         --id [this contract's id] \
#         --source [first (or `default`) account, specified above] \
#         --network [specified above] \
#         --
#
# That is, each line in this `init` script is *only* the part after the `--` in
# a `stellar contract invoke` command.
#
# To use another account as the `--source`, prefix the line with
# `STELLAR_ACCOUNT=other-account`.
#
# Only supported in `development` and `testing` environments.
after_deploy = """
reset
"""

# Coming Soon: Specify live contracts to bind & import in this project using the given name.
# During initialization, these contracts will also be "spooned" into the development network,
# meaning that their data will match the live network at the given sequence number.
# [development.contracts.eurc]
# environment = "production"
# address = "C..."
# at-ledger-sequence = 50153603

### Staging environment configuration
[staging.network]
rpc-url = "https://soroban-testnet.stellar.org"
network-passphrase = "Test SDF Network ; September 2015"

[[staging.accounts]]
name = "testnet-user"
default = true

[staging.contracts]
# soroban-atomic-swap-contract = { id = "C123..." }
# soroban-auth-contract = { id = "C234..." }
# soroban-errors-contract = { id = "C345..." }
# soroban-hello-world-contract = { id = "C456..." }
# soroban-increment-contract = { id = "C567..." }
# soroban-token-contract = { id = "C678..." }
# eurc = { id = "C789..." }

### Production environment configuration
[production.network]
rpc-url = "https://our-custom-rpc-provider.cool"
network-passphrase = "Public Global Stellar Network ; September 2015"

[[production.accounts]]
name = "official-team-account"
default = true

[production.contracts]
# soroban-atomic-swap-contract = { id = "C987..." }
# soroban-auth-contract = { id = "C876..." }
# soroban-errors-contract = { id = "C765..." }
# soroban-hello-world-contract = { id = "C654..." }
# soroban-increment-contract = { id = "C543..." }
# soroban-token-contract = { id = "C432..." }
# eurc = { id = "C321..." }
````

## File: eslint.config.js
````javascript
import js from "@eslint/js";
import globals from "globals";
import reactDOM from "eslint-plugin-react-dom";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import reactX from "eslint-plugin-react-x";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import { globalIgnores } from "eslint/config";

export default tseslint.config(
  globalIgnores([
    "dist",
    "packages",
    "src/contracts/*",
    "!src/contracts/util.ts",
  ]),
  {
    extends: [
      js.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      reactDOM.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
      reactX.configs["recommended-typescript"],
      prettier,
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRoot: import.meta.dirname,
      },
    },
    rules: {
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
);
````

## File: index.html
````html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <title>Scaffold Stellar Starter App</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Inconsolata:wght@500&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
````

## File: LICENSE
````
Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/

   TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

   1. Definitions.

      "License" shall mean the terms and conditions for use, reproduction,
      and distribution as defined by Sections 1 through 9 of this document.

      "Licensor" shall mean the copyright owner or entity authorized by
      the copyright owner that is granting the License.

      "Legal Entity" shall mean the union of the acting entity and all
      other entities that control, are controlled by, or are under common
      control with that entity. For the purposes of this definition,
      "control" means (i) the power, direct or indirect, to cause the
      direction or management of such entity, whether by contract or
      otherwise, or (ii) ownership of fifty percent (50%) or more of the
      outstanding shares, or (iii) beneficial ownership of such entity.

      "You" (or "Your") shall mean an individual or Legal Entity
      exercising permissions granted by this License.

      "Source" form shall mean the preferred form for making modifications,
      including but not limited to software source code, documentation
      source, and configuration files.

      "Object" form shall mean any form resulting from mechanical
      transformation or translation of a Source form, including but
      not limited to compiled object code, generated documentation,
      and conversions to other media types.

      "Work" shall mean the work of authorship, whether in Source or
      Object form, made available under the License, as indicated by a
      copyright notice that is included in or attached to the work
      (an example is provided in the Appendix below).

      "Derivative Works" shall mean any work, whether in Source or Object
      form, that is based on (or derived from) the Work and for which the
      editorial revisions, annotations, elaborations, or other modifications
      represent, as a whole, an original work of authorship. For the purposes
      of this License, Derivative Works shall not include works that remain
      separable from, or merely link (or bind by name) to the interfaces of,
      the Work and Derivative Works thereof.

      "Contribution" shall mean any work of authorship, including
      the original version of the Work and any modifications or additions
      to that Work or Derivative Works thereof, that is intentionally
      submitted to Licensor for inclusion in the Work by the copyright owner
      or by an individual or Legal Entity authorized to submit on behalf of
      the copyright owner. For the purposes of this definition, "submitted"
      means any form of electronic, verbal, or written communication sent
      to the Licensor or its representatives, including but not limited to
      communication on electronic mailing lists, source code control systems,
      and issue tracking systems that are managed by, or on behalf of, the
      Licensor for the purpose of discussing and improving the Work, but
      excluding communication that is conspicuously marked or otherwise
      designated in writing by the copyright owner as "Not a Contribution."

      "Contributor" shall mean Licensor and any individual or Legal Entity
      on behalf of whom a Contribution has been received by Licensor and
      subsequently incorporated within the Work.

   2. Grant of Copyright License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      copyright license to reproduce, prepare Derivative Works of,
      publicly display, publicly perform, sublicense, and distribute the
      Work and such Derivative Works in Source or Object form.

   3. Grant of Patent License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      (except as stated in this section) patent license to make, have made,
      use, offer to sell, sell, import, and otherwise transfer the Work,
      where such license applies only to those patent claims licensable
      by such Contributor that are necessarily infringed by their
      Contribution(s) alone or by combination of their Contribution(s)
      with the Work to which such Contribution(s) was submitted. If You
      institute patent litigation against any entity (including a
      cross-claim or counterclaim in a lawsuit) alleging that the Work
      or a Contribution incorporated within the Work constitutes direct
      or contributory patent infringement, then any patent licenses
      granted to You under this License for that Work shall terminate
      as of the date such litigation is filed.

   4. Redistribution. You may reproduce and distribute copies of the
      Work or Derivative Works thereof in any medium, with or without
      modifications, and in Source or Object form, provided that You
      meet the following conditions:

      (a) You must give any other recipients of the Work or
          Derivative Works a copy of this License; and

      (b) You must cause any modified files to carry prominent notices
          stating that You changed the files; and

      (c) You must retain, in the Source form of any Derivative Works
          that You distribute, all copyright, patent, trademark, and
          attribution notices from the Source form of the Work,
          excluding those notices that do not pertain to any part of
          the Derivative Works; and

      (d) If the Work includes a "NOTICE" text file as part of its
          distribution, then any Derivative Works that You distribute must
          include a readable copy of the attribution notices contained
          within such NOTICE file, excluding those notices that do not
          pertain to any part of the Derivative Works, in at least one
          of the following places: within a NOTICE text file distributed
          as part of the Derivative Works; within the Source form or
          documentation, if provided along with the Derivative Works; or,
          within a display generated by the Derivative Works, if and
          wherever such third-party notices normally appear. The contents
          of the NOTICE file are for informational purposes only and
          do not modify the License. You may add Your own attribution
          notices within Derivative Works that You distribute, alongside
          or as an addendum to the NOTICE text from the Work, provided
          that such additional attribution notices cannot be construed
          as modifying the License.

      You may add Your own copyright statement to Your modifications and
      may provide additional or different license terms and conditions
      for use, reproduction, or distribution of Your modifications, or
      for any such Derivative Works as a whole, provided Your use,
      reproduction, and distribution of the Work otherwise complies with
      the conditions stated in this License.

   5. Submission of Contributions. Unless You explicitly state otherwise,
      any Contribution intentionally submitted for inclusion in the Work
      by You to the Licensor shall be under the terms and conditions of
      this License, without any additional terms or conditions.
      Notwithstanding the above, nothing herein shall supersede or modify
      the terms of any separate license agreement you may have executed
      with Licensor regarding such Contributions.

   6. Trademarks. This License does not grant permission to use the trade
      names, trademarks, service marks, or product names of the Licensor,
      except as required for reasonable and customary use in describing the
      origin of the Work and reproducing the content of the NOTICE file.

   7. Disclaimer of Warranty. Unless required by applicable law or
      agreed to in writing, Licensor provides the Work (and each
      Contributor provides its Contributions) on an "AS IS" BASIS,
      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
      implied, including, without limitation, any warranties or conditions
      of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
      PARTICULAR PURPOSE. You are solely responsible for determining the
      appropriateness of using or redistributing the Work and assume any
      risks associated with Your exercise of permissions under this License.

   8. Limitation of Liability. In no event and under no legal theory,
      whether in tort (including negligence), contract, or otherwise,
      unless required by applicable law (such as deliberate and grossly
      negligent acts) or agreed to in writing, shall any Contributor be
      liable to You for damages, including any direct, indirect, special,
      incidental, or consequential damages of any character arising as a
      result of this License or out of the use or inability to use the
      Work (including but not limited to damages for loss of goodwill,
      work stoppage, computer failure or malfunction, or any and all
      other commercial damages or losses), even if such Contributor
      has been advised of the possibility of such damages.

   9. Accepting Warranty or Additional Liability. While redistributing
      the Work or Derivative Works thereof, You may choose to offer,
      and charge a fee for, acceptance of support, warranty, indemnity,
      or other liability obligations and/or rights consistent with this
      License. However, in accepting such obligations, You may act only
      on Your own behalf and on Your sole responsibility, not on behalf
      of any other Contributor, and only if You agree to indemnify,
      defend, and hold each Contributor harmless for any liability
      incurred by, or claims asserted against, such Contributor by reason
      of your accepting any such warranty or additional liability.

   END OF TERMS AND CONDITIONS

   APPENDIX: How to apply the Apache License to your work.

      To apply the Apache License to your work, attach the following
      boilerplate notice, with the fields enclosed by brackets "[]"
      replaced with your own identifying information. (Don't include
      the brackets!)  The text should be enclosed in the appropriate
      comment syntax for the file format. We also recommend that a
      file or class name and description of purpose be included on the
      same "printed page" as the copyright notice for easier
      identification within third-party archives.

   Copyright [yyyy] [name of copyright owner]

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
````

## File: package.json
````json
{
  "name": "scaffold-stellar-frontend",
  "type": "module",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "dev": "concurrently \"stellar scaffold watch --build-clients\" \"vite\"",
    "start": "concurrently \"stellar scaffold watch --build-clients\" \"vite\"",
    "build": "tsc -b && vite build",
    "install:contracts": "npm install --workspace=packages && npm run build --workspace=packages",
    "preview": "vite preview",
    "lint": "eslint .",
    "format": "prettier . --write",
    "prepare": "husky"
  },
  "workspaces": [
    "packages/*"
  ],
  "dependencies": {
    "@creit.tech/stellar-wallets-kit": "^1.9.5",
    "@stellar/design-system": "^3.1.5",
    "@stellar/stellar-sdk": "^14.2.0",
    "@stellar/stellar-xdr-json": "^23.0.0",
    "@tanstack/react-query": "^5.90.2",
    "lossless-json": "^4.2.0",
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "react-router-dom": "^7.9.3",
    "zod": "^4.1.11"
  },
  "devDependencies": {
    "@eslint/js": "^9.36.0",
    "@types/lodash": "^4.17.20",
    "@types/react": "^19.1.16",
    "@types/react-dom": "^19.1.9",
    "@types/react-router-dom": "^5.3.3",
    "@vitejs/plugin-react": "^5.0.4",
    "concurrently": "^9.2.1",
    "dotenv": "^17.2.3",
    "eslint": "^9.36.0",
    "eslint-config-prettier": "^10.1.8",
    "eslint-plugin-react-dom": "^2.0.3",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.22",
    "eslint-plugin-react-x": "^2.0.3",
    "glob": "^11.0.3",
    "globals": "^16.4.0",
    "husky": "^9.1.7",
    "lint-staged": "^16.2.3",
    "prettier": "3.6.2",
    "typescript": "~5.9.2",
    "typescript-eslint": "^8.45.0",
    "vite": "^7.1.11",
    "vite-plugin-node-polyfills": "^0.24.0",
    "vite-plugin-wasm": "^3.5.0"
  },
  "lint-staged": {
    "**/*": [
      "eslint --fix --no-warn-ignored",
      "prettier --write --ignore-unknown"
    ]
  }
}
````

## File: README.md
````markdown
# Scaffold Stellar Frontend

_To get started with Scaffold Stellar, visit its repo: [github.com/theahaco/scaffold-stellar](https://github.com/theahaco/scaffold-stellar)._

_Under active development._

A modern, up-to-date toolkit for building Stellar smart contract frontends.

- ⚡️ Vite + React + TypeScript
- 🔗 Auto-generated contract clients
- 🧩 Example components for contract interaction
- 🛠 Hot reload for contract changes
- 🧪 Easy local/testnet deployment

This is the starter frontend generated by `stellar scaffold init`. See more at [Scaffold Stellar](https://github.com/theahaco/scaffold-stellar).

## Requirements

Before getting started, make sure you’ve met the requirements listed in the [Soroban documentation](https://developers.stellar.org/docs/build/smart-contracts/getting-started/setup) and that the following tools are installed :

- [Rust](https://www.rust-lang.org/tools/install)
- [Cargo](https://doc.rust-lang.org/cargo/) (comes with Rust)
- Rust target: install the compilation target listed in the [Soroban setup guide](https://developers.stellar.org/docs/build/smart-contracts/getting-started/setup)
- [Node.js](https://nodejs.org/en/download/package-manager) (v22, or higher)
- [npm](https://www.npmjs.com/): Comes with the node installer or can also be installed package managers such as Homebrew, Chocolatey, apt, etc.
- [Stellar CLI](https://github.com/stellar/stellar-core)
- [Scaffold Stellar CLI Plugin](https://github.com/AhaLabs/scaffold-stellar)

## Quick Start

To get started with a fresh Scaffold Stellar project, follow the steps below:

1. Initialize a new project:

```bash
stellar scaffold init my-project
cd my-project
```

2. Set up your development environment:

```bash
# Copy and configure environment variables like network and STELLAR_SCAFFOLD_ENV
cp .env.example .env

# Install frontend dependencies
npm install
```

Have a look at `environments.toml` for more fined-grained control.

3. Start development environment:

```bash
npm run dev
```

Open the server URL in your web browser.

4. For testnet/mainnet deployment:

When you are ready for testnet, you need to deploy your contract using
`stellar registry`. Some commands to get you started.

```bash
#  Note --source-account argument is omitted for clarity

# First publish your contract to the registry
stellar registry publish

# Then deploy an instance with constructor parameters
stellar registry deploy \
  --deployed-name my-contract \
  --published-name my-contract \
  -- \
  --param1 value1

# Can access the help docs with --help
stellar registry deploy \
  --deployed-name my-contract \
  --published-name my-contract \
  -- \
  --help

# Install the deployed contract locally
stellar registry create-alias my-contract
```

## Scaffold Initial Project Structure

When you run `stellar scaffold init`, it creates a frontend-focused project structure with example contracts:

```
my-project/                      # Your initialized project
├── contracts/                   # Example smart contracts
├── packages/                    # Auto-generated TypeScript clients
├── src/                         # Frontend React application
│   ├── components/              # React components
│   ├── contracts/               # Contract interaction helpers
│   ├── debug/                   # Debugging contract explorer
│   ├── hooks/                   # Custom React hooks
│   ├── pages/                   # App Pages
│   ├── App.tsx                  # Main application component
│   └── main.tsx                 # Application entry point
├── target/                      # Build artifacts and WASM files
├── environments.toml            # Environment configurations
├── package.json                 # Frontend dependencies
└── .env                         # Local environment variables
```

This template provides a ready-to-use frontend application with example smart contracts and their TypeScript clients. You can use these as reference while building your own contracts and UI. The frontend is set up with Vite, React, and includes basic components for interacting with the contracts.
````

## File: rust-toolchain.toml
````toml
[toolchain]
channel = "1.89.0"
targets = ["wasm32v1-none"]
````

## File: SECURITY.md
````markdown
# Security Policy

## Reporting a Vulnerability

Please reach out to the team using GitHub's own security mechanism to submit an anonymous report.
````

## File: tsconfig.app.json
````json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["src"]
}
````

## File: tsconfig.json
````json
{
  "files": [],
  "exclude": ["packages"],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
````

## File: tsconfig.node.json
````json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,

    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,

    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["vite.config.ts"]
}
````

## File: vite.config.ts
````typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import wasm from "vite-plugin-wasm";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      react(),
      nodePolyfills({
        include: ["buffer"],
        globals: {
          Buffer: true,
        },
      }),
      wasm(),
    ],
    build: {
      target: "esnext",
    },
    optimizeDeps: {
      exclude: ["@stellar/stellar-xdr-json"],
    },
    define: {
      global: "window",
    },
    envPrefix: "PUBLIC_",
    server: {
      proxy: {
        "/friendbot": {
          target: "http://localhost:8000/friendbot",
          changeOrigin: true,
        },
      },
    },
  };
});
````
