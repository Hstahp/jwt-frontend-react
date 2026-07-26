import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Users.scss';
function Users() {
    const history = useHistory();

    useEffect(() => {
        let session = sessionStorage.getItem('account');
        if (!session) {
            history.push('/login');
        }
    }, [history]);
    return <div>table users</div>;
}

export default Users;
