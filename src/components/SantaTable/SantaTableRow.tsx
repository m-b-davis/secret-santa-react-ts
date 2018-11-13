import * as React from "react";
import { Button } from 'react-bootstrap';
import {ISanta} from "../../types";
import NameIndicator from "../NameIndicator/NameIndicator";

interface IProps {
    santa: ISanta;
    onDelete: React.MouseEventHandler<Button>
}

const SantaTableRow = (props: IProps) => {
    return (
        <tr>
            <td><NameIndicator name={props.santa.name}/>{props.santa.name}</td>
            <td>{props.santa.email}</td>
            <td><Button bsStyle="warning" onClick={props.onDelete}>Remove</Button></td>
        </tr>
    );
};

export default SantaTableRow;