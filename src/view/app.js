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
            <BrowserRouter>
                <Route exact path="/" component={Topics}></Route>
            </BrowserRouter>
        )
    }
}