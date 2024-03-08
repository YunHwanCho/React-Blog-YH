
import Header from "components/Header"
import Footer from "components/footer"
import PostList from "components/PostList"
import Carousel from "components/Carousel"


export default function Home (){
    return (
        <div>
            <Header/>
            <Carousel/>
            <PostList/>
            <Footer/>
        </div>
    )
}