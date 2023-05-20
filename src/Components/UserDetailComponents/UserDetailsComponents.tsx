import { CardProps, ChangePasswordProps, DropdownMenuProps, EditFormProps } from '../../Types/Types';
import styles from '../../Pages/UserDetails/UserDetails.module.scss';

const DropdownMenu = (props: DropdownMenuProps) => {
    const { handleEditClick, handleChangePasswordClick, handleDeleteClick } = props;

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

const EditForm = (props: EditFormProps) => {

    const {
        avatarFile,
        user,
        firstName,
        lastName,
        status,
        city,
        phone,
        links,
        anonimus,
        handleAvatarClick,
        handleFirstNameChange,
        handleLastNameChange,
        handleStatusChange,
        handleCityChange,
        handlePhoneChange,
        handleLinkChange,
        handleRemoveLink,
        handleAddLink,
        handleSaveDataClick,
        handleCancelClick
    } = props;

    return (
        <div className={styles.editForm}>
            {/* Render the edit form */}
            <div className={styles.avatarContainer}>
                <img className={styles.avatar} src={avatarFile ? URL.createObjectURL(avatarFile) : (user?.user_avatar || anonimus)}
                    alt="User avatar" key={avatarFile?.name}
                />
                <button className={styles.changeAvatar} onClick={handleAvatarClick}>
                    Change Avatar
                </button>
            </div>
            <div className={styles.cardContent}>
                <div className={styles.formField}>
                    <label htmlFor="firstname">First Name:</label>
                    <input type="text" defaultValue={firstName} onChange={handleFirstNameChange} />
                </div>
                <div className={styles.formField}>
                    <label htmlFor="lastname">Last Name:</label>
                    <input type="text" id="lastname" defaultValue={lastName} onChange={handleLastNameChange} />
                </div>
                <div className={styles.formField}>
                    <label htmlFor="status">Status:</label>
                    <input type="text" id="status" defaultValue={status} onChange={handleStatusChange} />
                </div>
                <div className={styles.formField}>
                    <label htmlFor="city">City:</label>
                    <input type="text" id="city" defaultValue={city} onChange={handleCityChange} />
                </div>
                <div className={styles.formField}>
                    <label htmlFor="phone">Phone number:</label>
                    <input type="text" id="phone" defaultValue={phone} onChange={handlePhoneChange} />
                </div>
                <div className={styles.formField}>
                    <label htmlFor="links">Links:</label>
                    {links.length > 0 && (
                        <div>
                            {links.map((link, index) => (
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

const ChangePassword = (props: ChangePasswordProps) => {

    const {
        avatarFile,
        user,
        newPassword,
        confirmPassword,
        anonimus,
        handleNewPasswordChange,
        handleConfirmPasswordChange,
        handleSavePasswordClick,
        handleCancelClick
    } = props;

    return (
        <div className={styles.editForm}>
            <div className={styles.avatarContainer}>
                <img className={styles.avatar} src={avatarFile ? URL.createObjectURL(avatarFile) : (user?.user_avatar || anonimus)} alt="User avatar" />
            </div>
            <div className={styles.cardContent}>
                <div className={styles.formField}>
                    <label htmlFor="newPassword">New Password:</label>
                    <input type="password" id="newPassword" value={newPassword} onChange={handleNewPasswordChange} />
                </div>
                <div className={styles.formField}>
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input type="password" id="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                </div>
                <div className={styles.formActions}>
                    <button className={styles.saveButton} onClick={handleSavePasswordClick}>
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

const Card = ({ user, anonimus }: CardProps) => {
    return (
        <div>
            <img className={styles.avatar} src={user.user_avatar || anonimus} alt="User avatar" />
            <div className={styles.cardContent}>
                <div className={styles.name}>
                    <span className={styles.label}>Name:</span> {user.user_firstname} <br />
                    <span className={styles.label}>Surname:</span> {user.user_lastname}
                </div>
                <div className={styles.email}>
                    <span className={styles.label}>Email:</span> {user.user_email}
                </div>
                <div className={styles.status}>
                    <span className={styles.label}>Status:</span> {user.user_status}
                </div>
                <div className={styles.city}>
                    <span className={styles.label}>City:</span> {user.user_city}
                </div>
                <div className={styles.phone}>
                    <span className={styles.label}>Phone number:</span> {user.user_phone}
                </div>
                <div className={styles.phone}>
                    <span className={styles.label}>Is super user?:</span> {user.is_superuser ? 'yes' : 'no'}
                </div>
                <div className={styles.links}>
                    <span className={styles.label}>Links:</span>
                    {user.user_links?.map((link, _index) => (
                        <a href={link} key={link}>
                            {link}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

export { DropdownMenu, EditForm, ChangePassword, Card };
