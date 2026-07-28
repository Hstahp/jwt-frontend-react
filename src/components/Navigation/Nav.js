import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
function Nav(props) {
    const [isShow, setIsShow] = useState(true);
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === '/login' || location.pathname === '/register') {
            setIsShow(false);
        }
    }, [location]);
    return (
        <>
            {isShow === true && (
                <div className="topnav">
                    <NavLink to="/home" exact>
                        Home
                    </NavLink>
                    <NavLink to="/users">Users</NavLink>
                    <NavLink to="/projects">Projects</NavLink>
                    <NavLink to="/about">About</NavLink>
                </div>
            )}
        </>
    );
}

export default Nav;
