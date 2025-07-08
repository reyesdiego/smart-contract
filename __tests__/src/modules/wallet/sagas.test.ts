import { runSaga } from 'redux-saga';
import { handleGetBalanceRequest } from '../../../../src/modules/wallet/sagas';
import {walletBalanceSuccess, walletBalanceFailure, GET_BALANCE_REQUEST} from '../../../../src/modules/wallet/actions';
import * as ethers from 'ethers';
import { getMessageFromError } from '../../../../src/modules/utils';

// Mocks
jest.mock('ethers');
jest.mock('../../../../src/env', () => ({ VITE_TOKEN_ADDRESS: '0x01010101' }))

describe('handleGetBalanceRequest saga', () => {
    const fakeAddress = '0x1234567890123456789012345678901234567890';
    const fakeBalance = 12345n;

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('dispatches success action on success', async () => {
        // Mock the token contract
        const balanceOfMock = jest.fn().mockResolvedValue(fakeBalance);
        (ethers as any).Contract.mockImplementation(() => ({
            balanceOf: balanceOfMock,
        }));

        const dispatched: any[] = [];

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
            },
            handleGetBalanceRequest,
            {type: GET_BALANCE_REQUEST, payload: fakeAddress }
        ).toPromise();

        expect(balanceOfMock).toHaveBeenCalledWith(fakeAddress);
        expect(dispatched).toContainEqual(walletBalanceSuccess(fakeBalance));
    });

    it('dispatches failure action on error', async () => {
        const fakeError = new Error('Failed balance');

        const balanceOfMock = jest.fn().mockRejectedValue(fakeError);
        (ethers as any).Contract.mockImplementation(() => ({
            balanceOf: balanceOfMock,
        }));

        // Optionally mock getErrorMessage
        jest.spyOn(require('../../../../src/modules/utils'), 'getMessageFromError').mockReturnValue('Mock error message');

        const dispatched: any[] = [];

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
            },
            handleGetBalanceRequest,
            {type: GET_BALANCE_REQUEST, payload: fakeAddress }
        ).toPromise();

        expect(dispatched).toContainEqual(walletBalanceFailure('Mock error message'));
    });
});
