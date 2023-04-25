import styles from './MainPage.module.scss';

function MainPage() {
    return (
        <main className={styles.container}>
            <div className={styles.container_content}>
                <p>Hello User</p>
            </div>
        </main>
    );
}

export default MainPage;
