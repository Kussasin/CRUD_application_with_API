import styles from "./Header.module.scss";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className={styles.container}>
            <div className={styles.container_content}>
                <Link to="/" className={styles.logo}>Quizzy</Link>
                <div className={styles.navLinks}>
                    <Link className={styles.navLinks_item} to="/">Home</Link>
                    <Link className={styles.navLinks_item} to="/about">About</Link>
                    <div className={styles.dropdown}>
                        <span className={styles.navLinks_item}>Data</span>
                        <div className={styles.dropdown_content}>
                            <Link className={styles.dropdown_item} to="/users">Users</Link>
                            <Link className={styles.dropdown_item} to="/companies">Companies</Link>
                        </div>
                    </div>
                    <Link className={styles.navLinks_item} to="/authorization">Log out</Link>
                </div>

            </div>
        </header>
    );
}

export default Header;
