import {Button, Card, Field, Header, Icon, Row} from "decentraland-ui";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import './index.css'
import route_paths from "../../routes/routes.ts";
import {useSelector} from "react-redux";
import {getIsTransferring} from "../../modules/wallet/selectors.ts";

const Transfer = ({balance, handleSend}: {balance: bigint | null, handleSend: (transferTo: string, funds: number) => void}) => {
    const navigateTo = useNavigate();
    const [transferTo, setTransferTo] = useState('');
    const [funds, setFunds] = useState(0);
    const [fundsMessage, setFundsMessage] = useState('');
    const [fundsError, setFundsError] = useState(false);
    const [transferToError, setTransferToError] = useState(false);
    const isTransferring = useSelector(getIsTransferring);

    const sendDisabled = !transferTo || !funds || fundsError && transferToError

    useEffect(() => {
        setFundsMessage('Max: ' + balance + '');
    }, [balance])

    function onSend(transferTo: string, funds: number) {
        if (transferTo && !transferToError && !fundsError && funds > 0) {
            handleSend(transferTo, funds);
        }
    }
    return  (<div className="transfer">
        <Card>
            <span style={{
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "3rem",
                textAlign: "center",
            }}>
                <Header>Transfer</Header>
                <p>Send funds to another address</p>
            </span>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2rem",
                }}
            >
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
            />
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
            </div>
        </Card>
        <Row>
            <div className="back-button" >
                <Button basic onClick={() => navigateTo(route_paths.WALLET)}>
                    <Icon name="arrow left"/>
                    Back
                </Button>
            </div>
            <div className="send-button" >
                <Button primary disabled={sendDisabled} loading={isTransferring} onClick={() => onSend(transferTo, funds)}>
                    <Icon name="send"/>
                    Send
                </Button>
            </div>
        </Row>
    </div>
    )

}

export default Transfer;