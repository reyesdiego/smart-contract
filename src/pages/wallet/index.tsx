import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connectWalletRequest } from '../../modules/wallet/actions.ts';
import {
    getBalance,
    getAddress,
    getError,
    isLoading
} from '../../modules/wallet/selectors.ts';
import Wallet from '../../components/Wallet'
import { Center} from 'decentraland-ui'

const Index = () => {
    const dispatch = useDispatch();
    const address = useSelector(getAddress);
    const isLoadingBalance = useSelector(isLoading);
    const balance = useSelector(getBalance);
    const error = useSelector(getError);

    useEffect(() => {
        dispatch(connectWalletRequest());
    }, [dispatch]);

    if (isLoadingBalance) {
        return <Center>Loading...</Center>;
    }
    if (error) {
        return <Center>{error}</Center>;
    }

    return (
        <Center>
            <Wallet address={address} balance={balance} />
        </Center>
    );
};

export default Index;
