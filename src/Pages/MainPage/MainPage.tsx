import styles from './MainPage.module.scss';
import ModalWindow from '../../Components/ModalWindow/ModalWindow';

interface ModalContent{
    header: string;
    content: string;
}

const companyList: ModalContent = {
    header: "I'm a modal dialog",
    content:"Modal content goes here..."
}

const MainPage = () => {
    return (
        <main className={styles.container}>
            <div className={styles.container_content}>
                <p>Hello User</p>
                <ModalWindow 
                headerText={companyList.header}
                contentText={companyList.content}
                />
            </div>
        </main>
    );
}

export default MainPage;
