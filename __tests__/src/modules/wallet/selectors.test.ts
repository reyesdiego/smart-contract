import {
    getState,
    getAddress,
    getBalance,
    isConnected,
    isConnecting,
    getError,
} from '../../../../src/modules/wallet/selectors';

describe('wallet selectors', () => {
    const baseState = {
        wallet: {
            address: '0x1234567890abcdef',
            dummyBalance: 42n,
            isConnecting: false,
            error: 'Something went wrong',
        },
    };

    it('getState should return the wallet slice', () => {
        expect(getState(baseState as any)).toEqual(baseState.wallet);
    });

    it('getAddress should return address', () => {
        expect(getAddress(baseState as any)).toBe('0x1234567890abcdef');
    });

    it('getAddress should return empty string if address undefined', () => {
        const state = {
            wallet: {
                ...baseState.wallet,
                address: undefined,
            },
        };
        expect(getAddress(state as any)).toBe('');
    });

    it('getBalance should return dummy balance', () => {
        expect(getBalance(baseState as any)).toBe(42n);
    });

    it('getBalance should return null if dummyBalance is undefined', () => {
        const state = {
            wallet: {
                ...baseState.wallet,
                dummyBalance: undefined,
            },
        };
        expect(getBalance(state as any)).toBeNull();
    });

    it('isConnected should be true if address exists', () => {
        expect(isConnected(baseState as any)).toBe(true);
    });

    it('isConnected should be false if address empty', () => {
        const state = {
            wallet: {
                ...baseState.wallet,
                address: '',
            },
        };
        expect(isConnected(state as any)).toBe(false);
    });

    it('isConnecting should return isConnecting value', () => {
        expect(isConnecting(baseState as any)).toBe(false);
    });

    it('getError should return the error message', () => {
        expect(getError(baseState as any)).toBe('Something went wrong');
    });
});
