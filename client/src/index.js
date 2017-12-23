import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

//Creating store using redux
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
    //Provider will tell App components if store is changing state
    <Provider store={store}><App /></Provider>,
    document.querySelector('#root')
);