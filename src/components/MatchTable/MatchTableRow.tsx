import * as React from "react";
import {Button} from "react-bootstrap";
import {IMatch} from "../../types";
import NameIndicator from "../NameIndicator/NameIndicator";

interface IProps {
    match: IMatch;
    onMatchClicked: React.MouseEventHandler<Button>;
    secretMode: boolean;
}

const MatchTableRow = (props: IProps) => {
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
                <Button bsStyle="info" style={{marginTop: 0}} onClick={props.onMatchClicked}>Send Email</Button>
            </td>
        </tr>
    );
};

export default MatchTableRow;