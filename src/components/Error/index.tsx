import React from 'react'
import {Button, Column, Icon, Row} from 'decentraland-ui'

interface ErrorProps {
    message?: string | null
    title?: string
    onRetry?: () => void
}

const Error: React.FC<ErrorProps> = ({title, message, onRetry}) => {
    return (<Row>
            <Icon name="warning" size="big" color="red" className="icon-warning"/>
            <Column align="center">
                {!!title && <p>({title})</p>}
                {!!message && <p>({message})</p>}
                {onRetry && <Button onClick={onRetry} size="small">Try again</Button>}
            </Column>
        </Row>
    )
}
export default Error
