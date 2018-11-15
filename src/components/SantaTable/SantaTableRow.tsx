import * as React from "react";
import { Button } from 'react-bootstrap';
import { ISanta, IMatch } from "../../types";

interface IProps {
    santa: ISanta;
    match?: IMatch;
    onMatchClicked?: React.MouseEventHandler<Button>;
    secretMode?: boolean;
    onDelete: React.MouseEventHandler<Button>
}

function copyToClipboard(text: string) {

    // Create an auxiliary hidden input
    var aux = document.createElement("input");
  
    // Get the text from the element passed into the input
    aux.setAttribute("value", text);
  
    // Append the aux input to the body
    document.body.appendChild(aux);
  
    // Highlight the content
    aux.select();
  
    // Execute the copy command
    document.execCommand("copy");
  
    // Remove the input from the body
    document.body.removeChild(aux);
  
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

                <Button 
                    bsStyle="info"
                    className="santa-table__match-btn"
                    onClick={props.onMatchClicked}>
                    Send Email
                </Button>

            </td>}
            <td>
                <Button bsStyle="warning" onClick={props.onDelete}>Remove</Button>
            </td>
        </tr>
    );
};

export default SantaTableRow;