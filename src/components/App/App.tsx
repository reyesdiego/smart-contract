import React from 'react'
import { Button, Card, Center, Footer, Header, Navbar, Page } from 'decentraland-ui'
import { Props } from './App.types'
import './App.css'

const App: React.FC<Props> = ({ address, balance, isConnected, onConnect, isConnecting, error }) => {
    const theBalance = balance || 0;
    const dummyDescription = theBalance +  (theBalance>1n || theBalance === 0 ? ' DUMMIES' : ' DUMMY')

    return (
    <>
      <Navbar activePage="Wallet" />
      <Page className="App">
        <Center>
          {!isConnected ? (
            <>
              <Button primary onClick={onConnect} loading={isConnecting}>
                Connect
              </Button>
              {error ? <p className="error">{error}</p> : null}
            </>
          ) : (
            <Card>
              <Header>Wallet</Header>
              <p>
                <strong>Address:</strong>&nbsp;
                {address.slice(0, 6) + '...' + address.slice(-4)}
              </p>
                <p>
                    <strong>Balance:</strong>&nbsp;
                    {dummyDescription}
                </p>
            </Card>
          )}
        </Center>
      </Page>
      <Footer />
    </>
    )
}

export default App
