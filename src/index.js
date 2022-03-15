import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/index'
import thunk from 'redux-thunk'
// import { loadJwt, saveJwt } from './redux/localStorage'

// const persistedState = loadJwt();
// load external state and set it as local state in redux

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)

// store.subscribe(() => {
//   store.getState()
// })

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
