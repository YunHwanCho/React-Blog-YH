import {Link} from "react-router-dom"


export default function Home (){
    return (
        <div>
            <header>
                <div>
                   <Link to={"/posts/new"}>글쓰기</Link>
                    <Link to={"/posts"}>게시글</Link>
                    <Link to={"/profile"}>프로필</Link> 
                </div>
            </header>
            <div className="post__navigation">
                <div className="post__navigation-active">전체</div>
                <div>내가 쓴 글</div>
            </div>
            <div className="post__list">
                {[...Array(10)].map((e, index) =>(
                    <div key ={index} className="post__box">
                        <Link to={`/posts/${index}`}>
                            <div className="post__profile-box">
                                <div className="post__profile"></div>
                                <div className="post__auth-name">조윤환</div>
                                <div className="post__date">2023.02.29</div>
                            </div>
                            <div className="post__title">게시글{index}</div>
                            <div className="post__text">리액트를 통해 만드는 나만의 블로그 모음집{index}</div>
                            <div className="post__util-box">
                                <div className="post__edit">수정</div>
                                <div className="post__delete">삭제</div>
                            </div>
                        </Link>
                    </div>

                ))
            }</div>
            <footer>
                <Link to={"/posts/new"}>글쓰기</Link>
                <Link to={"/posts"}>게시글</Link>
                <Link to={"/profile"}>프로필</Link> 
            </footer>
        </div>
    )
}