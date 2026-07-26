import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import _ from 'lodash';
import 'react-toastify/dist/ReactToastify.css';
import Nav from './components/Navigation/Nav';

import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Users from './components/ManageUsers/Users';
import './components/Navigation/Nav.scss';
import './App.scss';

function App() {
    const [account, setAccount] = useState({});

    useEffect(() => {
        let session = sessionStorage.getItem('account');
        if (session) {
            setAccount(JSON.parse(session));
        }
    }, []);
    return (
        <>
            <Router>
                <div className="app-container">
                    {account && !_.isEmpty(account) && account.isAuthenticated && <Nav />}
                    <Switch>
                        <Route path="/news">News</Route>
                        <Route path="/home" excat>
                            Home
                        </Route>
                        <Route path="/contact">Contact</Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/register">
                            <Register />
                        </Route>
                        <Route path="/users">
                            <Users />
                        </Route>
                        <Route path="/about">About</Route>
                    </Switch>
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </Router>
        </>
    );
}

export default App;
