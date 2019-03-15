import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import CombineReducers from './reducer/index';
import React from 'react';
import App from './view/app';
import './assets/css/lib.less';

let store = createStore(
    CombineReducers,
    applyMiddleware(
        thunk   // 允许使用dispatch()函数
    )
)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)