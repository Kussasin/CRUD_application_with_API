import { UserCardProps } from '../../Types/Types';
import styles from '../../Pages/Users/UserDetails/UserDetails.module.scss';
import anonimus from '../Images/anonimus.png'

export const UserCard = ({ user }: UserCardProps) => {
    return (
        <div>
            <img className={styles.avatar} src={user?.user_avatar || anonimus} alt="User avatar" />
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
