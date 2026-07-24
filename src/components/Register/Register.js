import './Register.scss';
import { useHistory } from 'react-router-dom';
function Register() {
    const history = useHistory();

    const handleLogin = () => {
        history.push('/login');
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
                            <input type="text" className="form-control" placeholder="Email address" />
                            <label>Email</label>
                        </div>
                        <div className="form-group form-floating">
                            <input type="text" className="form-control" placeholder="Phone number" />
                            <label>Phone number</label>
                        </div>
                        <div className="form-group form-floating">
                            <input type="text" className="form-control" placeholder="Username" />
                            <label>Username</label>
                        </div>
                        <div className="form-group form-floating">
                            <input type="password" className="form-control" placeholder="Password" />
                            <label>Password</label>
                        </div>
                        <div className="form-group form-floating">
                            <input type="password" className="form-control" placeholder="Re-enter password" />
                            <label>Re-enter password</label>
                        </div>
                        <button className="btn btn-primary">Register</button>

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
