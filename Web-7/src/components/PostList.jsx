import Post from "./Post";
import { useContext } from "react";
import { PostsContext } from "../context/PostsContext";

const PostList = () => {
    const { posts } = useContext(PostsContext);

    return (
        <>
            <h2>Все посты</h2>
            {posts.length === 0 ? (
                <p>Пока постов нет</p>
            ) : (
                <ol className="post-list stack-large stack-exception" aria-labelledby="list-heading">
                    {posts.map((post) => (
                        <Post post={post} key={post.id} />
                    ))}
                </ol>
            )}
        </>
    );
};

export default PostList;
