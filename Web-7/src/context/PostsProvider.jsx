import { useState, useEffect } from "react";
import { PostsContext } from "./PostsContext";

export const PostsProvider = (props) => {
    const { children } = props;

    const [posts, setPosts] = useState([
        { id: crypto.randomUUID(), title: "Пост1", text: "Lorem ipsum dolor sit", date: new Date(2026, 25, 3, 2, 30) },
        { id: crypto.randomUUID(), title: "Пост2", text: "AAAAAAAAAa", date: new Date(2026, 26, 4, 14, 28) },
    ]);
    const [newPostTitle, setNewPostTitle] = useState("");
    const [newPostText, setNewPostText] = useState("");

    const addPost = (e) => {
        e.preventDefault();

        const newPostTitleClear = newPostTitle.trim();
        if (!newPostTitleClear) {
            alert("Заполните поле с заголовком поста!");
            return;
        }
        if (newPostTitleClear.length > 100) {
            alert("Заголовок поста не может быть больше 200 символов!");
            return;
        }

        const newPostTextClear = newPostText.trim();
        if (!newPostTextClear) {
            alert("Заполните поле с текстом поста!");
            return;
        }

        setPosts([
            ...posts,
            { id: crypto.randomUUID(), title: newPostTitleClear, text: newPostTextClear, date: new Date() },
        ]);
        setNewPostText("");
        setNewPostTitle("");
    };

    const deletePost = (id) => {
        setPosts(posts.filter((post) => post.id !== id));
    };

    return (
        <PostsContext.Provider
            value={{
                posts,
                setPosts,
                newPostTitle,
                newPostText,
                setNewPostTitle,
                setNewPostText,
                addPost,
                deletePost,
            }}
        >
            {children}
        </PostsContext.Provider>
    );
};
