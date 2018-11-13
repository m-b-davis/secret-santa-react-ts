import * as React from 'react';
import {ReactNode} from "react";
import './index.css';

interface IProps {
    children: ReactNode;
}

const SantaJumbotron = (props: IProps) => {
    return (
        <div id="hero">
            <div className="redoverlay">
                {props.children}
            </div>
        </div>
    )
};

export default SantaJumbotron;