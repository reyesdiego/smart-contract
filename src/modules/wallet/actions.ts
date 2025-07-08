// Connect Wallet
export const CONNECT_WALLET_REQUEST = '[Request] Connect Wallet'
export const CONNECT_WALLET_SUCCESS = '[Success] Connect Wallet'
export const CONNECT_WALLET_FAILURE = '[Failure] Connect Wallet'

// Get Balance
export const GET_BALANCE_REQUEST = '[Request] Get Balance'
export const GET_BALANCE_SUCCESS = '[Success] Get Balance'
export const GET_BALANCE_FAILURE = '[Failure] Get Balance'

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

export type ConnectWalletRequestAction = ReturnType<typeof connectWalletRequest>
export type ConnectWalletSuccessAction = ReturnType<typeof connectWalletSuccess>
export type ConnectWalletFailureAction = ReturnType<typeof connectWalletFailure>

export type WalletBalanceRequestAction = ReturnType<typeof walletBalanceRequest>
export type WalletBalanceSuccessAction = ReturnType<typeof walletBalanceSuccess>
export type WalletBalanceFailureAction = ReturnType<typeof walletBalanceFailure>
