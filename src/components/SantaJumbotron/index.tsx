import * as React from 'react';
// import {Button, Grid, Row, Col} from "react-bootstrap";
import './index.css';
import {ReactNode} from "react";

interface ISantaJumbotronProps {
    children: ReactNode;
}

const SantaJumbotron = (props: ISantaJumbotronProps) => {
    return (
        <div id="hero">
            <div className="redoverlay">
                {props.children}
            </div>
        </div>
    )
};

export default SantaJumbotron;