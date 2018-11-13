import * as React from 'react';
import './App.css';
import './css/animate.css';
import './css/responsive.css';
import './css/style.css';

import { Grid, Button, Row, FormControl, ControlLabel, FormControlProps, Col } from 'react-bootstrap';
import MatchTable from "./components/MatchTable/MatchTable";
import { ISanta, IMatch, CancellableEvent } from './types';
import SantaTable from "./components/SantaTable/SantaTable";
import { generateMatches } from './utils';
import AddSantaForm from './components/AddSantaForm/AddSantaForm';
import Header from "./components/Header/Header";

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
  constructor(props: {}) {
    super(props);

    // Initialise app state
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
  private handleNumberOfMatchesChanged = (event: React.FormEvent<FormControlProps>) => {
    this.setState({
      numberOfMatches: parseInt(event.currentTarget.value!.toString(), 10)
    });
  };

  private handleFormSubmit = (event: CancellableEvent) => {
    event.preventDefault();
    this.handleGenerateMatches();
  }

  private handleGenerateMatches = () => {
    // This algorithm to generate matches can fail. If it does, we retry until it's successfuly
    let matchSuccess = false;

    while (!matchSuccess) {
      try {
        this.setState({
          matches: generateMatches(
            this.state.santas,
            this.state.numberOfMatches
          )
        });

        matchSuccess = true;
      } catch (error) {
        console.log("Match failed...retrying");
      }
    }
  };

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
        <Header />
        <Grid>
          <Row>
            <Col md={8} mdOffset={2}>
            <AddSantaForm addSanta={this.handleAddSanta} />

              <form onSubmit={this.handleFormSubmit}>
              <Col md={6} >
                <ControlLabel>{`${this.state.numberOfMatches} Gifts Per User`}</ControlLabel>
                <FormControl
                  type="range"
                  min={1}
                  max={this.state.santas.length - 1}
                  onChange={this.handleNumberOfMatchesChanged}
                />
               </Col>

              <Col md={6} >

                <Button
                  bsStyle="success"
                  onClick={this.handleFormSubmit}
                  disabled={santasRemaining > 0}
                >
                  {`Generate Pairings ${santasRemaining > 0 ? `(Add ${santasRemaining})` : ''}`}
                </Button>
                </Col>
              </form>

              <SantaTable santas={this.state.santas} getDeleteSantaHandler={this.getDeleteSantaHandler} />

              {haveGenerated &&
                <MatchTable getMatchClickedEventHandler={this.getMatchClickedEventHandler}
                  matches={this.state.matches}
                  secretMode={this.state.secretMode}
                />
              }
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
