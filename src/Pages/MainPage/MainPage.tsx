import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../../Store/CounterStore';
import { RootState } from '../../Store/CounterStore';
import styles from './MainPage.module.scss';
import ModalWindow from '../../Components/ModalWindow/ModalWindow';

interface ModalContent {
    header: string;
    content: string;
}

const companyList: ModalContent = {
    header: "I'm a modal dialog",
    content: "Modal content goes here..."
}

const MainPage = () => {
    const count = useSelector((state: RootState) => state.counter);
    const dispatch = useDispatch();

    return (
        <main className={styles.container}>
            <div className={styles.container_content}>
                <p>Hello User</p>
                <ModalWindow
                    headerText={companyList.header}
                    contentText={companyList.content}
                />
            </div>
            <div>
                <h1>{count}</h1>
                <button onClick={() => dispatch(decrement())}>Decrement</button>
                <button onClick={() => dispatch(increment())}>Increment</button>
            </div>
        </main>
    );
}

export default MainPage;
