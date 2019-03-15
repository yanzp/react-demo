import React, { Component } from 'react';
import { 
    BrowserRouter,
    Route, 
    Link
} from 'react-router-dom';
import Topics from './topics';

export default class App extends Component {
    render() {
        return (
            <div className="container">
                <div className="header">
                    <span className="title">React + React Router + Redux</span> 
                </div>
                <div className="content">
                    <div className="nav">
                        <a href="javascript:void(0)">cNode</a>
                    </div>
                    <div className="module">
                        <BrowserRouter>
                            <Route exact path="/" component={Topics}></Route>
                        </BrowserRouter>
                    </div>
                </div>
            </div>
        )
    }
}