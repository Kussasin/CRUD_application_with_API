import { EditUserFormProps, UpdateUserInfoData } from '../../Types/Types';
import styles from '../../Pages/Users/UserDetails/UserDetails.module.scss';
import { toast } from 'react-toastify';
import api from '../../Api/Instance';
import { getUserFromList } from '../../Store/thunks';
import { useDispatch } from 'react-redux';
import anonimus from '../Images/anonimus.png'

export const UserEditForm = (props: EditUserFormProps) => {

    const {
        userData,
        user,
        setUserData,
        setEditMode,
        setChangePassword,
        id,
        setLoading,
    } = props;
    const dispatch = useDispatch();
    const handleCancelClick = () => {
        setEditMode(false);
        setChangePassword(false);
        setUserData({
            firstName: user?.user_firstname || '',
            lastName: user?.user_lastname || '',
            status: user?.user_status || '',
            city: user?.user_city || '',
            phone: user?.user_phone || '',
            links: user?.user_links || [],
            newPassword: '',
            confirmPassword: '',
            avatarFile: null,
        });
    };

    const handleAvatarClick = (): void => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = handleAvatarChange;
        input.click();
    };

    const handleChange = (key: string, value: string | File | Array<string>, index?: number): void => {
        setUserData((prevData) => {
            let newData = { ...prevData };
            if (key === 'avatarFile') {
                newData = { ...newData, avatarFile: value as File };
            } else if (index !== undefined && key === 'links') {
                const updatedLinks = [...newData.links];
                updatedLinks[index] = value as string;
                newData = { ...newData, links: updatedLinks };
            } else {
                newData = { ...newData, [key]: value };
            }
            return newData;
        });
    };

    const handleAvatarChange = (event: Event): void => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            handleChange('avatarFile', file);
        }
    };

    const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        handleChange('firstName', value);
    };

    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        handleChange('lastName', value);
    };

    const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        handleChange('status', value);
    };

    const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        handleChange('city', value);
    };

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        handleChange('phone', value);
    };

    const handleSaveDataClick = async () => {
        if (!id) {
            return;
        }

        try {
            if (userData.avatarFile) {
                await api.updateUserAvatar(id, userData.avatarFile);
                toast.success('Avatar successfully changed');
            } else {
                const updatedData: UpdateUserInfoData = {
                    user_firstname: userData.firstName,
                    user_lastname: userData.lastName,
                    user_status: userData.status,
                    user_city: userData.city,
                    user_phone: userData.phone,
                    user_links: userData.links,
                };
                await api.updateUserInfo(id, updatedData);
                toast.success('Data successfully saved');
                const result = await api.getUserById(id);
                dispatch(getUserFromList(result.data.result));
            }
            setLoading(false);
            setTimeout(() => {
                setEditMode(false);
            }, 1000);
        } catch (error) {
            if (userData.avatarFile) {
                toast.error('Error changing avatar');
                console.log('Error changing avatar:', error);
            } else {
                toast.error('Error saving data');
                console.log('Error saving data:', error);
            }
        }
    };

    const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = event.target;
        handleChange('links', value, index);
    };

    const handleAddLink = () => {
        setUserData((prevData) => ({
            ...prevData,
            links: [...prevData.links, ''],
        }));
    };

    const handleRemoveLink = (index: number) => {
        setUserData((prevData) => {
            const updatedLinks = [...prevData.links];
            updatedLinks.splice(index, 1);
            return {
                ...prevData,
                links: updatedLinks,
            };
        });
    };
    
    return (
        <div className={styles.editForm}>
            <div className={styles.avatarContainer}>
                <img className={styles.avatar} src={userData.avatarFile ? URL.createObjectURL(userData.avatarFile) : (user?.user_avatar || anonimus)}
                    alt="User avatar" key={userData.avatarFile?.name}
                />
                <button className={styles.changeAvatar} onClick={handleAvatarClick}>
                    Change Avatar
                </button>
            </div>
            <div className={styles.cardContent}>
                <div className={styles.formField}>
                    <label htmlFor="firstname">First Name:</label>
                    <input type="text" defaultValue={userData.firstName} onChange={handleFirstNameChange} />
                </div>
                <div className={styles.formField}>
                    <label htmlFor="lastname">Last Name:</label>
                    <input type="text" id="lastname" defaultValue={userData.lastName} onChange={handleLastNameChange} />
                </div>
                <div className={styles.formField}>
                    <label htmlFor="status">Status:</label>
                    <input type="text" id="status" defaultValue={userData.status} onChange={handleStatusChange} />
                </div>
                <div className={styles.formField}>
                    <label htmlFor="city">City:</label>
                    <input type="text" id="city" defaultValue={userData.city} onChange={handleCityChange} />
                </div>
                <div className={styles.formField}>
                    <label htmlFor="phone">Phone number:</label>
                    <input type="text" id="phone" defaultValue={userData.phone} onChange={handlePhoneChange} />
                </div>
                <div className={styles.formField}>
                    <label htmlFor="links">Links:</label>
                    {userData.links.length > 0 && (
                        <div>
                            {userData.links.map((link, index) => (
                                <div key={index}>
                                    <input
                                        type="text"
                                        value={link}
                                        onChange={(event) => handleLinkChange(event, index)}
                                    />
                                    <button
                                        className={styles.link_removeButton}
                                        onClick={() => handleRemoveLink(index)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    <button className={styles.link_addButton} onClick={handleAddLink}>
                        Add Link
                    </button>
                </div>
                <div className={styles.formActions}>
                    <button className={styles.saveButton} onClick={handleSaveDataClick}>
                        Save
                    </button>
                    <button className={styles.cancelButton} onClick={handleCancelClick}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}