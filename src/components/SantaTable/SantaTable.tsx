import * as React from "react";
import { Button, Table } from 'react-bootstrap';
import {ISanta, IMatch} from "../../types";
import SantaTableRow from './SantaTableRow';

interface IProps {
    santas: ISanta[];
    matches?: IMatch[];
    getDeleteSantaHandler: (santa: ISanta) => React.MouseEventHandler<Button>;
}

const SantaTable = (props: IProps) => {
    const { santas, matches } = props;

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
                        { matches && matches.length > 0 && <th>Match</th>}
                        <th>Remove</th>
                    </tr>
                    </thead>
                    <tbody>
                    {santas.map((santa, index) =>
                        <SantaTableRow
                            santa={santa}
                            match={matches && matches[index]}
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