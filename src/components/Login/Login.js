import './Login.scss';
import { useHistory, Link } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';

import { loginUser } from '../../services/userService';
import { UserContext } from '../../context/UserContext';
function Login() {
    const { user, loginContext } = useContext(UserContext);

    const history = useHistory();

    const [valueLogin, setValueLogin] = useState('');
    const [password, setPassword] = useState('');

    const defaultObjValidInput = {
        isValidValueLogin: true,
        isValidPassword: true,
    };
    const [objInputs, setObjInputs] = useState(defaultObjValidInput);

    const handleCreateNewAccount = () => {
        history.push('/register');
    };

    const handleLogin = async () => {
        setObjInputs(defaultObjValidInput);

        if (!valueLogin) {
            setObjInputs({ ...objInputs, isValidValueLogin: false });
            toast.error('Please enter your email address or your phone number');
            return;
        }
        if (!password) {
            setObjInputs({ ...objInputs, isValidPassword: false });
            toast.error('Please enter your password');
            return;
        }

        let response = await loginUser(valueLogin, password);
        if (response && +response.EC === 0) {
            //success
            let groupWithRoles = response.DT.groupWithRoles;
            let email = response.DT.email;
            let username = response.DT.username;
            let token = response.DT.access_token;

            let data = {
                isAuthenticated: true,
                token,
                account: { groupWithRoles, email, username },
            };
            localStorage.setItem('jwt', token);

            loginContext(data);

            history.push('/users');
            // window.location.reload();
        }
        if (response && +response.EC !== 0) {
            //error
            toast.error(response.EM);
        }
    };

    const handlePressEnter = (event) => {
        if (event.charCode === 13 && event.code === 'Enter') {
            handleLogin();
        }
    };

    useEffect(() => {
        if (user && user.isAuthenticated) {
            history.push('/');
        }
    }, [user]);
    return (
        <div className="login-container ">
            <div className="container">
                <div className="row px-3 px-sm-0">
                    <div className="content-left col-sm-7 col-12 d-none d-sm-block gap-3 py-3 ">
                        <div className="brand">
                            <Link to="/">
                                <span title="Return to HomePage">Facebook</span>
                            </Link>
                        </div>
                        <div className="detail text-sm-start text-md-center">
                            Facebook helps you connect and share with the people in your life
                        </div>
                    </div>
                    <div className="content-right col-12 col-sm-5 d-flex flex-column gap-3 py-3 ">
                        <div className="brand d-sm-none ">Facebook</div>
                        <div className="form-group form-floating">
                            <input
                                type="text"
                                className={objInputs.isValidValueLogin ? 'form-control' : 'form-control is-invalid'}
                                value={valueLogin}
                                onChange={(event) => setValueLogin(event.target.value)}
                                placeholder="Email or phone number"
                            />
                            <label>Email or phone number</label>
                        </div>
                        <div className="form-group form-floating">
                            <input
                                type="password"
                                className={objInputs.isValidPassword ? 'form-control' : 'form-control is-invalid'}
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                placeholder="Password"
                                onKeyPress={(event) => handlePressEnter(event)}
                            />
                            <label>Password</label>
                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                handleLogin();
                            }}
                        >
                            Login
                        </button>
                        <span className="text-center">
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a className="forgot-password" href="#">
                                Forgot your password?
                            </a>
                        </span>
                        <hr />
                        <div className="text-center">
                            <button className="btn btn-success" onClick={() => handleCreateNewAccount()}>
                                Create new account
                            </button>
                            <div className="mt-3 return">
                                <Link to="/">
                                    <i className="fa fa-arrow-circle-left"></i>
                                    <span title="Return to HomePage">Return to HomePage</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
