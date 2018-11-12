// @ts-ignore
import * as React from 'react';

import { IMatch } from '../../types';
import MatchTableRow from '../MatchTableRow';
import {Table} from "react-bootstrap";

interface IMatchListProps {
    matches: IMatch[];
    getMatchClickedEventHandler: (match: IMatch) => React.MouseEventHandler<HTMLButtonElement>
    secretMode: boolean;
}

// @ts-ignore
const MatchTable = (props: IMatchListProps)=> {
    const handleMatchClicked = (match: IMatch) => props.getMatchClickedEventHandler(match);
    return (
        <div>
            <h2>Matches</h2>
            <Table striped bordered condensed>
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
                        onMatchClicked={handleMatchClicked}
                        secretMode={props.secretMode}
                    />)}
                </tbody>
            </Table>
        </div>
    );
};

export default MatchTable;