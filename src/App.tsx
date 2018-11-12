import * as React from 'react';
import './App.css';
import './css/animate.css';
import './css/responsive.css';
import './css/style.css';

import { Grid, Row } from 'react-bootstrap';
import MatchTable from "./components/MatchTable";
import { ISanta, IMatch } from './types';
import SantaTable from "./components/SantaTable";
import { shuffle } from './utils';
import SantaCreator from "./components/SantaCreator";

const mockSantas = [
  {
    name: 'Matt',
    email: 'matt@santa.com'
  },
  {
    name: 'Steve',
    email: 'steve@santa.com'
  },
  {
    name: 'Ryan',
    email: 'ryan@santa.com'
  },
  {
    name: 'Tyler',
    email: 'tyler@santa.com'
  },
  {
    name: 'Dawne',
    email: 'dawne@santa.com'
  },
  {
    name: 'Katie',
    email: 'katie@santa.com'
  }
];

interface IState {
    santas: ISanta[];
    numberOfMatches: number;
    matches: IMatch[];
    secretMode: boolean;
}

class App extends React.Component<{}, IState>{

  // Initialise app state

  constructor(props: {}) {
    super(props);

    this.state = {
      santas: mockSantas,
      numberOfMatches: 2,
      matches: [],
      secretMode: false
    }
  }

  private handleAddSanta = (newSanta: ISanta) => {
    this.setState({
      // Set the current list of santas to be the existing list with the the new santa added to the end
      santas: [...this.state.santas, newSanta]
    });
  };

  // When the slider of number of matches changes 
  private handleNumberOfMatchesChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      numberOfMatches: parseInt(event.target.value, 10)
    });
  };

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
  }
  
  private getMatchClickedEventHandler = (match: IMatch) => () => {
    alert(match.santa.name);
  };

  private getDeleteSantaHandler = (deleteSanta: ISanta) => () => {
    this.setState({
      santas: this.state.santas.filter(santa => santa.name !== deleteSanta.name)
    })
  };

  public render() {
    const haveGenerated = this.state.matches.length > 0;
    const santasRemaining = this.state.numberOfMatches - this.state.santas.length;

    return (
      <div className="App">
      <div id="hero">
        <div className="redoverlay">
            <div className="container">
                <div className="row">
                    <div className="herotext">
                        <h2 className="wow zoomInDown" data-wow-duration="3s">Secret Santa</h2>

                        <img className="bigbell wow tada infinite" data-wow-duration="30s" src="img/bell.png" alt="" />
                    </div>

                    <div className="santa wow bounceInDown" data-wow-duration="2s">
                        <img src="img/santa.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
    </div>

      <Grid>
        <form onSubmit={this.handleGenerateMatches}>
          <SantaCreator addSanta={this.handleAddSanta} />
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

          <Row>
            <input
              onClick={this.handleGenerateMatches}
              disabled={santasRemaining > 0}
              type="submit"
              value={ `Generate Pairings ${santasRemaining > 0 ? `(Add ${santasRemaining})` : ''}`}
            />
          </Row>
        </form>

        <Row>
          <SantaTable santas={this.state.santas} getDeleteSantaHandler={this.getDeleteSantaHandler} />
        </Row>

        { haveGenerated &&
          <Row>
            <MatchTable getMatchClickedEventHandler={this.getMatchClickedEventHandler}
              matches={this.state.matches}   
              secretMode={this.state.secretMode}
            />
          </Row>}
        </Grid>

      </div>
    );
  }
}

export default App;
