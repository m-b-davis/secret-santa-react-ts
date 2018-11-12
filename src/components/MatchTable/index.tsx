// @ts-ignore
import * as React from 'react';

import { IMatch } from '../../types';
import MatchTableRow from '../MatchTableRow';

interface IMatchListProps {
    matches: IMatch[];
    getMatchClickedEventHandler: (match: IMatch) => React.MouseEventHandler<HTMLButtonElement>
    secretMode: boolean;
}

// @ts-ignore
const MatchTable = (props: IMatchListProps)=> {
    return (
        <div>
            <h2>Matches</h2>
            <table>
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
            </table>
        </div>
    );
};

export default MatchTable;