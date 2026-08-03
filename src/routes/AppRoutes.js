import { Switch, Route } from 'react-router-dom';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import Users from '../components/ManageUsers/Users';
import PrivateRouts from './PrivateRoutes';
import Role from '../components/Role/Role';

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
                <Route path="/home" exact>
                    Home
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="*">Not found</Route>
            </Switch>
        </>
    );
};

export default AppRoutes;
