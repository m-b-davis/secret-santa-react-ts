import * as React from 'react';
import SantaJumbotron from "../../components/SantaJumbotron";
import {RouteComponentProps, withRouter} from "react-router";
import {Button, Col, Grid, Row} from "react-bootstrap";

interface ILandingPageProps extends RouteComponentProps {
    path: string;
}

const LandingPage = (props: ILandingPageProps) => {
    const handleButtonClick = () => props.history.push(props.path);
    return (
        <div>
            <SantaJumbotron>
                <Grid>
                    <Row>
                        <Col md={3}>
                            <img className="bigbell wow tada infinite" data-wow-duration="30s" src="img/bell.png" alt="" />
                        </Col>
                        <Col md={6}>
                            <h1 className="wow zoomInDown" data-wow-duration="3s">
                                Secret Santa Generator
                            </h1>
                            <p>
                                Organise your Secret Santa quickly and easily with our helpful generator
                            </p>

                            <Button bsStyle="success" onClick={handleButtonClick}>
                                Get Started
                            </Button>
                        </Col>
                        <Col md={3}>
                            <div className="santa wow bounceInDown" data-wow-duration="2s">
                                <img src="img/santa.png" alt="" />
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </SantaJumbotron>
        </div>
    )
};

export default withRouter(LandingPage);