import { DropdownMenuProps } from '../../Types/Types';
import styles from '../../Pages/Users/UserDetails/UserDetails.module.scss';
import { toast } from 'react-toastify';
import api from '../../Api/Instance';
import { removeCompany } from '../../Store/thunks';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const CompanyDropdownMenu = (props: DropdownMenuProps) => {
    const { id, setEditMode } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleDeleteClick = () => {
        if (id) {
            api.deleteCompany(id)
                .then(() => {
                    dispatch(removeCompany());
                    navigate('/companies');
                })
                .catch((error) => {
                    toast.error("Error deleting company");
                    console.log('Error deleting company:', error);
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
                <button className={styles.delete} onClick={handleDeleteClick}>
                    Delete
                </button>
            </li>
        </ul>
    );
}