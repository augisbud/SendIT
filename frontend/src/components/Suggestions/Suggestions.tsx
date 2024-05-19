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
}

export const Suggestions = ({ suggestions, name }: SuggestionsProps) => {
    const userId = localStorage.getItem("userID");

    if (name === 'find-friend')
        return (
            <div>
                {(suggestions as User[]).map((suggestion) => (
                    <AddFriendCard
                        key={suggestion.id}
                        id={suggestion.id}
                        username={suggestion.username}
                    />
                ))}
            </div>
        )

    if (name === 'find-chat' && userId) {
        return (
            <div>
                {(suggestions as Chat[]).map((suggestion) => {
                    const id = (parseInt(userId) == suggestion.senderId) ? suggestion.receiverId : suggestion.senderId;
                    const displayName = (parseInt(userId) == suggestion.senderId) ? suggestion.recipientName : suggestion.senderName;

                    return <InboxCard
                        key={suggestion.id}
                        id={id}
                        username={displayName}
                        message={suggestion.message}
                        created_at={suggestion.created_at}
                    />
                })}
            </div>
        )
    }

    return <></>;
};