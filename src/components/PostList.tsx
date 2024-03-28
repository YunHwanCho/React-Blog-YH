import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import dog from "../img/dog.jpg";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "context/AuthContext";
import { toast } from "react-toastify";

interface PostListProps {
  hasNavigation?: boolean;
}
type Tabtype = "all" | "my";

export interface PostProps {
  id?: string;
  email: string;
  content: string;
  summary: string;
  title: string;
  createdAt: string;
  updatedAt?: string;
  uid: string;
}

export default function PostList({ hasNavigation = true }: PostListProps) {
  const [activeTab, setActiveTab] = useState<Tabtype>("all");
  const [posts, setPosts] = useState<PostProps[]>([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const getPosts = async () => {
    setPosts([]);
    // 초기화를 안해주니 변경사항이 누적되는 걸 볼 수 있었음!!
    let postsRef = collection(db, "posts");
    let postsQuery;
    if (activeTab == "my" && user) {
      postsQuery = query(
        postsRef,
        where("uid", "==", "user.uid"),
        orderBy("createdAt", "desc")
      );
    } else {
      postsQuery = query(postsRef, orderBy("createdAt", "desc"));
    }
    const datas = await getDocs(postsQuery);
    datas?.forEach((doc) => {
      const datObj = { ...doc.data(), id: doc.id };
      setPosts((prev) => [...prev, datObj as PostProps]);
    });
  };
  useEffect(() => {
    getPosts();
  }, []);

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("삭제하시겠습니까?");
    if (confirm && id) {
      await deleteDoc(doc(db, "posts", id));
      toast.success("게시글이 삭제됐습니다.");
      getPosts();
      navigate("/");
    }
  };

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
                <div className="post__content-box">
                  <div className="post__content-top">
                    <div className="post__title-list">{post?.title}</div>
                    <div className="post__title-summary">{post?.summary}</div>
                    <div className="post__date">{post?.createdAt}</div>
                  </div>
                  <div className="post__content-bottom"></div>
                </div>

                <div className="post__profile-box">
                  <div className="post__box-left">
                    <div className="post__profile"></div>
                    <div className="post__auth-name">{post?.email}</div>
                  </div>

                  {post?.email === user?.email && (
                    <div className="post__util-box">
                      <div
                        className="post__delete"
                        role="presentation"
                        onClick={() => {
                          handleDelete(post.id as string);
                        }}
                      >
                        삭제
                      </div>
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
