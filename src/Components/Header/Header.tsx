import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Header.module.scss";

const Header = () => {
    const [user, setUser] = useState({ user_email: '' });
    const isAuth = localStorage.getItem('me');
    const { logout,isAuthenticated } = useAuth0();

    useEffect(() => {
        const storedUser = localStorage.getItem('me');
        const parsedUser = storedUser ? JSON.parse(storedUser) : { user_email: '' };
        setUser(parsedUser);
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        setUser({ user_email: '' });
        logout({ logoutParams: { returnTo: window.location.origin } })
    };

    return (
        <header className={styles.container}>
            <div className={styles.container_content}>
                <Link to="/" className={styles.logo}>Quizzy</Link>
                <div className={styles.navLinks}>
                    {isAuth || isAuthenticated ? (
                        <div className={styles.userDetails}>
                            <span >{user.user_email}</span>
                            <Link className={styles.navLinks_item} to="/">Home</Link>
                            <Link className={styles.navLinks_item} to="/about">About</Link>
                            <div className={styles.dropdown}>
                                <span className={styles.navLinks_item}>Data</span>
                                <div className={styles.dropdown_content}>
                                    <Link className={styles.dropdown_item} to="/users">Users</Link>
                                    <Link className={styles.dropdown_item} to="/companies">Companies</Link>
                                </div>
                            </div>
                            <Link className={styles.navLinks_item} to="" onClick={handleLogout}>Log out</Link>
                        </div>
                    ) : (
                        <>
                            <Link className={styles.navLinks_item} to="/authorization" >Log in</Link>
                        </>
                    )}

                </div>
            </div>
        </header>
    );
}

export default Header;
