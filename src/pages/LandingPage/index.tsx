import * as React from 'react';
import SantaJumbotron from "../../components/SantaJumbotron";
import {RouteComponentProps, withRouter} from "react-router";

interface ILandingPageProps extends RouteComponentProps {
    path: string;
}

const LandingPage = (props: ILandingPageProps) => {
    const handleButtonClick = () => props.history.push(props.path);
    return (
        <div>
            <SantaJumbotron
                title="Secret Santa Generator"
                summary="Organise your Secret Santa quickly and easily with our helpful generator"
                buttonTitle="Get Started"
                buttonOnClick={handleButtonClick}
            />
        </div>
    )
};

export default withRouter(LandingPage);