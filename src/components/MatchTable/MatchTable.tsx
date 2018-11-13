import * as React from 'react';
import { Table, Button } from 'react-bootstrap';

import { IMatch } from '../../types';
import MatchTableRow from './MatchTableRow';

interface IProps {
    matches: IMatch[];
    getMatchClickedEventHandler: (match: IMatch) => React.MouseEventHandler<Button>
    secretMode: boolean;
}

const MatchTable = (props: IProps) => {
    return (
        <div>
            <h2 className="header-small">Matches</h2>
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Matched With</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {props.matches.map(match =>
                    <MatchTableRow
                        match={match}
                        key={match.santa.name}
                        onMatchClicked={props.getMatchClickedEventHandler(match)}
                        secretMode={props.secretMode}
                    />)}
                </tbody>
            </Table>
        </div>
    );
};

export default MatchTable;