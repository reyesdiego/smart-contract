import {useNavigate, useParams} from "react-router-dom";
import {Button, Card, Center, Icon, Row} from "decentraland-ui"
import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {transferFundsClearTransaction} from "../../modules/wallet/actions";
import Hash from "../../components/Commons/hash.tsx";
import route_paths from "../../routes/routes.ts";

const Success: React.FC = () => {
    const dispatch = useDispatch();
    const { transaction, funds } = useParams();
    const navigateTo = useNavigate();

    useEffect(() => {
        dispatch(transferFundsClearTransaction());
    }, [dispatch]);

    return <Center>
        <div className="wallet">
        <Card>
            <h1>Congrats !</h1>
            <p>You've just successfully transferred <strong>{funds} DUMMIES</strong></p>
            <p>Transaction ID: <Hash hash={transaction || ''} copyIcon={true}/></p>
        </Card>
        <Row>
            <div style={{marginRight: "auto"}}>
                <Button basic onClick={() => navigateTo(route_paths.WALLET)}>
                    <Icon name="arrow left"/>
                    Wallet
                </Button>
            </div>
            <div style={{marginLeft: "auto"}}>
                <Button basic onClick={() => navigateTo(route_paths.TRANSFER)}>
                    <Icon name="arrow right"/>
                    Transfer
                </Button>
            </div>
        </Row>
        </div>
    </Center>
}

export default Success;