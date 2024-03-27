import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PostProps } from "./PostList";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { toast } from "react-toastify";
export default function PostDetail() {
  const params = useParams();
  const [post, setPost] = useState<PostProps | null>(null);
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirm = window.confirm("삭제하시겠습니까?");
    if (confirm && post && post.id) {
      await deleteDoc(doc(db, "posts", post.id));
      toast.success("게시글을 삭제했습니다.");
      navigate("/");
    }
  };

  const getPost = async (id: string) => {
    if (id) {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      setPost({ id: docSnap.id, ...(docSnap.data() as PostProps) });
    }
  };
  useEffect(() => {
    if (params?.id) {
      getPost(params?.id);
    }
  }, [params?.id]);
  return (
    <>
      {post ? (
        <div className="post__detail">
          <div className="post__box-detail">
            <div className="post__title">{post?.title}</div>
            <div className="post__detail-profile">
              <div className="post__profile"></div>
              <div className="post__auth-name">{post?.email}</div>
              <div className="post__date">{post?.createdAt}</div>
            </div>
            <div className="post__util-box">
              <div className="post__edit">
                <Link to={`/posts/edit/${post?.id}`}>수정</Link>
              </div>
              <div
                role="presetation"
                className="post__delete"
                onClick={handleDelete}
              >
                삭제
              </div>
            </div>
            <div className="post__text post__text--pre--wrap">
              {post?.content}
            </div>
          </div>
        </div>
      ) : (
        <div className="post__no-post">게시글이 없습니다.</div>
      )}
    </>
  );
}
