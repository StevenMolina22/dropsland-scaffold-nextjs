//! Fungible AllowList Example Contract.

//! This contract showcases how to integrate the AllowList extension with a
//! SEP-41-compliant fungible token. It includes essential features such as
//! controlled token transfers by an admin who can allow or disallow specific
//! accounts.
use soroban_sdk::{
    contract, contracterror, contractimpl, contracttype, token, Address, Env, String,
};
use stellar_access::{
    access_control::{self as access_control, AccessControl},
    ownable::{self as ownable, Ownable},
};
use stellar_macros::{default_impl, only_owner};
use stellar_tokens::fungible::{
    allowlist::{AllowList, FungibleAllowList},
    burnable::FungibleBurnable,
    Base, FungibleToken,
};

#[contracterror]
#[repr(u32)]
pub enum Error {
    ContractInitialized = 0,
    ContractNotInitialized = 1,
    AmountMustBePositive = 2,
    UnauthorizedAccess = 3,
    TokenNotFound = 4,
    PaymentAmountTooLow = 5,
    SaleNotInitialized = 6,
    InsufficientTokens = 7,
}

#[contracttype]
pub enum DataKey {
    OrderPaymentToken,
    OrderAmount,
    OrderPrice,
}

#[contract]
pub struct ExampleContract;

#[contractimpl]
impl ExampleContract {
    pub fn __constructor(
        e: &Env,
        admin: Address,
        manager: Address,
        decimals: u32,
        name: String,
        symbol: String,
        initial_supply: i128,
    ) {
        Base::set_metadata(e, decimals, name, symbol);

        access_control::set_admin(e, &admin);
        ownable::set_owner(e, &admin);

        // create a role "manager" and grant it to `manager`
        // access_control::grant_role_no_auth(e, &admin, &manager, &symbol_short!("manager"));

        // Allow the admin to transfer tokens
        // AllowList::allow_user(e, &admin);

        // Mint initial supply to the admin
        Base::mint(e, &admin, initial_supply);
    }

    #[only_owner]
    pub fn create_order(
        e: &Env,
        payment_token: Address,
        amount: i128,
        price_per_token: i128,
    ) -> Result<(), Error> {
        // save info in storage
        e.storage()
            .instance()
            .set(&DataKey::OrderPaymentToken, &payment_token);
        e.storage()
            .instance()
            .set(&DataKey::OrderPrice, &price_per_token);
        e.storage().instance().set(&DataKey::OrderAmount, &amount);

        // save DJ's token into contract for escrow
        let dj_fungible_address = e.current_contract_address();
        let owner = ownable::get_owner(e).ok_or(Error::ContractNotInitialized)?;

        let token_client = token::Client::new(e, &dj_fungible_address);
        token_client.transfer(&owner, &dj_fungible_address, &amount);

        Ok(())
    }

    pub fn buy_tokens(e: &Env, fan: Address, payment_amount: i128) -> Result<(), Error> {
        fan.require_auth();

        let owner = ownable::get_owner(e).ok_or(Error::ContractNotInitialized)?;
        let price = get_order_price(e)?;
        let token = get_order_token(e)?;
        let dj_fungible_address = e.current_contract_address();

        let tokens_to_buy = payment_amount / price;
        if tokens_to_buy == 0 {
            return Err(Error::PaymentAmountTooLow);
        }

        let remaining_amount = get_order_amount(e)?;
        if remaining_amount < tokens_to_buy {
            return Err(Error::InsufficientTokens);
        }

        // fan pays contract
        let token_client = token::Client::new(e, &token);
        token_client.transfer(&fan, &dj_fungible_address, &payment_amount);

        // contract pays fan
        let dj_fungible_client = token::Client::new(e, &dj_fungible_address);
        dj_fungible_client.transfer(&dj_fungible_address, &fan, &tokens_to_buy);

        // contract pays dj
        token_client.transfer(&dj_fungible_address, &owner, &payment_amount);

        set_order_amount(e, remaining_amount - tokens_to_buy);

        Ok(())
    }
}

fn get_order_token(e: &Env) -> Result<Address, Error> {
    e.storage()
        .instance()
        .get(&DataKey::OrderPaymentToken)
        .ok_or(Error::SaleNotInitialized)?
}

fn get_order_amount(e: &Env) -> Result<i128, Error> {
    e.storage()
        .instance()
        .get(&DataKey::OrderAmount)
        .ok_or(Error::SaleNotInitialized)?
}

fn get_order_price(e: &Env) -> Result<i128, Error> {
    e.storage()
        .instance()
        .get(&DataKey::OrderPrice)
        .ok_or(Error::SaleNotInitialized)?
}

fn set_order_amount(e: &Env, amount: i128) {
    e.storage().instance().set(&DataKey::OrderAmount, &amount)
}

#[default_impl]
#[contractimpl]
impl FungibleToken for ExampleContract {
    type ContractType = AllowList;
}
// #[contractimpl]
// impl FungibleAllowList for ExampleContract {
//     fn allowed(e: &Env, account: Address) -> bool {
//         AllowList::allowed(e, &account)
//     }

//     #[only_role(operator, "manager")]
//     fn allow_user(e: &Env, user: Address, operator: Address) {
//         AllowList::allow_user(e, &user)
//     }

//     #[only_role(operator, "manager")]
//     fn disallow_user(e: &Env, user: Address, operator: Address) {
//         AllowList::disallow_user(e, &user)
//     }
// }

#[default_impl]
#[contractimpl]
impl AccessControl for ExampleContract {}

#[default_impl]
#[contractimpl]
impl FungibleBurnable for ExampleContract {}

#[default_impl]
#[contractimpl]
impl Ownable for ExampleContract {}
