import * as React from "react";
import { Button, Table } from 'react-bootstrap';
import {ISanta} from "../../types";
import SantaTableRow from './SantaTableRow';

interface IProps {
    santas: ISanta[];
    getDeleteSantaHandler: (santa: ISanta) => React.MouseEventHandler<Button>;
}

const SantaTable = (props: IProps) => {
    const { santas } = props;

    const renderEmpty = () => (
        <p>You haven't added any santas yet!</p>
    );

    return (
        <div>
            <h2 className="header-small">Santas</h2>
            { santas.length === 0
                ? renderEmpty()
                : <Table responsive={true} bordered={true} condensed={true}>
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
                </Table>
            }
        </div>
    );
};

export default SantaTable;