import * as React from 'react';
import {Button, Grid, Row, Col} from "react-bootstrap";
import './index.css';

interface ISantaJumbotronProps {
    title: string;
    summary: string;
    buttonTitle: string;
    buttonOnClick: () => void;
}

const SantaJumbotron = (props: ISantaJumbotronProps) => {
    const handleButtonClick = () => props.buttonOnClick();
    return (
        <div id="hero">
            <div className="redoverlay">
                <Grid>
                    <Row>
                        <Col md={3}>
                            <img className="bigbell wow tada infinite" data-wow-duration="30s" src="img/bell.png" alt="" />
                        </Col>
                            {/*<Col md={6} mdOffset={3}>*/}
                        <Col md={6}>
                            <h1 className="wow zoomInDown" data-wow-duration="3s">
                                {props.title}
                            </h1>
                            <p>
                                {props.summary}
                            </p>

                            <Button bsStyle="success" onClick={handleButtonClick}>
                                {props.buttonTitle}
                            </Button>
                        </Col>
                        <Col md={3}>
                            <div className="santa wow bounceInDown" data-wow-duration="2s">
                                <img src="img/santa.png" alt="" />
                            </div>
                        </Col>


                    </Row>
                </Grid>
            </div>
        </div>
    )
}

export default SantaJumbotron;