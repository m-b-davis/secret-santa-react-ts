import * as React from 'react';
import {IMatch, ISanta} from "../../types";
import {shuffle} from "../../utils";
import {Row} from "react-bootstrap";

class SantaMatcher extends React.Component {

    private handleGenerateMatches = (event: React.MouseEvent<HTMLInputElement> | React.FormEvent<HTMLFormElement>) => {
        const { numberOfMatches, santas } = this.state;
        event.preventDefault();

        const initialReducerValue: { remainingSantaLists: ISanta[][], matches: IMatch[]} = {
            remainingSantaLists: Array(numberOfMatches).fill(santas),
            matches: []
        };

        let matchSuccess = false;

        while (!matchSuccess) {
            try {
                const generatedMatches = this.state.santas.reduce((accumulator, currentSanta) => {
                    const { remainingSantaLists, matches } = accumulator;

                    // santaSelection will be an array of n santas for this name to be matched to, where n is the number of gifts each santa purchases
                    const santaSelection = remainingSantaLists
                    // Remove the current name from the list of candidate recipients
                        .map(santaList => santaList.filter(santa => santa.name !== currentSanta.name))
                        // Shuffle each list
                        .map(list => shuffle(list))
                        // Find a candidate recipient from each list and add into selection
                        .reduce((selection, santaList) => {
                            const selectedRecipient = santaList.find(candidateSanta =>
                                // Where santa doesn't exist in selection
                                !selection.map(santa => santa.name).includes(candidateSanta.name)
                            );

                            if (selectedRecipient === undefined) {
                                throw new Error("Matching failed");
                            }

                            return [...selection, selectedRecipient];
                        }, []);

                    const newMatch: IMatch = {
                        santa: currentSanta,
                        matchedWith: santaSelection
                    };

                    return {
                        // Remove each selected santa from their respective remainingSantaList
                        remainingSantaLists: remainingSantaLists.map((santaList, index) =>
                            santaList.filter(santa => {
                                return santa.name !== santaSelection[index]!.name
                            })),
                        matches: [ ...matches, newMatch ]
                    }

                }, initialReducerValue).matches;

                this.setState({
                    matches: generatedMatches
                });

                matchSuccess = true;

            } catch (error) {
                console.log("Match failed...retrying");
            }
        }
        console.log(this.state.matches);
    };

    render() {
        return (
            <div>
                <Row>
                    <label>Number of Matches:</label>
                    <input
                        type="range"
                        min={1}
                        max={this.state.santas.length - 1}
                        onChange={this.handleNumberOfMatchesChanged}
                    />
                    <label>{this.state.numberOfMatches}</label>
                </Row>
            </div>
        )
    }
}

export default SantaMatcher;