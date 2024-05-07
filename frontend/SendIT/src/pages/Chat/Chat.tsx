import styles from "./Chat.module.scss";
import { VerticalNavbar } from "../../components/VerticalNavbar/VerticalNavbar";
import { Inbox } from "../../sections/Inbox/Inbox";
import { Conversation } from "../../sections/Conversation/Conversation";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

export const Chat = () => {
    // const navigate = useNavigate();

    // // Check if the user is authenticated
    // const authToken = localStorage.getItem("authToken");
    // if (!authToken) {
    //     navigate("/signup");
    // }


    return (
        <main>
            <VerticalNavbar />

            <div className={styles.chatWrapper}>
                <Inbox />
                <Conversation />
            </div>
        </main>
    );
}