import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header/Header";
import Homepage from "./pages/Homepage/Homepage";
import Links from "./components/Links/Links";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import MyPosts from "./pages/MyPosts/MyPosts";
import CreatePost from "./pages/CreatePost/CreatePost";
import PostPage from "./pages/PostPage/PostPage";

function App() {
  const [posts, setPosts] = React.useState([]);
  const [rerender, setRerender] = React.useState(false);

  const apiURL = "https://zprefix-crud-api.herokuapp.com";

    // get all posts/blogs
    React.useEffect( () => {
        axios.get(`${apiURL}/api/post`, { withCredentials: true })
            .then(res => {
                console.log(res.data);
                setPosts(res.data);
            })
            .catch(err => {
                console.log("error with handleSubmit", err);
            });
    }, [rerender]);

  return (
    <div>
      <Header location={useLocation().pathname} />
      <Links />
      <Routes>
        <Route exact path="/" element={<Homepage posts={posts} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register useSetRerender={setRerender} rerender={rerender} />} />
        <Route path="/my-posts" element={<MyPosts posts={posts} />} />
        <Route path="/create-post" element={<CreatePost useSetRerender={setRerender} rerender={rerender} />} />
        <Route path="/post/:postId" element={<PostPage posts={posts} useSetRerender={setRerender} rerender={rerender} />} />
      </Routes>
    </div>
  );
 }

export default App;