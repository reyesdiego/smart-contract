import { ethers } from 'ethers'

export type WalletState = {
  address: string | null
  dummyBalance: bigint | null
  isConnecting: boolean
  error: string | null
  isLoading: boolean
  balanceError: string | null,
}

export type WindowWithEthereum = Window & {
  ethereum: ethers.Eip1193Provider
}
