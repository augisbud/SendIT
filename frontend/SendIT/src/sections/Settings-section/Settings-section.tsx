import styles from "./Settings-section.module.scss";

import { Button } from "../../components/Button/Button";

export const SettingsSection = () => {

    return (
        <section className={styles.section}>
            {/* Username section */}
            <div className={styles.usernameFormContainer}>
                <h3>Update your username</h3>
                <form className={styles.usernameForm}>
                    <div className={styles.usernameFormField}>
                        <label>Enter your desired usename.</label>
                        <input type="text" name="username" placeholder="New username"></input>
                    </div>
                    <div className={styles.usernameFormField}>
                        <label>Enter your password to confirm changes.</label>
                        <input type="text" name="username" placeholder="Confirm changes with password"></input>
                    </div>

                    <Button style={{ padding: "1rem 4.5rem", fontSize: "16px" }}>Apply changes</Button>
                </form>
            </div>

             {/* Password section */}
             <div className={styles.usernameFormContainer}>
                <h3>Update your username</h3>
                <form className={styles.usernameForm}>
                    <div className={styles.usernameFormField}>
                        <label>Enter your desired usename.</label>
                        <input type="text" name="username" placeholder="New username"></input>
                    </div>
                    <div className={styles.usernameFormField}>
                        <label>Enter your password to confirm changes.</label>
                        <input type="text" name="username" placeholder="Confirm changes with password"></input>
                    </div>

                    <Button style={{ padding: "1rem 4.5rem", fontSize: "16px" }}>Apply changes</Button>
                </form>
            </div>
        </section>
    );
}