import {Button, Center, Field, Card, Icon, Row, Header} from "decentraland-ui";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    getAddress,
    getBalance,
    getTransactionId,
} from "../../modules/wallet/selectors.ts";
import {useEffect, useState} from "react";
import {connectWalletRequest, transferFundsRequest} from "../../modules/wallet/actions.ts";

const Transfer = () => {
    const navigateTo = useNavigate()
    const dispatch = useDispatch();
    const address = useSelector(getAddress);
    const balance = useSelector(getBalance);
    const transactionId = useSelector(getTransactionId);
    // const isTransferring = useSelector(getIsTransferring);
    const [transferTo, setTransferTo] = useState('');
    const [funds, setFunds] = useState(0);
    const [fundsMessage, setFundsMessage] = useState('Max: ' + balance + '');
    const [fundsError, setFundsError] = useState(false);
    const [transferToError, setTransferToError] = useState(false);

    const sendDisabled = !transferTo || !funds || fundsError && transferToError

    useEffect(() => {
        dispatch(connectWalletRequest());
    }, [dispatch]);

    useEffect(() => {
        if (transactionId) {
            navigateTo(`/transfer-success/${transactionId}/${funds}`);
        }
    }, [transactionId, navigateTo, dispatch]);

    function handleSend(transferTo: string, funds: number) {
        if (transferTo && !transferToError && !fundsError && funds > 0) {
            dispatch(transferFundsRequest(transferTo, funds));
        }
    }

    return <Center>
        <div className="wallet">
        <Card>
            <Header data-testid="wallet-title">Transfer funds</Header>
            <Field
                label="Address"
                error={transferToError}
                maxLength={42}
                onChange={(_, data) => {
                    if (data.value.length < 42) return;

                    const isValidAddress = /^0x[a-fA-F0-9]{40}$/.test(data.value);
                    setTransferToError(!isValidAddress);
                    setTransferTo(data.value);
                }}
            />
            <Field label="Funds to Transfer"
                   type="number"
                   message={fundsMessage}
                   error={fundsError}
                   onChange={(_, data) => {
                        if (Number(data.value) > Number(balance)) {
                            setFundsMessage('Insufficient funds. Max: ' + balance + '');
                            setFundsError(true);
                        } else {
                            setFundsMessage('Left: ' + (Number(balance||0) - Number(data.value)) + '');
                            setFundsError(false);
                        }
                        setFunds(Number(data.value));
                    }}
            ></Field>
        </Card>
        <Row>
            <div style={{marginRight: "auto"}}>
                <Button basic onClick={() => navigateTo('/')}>
                    <Icon name="arrow left"/>
                    Back
                </Button>
            </div>
            <div style={{marginLeft: "auto"}}>
                <Button primary disabled={sendDisabled} onClick={() => handleSend(transferTo, funds )}>
                    <Icon name="send"/>
                    Send
                </Button>
            </div>
        </Row>
        </div>
    </Center>;
}

export default Transfer;