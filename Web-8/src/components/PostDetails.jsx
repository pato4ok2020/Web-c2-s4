import { useContext } from "react";
import { PostsContext } from "../context/PostsContext";
import { useParams, Link } from "react-router-dom";

const PostDetails = () => {
    const { id } = useParams();
    const { posts } = useContext(PostsContext);

    const post = posts.find((p) => p.id === id);

    if (!post) {
        return (
            <div className="posts-container">
                <h2>Пост не найден</h2>
                <Link to="/" className="btn">
                    Вернуться к списку
                </Link>
            </div>
        );
    }

    return (
        <div className="posts-container">
            <Link to="/" style={{ display: "block", marginBottom: "1rem" }}>
                Назад
            </Link>
            <article className="post">
                <h2 className="post__title">{post.title}</h2>
                <span className="post__date">Опубликовано: {post.date.toLocaleString()}</span>
                <pre className="post__text">{post.text}</pre>
            </article>
        </div>
    );
};

export default PostDetails;
