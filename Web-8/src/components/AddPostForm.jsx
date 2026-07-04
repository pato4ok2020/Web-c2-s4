import { useContext } from "react";
import { PostsContext } from "../context/PostsContext";

const AddPostForm = () => {
    const { newPostTitle, newPostText, setNewPostTitle, setNewPostText, addPost } = useContext(PostsContext);

    return (
        <form onSubmit={addPost}>
            <h2 className="label-wrapper">
                <label htmlFor="new-name-input" className="label__lg">
                    Название поста:
                </label>
            </h2>
            <input
                type="text"
                id="new-name-input"
                className="input__lg"
                value={newPostTitle}
                onInput={({ target }) => setNewPostTitle(target.value)}
                autoComplete="off"
            />

            <h2 className="label-wrapper">
                <label htmlFor="new-text-input" className="label__lg">
                    Текст поста:
                </label>
            </h2>
            <textarea
                id="new-text-input"
                className="input__lg"
                style={{ minHeight: "150px", resize: "vertical" }}
                value={newPostText}
                onInput={({ target }) => setNewPostText(target.value)}
            />

            <button type="submit" className="btn btn__primary">
                Опубликовать пост
            </button>
        </form>
    );
};

export default AddPostForm;
