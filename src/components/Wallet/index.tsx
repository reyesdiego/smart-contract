import React from 'react'
import { Card, Header, Row, Section } from 'decentraland-ui'
import './index.css'

type WalletProps = { address: string | null; balance: bigint | null }

const Wallet: React.FC<WalletProps> = ({ address, balance }) => {
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
        </div>
    )
}

export default Wallet;
