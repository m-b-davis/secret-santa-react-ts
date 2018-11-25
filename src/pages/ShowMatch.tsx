import * as React from 'react';
import { Col, Grid, Row } from "react-bootstrap";
import { RouteComponentProps, withRouter } from "react-router";
import SantaJumbotron from "../components/SantaJumbotron/SantaJumbotron";
import { decodePayload } from '../utils';

interface IMatchParams {
    payload: string;
}

interface ILandingPageProps extends RouteComponentProps<IMatchParams> {
    path: string;
}

const ShowMatchPage = (props: ILandingPageProps) => {
    console.log({ props });
    const { payload } = props.match.params;
    let match = undefined;

    try {
        match = decodePayload(payload);
    } catch (error) {


    }
    
    return (
        <div>
            <SantaJumbotron>
                <Grid style={{minHeight:'1000px'}}>
                    <Row className="header-section">
                        <Col md={1} mdOffset={1}>
                            <img className="bigbell header-img wow tada infinite" data-wow-duration="30s" src="../img/bell.png" alt="" />
                        </Col>
                        <Col md={8} mdOffset={0}>
                            <h1 className="main-title">Secret Santa Generator</h1>
                        </Col>
                        <Col md={1} mdOffset={0}>
                            <div className="santa wowbounceInDown" data-wow-duration="2s">
                                <img className="header-img" src="../img/santa.png" alt="" />
                            </div>
                        </Col>
                    </Row>
                    { match ? 
                        <Row>
                            <h2>Hi {match.santa.name}!</h2>
                            <p>You matched with:</p>
                            {match.matchedWith.map(santa => <p>{santa.name}</p>)}
                        </Row>
                        : <p>Error: Malformed URL!</p>
                    }
                </Grid>
            </SantaJumbotron>
        </div>
    )
};

export default withRouter(ShowMatchPage);