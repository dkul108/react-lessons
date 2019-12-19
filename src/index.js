import React from 'react';
import ReactDOM, {render} from 'react-dom';
import './index.css';
import { Provider } from 'react-redux'
import GridComponent from './Components/grid';
import {SummaryActive, SummaryUsers} from './Components/summaries';
import {UserDetails} from './Components/user-details';
import * as serviceWorker from './serviceWorker';
import {HashRouter, Switch, Route, Link} from "react-router-dom";
import {store} from './Containers/App'
// import configureStore from './Store/index'
//
// const store = configureStore();

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

ReactDOM.render(<Provider store={store}><HashRouter>
    <div>
        <Header />
        <Switch>
            <Route path="/grid" component={GridComponent}/>
            <Route exact path="/details" component={UserDetails}/>
            <Route path="/details/:id" component={UserDetails}/>
        </Switch>
    </div>
</HashRouter></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
