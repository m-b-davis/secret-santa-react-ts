import * as React from 'react';
import { Button, ControlLabel, FormControl, FormControlProps } from 'react-bootstrap';
import './css/animate.css';
import './css/responsive.css';
import './css/style.css';

import AddSantaForm from './components/AddSantaForm/AddSantaForm';
import SantaJumbotron from './components/SantaJumbotron/SantaJumbotron';
import SantaTable from "./components/SantaTable/SantaTable";
import { CancellableEvent, IMatch, ISanta } from './types';
import { generateMatches } from './utils';


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
      santas: [],
      numberOfMatches: 1,
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
    let attempts = 10;

    while (!matchSuccess && attempts > 0) {
      try {
        this.setState({
          matches: generateMatches(
            this.state.santas,
            this.state.numberOfMatches
          )
        });

        matchSuccess = true;
      } catch (error) {
        attempts -= 1;
        console.log("Match failed...retrying");

        if (attempts === 0) {
          alert("Sorry - matching failed!");
        }
      }
    }

  };

  private getMatchClickedEventHandler = (match: IMatch) => () => {
    //const emailSubject = "Your Secret Santa Allocation";
   // const body = `Hi ${match.santa.name}!, Below is a link to view your Secret Santa allocation. ${match.url} Thanks!`;

    const mailto = `mailto:${match.santa.email}`;//?subject=${emailSubject}&body=${body}`;
    const x = window.open(mailto);
    x && x.close();
    console.log(mailto);
  };

  private getDeleteSantaHandler = (deleteSanta: ISanta) => () => {
    this.setState({
      santas: this.state.santas.filter(santa => santa.name !== deleteSanta.name)
    })
  };

  private renderGenerateMatches = () => {
    const santasRemaining = Math.max(this.state.numberOfMatches - this.state.santas.length, 3 - this.state.santas.length);

    return (
        <form className="ss-config" onSubmit={this.handleGenerateMatches}>
        <h2>Generate</h2>

        {santasRemaining < 0 &&
          <div>
            <div className="ss-config__range-container">
              <label>1</label>
              <FormControl
                type="range"
                min={1}
                max={this.state.santas.length - 2}
                onChange={this.handleNumberOfMatchesChanged}
              />
              <label>{this.state.santas.length - 2}</label>
            </div>
          <ControlLabel>{`${this.state.numberOfMatches} Gift${this.state.numberOfMatches > 1 ? 's' : ''} Per User`}</ControlLabel>
        </div>
        }
        <Button
          bsStyle="success"
          className="ss-config__btn"
          onClick={this.handleFormSubmit}
          disabled={santasRemaining > 0}
        >
          {`Generate Pairings ${santasRemaining > 0 ? `(Add ${santasRemaining})` : ''}`}
        </Button>
      </form>
    );
  };

  public render() {
    return (
     <SantaJumbotron>
        <div className="App">
            <img className="App__bells bigbell header-img wow tada infinite" data-wow-duration="30s" src="img/bell.png" alt="" />
            <h1 className="main-title App__title">Secret Santa Generator</h1>
            <div className="App__santa santa wowbounceInDown" data-wow-duration="2s">
              <img className="header-img" src="img/santa.png" alt="" />
            </div>
            <div className="App__creator">
              <AddSantaForm addSanta={this.handleAddSanta} />
            </div>
            <div className="App__santa-table">
              <SantaTable
                santas={this.state.santas}
                matches={this.state.matches}
                getMatchClickedEventHandler={this.getMatchClickedEventHandler}
                getDeleteSantaHandler={this.getDeleteSantaHandler}
                />
            </div>
            <div className="App__santa-generator">
              {this.renderGenerateMatches()}
            </div>
        </div>
      </SantaJumbotron>
    );
  }
}

export default App;
