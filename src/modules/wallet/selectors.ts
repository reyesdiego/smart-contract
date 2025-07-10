import { RootState } from '../types'

export const getState = (state: RootState) => state.wallet
export const getAddress = (state: RootState) => getState(state).address || ''
export const getBalance = (state: RootState) => getState(state).dummyBalance || null
export const isConnected = (state: RootState) => !!getAddress(state)
export const isLoading = (state: RootState) => getState(state).isLoading
export const getIsTransferring = (state: RootState) => getState(state).isTransferring
export const getTransactionId = (state: RootState) => getState(state).transactionId
export const isConnecting = (state: RootState) => getState(state).isConnecting
export const getError = (state: RootState) => getState(state).error
