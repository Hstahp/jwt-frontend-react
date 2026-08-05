import { useEffect, useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { toast } from 'react-toastify';

import { registerNewUser } from '../../services/userService';
import './Register.scss';

function Register() {
    const { user } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const defaultCheckValid = {
        isValidEmail: true,
        isValidPhone: true,
        isValidPassword: true,
        isValidUsername: true,
        isValidConfirmPassword: true,
    };
    const [objCheckInput, setObjCheckInput] = useState(defaultCheckValid);

    const history = useHistory();

    useEffect(() => {
        if (user && user.isAuthenticated === true) {
            history.push('/');
        }
    }, [user]);

    const isValidInputs = () => {
        setObjCheckInput(defaultCheckValid);

        if (!email) {
            toast.error('Email is required');
            setObjCheckInput({ ...defaultCheckValid, isValidEmail: false });
            return false;
        }
        if (!phone) {
            toast.error('Phone is required');
            setObjCheckInput({ ...defaultCheckValid, isValidPhone: false });
            return false;
        }
        if (!password) {
            toast.error('Password is required');
            setObjCheckInput({ ...defaultCheckValid, isValidPassword: false });
            return false;
        }
        if (password !== confirmPassword) {
            toast.error('Confirm password is not match');
            setObjCheckInput({ ...defaultCheckValid, isValidConfirmPassword: false });
            return false;
        }
        let regx = /\S+@\S+\.\S+/;

        if (!regx.test(email)) {
            toast.error('Please enter a valid email');
            setObjCheckInput({ ...defaultCheckValid, isValidEmail: false });
            return false;
        }
        return true;
    };

    const handleLogin = () => {
        history.push('/login');
    };

    const handleRegister = async () => {
        let check = isValidInputs();
        if (check === true) {
            let serverData = await registerNewUser(email, phone, password, username);
            if (serverData && +serverData.EC === 0) {
                toast.success(serverData.EM);
                history.push('/login');
            } else {
                toast.error(serverData.EM);
            }
        }
    };

    return (
        <div className="register-container ">
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
                                className={objCheckInput.isValidEmail ? 'form-control' : 'form-control is-invalid'}
                                placeholder="Email address"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                            <label>Email</label>
                        </div>
                        <div className="form-group form-floating">
                            <input
                                type="text"
                                className={objCheckInput.isValidPhone ? 'form-control' : 'form-control is-invalid'}
                                placeholder="Phone number"
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}
                            />
                            <label>Phone number</label>
                        </div>
                        <div className="form-group form-floating">
                            <input
                                type="text"
                                className={objCheckInput.isValidUsername ? 'form-control' : 'form-control is-invalid'}
                                placeholder="Username"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                            <label>Username</label>
                        </div>
                        <div className="form-group form-floating">
                            <input
                                type="password"
                                className={objCheckInput.isValidPassword ? 'form-control' : 'form-control is-invalid'}
                                placeholder="Password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                            <label>Password</label>
                        </div>
                        <div className="form-group form-floating">
                            <input
                                type="password"
                                className={
                                    objCheckInput.isValidConfirmPassword ? 'form-control' : 'form-control is-invalid'
                                }
                                placeholder="Re-enter password"
                                value={confirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                            />
                            <label>Re-enter password</label>
                        </div>
                        <button className="btn btn-primary" onClick={() => handleRegister()}>
                            Register
                        </button>

                        <hr />
                        <div className="text-center">
                            <button className="btn btn-success" onClick={() => handleLogin()}>
                                Already've an account.
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

export default Register;
