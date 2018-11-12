import * as React from 'react';
import {ISanta} from "../../types";
import {Button} from "react-bootstrap";

interface ISantaCreatorProps {
    addSanta: (santa: ISanta) => void;
}

interface IState {
    name: string;
    email: string;
}

class SantaCreator extends React.Component<ISantaCreatorProps, IState> {
    constructor(props: ISantaCreatorProps) {
        super(props);
        this.state = {
            name: "",
            email: ""
        }
    }

    private handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({name: e.target.value});
    private handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({email: e.target.value});

    private handleAddSanta = () => this.props.addSanta({ name: this.state.name, email: this.state.email});

    public render() {
        const { name, email } = this.state;
        return (
            <div>
                <h2>Add Santa</h2>
                <label>Name:</label>
                <input
                    value={name}
                    onChange={this.handleNameChange}
                />
                <label>Email:</label>
                <input
                    value={email}
                    onChange={this.handleEmailChange}
                />
                <Button style={{margin: "30px 5px"}} bsStyle="success" onClick={this.handleAddSanta}>Add Santa 🎅🏼</Button>
            </div>
        )
    }
}

export default SantaCreator;