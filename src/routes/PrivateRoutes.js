import { Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';

import { UserContext } from '../context/UserContext';

const PrivateRouts = (props) => {
    const { user } = useContext(UserContext);

    if (user && user.isAuthenticated === true) {
        return (
            <>
                <Route path={props.path} component={props.component}></Route>
            </>
        );
    } else {
        return <Redirect to="/login"></Redirect>;
    }
};

export default PrivateRouts;
