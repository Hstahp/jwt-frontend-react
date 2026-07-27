import { Route, useHistory } from 'react-router-dom';
import { useEffect } from 'react';

const PrivateRouts = (props) => {
    const history = useHistory();

    useEffect(() => {
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
