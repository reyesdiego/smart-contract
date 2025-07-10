// Connect Wallet
export const CONNECT_WALLET_REQUEST = '[Request] Connect Wallet'
export const CONNECT_WALLET_SUCCESS = '[Success] Connect Wallet'
export const CONNECT_WALLET_FAILURE = '[Failure] Connect Wallet'

// Get Balance
export const GET_BALANCE_REQUEST = '[Request] Get Balance'
export const GET_BALANCE_SUCCESS = '[Success] Get Balance'
export const GET_BALANCE_FAILURE = '[Failure] Get Balance'

// Transfer Funds
export const TRANSFER_FUNDS_REQUEST = '[Request] Transfer Funds'
export const TRANSFER_FUNDS_SUCCESS = '[Success] Transfer Funds'
export const TRANSFER_FUNDS_FAILURE = '[Failure] Transfer Funds'
export const TRANSFER_CLEAR_TRANSACTION = '[End] Transfer Funds [ Clear Transaction]';

export function connectWalletRequest() {
  return {
    type: CONNECT_WALLET_REQUEST,
    payload: {},
  }
}

export function connectWalletSuccess(address: string) {
  return {
    type: CONNECT_WALLET_SUCCESS,
    payload: {
      address,
    },
  }
}

export function connectWalletFailure(error: string) {
  return {
    type: CONNECT_WALLET_FAILURE,
    payload: {
      error,
    },
  }
}

export function walletBalanceRequest(address: string) {
  return {
    type: GET_BALANCE_REQUEST,
    payload: address
  }
}

export function walletBalanceSuccess(dummyBalance: bigint) {
  return {
    type: GET_BALANCE_SUCCESS,
    payload: { dummyBalance }
  }
}

export function walletBalanceFailure(error: string) {
  return {
    type: GET_BALANCE_FAILURE,
    payload: { error }
  }
}

export function transferFundsRequest(transferTo: string, funds: number) {
  return {
    type: TRANSFER_FUNDS_REQUEST,
    payload: {transferTo, funds}
  }
}

export function transferFundsSuccess(transactionId: string) {
  return {
    type: TRANSFER_FUNDS_SUCCESS,
    payload: {transactionId}
  }
}

export function transferFundsFailure(error: string) {
  return {type: TRANSFER_FUNDS_FAILURE, payload: {error}}
}

export function transferFundsClearTransaction() {
  return {type: TRANSFER_CLEAR_TRANSACTION, payload: { }}
}


export type ConnectWalletRequestAction = ReturnType<typeof connectWalletRequest>
export type ConnectWalletSuccessAction = ReturnType<typeof connectWalletSuccess>
export type ConnectWalletFailureAction = ReturnType<typeof connectWalletFailure>

export type WalletBalanceRequestAction = ReturnType<typeof walletBalanceRequest>
export type WalletBalanceSuccessAction = ReturnType<typeof walletBalanceSuccess>
export type WalletBalanceFailureAction = ReturnType<typeof walletBalanceFailure>

export type TransferFundsRequestAction = ReturnType<typeof transferFundsRequest>
export type TransferFundsSuccessAction = ReturnType<typeof transferFundsSuccess>
export type TransferFundsFailureAction = ReturnType<typeof transferFundsFailure>
export type TransferFundsClearTransactionAction = ReturnType<typeof transferFundsClearTransaction>