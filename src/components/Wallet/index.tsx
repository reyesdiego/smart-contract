import React from 'react'
import { Card, Header, Row, Section, Button, Icon } from 'decentraland-ui'
import './index.css'
import {useNavigate} from "react-router-dom";
import Hash from "../Commons/hash.tsx";
import route_paths from "../../routes/routes.ts";

type WalletProps = { address: string | null; balance: bigint | null }

const Wallet: React.FC<WalletProps> = ({ address, balance }) => {
    const navigateTo = useNavigate()

    return (<div className="wallet">
            <Card >
                <Header>Wallet</Header>
                <Section size="tiny">
                    <Row className="balance">
                        <strong>Address:</strong>
                        <Hash hash={address || ''}></Hash>
                    </Row>
                </Section>
                <Section size="tiny">
                    <Row className="balance">
                        <strong>Balance:</strong>&nbsp;
                        <p className="wallet-balance">
                            {balance ? balance.toString() : 0}
                        </p>
                        <p className="wallet-token">DUMMIES</p>
                    </Row>
                </Section>
            </Card>
            <Row>
                <div className="transfer-button">
                <Button basic onClick={() => navigateTo(route_paths.TRANSFER)}>
                    <Icon name="arrow right" />
                    Transfer
                </Button>
                </div>
            </Row>
        </div>
    )
}

export default Wallet;
