import styles from './Footer.module.scss';

function Footer() {
    return (
        <footer className={styles.container}>
            <p className={styles.copyright}>© 2023 Quizzy. All rights reserved.</p>
        </footer>
    );
}

export default Footer;
