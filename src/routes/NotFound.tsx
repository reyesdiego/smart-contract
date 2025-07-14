import React from "react";
import {useNavigate} from "react-router-dom";
import {Button, Center, Column, Icon, Row} from "decentraland-ui";

const NotFound: React.FC = () => {
    const navigateTo = useNavigate();
    return <Center>
        <Row>
            <Icon name="warning" size="big" color="red" className="icon-warning"/>
            <Column align="center">
                <h1>404</h1>
                <p>Page not found</p>
                <Button onClick={() => navigateTo('/')} size="small" >Return to the Wallet</Button>
            </Column>
        </Row>
    </Center>
}

export default NotFound;