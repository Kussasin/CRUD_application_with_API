import { useEffect, useState, useRef, } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './CompanyProfile.module.scss';
import { RootState } from '../../../Store/CounterStore';
import { Company, CompanyInfo } from '../../../Types/Types';
import { getCompanyFromList } from '../../../Store/thunks';
import api from '../../../Api/Instance';
import { useParams } from 'react-router-dom';
import { CompanyCard } from '../../../Components/CompanyDetailComponents/CompanyCard';
import { CompanyDropdownMenu } from '../../../Components/CompanyDetailComponents/CompanyDropdownMenu';
import { CompanyEditForm } from '../../../Components/CompanyDetailComponents/CompanyEditForm';

const CompanyProfile = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [companyExist, setCompanyExist] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);
  const MyId = useSelector((state: RootState) => state.user.user?.user_id);
  const Owner = useSelector((state: RootState) => state.companies.company_by_id?.company_owner?.user_id);
  const doNothing = () => { };

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
        if (error.response && error.response.status === 404) {
          setCompanyExist(false);
          console.log("Company does not exist");
        } else {
          console.log("Error fetching company:", error);
        }
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


  if (loading) {
    return <div className={styles.message}>Loading...</div>;
  }

  if (!companyExist) {
    return <div className={styles.message}>Company does not exist </div>;
  }

  if (company === null) {
    return <div className={styles.message}>Data not found</div>;
  }

  return (
    <main className={styles.userProfile}>
      <div className={styles.card}>
        {Owner === MyId && (
          <div className={styles.options} onClick={handleOptionsClick} ref={optionsRef}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            {showOptions && (
              <CompanyDropdownMenu
                id={id as string}
                setEditMode={setEditMode}
                setChangePassword={doNothing}
              />
            )}
          </div>
        )}
        {editMode ? (
          <CompanyEditForm
            companyData={companyData}
            company={company}
            setCompanyData={setCompanyData}
            setLoading={setLoading}
            id={id as string}
            setEditMode={setEditMode}
          />
        ) : (
          <CompanyCard
            company={company}
          />
        )}
      </div>
    </main>
  );
};

export default CompanyProfile;
