import {ISanta} from "../../types";
import * as React from "react";

import SantaTableRow from '../SantaTableRow';

interface ISantaListProps {
    santas: ISanta[];
    getDeleteSantaHandler: (santa: ISanta) => React.MouseEventHandler<HTMLButtonElement>;
}

const SantaTable = (props: ISantaListProps) => {
    const { santas } = props;

    const renderEmpty = () => (
        <p>You haven't added any santas yet!</p>
    );

    return (
        <div>
            <h1>Santas</h1>
            { santas.length === 0
                ? renderEmpty()
                : <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {santas.map(santa =>
                        <SantaTableRow
                            santa={santa}
                            key={santa.name}
                            onDelete={props.getDeleteSantaHandler(santa)}
                        />)}
                    </tbody>
                </table>
            }
        </div>
    );
};

export default SantaTable;