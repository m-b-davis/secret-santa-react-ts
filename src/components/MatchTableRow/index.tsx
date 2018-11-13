import * as React from "react";
import {IMatch} from "../../types";
import NameIndicator from "../NameIndicator";
import {Button} from "react-bootstrap";

interface IMatchListItemProps {
    match: IMatch;
    onMatchClicked: (match: IMatch) => React.MouseEventHandler<HTMLButtonElement>;
    secretMode: boolean;
}

const MatchTableRow = (props: IMatchListItemProps) => {
    const handleMatchClicked = () => props.onMatchClicked(props.match);
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
                <Button style={{marginTop: 0}} onClick={handleMatchClicked}>Send Email</Button>
            </td>
        </tr>
    );
};

export default MatchTableRow;