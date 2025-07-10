import React from 'react'
import { Card, Header, Row, Section, Button, Icon } from 'decentraland-ui'
import './index.css'
import {useNavigate} from "react-router-dom";

type WalletProps = { address: string | null; balance: bigint | null }

const Wallet: React.FC<WalletProps> = ({ address, balance }) => {
    const navigateTo = useNavigate()
    const addressShort = address?.slice(0, 6) + '...' + address?.slice(-4);
    return (
        <div className="wallet">
            <Card >
                <Header data-testid="wallet-title">Wallet</Header>
                <Section size="tiny">
                    <Row className="balance">
                        <strong>Address:</strong>&nbsp;
                        <p className="wallet-token">
                        {addressShort || 'Address is not available'}
                        </p>
                    </Row>
                </Section>
                <Section size="tiny">
                    <Row className="balance">
                        <strong>Balance:</strong>&nbsp;
                        <p className="wallet-balance" data-testid="wallet-balance">
                            {!!balance ? balance.toString() : 0}
                        </p>
                        <p className="wallet-token">DUMMIES</p>
                    </Row>
                </Section>
            </Card>
            <Row>
                <div style={{marginLeft: "auto"}}>
                <Button basic onClick={() => navigateTo('/transfer')}>
                    <Icon name="arrow right" />
                    Transfer
                </Button>
                </div>
            </Row>

        </div>
    )
}

export default Wallet;
