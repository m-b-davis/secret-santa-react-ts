import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';

import App from './App';
import './index.css';
import './App.css';

import LandingPage from "./pages/LandingPage";
import ShowMatchPage from "./pages/ShowMatch";
import registerServiceWorker from './registerServiceWorker';

const Root = () => {
    const renderLandingPage = () => <LandingPage path="/generator" />;
    console.log(process.env.PUBLIC_URL);
    
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <>
                <Route path="/" exact={true} render={renderLandingPage} />
                <Route path="/show-match/:payload" component={ShowMatchPage} />
                <Route path="/generator" component={App} />
            </>
        </Router>
    )
};

ReactDOM.render(
  <Root />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
