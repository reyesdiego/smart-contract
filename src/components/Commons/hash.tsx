import {copyToClipboard} from "../../modules/utils.ts";
import {Icon} from "decentraland-ui";

const Hash = ({hash, copyIcon} : {hash?: string, copyIcon?: boolean}) => {
    return <>
        <span data-testid="hash-text">
        {hash
            ? hash.slice(0, 17) + '......' + hash.slice(-12)
            : ''}
      </span>
        {copyIcon ? <span onClick={() => copyToClipboard(hash)} className="clipboard-icon">
            <Icon name="copy" />
        </span> : null}
    </>
}

export default Hash;