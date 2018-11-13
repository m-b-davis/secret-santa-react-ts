import * as React from "react";
import {ISanta} from "../../types";
import NameIndicator from "../NameIndicator";


interface ISantaListItemProps {
    santa: ISanta;
    onDelete: React.MouseEventHandler<HTMLButtonElement>
}

const SantaTableRow = (props: ISantaListItemProps) => {
    return (
        <tr>
            <td>
                <NameIndicator name={props.santa.name}/>
                {props.santa.name}
            </td>
            <td>{props.santa.email}</td>
            <td><button onClick={props.onDelete}>x</button></td>
        </tr>
    );
};

export default SantaTableRow;