import * as React from "react";
import { IMatch } from "../../types";
import { Button } from 'react-bootstrap';
import NameIndicator from "../NameIndicator/NameIndicator";

interface IMatchListItemProps {
    match: IMatch;
    onMatchClicked: React.MouseEventHandler<Button>
    secretMode: boolean;
}

const MatchTableRow = (props: IMatchListItemProps) => {
    return (
        <tr>
            <td>{props.match.santa.name}</td>
            {!props.secretMode &&
            <td>
                { props.match.matchedWith.map(santa =>
                    <span key={santa.name}>
                        <NameIndicator name={santa.name}/>
                        {santa.name}
                    </span>
                )}
            </td>
            }
            <td>
                <Button bsStyle="info" onClick={props.onMatchClicked}>Send Email</Button>
            </td>
        </tr>
    );
};

export default MatchTableRow;