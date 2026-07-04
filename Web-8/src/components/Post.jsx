import { useContext } from "react";
import { PostsContext } from "../context/PostsContext";
import { Link } from "react-router-dom";

const Post = (props) => {
    const { deletePost } = useContext(PostsContext);
    const { post } = props;

    return (
        <li className="post">
            <Link to={`/post/${post.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <h3 className="post__title">{post.title}</h3>
            </Link>
            <span className="post__date">Опубликовано: {post.date.toLocaleString()}</span>
            <button type="button" className="btn btn__danger" onClick={() => deletePost(post.id)}>
                Удалить
            </button>
        </li>
    );
};

export default Post;
