import React from 'react';
import { render, hydrate } from 'react-dom';
import Loadable from 'react-loadable';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import createStore from './store';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Frontload } from "react-frontload";
const { store, history } = createStore();

const Application = (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Frontload noServerRender>
                <App />
            </Frontload>
        </ConnectedRouter>
    </Provider>
);

const root = document.getElementById('root');

if (root.hasChildNodes() === true) {
    // If it's an SSR, we use hydrate to get fast page loads by just
    // attaching event listeners after the initial render
    Loadable.preloadReady().then(() => {
        hydrate(Application, root);
    });
} else {
    // If we're not running on the server, just render like normal
    render(Application, root);

    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: http://bit.ly/CRA-PWA
    serviceWorker.unregister();
}
