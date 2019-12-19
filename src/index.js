import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import GridComponent from './App';
import {SummaryActive, SummaryUsers, UserDetails} from './App';
import * as serviceWorker from './serviceWorker';
import {HashRouter, Switch, Route, Link} from "react-router-dom";

function Summary(props){
    return (<div>
        <SummaryActive {...props}/>
        <SummaryUsers {...props}/>
    </div>)
}


const Header = ({children}) =>
    <div>
        <h1>Our awesome app</h1>
        <ul role="nav">
            <li><Link to="/grid">Grid</Link></li>
            <li><Link to="/details">Details</Link></li>
        </ul>
        {children}
    </div>;

ReactDOM.render(<HashRouter>
    <div>
        <Header />
        <Switch>
            <Route path="/grid" component={GridComponent}/>
            <Route exact path="/details" component={UserDetails}/>
            <Route path="/details/:id" component={UserDetails}/>
        </Switch>
    </div>
</HashRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
