
import { Route, Routes, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Home from "../pages/home/index"
import Post from "../pages/post";
import PostDetail from "../pages/post/detail";
import PostNew from "../pages/post/new";
import PostEdit from "../pages/post/edit";
import ProfilePage from "../pages/profile";
import LoginPage from "../pages/login";
import SignupPage from "../pages/signup";
export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/posts" element={<Post/>}></Route>
        <Route path="/posts/:id" element={<PostDetail/>}></Route>
        <Route path="/posts/new" element={<PostNew/>}></Route>
        <Route path="/posts/edit/:id" element={<PostEdit/>}></Route>
        <Route path="/profile" element={<ProfilePage/>}></Route>
        <Route path="/login" element ={<LoginPage/>}></Route>
        <Route path="/login" element ={<SignupPage/>}></Route>
        <Route path="*" element={<Navigate replace to="/" />}></Route>
      </Routes>
    </>
  );
}