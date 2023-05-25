import Table from "../../../Components/Table/Table";
import styles from "./CompaniesList.module.scss";
import api from '../../../Api/Instance';
import { useState, useEffect } from 'react';
import ModalWindow from "../../../Components/ModalWindow/ModalWindow";
import CreateCompany from "../CreateCompany/CreateCompany";
import { setCompanies } from "../../../Store/thunks";
import { CompanyList } from "../../../Types/Types";
import { useDispatch } from "react-redux";

const CompaniesList = () => {
  const [companyList, setCompanyList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    api.getCompanies()
      .then((response) => {
        setCompanyList(response.data.result.companies);

        const companies: CompanyList = {
          companies: response.data.result.companies,
          company_by_id: response.data.result.companies,
        };

        dispatch(setCompanies(companies));

        setIsLoading(false);
        console.log(response.data.result);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <main className={styles.container}>
      {!isLoading ? (
        <>
          <ModalWindow
            content={<CreateCompany />}
            title="Create Company"
          />
          <Table data={companyList} table_type="company" />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
};

export default CompaniesList;
