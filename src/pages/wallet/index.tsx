import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connectWalletRequest } from '../../modules/wallet/actions.ts';
import {
    getBalance,
    getAddress,
    getError,
    isLoading, isConnecting
} from '../../modules/wallet/selectors.ts';
import Wallet from '../../components/Wallet'
import {Center, Loader} from 'decentraland-ui'
import Error from '../../components/Error'

const WalletPage: React.FC = () => {
    const dispatch = useDispatch();
    const address = useSelector(getAddress);
    const isConnectingSel = useSelector(isConnecting)
    const isLoadingBalance = useSelector(isLoading);
    const balance = useSelector(getBalance);
    const error = useSelector(getError);

    useEffect(() => {
        dispatch(connectWalletRequest());
    }, [dispatch]);

    if (isConnectingSel) {
        return <Center>
            <Loader active size="massive" content={'Connecting to the blockchain...'}/>
        </Center>;
    }
    if (isLoadingBalance) {
        return <Center>
            <Loader active size="massive" content={'Loading Balance...'}/>
        </Center>;
    }
    if (error) {
        return <Center><Error title="Error connecting to the blockchain." message={error} onRetry={()=>dispatch(connectWalletRequest())}/></Center>;
    }

    return (
        <Center>
            <Wallet address={address} balance={balance} />
        </Center>
    );
};

export default WalletPage;
