import Table from "../../Components/Table/Table";
import styles from "./CompaniesList.module.scss";
import api from '../../Api/Instance';
import { useState, useEffect } from 'react';

const CompaniesList = () => {
  const [companyList, setCompanyList] = useState([]);

  useEffect(() => {
    api.getCompanies()
      .then((response) => {
        setCompanyList(response.data.result.companies);
        console.log(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <main className={styles.container}>
      <Table data={companyList} table_type="company" />
    </main>
  );
};

export default CompaniesList;
