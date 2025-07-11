import {AnyAction} from "redux";
import {
    CONNECT_WALLET_FAILURE,
    CONNECT_WALLET_REQUEST,
    CONNECT_WALLET_SUCCESS,
    GET_BALANCE_FAILURE,
    GET_BALANCE_REQUEST,
    GET_BALANCE_SUCCESS, TRANSFER_CLEAR_TRANSACTION, TRANSFER_FUNDS_FAILURE,
    TRANSFER_FUNDS_REQUEST,
    TRANSFER_FUNDS_SUCCESS
} from "../../../../src/modules/wallet/actions";
import {walletReducer} from "../../../../src/modules/wallet/reducer";
import {WalletState} from "../../../../src/modules/wallet/types";

const INITIAL_STATE: WalletState = {
    address: null,
    dummyBalance: BigInt(0),
    balanceError: null,
    isConnecting: false,
    isLoading: false,
    isTransferring: false,
    transactionId: null,
    error: null,
}

describe('wallet reducer', () => {
    it('should return initial state', () => {
        expect(walletReducer(undefined, {} as AnyAction)).toEqual(INITIAL_STATE)
    })

    describe('CONNECT_WALLET', () => {
        it('should handle CONNECT_WALLET_REQUEST', () => {
            const action = {type: CONNECT_WALLET_REQUEST}
            const expectedState = {
                ...INITIAL_STATE,
                isConnecting: true,
                error: null
            }
            expect(walletReducer(INITIAL_STATE, action)).toEqual(expectedState)
        })

        it('should handle CONNECT_WALLET_SUCCESS', () => {
            const address = '0x123'
            const action = {
                type: CONNECT_WALLET_SUCCESS,
                payload: {address}
            }
            const expectedState = {
                ...INITIAL_STATE,
                address,
                isConnecting: false,
                error: null
            }
            expect(walletReducer(INITIAL_STATE, action)).toEqual(expectedState)
        })

        it('should handle CONNECT_WALLET_FAILURE', () => {
            const error = 'Connection failed'
            const action = {
                type: CONNECT_WALLET_FAILURE,
                payload: {error}
            }
            const expectedState = {
                ...INITIAL_STATE,
                isConnecting: false,
                error
            }
            expect(walletReducer(INITIAL_STATE, action)).toEqual(expectedState)
        })
    })

    describe('GET_BALANCE', () => {
        it('should handle GET_BALANCE_REQUEST', () => {
            const action = {type: GET_BALANCE_REQUEST}
            const expectedState = {
                ...INITIAL_STATE,
                isLoading: true
            }
            expect(walletReducer(INITIAL_STATE, action)).toEqual(expectedState)
        })

        it('should handle GET_BALANCE_SUCCESS', () => {
            const dummyBalance = BigInt(100)
            const action = {
                type: GET_BALANCE_SUCCESS,
                payload: {dummyBalance}
            }
            const expectedState = {
                ...INITIAL_STATE,
                dummyBalance,
                isLoading: false,
                balanceError: null
            }
            expect(walletReducer(INITIAL_STATE, action)).toEqual(expectedState)
        })

        it('should handle GET_BALANCE_FAILURE', () => {
            const error = 'Balance check failed'
            const action = {
                type: GET_BALANCE_FAILURE,
                payload: {error}
            }
            const expectedState = {
                ...INITIAL_STATE,
                isLoading: false,
                balanceError: error
            }
            expect(walletReducer(INITIAL_STATE, action)).toEqual(expectedState)
        })
    })

    describe('TRANSFER_FUNDS', () => {
        it('should handle TRANSFER_FUNDS_REQUEST', () => {
            const action = {type: TRANSFER_FUNDS_REQUEST}
            const expectedState = {
                ...INITIAL_STATE,
                isTransferring: true
            }
            expect(walletReducer(INITIAL_STATE, action)).toEqual(expectedState)
        })

        it('should handle TRANSFER_FUNDS_SUCCESS', () => {
            const transactionId = {hash: '0x456'}
            const action = {
                type: TRANSFER_FUNDS_SUCCESS,
                payload: {transactionId}
            }
            const expectedState = {
                ...INITIAL_STATE,
                isTransferring: false,
                transactionId: '0x456'
            }
            expect(walletReducer(INITIAL_STATE, action)).toEqual(expectedState)
        })

        it('should handle TRANSFER_FUNDS_FAILURE', () => {
            const error = 'Transfer failed'
            const action = {
                type: TRANSFER_FUNDS_FAILURE,
                payload: {error}
            }
            const expectedState = {
                ...INITIAL_STATE,
                isTransferring: false,
                error
            }
            expect(walletReducer(INITIAL_STATE, action)).toEqual(expectedState)
        })

        it('should handle TRANSFER_CLEAR_TRANSACTION', () => {
            const initialState = {
                ...INITIAL_STATE,
                transactionId: '0x456'
            }
            const action = {type: TRANSFER_CLEAR_TRANSACTION}
            const expectedState = {
                ...initialState,
                transactionId: null
            }
            expect(walletReducer(initialState, action)).toEqual(expectedState)
        })
    })
})
