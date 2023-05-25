import { DropdownMenuProps } from '../../Types/Types';
import styles from '../../Pages/Users/UserDetails/UserDetails.module.scss';
import { toast } from 'react-toastify';
import api from '../../Api/Instance';
import { persistor } from '../../Store/CounterStore';
import { useAuth0 } from '@auth0/auth0-react';
import { removeToken, removeUser } from '../../Store/thunks';
import { useDispatch } from 'react-redux';

export const UserDropdownMenu = (props: DropdownMenuProps) => {
    const { id, setEditMode, setChangePassword } = props;
    const dispatch = useDispatch();
    const { logout } = useAuth0();
    
    const handleEditClick = () => {
        setEditMode(true);
        setChangePassword(false);
    };

    const handleChangePasswordClick = () => {
        setChangePassword(true);
        setEditMode(false);
    };

    const handleDeleteClick = () => {
        if (id) {
            api.deleteUser(id)
                .then(() => {
                    logout({ logoutParams: { returnTo: window.location.origin } });
                    persistor.purge()
                    dispatch(removeToken());
                    dispatch(removeUser());
                    toast.success("User successfully deleted");
                })
                .catch((error) => {
                    toast.error("Error deleting user");
                    console.log('Error deleting user:', error);
                });
        }
    };

    return (
        <ul className={styles.optionsList}>
            <li>
                <button className={styles.edit} onClick={handleEditClick}>
                    Edit
                </button>
            </li>
            <li>
                <button className={styles.changePassword} onClick={handleChangePasswordClick}>
                    Change password
                </button>
            </li>
            <li>
                <button className={styles.delete} onClick={handleDeleteClick}>
                    Delete
                </button>
            </li>
        </ul>
    );
}