import { Switch, Route } from 'react-router-dom';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import Users from '../components/ManageUsers/Users';
import PrivateRouts from './PrivateRoutes';
import Role from '../components/Role/Role';
import GroupRole from '../components/GroupRole/GroupRole';
import Home from '../components/Home/Home';
import About from '../components/About/About';
const AppRoutes = (props) => {
    const Project = () => {
        return <span>Project</span>;
    };
    return (
        <>
            <Switch>
                <PrivateRouts path="/users" component={Users} />
                <PrivateRouts path="/projects" component={Project} />
                <PrivateRouts path="/roles" component={Role} />
                <PrivateRouts path="/group-role" component={GroupRole} />
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/home">
                    <Home />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/about">
                    <About />
                </Route>

                <Route path="*">
                    <div className="container">404 Not found</div>
                </Route>
            </Switch>
        </>
    );
};

export default AppRoutes;
