import { PostsProvider } from "./context/PostsProvider";
import AppComponent from "./components/AppComponent";

const App = () => {
    return (
        <PostsProvider>
            <AppComponent />
        </PostsProvider>
    );
};

export default App;

