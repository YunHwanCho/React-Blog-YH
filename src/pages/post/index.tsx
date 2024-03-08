import Header from "../../components/Header";
import PostList from "../../components/PostList";
import Footer from "../../components/footer";

export default function Post(){
    return (
        <>
        <Header/>
        
        <PostList hasNavigation ={false}/>
        <Footer/>
        </>
    )
}