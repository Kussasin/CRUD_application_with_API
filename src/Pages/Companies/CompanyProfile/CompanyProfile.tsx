import { useEffect, useState, useRef, } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './CompanyProfile.module.scss';
import { RootState } from '../../../Store/CounterStore';
import { Company, CompanyInfo, UpdateCompanyInfo } from '../../../Types/Types';
import { getCompanyFromList, removeCompany, } from '../../../Store/thunks';
import api from '../../../Api/Instance';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EditForm, Card, DropdownMenu } from '../../../Components/CompanyDetailComponents/CompanyDetailComponents';

const CompanyProfile = () => {
  const dispatch = useDispatch();
  const anonimus = 'https://play-lh.googleusercontent.com/EotxkWC4dXajaesh2iVgdIB5-o6pINoas_k-z7nVjRGSu4k9QZwMZIcRNXyUWGn3rg';
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);
  const MyId = useSelector((state: RootState) => state.user.user?.user_id);
  const Owner = useSelector((state: RootState) => state.companies.company_by_id?.company_owner?.user_id);
  const navigate = useNavigate();

  useEffect(() => {
    const companyId = id as string;
    setLoading(true);

    api
      .getCompanyById(companyId)
      .then((result) => {
        dispatch(getCompanyFromList(result.data.result));
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching company:', error);
        setLoading(false);
      });
  }, [dispatch, id]);

  const company: Company | null = useSelector((state: RootState) => state.companies.company_by_id);

  const [companyData, setCompanyData] = useState<CompanyInfo>({
    company_name: '',
    company_title: '',
    company_description: '',
    company_city: '',
    company_phone: '',
    company_links: [],
    company_avatar: null,
  });

  useEffect(() => {
    if (company) {
      setCompanyData(prevData => ({
        ...prevData,
        company_name: company.company_name || '',
        company_title: company.company_title || '',
        company_city: company.company_city || '',
        company_phone: company.company_phone || '',
        company_links: company.company_links || [],
      }));
    }
  }, [company]);

  const handleOptionsClick = () => {
    setShowOptions((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

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
      } else if (index !== undefined && key === 'links') {
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
      links: [...prevData.company_links, ''],
    }));
  };

  const handleRemoveLink = (index: number) => {
    setCompanyData((prevData) => {
      const updatedLinks = [...prevData.company_links];
      updatedLinks.splice(index, 1);
      return {
        ...prevData,
        links: updatedLinks,
      };
    });
  };

  const handleSaveDataClick = async () => {
    if (!id) {
      return;
    }

    try {
      if (company_avatar) {
        await api.updateCompanyAvatar(id, company_avatar);
        toast.success('Avatar successfully changed');
      } else {
        const updatedData: UpdateCompanyInfo = {
          company_name: company_name,
          company_title: company_title,
          company_description: company_description,
          company_city: company_city,
          company_phone: company_phone,
          company_links: company_links,
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
      if (company_avatar) {
        toast.error('Error changing avatar');
        console.log('Error changing avatar:', error);
      } else {
        toast.error('Error saving data');
        console.log('Error saving data:', error);
      }
    }
  };

  if (loading) {
    return <div className={styles.message}>Loading...</div>;
  }

  if (company === null) {
    return <div className={styles.message}>Data not found</div>;
  }

  const { company_avatar, company_city, company_description, company_links, company_name, company_phone, company_title } = companyData;

  return (
    <main className={styles.userProfile}>
      <div className={styles.card}>
        {Owner === MyId && (
          <div className={styles.options} onClick={handleOptionsClick} ref={optionsRef}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            {showOptions && (
              <DropdownMenu
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteClick}
              />
            )}
          </div>
        )}
        {editMode ? (
          <EditForm
            avatarFile={company_avatar}
            company={company}
            name={company_name}
            title={company_title}
            description={company_description}
            city={company_city}
            phone={company_phone}
            links={company_links}
            anonimus={anonimus}
            handleAvatarClick={handleAvatarClick}
            handleNameChange={handleNameChange}
            handleTitleChange={handleTitleChange}
            handleDescriptionChange={handleDescriptionChange}
            handleCityChange={handleCityChange}
            handlePhoneChange={handlePhoneChange}
            handleLinkChange={handleLinkChange}
            handleRemoveLink={handleRemoveLink}
            handleAddLink={handleAddLink}
            handleSaveDataClick={handleSaveDataClick}
            handleCancelClick={handleCancelClick}
          />
        ) : (
          <Card
            company={company}
            anonimus={anonimus}
          />
        )}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </main>
  );
};

export default CompanyProfile;
