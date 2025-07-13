import React from 'react'
import {Button, Column, Icon, Row} from 'decentraland-ui'

interface ErrorProps {
    message: string | null
    onRetry?: () => void
}

const Error: React.FC<ErrorProps> = ({message, onRetry}) => {
    return (<Row>
            <Icon name="warning" size="big" color="red" className="icon-warning"/>
            <Column align="center">
                <p>There was an error connecting your wallet</p>
                {!!message && <p>({message})</p>}
                {onRetry && <Button onClick={onRetry} size="small">Try again</Button>}
            </Column>
        </Row>
    )
}
export default Error
