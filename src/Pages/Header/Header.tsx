import styles from "./Header.module.scss";

function Header() {
    return (
        <header className={styles.container}>
            <div className={styles.container_content}>
                <p className={styles.logo}>Quizzy</p>
                <div className={styles.navLinks}>
                    <div className={styles.navLinks_item}>Home</div>
                    <div className={styles.navLinks_item}>About</div>
                    <div className={styles.navLinks_item}>Log out</div>
                </div>
            </div>
        </header>
    );
}

export default Header;
