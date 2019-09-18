import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { createBrowserHistory, createMemoryHistory } from 'history';
import lang from "./language";
import parameters from "./parameters";
import lottery from "./lottery";
import theme from "./theme";
import contract from "./contract";
import courses from "./courses";
import values from "./values";
import percents from "./percents";


export const isServer = typeof __SSR__ !== 'undefined';

export default (url = '/') => {
    // Create a history depending on the environment
    const history = isServer
        ? createMemoryHistory({
            initialEntries: [url]
        })
        : createBrowserHistory();

    const enhancers = [];
    const middleware = [thunk, routerMiddleware(history)];

    const composedEnhancers = compose(
        applyMiddleware(...middleware),
        ...enhancers
    );

    // Do we have preloaded state available? Great, save it.
    const initialState = !isServer ? window.__PRELOADED_STATE__ : {};

    // Delete it once we have it stored in a variable
    if (!isServer) {
        delete window.__PRELOADED_STATE__;
    }

    // Create the store
    const store = createStore(
        combineReducers({
            lang,
            parameters,
            lotery: lottery,
            theme,
            contract,
            courses,
            values,
            percents,
            router: connectRouter(history),
        }),
        initialState,
        composedEnhancers
    );

    return {
        store,
        history
    };
};
