import AddPostForm from "./AddPostForm";
import PostList from "./PostList";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PostDetails from "./PostDetails";

const AppComponent = () => {
    return (
        <BrowserRouter>
            <h1>Посты</h1>
            <nav>
                <Link to="/">Посты</Link><br />
                <Link to="/add">Создать пост</Link><br />
            </nav>

            <div className="posts-container">
                <Routes>
                    <Route path="/" element={<PostList />} />
                    <Route path="/add" element={<AddPostForm />} />
                    <Route path="/post/:id" element={<PostDetails />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default AppComponent;
