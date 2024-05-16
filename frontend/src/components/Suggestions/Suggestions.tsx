import { AddFriendCard } from "../AddFriendCard/AddFriendCard";
import { InboxCard } from "../InboxCard/InboxCard";
import styles from "./Suggestions.module.scss";

interface User {
    username: string;
    id: number;
}

interface Friend {
    senderID: string;
    id: number;
    created_at: string;
    message: string;
}

interface SuggestionsProps {
    suggestions: User[] | Friend[];
    name: string;
}

export const Suggestions = ({ suggestions, name }: SuggestionsProps) => {
    return (
        <div className={styles.suggestions}>
            {name === 'find-friend' && (suggestions as User[]).map((suggestion) => (
                <AddFriendCard 
                    key={suggestion.id} 
                    id={suggestion.id} 
                    username={suggestion.username} 
                />
            ))}
            {name === 'find-chat' && (suggestions as Friend[]).map((suggestion) => (
                <InboxCard 
                    key={suggestion.id} 
                    id={suggestion.id} 
                    username={suggestion.senderID} 
                    message={suggestion.message} 
                    created_at={suggestion.created_at} 
                />
            ))}
        </div>
    );
};
