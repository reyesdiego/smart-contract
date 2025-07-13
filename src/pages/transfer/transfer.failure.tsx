import {useLocation, useNavigate} from "react-router-dom";
import {Button, Card, Center, Icon, Row} from "decentraland-ui"
import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {transferFundsClearTransaction} from "../../modules/wallet/actions";

const Failure: React.FC = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigateTo = useNavigate();

    useEffect(() => {
        dispatch(transferFundsClearTransaction());
    }, [dispatch]);

    return <Center>
        <div className="wallet">
        <Card>
        <h1>Ups !</h1>
        <p>We are sorry, the transaction couldn't finish successfully</p>
        <p>Error: {location.state?.error}</p>
        </Card>
        <Row>
            <div style={{marginRight: "auto"}}>
                <Button basic onClick={() => navigateTo('/')}>
                    <Icon name="arrow left"/>
                    Wallet
                </Button>
            </div>
            <div style={{marginLeft: "auto"}}>
                <Button name="transfer" basic onClick={() => navigateTo('/transfer')}>
                    <Icon name="arrow right"/>
                    Try again
                </Button>
            </div>
        </Row>
        </div>
    </Center>
}

export default Failure;