import { ethers } from 'ethers'
import { call, put, takeEvery } from 'redux-saga/effects'
import { getMessageFromError} from '../utils'
import {
  connectWalletFailure,
  connectWalletSuccess,
  CONNECT_WALLET_REQUEST,
  walletBalanceRequest,
  walletBalanceSuccess,
  walletBalanceFailure,
  GET_BALANCE_REQUEST,
  WalletBalanceRequestAction,
} from './actions'
import { WindowWithEthereum } from './types'
import { VITE_TOKEN_ADDRESS } from '../../env'

// The regular `window` object with `ethereum` injected by MetaMask
const windowWithEthereum = window as unknown as WindowWithEthereum

/* This is the Dummy Token address, it identifies the token contract once deployed */
export const TOKEN_ADDRESS = VITE_TOKEN_ADDRESS
if (!TOKEN_ADDRESS) {
  console.error(`Missing env variable VITE_TOKEN_ADDRESS`)
}

/* This is the Dummy Token ABI (application binary interface)
  You will need this to interact with the deployed contract, ie:

  const provider = new.ethers.providers.Web3Provider(window.ethereum)
  const token = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, provider)
  const balance = await token.balanceOf(walletAddress) // --> returns the balance of DummyToken of the walletAddress
*/
export const TOKEN_ABI = [
  'function symbol() view returns (string)',
  'function balanceOf(address) view returns (uint)',
  'function transfer(address to, uint amount)'
]

export function* walletSaga() {
  yield takeEvery(CONNECT_WALLET_REQUEST, handleConnectWalletRequest)
  yield takeEvery(GET_BALANCE_REQUEST, handleGetBalanceRequest)
}

export function* handleConnectWalletRequest() {
  try {
    const provider = new ethers.BrowserProvider(windowWithEthereum.ethereum)
    yield call([provider, 'send'], 'eth_requestAccounts', []) as Awaited<ReturnType<typeof provider.send>>
    const signer = (yield call([provider, 'getSigner'])) as Awaited<ReturnType<typeof provider.getSigner>>

    const address = (yield call([signer, 'getAddress'])) as Awaited<ReturnType<typeof signer.getAddress>>
    yield put(connectWalletSuccess(address))
    yield put(walletBalanceRequest(address))
  } catch (error) {
    yield put(connectWalletFailure(getMessageFromError(error)))
  }
}

export function* handleGetBalanceRequest(action: WalletBalanceRequestAction) {
  try {
    const address = action.payload
    const provider = new ethers.BrowserProvider(windowWithEthereum.ethereum)
    const token = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, provider)
    const balance: bigint = yield call(() => token.balanceOf(address))
    yield put(walletBalanceSuccess(balance))
  } catch (error) {
    yield put(walletBalanceFailure(getMessageFromError(error)))
  }
}