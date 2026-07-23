import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Nav from './components/Navigation/Nav';
import './components/Navigation/Nav.scss';
import Login from './components/Login/Login';
function App() {
    return (
        <Router>
            <div className="app-container">
                {/* <Nav /> */}
                <Switch>
                    <Route path="/news">News</Route>
                    <Route path="/home" excat>
                        Home
                    </Route>
                    <Route path="/contact">Contact</Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/about">About</Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
