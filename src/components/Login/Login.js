import './Login.scss';
import { useHistory } from 'react-router-dom';
function Login() {
    const history = useHistory();

    const handleCreateNewAccount = () => {
        history.push('/register');
    };
    return (
        <div className="login-container ">
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
                            <input type="text" className="form-control" placeholder="Email address or phone number" />
                            <label>Email address or phone number</label>
                        </div>
                        <div className="form-group form-floating">
                            <input type="password" className="form-control" placeholder="Password" />
                            <label>Password</label>
                        </div>
                        <button className="btn btn-primary">Login</button>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
