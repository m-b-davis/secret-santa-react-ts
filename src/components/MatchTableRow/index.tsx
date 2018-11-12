import * as React from "react";
import { IMatch } from "../../types";
import NameIndicator from "../NameIndicator";

interface IMatchListItemProps {
    match: IMatch;
    onMatchClicked: React.MouseEventHandler<HTMLButtonElement>;
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
                <button onClick={props.onMatchClicked}>Send Email</button>
            </td>
        </tr>
    );
};

export default MatchTableRow;