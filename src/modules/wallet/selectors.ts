import { RootState } from '../types'
import {createSelector} from 'reselect'

export const getState = (state: RootState) => state.wallet

export const getAddress = createSelector(
    [getState],
    (wallet) => wallet.address || ''
)

export const getBalance = createSelector(
    [getState],
    (wallet) => wallet.dummyBalance || null
)

export const getFunds = createSelector(
    [getState],
    (wallet) => wallet.funds || null
)

export const isConnected = createSelector(
    [getAddress],
    (address) => !!address
)

export const isLoading = createSelector(
    [getState],
    (wallet) => wallet.isLoading
)

export const getIsTransferring = createSelector(
    [getState],
    (wallet) => wallet.isTransferring
)

export const getTransactionId = createSelector(
    [getState],
    (wallet) => wallet.transactionId
)

export const isConnecting = createSelector(
    [getState],
    (wallet) => wallet.isConnecting
)

export const getError = createSelector(
    [getState],
    (wallet) => wallet.error
)