import * as React from 'react';
import { Button, Row, ControlLabel, FormControl, FormControlProps } from "react-bootstrap";
import { ISanta } from "../../types";

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
            [name]: value
        } as Pick<IState, keyof IState>);
    }

    private handleAddSanta = () => this.props.addSanta({ name: this.state.name, email: this.state.email });

    public render() {
        const { name, email } = this.state;

        return (
            <div className="add-santa__container">
                <h2 className="header-small add-santa__header">Add Santa</h2>
                <Row >
                        <ControlLabel className="add-santa__input-label">Name:</ControlLabel>
            
                        <FormControl
                            className="add-santa__input"
                            name="name"
                            value={name}
                            onChange={this.handleChange}
                        />

   
                        <ControlLabel className="add-santa__input-label">Email:</ControlLabel>
           
                        <FormControl
                            className="add-santa__input"
                            name="email"
                            value={email}
                            onChange={this.handleChange}
                        />
        
                        <Button
                            className="add-santa__btn"
                            bsStyle="info"
                            onClick={this.handleAddSanta}>
                            Add Santa 🎅🏼
                        </Button>
                </Row>
            </div>
        )
    }
}

export default AddSantaForm;