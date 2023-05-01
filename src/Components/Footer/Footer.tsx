import styles from './Footer.module.scss';

const Footer = () =>  {
    return (
        <footer className={styles.container}>
            <p className={styles.copyright}>© 2023 Quizzy. All rights reserved.</p>
        </footer>
    );
}

export default Footer;
