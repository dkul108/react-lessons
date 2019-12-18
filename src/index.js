import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import GridComponent from './App';
import {SummaryActive, SummaryUsers} from './App';
import * as serviceWorker from './serviceWorker';

function Summary(props){
    return (<div>
        <SummaryActive {...props}/>
        <SummaryUsers {...props}/>
    </div>)
}

ReactDOM.render(<GridComponent><Summary/></GridComponent>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
