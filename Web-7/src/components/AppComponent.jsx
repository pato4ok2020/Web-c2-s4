import AddPostForm from "./AddPostForm";
import PostList from "./PostList";

const AppComponent = () => {
    return (
        <div className="posts-container">
            <h1>Посты</h1>
            <AddPostForm />
            <PostList />
        </div>
    );
};

export default AppComponent;
