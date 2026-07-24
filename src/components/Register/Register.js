import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Register.scss';

function Register() {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const history = useHistory();

    // useEffect(() => {
    //     axios.get('http://localhost:8080/api/test-api').then((res) => {
    //         console.log('>>>check data: ', res.data);
    //     });
    // }, []);

    const isValidInputs = () => {
        if (!email) {
            toast.error('Email is required');
            return false;
        }
        if (!phone) {
            toast.error('Phone is required');
            return false;
        }
        if (!password) {
            toast.error('Password is required');
            return false;
        }
        if (password !== confirmPassword) {
            toast.error('Confirm password is not match');
            return false;
        }
        let regx = /\S+@\S+\.\S+/;

        if (!regx.test(email)) {
            toast.error('Please enter a valid email');
            return false;
        }
        return true;
    };

    const handleLogin = () => {
        history.push('/login');
    };

    const handleRegister = () => {
        let check = isValidInputs();
        if (!check) return;

        let userData = {
            email: email,
            phone: phone,
            password: password,
            username: username,
        };
        console.log('>>>check user data: ', userData);
    };

    return (
        <div className="register-container ">
            <div className="container">
                <div className="row px-3 px-sm-0">
                    <div className="content-left col-sm-7 col-12 d-none d-sm-block gap-3 py-3 ">
                        <div className="brand">Facebook</div>
                        <div className="detail text-sm-start text-md-center">
                            Facebook helps you connect and share with the people in your life
                        </div>
                    </div>
                    <div className="content-right col-12 col-sm-5 d-flex flex-column gap-3 py-3 ">
                        <div className="brand d-sm-none ">Facebook</div>
                        <div className="form-group form-floating">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Email address"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                            <label>Email</label>
                        </div>
                        <div className="form-group form-floating">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Phone number"
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}
                            />
                            <label>Phone number</label>
                        </div>
                        <div className="form-group form-floating">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Username"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                            <label>Username</label>
                        </div>
                        <div className="form-group form-floating">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                            <label>Password</label>
                        </div>
                        <div className="form-group form-floating">
                            <input
                                type="password"
                                className="form-control"
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
