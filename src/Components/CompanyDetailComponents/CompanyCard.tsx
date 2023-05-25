import { CompanyCardProps } from '../../Types/Types';
import styles from '../../Pages/Users/UserDetails/UserDetails.module.scss';
import anonimus from '../Images/anonimus.png'

export const CompanyCard = ({ company }: CompanyCardProps) => {

    return (
        <div>
            <img className={styles.avatar} src={company?.company_avatar || anonimus} alt="Company avatar" />
            <div className={styles.cardContent}>
                <div className={styles.name}>
                    <span className={styles.label}>Name:</span> {company.company_name} <br />
                </div>
                <div className={styles.email}>
                    <span className={styles.label}>Title:</span> {company.company_title}
                </div>
                <div className={styles.city}>
                    <span className={styles.label}>City:</span> {company.company_city}
                </div>
                <div className={styles.phone}>
                    <span className={styles.label}>Phone number:</span> {company.company_phone}
                </div>
                <div className={styles.status}>
                    <span className={styles.label}>Descripnions:</span> {company.company_description}
                </div>
                <div className={styles.links}>
                    <span className={styles.label}>Links:</span>
                    {company.company_links?.map((link, _index) => (
                        <a href={link} key={link}>
                            {link}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

