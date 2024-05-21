import { Chat } from "../../sections/Inbox/Inbox";
import { AddFriendCard } from "../AddFriendCard/AddFriendCard";
import { InboxCard } from "../InboxCard/InboxCard";

interface User {
    username: string;
    id: number;
}

interface SuggestionsProps {
    suggestions: User[] | Chat[];
    name: string;
    onClearSearch: () => void;
}

export const Suggestions = ({ suggestions, name, onClearSearch }: SuggestionsProps) => {
    const userId = localStorage.getItem("userID");

    if (name === 'find-friend')
        return (
            <div>
                {(suggestions as User[]).map((suggestion) => (
                    <AddFriendCard
                        key={suggestion.id}
                        id={suggestion.id}
                        username={suggestion.username}
                        onClearSearch={onClearSearch}
                    />
                ))}
            </div>
        )

    if (name === 'find-chat' && userId) {
        return (
            <div>
                {(suggestions as Chat[]).map((suggestion) => {
                    return <InboxCard
                        key={suggestion.id}
                        id={suggestion.id}
                        username={suggestion.displayName}
                        message={suggestion.message}
                        created_at={suggestion.created_at}
                    />
                })}
            </div>
        )
    }

    return <></>;
};