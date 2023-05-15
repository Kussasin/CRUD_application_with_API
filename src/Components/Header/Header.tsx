import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { removeToken, removeUser } from "../../Store/thunks";
import { RootState, persistor } from "../../Store/CounterStore";

const Header = () => {
    const isAuth = useSelector((state: RootState) => state.user.user !== null);
    const userEmail = useSelector((state: RootState) => state.user.user?.user_email);
    const users = useSelector((state: RootState) => state);
    const { logout } = useAuth0();
    const dispatch = useDispatch();
    console.log(users);

    const handleLogout = () => {
        logout({ logoutParams: { returnTo: window.location.origin } });
        persistor.purge()
        dispatch(removeToken());
        dispatch(removeUser());
    };

    return (
        <header className={styles.container}>
            <div className={styles.container_content}>
                <Link to="/" className={styles.logo}>
                    Quizzy
                </Link>
                <div className={styles.navLinks}>
                    {isAuth ? (
                        <div className={styles.userDetails}>
                            <span>{userEmail}</span>
                            <Link className={styles.navLinks_item} to="/">
                                Home
                            </Link>
                            <Link className={styles.navLinks_item} to="/about">
                                About
                            </Link>
                            <div className={styles.dropdown}>
                                <span className={styles.navLinks_item}>Data</span>
                                <div className={styles.dropdown_content}>
                                    <Link className={styles.dropdown_item} to="/users">
                                        Users
                                    </Link>
                                    <Link className={styles.dropdown_item} to="/companies">
                                        Companies
                                    </Link>
                                </div>
                            </div>
                            <Link className={styles.navLinks_item} to="" onClick={handleLogout}>
                                Log out
                            </Link>
                        </div>
                    ) : (
                        <>
                            <Link className={styles.navLinks_item} to="/authorization">
                                Log in
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
