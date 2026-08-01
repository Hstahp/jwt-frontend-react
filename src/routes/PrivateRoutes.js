import { Route, useHistory } from 'react-router-dom';
import { useEffect, useContext } from 'react';

import { UserContext } from '../context/UserContext';

const PrivateRouts = (props) => {
    const history = useHistory();
    const { user } = useContext(UserContext);

    useEffect(() => {
        console.log('>>Check context user: ', user);
        let session = sessionStorage.getItem('account');
        if (!session) {
            history.push('/login');
            window.location.reload();
        }
        if (session) {
            //check role
        }
    }, [history]);
    return (
        <>
            <Route path={props.path} component={props.component}></Route>
        </>
    );
};

export default PrivateRouts;
