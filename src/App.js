import { useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NavHeader from './components/Navigation/NavHeader';
import AppRoutes from './routes/AppRoutes';
import { UserContext } from './context/UserContext';
import './components/Navigation/Nav.scss';
import './App.scss';
import { ThreeDots } from 'react-loader-spinner';
function App() {
    const { user } = useContext(UserContext);
    return (
        <>
            <Router>
                {user && user.isLoading ? (
                    <div className="loading-container">
                        <ThreeDots
                            height={100}
                            width={100}
                            radius={9}
                            color="#1877f2"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                        />
                        <div className="loading-text">Loading data.......</div>
                    </div>
                ) : (
                    <>
                        <div className="app-header">
                            <NavHeader />
                        </div>
                        <div className="app-container">
                            <AppRoutes />
                        </div>
                    </>
                )}
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </Router>
        </>
    );
}

export default App;
