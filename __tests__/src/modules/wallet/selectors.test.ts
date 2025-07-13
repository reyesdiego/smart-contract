import {
    getState,
    getAddress,
    getBalance,
    isConnected,
    isConnecting,
    getError, isLoading, getIsTransferring, getTransactionId,
} from '../../../../src/modules/wallet/selectors';
import {RootState} from "../../../../src/modules/types";

describe('wallet selectors', () => {
    const baseState = {
        wallet: {
            address: '0x1234567890abcdef',
            dummyBalance: 42n,
            isConnecting: false,
            error: null,
            isLoading: false,
            balanceError: null,
            isTransferring: false,
            transactionId: '0xabc',
            funds: 100,
        }
    }

    it('should select wallet state', () => {
        expect(getState(baseState as RootState)).toEqual(baseState.wallet)
    })

    it('should select wallet address', () => {
        expect(getAddress(baseState as RootState)).toBe('0x1234567890abcdef')
    })

    it('should return empty string if no address', () => {
        const state = {
            wallet: {
                ...baseState.wallet,
                address: ''
            }
        }
        expect(getAddress(state as RootState)).toBe('')
    })

    it('should select wallet balance', () => {
        expect(getBalance(baseState as RootState)).toBe(42n)
    })

    it('should return null if no balance', () => {
        const state = {
            wallet: {
                ...baseState.wallet,
                dummyBalance: 0n
            }
        }
        expect(getBalance(state as RootState)).toBeNull()
    })

    it('should check if wallet is connected', () => {
        expect(isConnected(baseState as RootState)).toBe(true)
    })

    it('should return false if wallet not connected', () => {
        const state = {
            wallet: {
                ...baseState.wallet,
                address: ''
            }
        }
        expect(isConnected(state as RootState)).toBe(false)
    })

    it('should check if wallet is loading', () => {
        expect(isLoading(baseState as RootState)).toBe(false)
    })

    it('should check if transferring', () => {
        expect(getIsTransferring(baseState as RootState)).toBe(false)
    })

    it('should get transaction id', () => {
        expect(getTransactionId(baseState as RootState)).toBe('0xabc')
    })

    it('should check if connecting', () => {
        expect(isConnecting(baseState as RootState)).toBe(false)
    })

    it('should get error', () => {
        expect(getError(baseState as RootState)).toBeNull()
    })
})