import { useState, useEffect } from "react";
import { PostsContext } from "./PostsContext";

export const PostsProvider = (props) => {
    const { children } = props;

    const [posts, setPosts] = useState(() => {
        const savedPosts = localStorage.getItem("posts");
        if (savedPosts) {
            const parsed = JSON.parse(savedPosts);
            return parsed.map((post) => ({
                ...post,
                date: new Date(post.date),
            }));
        }

        return [];
    });
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

    useEffect(() => {
        localStorage.setItem("posts", JSON.stringify(posts));
    }, [posts]);

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
