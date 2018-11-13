import * as React from 'react';
import { Button, Table  } from 'react-bootstrap';

import { IMatch } from '../../types';
import MatchTableRow from './MatchTableRow';

interface IProps {
    matches: IMatch[];
    getMatchClickedEventHandler: (match: IMatch) => React.MouseEventHandler<Button>
    secretMode: boolean;
}

const MatchTable = (props: IProps)=> {
    const handleMatchClicked = (match: IMatch) => props.getMatchClickedEventHandler(match);
    return (
        <div>
            <h2 className="header-small">Matches</h2>
            <Table striped={true} bordered={true} condensed={true} >
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
                        onMatchClicked={handleMatchClicked(match)}
                        secretMode={props.secretMode}
                    />)}
                </tbody>
            </Table>
        </div>
    );
};

export default MatchTable;