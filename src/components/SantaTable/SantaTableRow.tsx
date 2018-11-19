import * as React from "react";
import { Button } from 'react-bootstrap';
import { ISanta, IMatch } from "../../types";
import { getMailTo, copyToClipboard } from "../../utils";

interface IProps {
    santa: ISanta;
    match?: IMatch;
    secretMode?: boolean;
    onDelete: React.MouseEventHandler<Button>
}

const SantaTableRow = (props: IProps) => {
    return (
        <tr>
            <td>{props.santa.name}</td>
            <td>{props.santa.email}</td>
            {props.match && <td>
                <input className="santa-table__url-input" type="text" value={props.match.url} id="myInput"></input>
                <Button 
                    className="santa-table__match-btn"
                    bsStyle="success"
                    onClick={() => copyToClipboard(props.match!.url!)}>
                    Copy Link
                </Button>
                
                <a className="santa-table__match-btn btn btn-info" href={getMailTo(props.match)}>Send Email...</a>
            </td>}
            <td>
                <Button bsStyle="warning" onClick={props.onDelete}>Remove</Button>
            </td>
        </tr>
    );
};

export default SantaTableRow;