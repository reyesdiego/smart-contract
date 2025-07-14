import {Center} from "decentraland-ui";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    getBalance, getError, getFunds,
    getTransactionId,
} from "../../modules/wallet/selectors.ts";
import {useEffect} from "react";
import {connectWalletRequest, transferFundsRequest} from "../../modules/wallet/actions.ts";
import Transfer from "../../components/Transfer";

const TransferPage = () => {
    const navigateTo = useNavigate()
    const dispatch = useDispatch();
    const balance = useSelector(getBalance);
    const transactionId = useSelector(getTransactionId);
    const funds = useSelector(getFunds);
    const error = useSelector(getError);

    useEffect(() => {
        dispatch(connectWalletRequest());
    }, [dispatch]);

    useEffect(() => {
        if (transactionId) {
            navigateTo(`/transfer-success/${transactionId}/${funds}`);
        }
    }, [transactionId, funds, navigateTo, dispatch]);

    useEffect(() => {
        if (error) {
            navigateTo(`/transfer-failure`, {
                state: {
                    error
                }
            });
        }
    }, [error, navigateTo, dispatch]);

    function handleSend(transferTo: string, funds: number) {
        dispatch(transferFundsRequest(transferTo, funds));
    }

    return <Center>
        <Transfer balance={balance} handleSend={handleSend}/>
    </Center>;
}

export default TransferPage;