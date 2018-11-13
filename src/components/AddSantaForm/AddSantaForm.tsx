import * as React from 'react';
import {ISanta} from "../../types";
import {Button, FormControl, FormControlProps, ControlLabel } from "react-bootstrap";

interface IProps {
    addSanta: (santa: ISanta) => void;
}

interface IState {
    name: string;
    email: string;
}

class AddSantaForm extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            name: "",
            email: ""
        }
    }

    private handleChange = (event: React.FormEvent<FormControlProps>) => {
        // react-bootstrap typedefs are ugly
        const name = event.currentTarget.name as keyof IState;
        const value = event.currentTarget.value as string;

        // Typescript is also ugly sometimes
        this.setState({
            [name] : value
        } as Pick<IState, keyof IState>);
    }

    private handleAddSanta = () => this.props.addSanta({ name: this.state.name, email: this.state.email});

    public render() {
        const { name, email } = this.state;

        return (
            <div>
                <h2 className="header-small">Add Santa</h2>
                <ControlLabel>Name:</ControlLabel>
                <FormControl
                    name="name"
                    value={name}
                    onChange={this.handleChange}
                />
                <ControlLabel>Email:</ControlLabel>
                <FormControl
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                />
                <Button style={{margin: "30px 5px"}} bsStyle="info" onClick={this.handleAddSanta}>Add Santa 🎅🏼</Button>
            </div>
        )
    }
}

export default AddSantaForm;