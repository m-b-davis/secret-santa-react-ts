import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import LandingPage from "./pages/LandingPage";

const Root = () => {
    return (
        <Router>
            <>
                <Route path="/" exact render={() => <LandingPage path="/generator" />} />
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
