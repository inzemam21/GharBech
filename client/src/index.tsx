import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ApolloClient from 'apollo-boost';
import {Viewer} from './lib/types'
import {ApolloProvider} from '@apollo/react-hooks'
import {  Layout } from "antd";
import { Home, Host, Listing, Listings,Login, NotFound, User } from "./sections";
import reportWebVitals from './reportWebVitals';
import './styles/index.css';

const client = new ApolloClient({
    uri: "/api"
});

const initialViewer: Viewer = {
    id: null,
    token: null,
    avatar: null,
    hasWallet: null,
    didRequest: false
};


const App = () => {
    const [viewer, setViewer] = useState<Viewer>(initialViewer);

    return (
        <Router>
            <Layout id="app">
            <Routes >
                <Route  path="/" element={<Home />} />
                <Route  path="/host" element={<Host />} />
                <Route  path="/listing/:id" element={<Listing />} />
                <Route  path="/listings/:location?" element={<Listings />} />
                <Route

                    path="/login"
                    element={<Login  setViewer={setViewer} />}
                />
                <Route  path="/user/:id" element={<User />} />
                <Route element={<NotFound />} />
            </Routes>
            </Layout>
        </Router>
    );
};


ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
