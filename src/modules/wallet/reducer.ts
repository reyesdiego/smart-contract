import { AnyAction } from 'redux'
import {
  ConnectWalletFailureAction,
  ConnectWalletSuccessAction,
  WalletBalanceSuccessAction,
  WalletBalanceFailureAction,
  TransferFundsFailureAction,
  CONNECT_WALLET_FAILURE,
  CONNECT_WALLET_REQUEST,
  CONNECT_WALLET_SUCCESS,
  GET_BALANCE_REQUEST,
  GET_BALANCE_SUCCESS,
  GET_BALANCE_FAILURE,
  TRANSFER_FUNDS_REQUEST,
  TRANSFER_FUNDS_SUCCESS,
  TRANSFER_FUNDS_FAILURE,
  TRANSFER_CLEAR_TRANSACTION
} from './actions'
import { WalletState } from './types'

const INITIAL_STATE: WalletState = {
  address: null,
  dummyBalance: BigInt(0),
  balanceError: null,
  isConnecting: false,
  isLoading: false,
  isTransferring: false,
  transactionId: null,
  funds: null,
  error: null,
}

export function walletReducer(
  state: WalletState = INITIAL_STATE,
  action: AnyAction
): WalletState {
  switch (action.type) {
    case CONNECT_WALLET_REQUEST: {
      return {
        ...state,
        isConnecting: true,
        error: null,
      }
    }
    case CONNECT_WALLET_SUCCESS: {
      const { address } =
        action.payload as ConnectWalletSuccessAction['payload']
      return {
        ...state,
        isConnecting: false,
        address,
        error: null,
      }
    }

    case CONNECT_WALLET_FAILURE: {
      const { error } = action.payload as ConnectWalletFailureAction['payload']
      return {
        ...state,
        isConnecting: false,
        error,
      }
    }

    case GET_BALANCE_REQUEST: {
      return { ...state, isLoading: true}
    }

    case GET_BALANCE_SUCCESS: {

      const { dummyBalance } = action.payload as WalletBalanceSuccessAction['payload']
      return { ...state, dummyBalance, isLoading: false, balanceError: null }
    }

    case GET_BALANCE_FAILURE: {
      const { error } = action.payload as WalletBalanceFailureAction['payload']
      return { ...state, isLoading: false, balanceError: error }
    }

    case TRANSFER_FUNDS_REQUEST: {
      return { ...state, isTransferring: true, }
    }

    case TRANSFER_FUNDS_SUCCESS: {
      const actionData = action.payload
      return { ...state, isTransferring: false, transactionId: actionData?.transactionId?.hash, funds: actionData?.funds}
    }

    case TRANSFER_FUNDS_FAILURE: {
      const { error } = action.payload as TransferFundsFailureAction['payload']
      return { ...state, isTransferring: false, error }
    }

    case TRANSFER_CLEAR_TRANSACTION:
      return {
        ...state,
        transactionId: null,
        funds: null,
      };
    default:
      return state
  }
}
