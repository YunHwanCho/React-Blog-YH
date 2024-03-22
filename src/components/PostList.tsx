import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import dog from "../img/dog.jpg";
import { collection, getDocs } from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "context/AuthContext";

interface PostListProps {
  hasNavigation?: boolean;
}
type Tabtype = "all" | "my";

interface PostProps {
  id: string;
  email: string;
  content: string;
  summary: string;
  title: string;
  createdAt: string;
}

export default function PostList({ hasNavigation = true }: PostListProps) {
  const [activeTab, setActiveTab] = useState<Tabtype>("all");
  const [posts, setPosts] = useState<PostProps[]>([]);
  const { user } = useContext(AuthContext);
  const getPost = async () => {
    const datas = await getDocs(collection(db, "posts"));
    datas?.forEach((doc) => {
      const datObj = { ...doc.data(), id: doc.id };
      setPosts((prev) => [...prev, datObj as PostProps]);
    });
  };
  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      {hasNavigation && (
        <div className="post__navigation">
          <div
            role="presentation"
            className={activeTab === "all" ? "post__navigation--active" : ""}
            onClick={() => {
              setActiveTab("all");
            }}
          >
            전체
          </div>
          <div
            role="presentation"
            className={activeTab === "my" ? "post__navigation--active" : ""}
            onClick={() => {
              setActiveTab("my");
            }}
          >
            내가 쓴 글
          </div>
        </div>
      )}
      <div className="post__list">
        {posts?.length > 0 ? (
          posts?.map((post, index) => (
            <div key={post?.id} className="post__box">
              <Link to={`/posts/${post?.id}`}>
                <div className="post__img">
                  <img src={dog}></img>
                </div>
                <div className="post__content-top">
                  <div className="post__title">{post?.title}</div>
                  <div className="post__text">{post?.content}</div>
                </div>
                <div className="post__content-bottom">
                  <div className="post__date">{post?.createdAt}</div>
                </div>

                <div className="post__profile-box">
                  <div className="post__box-left">
                    <div className="post__profile"></div>
                    <div className="post__auth-name">{post?.email}</div>
                  </div>

                  {post?.email === user?.email && (
                    <div className="post__util-box">
                      <div className="post__delete">삭제</div>
                      <Link
                        to={`/posts/edit/${post?.id}`}
                        className="post__edit"
                      >
                        수정
                      </Link>
                    </div>
                  )}
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="post__no-post">게시글이 없습니다.</div>
        )}
      </div>
    </>
  );
}
