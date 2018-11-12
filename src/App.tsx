import * as React from 'react';
import './App.css';
import './css/animate.css';
import './css/responsive.css';
import './css/style.css';

import { Grid, Row } from 'react-bootstrap';

function shuffle<T>(arr: T[]): T[]{
  for (let i = arr.length - 1; i >= 0; i--) {
  
      const randomIndex = Math.floor(Math.random()*(i+1)); 
      const itemAtIndex = arr[randomIndex]; 
      
      arr[randomIndex] = arr[i]; 
      arr[i] = itemAtIndex;
  }
  return arr;
};

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

interface ISanta {
  name: string;
  email: string;
}

interface IState {
  santas: ISanta[];
  newSantaName: string;
  newSantaEmail: string;
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
      newSantaName: "",
      newSantaEmail: "",
      numberOfMatches: 2,
      matches: [],
      secretMode: false
    }
  }

  private handleNewSantaNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // When the text changes update the app state with the new text
    this.setState({
      newSantaName: event.target.value
    })
  }

  private handleNewSantaEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // When the text changes update the app state with the new text
    this.setState({
      newSantaEmail: event.target.value
    })
  }

  private handleNewSantaClick = () => {
    const newSanta = {
      name: this.state.newSantaName,
      email: this.state.newSantaEmail
    };
   
    this.setState({
      // Set the current list of santas to be the existing list with the the new santa added to the end
      santas: [...this.state.santas, newSanta],  
      // Reset santa name & email
      newSantaName: "",
      newSantaEmail: ""
    });
  }

  // When the slider of number of matches changes 
  private handleNumberOfMatchesChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      numberOfMatches: parseInt(event.target.value, 10)
    });
  }

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
  }

  private getDeleteSantaHandler = (deleteSanta: ISanta) => () => {
    this.setState({
      santas: this.state.santas.filter(santa => santa.name !== deleteSanta.name)
    })
  }

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
          <h2>Add Santa</h2>
          <Row>
            <label>Name:</label>
            <input 
              value={this.state.newSantaName}
              onChange={this.handleNewSantaNameChange}
            />
          </Row>
          <Row>
            <label>Email:</label>
            <input 
              value={this.state.newSantaEmail}
              onChange={this.handleNewSantaEmailChange}
            />
          </Row>
          <Row>
            <button onClick={this.handleNewSantaClick}>Add Santa 🎅🏼</button>
          </Row>
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
            <MatchTable 
              getMatchClickedEventHandler={this.getMatchClickedEventHandler}
              matches={this.state.matches}   
              secretMode={this.state.secretMode}
            />
          </Row>}
        </Grid>

      </div>
    );
  }
}

interface IMatchListProps {
  matches: IMatch[];
  getMatchClickedEventHandler: (match: IMatch) => React.MouseEventHandler<HTMLButtonElement>
  secretMode: boolean;
}  

interface IMatch {
  santa: ISanta;
  matchedWith: ISanta[];
}

interface IMatchListItemProps {
  match: IMatch;
  onMatchClicked: React.MouseEventHandler<HTMLButtonElement>;
  secretMode: boolean;
}

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
}

const MatchTableRow = (props: IMatchListItemProps) => {
    return (
      <tr>
        <td>{props.match.santa.name}</td>
        {!props.secretMode && 
          <td>
            { props.match.matchedWith.map(santa => <span key={santa.name}><NameIndicator name={santa.name}/>{santa.name}</span>)}
          </td>
        }
          
        <td><button onClick={props.onMatchClicked}>Send Email</button></td>
      </tr>
    );
}

interface ISantaListProps {
  santas: ISanta[];
  getDeleteSantaHandler: (santa: ISanta) => React.MouseEventHandler<HTMLButtonElement>;
}

interface ISantaListItemProps {
  santa: ISanta;
  onDelete: React.MouseEventHandler<HTMLButtonElement>
}

const SantaTable = (props: ISantaListProps) => {
  const { santas } = props;

  const renderEmpty = () => (
    <p>You haven't added any santas yet!</p>
  );

  return (
    <div>
    <h1>Santas</h1>
      { santas.length === 0 
        ? renderEmpty() 
        : <table>
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
          </table>
      }
    </div>
  );
}

function hashCode(str: string) { // java String#hashCode
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 3) - hash);
  }
  return hash;
} 

const getColourFromName = (name: string) => {
  return `hsla(${hashCode(name) * hashCode(name) % 360}, 100%, 50%, 1)`;
}

const SantaTableRow = (props: ISantaListItemProps) => {
  return (
    <tr>
      <td><NameIndicator name={props.santa.name}/>{props.santa.name}</td>
      <td>{props.santa.email}</td>
      <td><button onClick={props.onDelete}>x</button></td>
    </tr>
  );
}

const NameIndicator = (props: { name: string }) => {
  return <span style={{backgroundColor: getColourFromName(props.name)}}>{hashCode(props.name) % 360}</span>
}

export default App;
