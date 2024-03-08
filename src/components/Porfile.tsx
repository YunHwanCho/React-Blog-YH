import { Link } from "react-router-dom";
import PostList from "./PostList";

export default function Profile(){
    return(
    <>
    <div className="profile__box">
            <div className="flex__box-lg">
                <div className="profile__image"/>
                <div>
                    <div className="profile__email">jyh6314@naver.com</div>
                    <div className="profile__name">조윤환</div>
                </div>
            </div>
            <Link to = "/" className = "profile__logout">logout</Link>
            
           
    </div>
    <PostList hasNavigation = {false}/>
    </>
        
        
    )
}