import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';
import './index.css';
import './App.css';

import LandingPage from "./pages/LandingPage";
import ShowMatchPage from "./pages/ShowMatch";
import registerServiceWorker from './registerServiceWorker';

const Root = () => {
    const renderLandingPage = () => <LandingPage path="/generator" />;
    return (
        <Router>
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
