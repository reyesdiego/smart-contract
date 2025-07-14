import { render, screen, fireEvent } from '@testing-library/react';
import Success from '../../../../src/pages/transfer/transfer.success';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom'
import {useParams, useLocation} from "react-router-dom";
import {transferFundsClearTransaction} from "../../../../src/modules/wallet/actions";
import { useDispatch } from 'react-redux';
import Failure from "../../../../src/pages/transfer/transfer.failure";

const mockStore = configureStore([]);
const store = mockStore({});
store.dispatch = jest.fn();

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
    useLocation: jest.fn(),
    useNavigate: () => mockNavigate,
}))
const mockParams = useParams as jest.Mock;
const mockLocation = useLocation as jest.Mock;

describe('Transfer' , () => {
    describe('Transfer Success', () => {
        const mockDispatch = jest.fn();
        beforeEach(() => {
            mockParams.mockReturnValue({transaction: 'tx', funds: 13});
            store.clearActions();
            (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
        });
        it('it should render exact messages', () => {
            render(<Provider store={store}><Success /></Provider>);
            expect(screen.getByText(/Congrats !/i)).toBeInTheDocument();
            expect(screen.getByText(/You've just successfully transferred/i)).toBeInTheDocument();
            expect(screen.getByText(/13 DUMMIES/i)).toBeInTheDocument();
            expect(screen.getByText(/Transaction ID:/i)).toBeInTheDocument();
        });
        it('is should navigates to transfer page when press Transfer', () => {
            render(<Provider store={store}><Success /></Provider>);
            const button = screen.getByRole('button', { name: /Transfer/i })
            fireEvent.click(button)
            expect(mockNavigate).toHaveBeenCalledWith('/transfer')
        })
        it('is should navigates to wallet page when press Back', () => {
            render(<Provider store={store}><Success /></Provider>);
            const button = screen.getByRole('button', { name: /Wallet/i })
            fireEvent.click(button)
            expect(mockNavigate).toHaveBeenCalledWith('/')
        })
        it('dispatches transferFundsClearTransaction on mount', () => {
            render(<Provider store={store}><Success /></Provider>);

            expect(mockDispatch).toHaveBeenCalledWith(transferFundsClearTransaction());
        });
    });

    describe('Transfer Failure', () => {
        const mockDispatch = jest.fn();
        beforeEach(() => {
            mockLocation.mockReturnValue({state: {error: 'The Test Error Message'}});
            store.clearActions();
            (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
        });
        it('it should render exact messages', () => {
            render(<Provider store={store}><Failure /></Provider>);
            expect(screen.getByText(/Ups !/i)).toBeInTheDocument();
            expect(screen.getByText(/We are sorry, the transaction couldn't finish successfully/i)).toBeInTheDocument();
            expect(screen.getByText(/Error: The Test Error message/i)).toBeInTheDocument();
        });
        it('is should navigates to transfer page when press Try again', () => {
            render(<Provider store={store}><Failure /></Provider>);
            const button = screen.getByRole('button', { name: /try again/i })
            fireEvent.click(button)
            expect(mockNavigate).toHaveBeenCalledWith('/transfer')
        })
        it('is should navigates to wallet page when press Back', () => {
            render(<Provider store={store}><Failure /></Provider>);
            const button = screen.getByRole('button', { name: /wallet/i })
            fireEvent.click(button)
            expect(mockNavigate).toHaveBeenCalledWith('/')
        })
        it('dispatches transferFundsClearTransaction on mount', () => {
            render(<Provider store={store}><Failure /></Provider>);

            expect(mockDispatch).toHaveBeenCalledWith(transferFundsClearTransaction());
        });
    });
});
