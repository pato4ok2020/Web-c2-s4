import { useContext } from "react";
import { PostsContext } from "../context/PostsContext";

const Post = ({ post }) => {
    const { deletePost } = useContext(PostsContext);

    return (
        <li className="post">
            <h3 className="post__title">{post.title}</h3>
            <span className="post__date">Опубликовано: {post.date.toLocaleString()}</span>
            <pre className="post__text">{post.text}</pre>
            <button type="button" className="btn btn__danger" onClick={() => deletePost(post.id)}>
                Удалить пост
            </button>
        </li>
    );
};

export default Post;
