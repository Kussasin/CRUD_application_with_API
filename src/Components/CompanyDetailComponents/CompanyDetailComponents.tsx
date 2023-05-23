import { CardProps, DropdownMenuProps, EditCompanyFormProps } from '../../Types/Types';
import styles from '../../Pages/Users/UserDetails/UserDetails.module.scss';

const DropdownMenu = (props: DropdownMenuProps) => {
    const { handleEditClick, handleDeleteClick } = props;

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

const EditForm = (props: EditCompanyFormProps) => {

    const {
        avatarFile,
        company,
        name,
        title,
        description,
        city,
        phone,
        links,
        anonimus,
        handleAvatarClick,
        handleNameChange,
        handleTitleChange,
        handleDescriptionChange,
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
            <div className={styles.avatarContainer}>
                <img className={styles.avatar} src={avatarFile ? URL.createObjectURL(avatarFile) : (company?.company_avatar || anonimus)}
                    alt="Company avatar" key={avatarFile?.name}
                />
                <button className={styles.changeAvatar} onClick={handleAvatarClick}>
                    Change Avatar
                </button>
            </div>
            <div className={styles.cardContent}>
                <div className={styles.formField}>
                    <label htmlFor="Name">Name:</label>
                    <input type="text" defaultValue={name} onChange={handleNameChange} />
                </div>
                <div className={styles.formField}>
                    <label htmlFor="Title">Title:</label>
                    <input type="text" id="lastname" defaultValue={title} onChange={handleTitleChange} />
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
                <div className={styles.formField}>
                    <label htmlFor="description">Description:</label>
                    <input type="text" id="description" defaultValue={description} onChange={handleDescriptionChange} />
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

const Card = ({ company, anonimus }: CardProps) => {
    return (
        <div>
            <img className={styles.avatar} src={company?.company_avatar || anonimus} alt="Company avatar" />
            <div className={styles.cardContent}>
                <div className={styles.name}>
                    <span className={styles.label}>Name:</span> {company?.company_name} <br />
                </div>
                <div className={styles.email}>
                    <span className={styles.label}>Title:</span> {company?.company_title}
                </div>
                <div className={styles.city}>
                    <span className={styles.label}>City:</span> {company?.company_city}
                </div>
                <div className={styles.phone}>
                    <span className={styles.label}>Phone number:</span> {company?.company_phone}
                </div>
                <div className={styles.status}>
                    <span className={styles.label}>Descripnions:</span> {company?.company_description}
                </div>
                <div className={styles.links}>
                    <span className={styles.label}>Links:</span>
                    {company?.company_links?.map((link, _index) => (
                        <a href={link} key={link}>
                            {link}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

export { DropdownMenu, EditForm, Card };
