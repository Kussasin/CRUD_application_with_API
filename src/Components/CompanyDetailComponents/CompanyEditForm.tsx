import { CompanyInfo, EditCompanyFormProps } from '../../Types/Types';
import styles from '../../Pages/Users/UserDetails/UserDetails.module.scss';
import { toast } from 'react-toastify';
import api from '../../Api/Instance';
import { getCompanyFromList } from '../../Store/thunks';
import { useDispatch } from 'react-redux';

export const CompanyEditForm = (props: EditCompanyFormProps) => {

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
        id,
        setEditMode,
        setCompanyData,
        setLoading
    } = props;
    
    const dispatch = useDispatch();
    
    const handleCancelClick = () => {
        setEditMode(false);
        setCompanyData({
            company_name: company?.company_name || '',
            company_title: company?.company_title || '',
            company_description: company?.company_description || '',
            company_city: company?.company_city || '',
            company_phone: company?.company_phone || '',
            company_links: company?.company_links || [],
            company_avatar: null,
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
        setCompanyData((prevData) => {
            let newData = { ...prevData };
            if (key === 'company_avatar') {
                newData = { ...newData, company_avatar: value as File };
            } else if (index !== undefined && key === 'company_links') {
                const updatedLinks = [...newData.company_links];
                updatedLinks[index] = value as string;
                newData = { ...newData, company_links: updatedLinks };
            } else {
                newData = { ...newData, [key]: value };
            }
            return newData;
        });
    };

    const handleAvatarChange = (event: Event): void => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            handleChange('company_avatar', file);
        }
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        handleChange('company_name', value);
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        handleChange('company_title', value);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        handleChange('company_description', value);
    };

    const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        handleChange('company_city', value);
    };

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        handleChange('company_phone', value);
    };

    const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = event.target;
        handleChange('company_links', value, index);
    };

    const handleAddLink = () => {
        setCompanyData((prevData) => ({
            ...prevData,
            company_links: [...prevData.company_links, ''],
        }));
    };

    const handleRemoveLink = (index: number) => {
        setCompanyData((prevData) => {
            const updatedLinks = [...prevData.company_links];
            updatedLinks.splice(index, 1);
            return {
                ...prevData,
                company_links: updatedLinks,
            };
        });
    };

    const handleSaveDataClick = async () => {
        if (!id) {
            return;
        }

        try {
            if (avatarFile) {
                await api.updateCompanyAvatar(id, avatarFile);
                toast.success('Avatar successfully changed');
            } else {
                const updatedData: CompanyInfo = {
                    company_name: name,
                    company_title: title,
                    company_description: description,
                    company_city: city,
                    company_phone: phone,
                    company_links: links,
                };
                await api.updateCompanyInfo(id, updatedData);
                toast.success('Data successfully saved');
                const result = await api.getCompanyById(id);
                dispatch(getCompanyFromList(result.data.result));
            }
            setLoading(false);
            setTimeout(() => {
                setEditMode(false);
            }, 1000);
        } catch (error) {
            if (avatarFile) {
                toast.error('Error changing avatar');
                console.log('Error changing avatar:', error);
            } else {
                toast.error('Error saving data');
                console.log('Error saving data:', error);
            }
        }
    };

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
