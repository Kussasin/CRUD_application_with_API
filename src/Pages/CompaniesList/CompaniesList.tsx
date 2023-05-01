import Table from "../../Components/Table/Table";
import styles from "./CompaniesList.module.scss";

interface Company {
  id: number;
  name: string;
  address: string;
  industry: string;
  website: string;
  description: string;
}

const companyList: Company[] = [
  { id: 1, name: "Apple", address: "1 Infinite Loop, Cupertino, CA 95014", industry: "Technology", website: "https://www.apple.com/", description: "Technology company that designs and sells consumer electronics, computer software, and online services." },
  { id: 2, name: "Microsoft", address: "One Microsoft Way, Redmond, WA 98052", industry: "Technology", website: "https://www.microsoft.com/", description: "Technology company that develops, licenses, and sells computer software, consumer electronics, and personal computers." },
  { id: 3, name: "Amazon", address: "410 Terry Ave. North, Seattle, WA 98109", industry: "Retail", website: "https://www.amazon.com/", description: "E-commerce and cloud computing company that provides a wide range of online products and services." },
  { id: 4, name: "Google", address: "1600 Amphitheatre Parkway, Mountain View, CA 94043", industry: "Technology", website: "https://www.google.com/", description: "Technology company that specializes in Internet-related services and products, including online advertising technologies, search engines, and cloud computing." },
  { id: 5, name: "Tesla", address: "3500 Deer Creek Rd, Palo Alto, CA 94304", industry: "Automotive", website: "https://www.tesla.com/", description: "Electric vehicle and clean energy company that designs and manufactures high-performance electric cars and energy storage systems." },
];


const CompaniesList = () => {

  const userListProps = companyList.map((company) => {
    return {
      id: company.id,
      name: company.name,
      address: company.address,
      industry: company.industry,
      description: company.description,
    }
  });

  return (
    <main className={styles.container}>
      <Table data={userListProps} />
    </main>
  );
};

export default CompaniesList;
