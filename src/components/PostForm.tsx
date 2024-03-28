import { useContext, useEffect, useState } from "react";
import { collection, addDoc, getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { PostProps } from "./PostList";
export default function PostForm() {
  const [title, setTitle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const params = useParams();
  const [post, setPost] = useState<PostProps | null>(null);

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

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = e;
    if (name === "title") {
      setTitle(value);
    }
    if (name === "summary") {
      setSummary(value);
    }
    if (name === "content") {
      setContent(value);
    }
  };
  useEffect(() => {
    if (post) {
      setTitle(post?.title);
      setContent(post?.content);
      setSummary(post.summary);
    }
  }, [post]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (post && post.id) {
        const postRef = doc(db, "posts", post.id);
        await updateDoc(postRef, {
          title: title,
          summary: summary,
          content: content,
          updateAt: new Date()?.toLocaleDateString("ko", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
        });
        toast?.success("게시글을 수정했습니다.");
        navigate(`/posts/${post.id}`);
      } else {
        await addDoc(collection(db, "posts"), {
          title: title,
          summary: summary,
          content: content,
          createdAt: new Date()?.toLocaleDateString("ko", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          email: user?.email,
          uid: user?.uid,
        });
        toast?.success("게시글을 생성했습니다.");
        navigate("/");
      }
    } catch (e: any) {
      toast?.error(e?.code);
    }
  };

  return (
    <form onSubmit={onSubmit} className="form">
      <div className="form__block">
        <label htmlFor="title">제목</label>
        <input
          type="text"
          name="title"
          id="title"
          required
          onChange={onChange}
          value={title}
        ></input>
      </div>
      <div className="form__block">
        <label htmlFor="summary">요약</label>
        <input
          type="text"
          name="summary"
          id="summary"
          required
          onChange={onChange}
          value={summary}
        ></input>
      </div>
      <div className="form__block">
        <label htmlFor="content">내용</label>
        <textarea
          name="content"
          id="content"
          required
          onChange={onChange}
          value={content}
        ></textarea>
      </div>
      <div className="form__block">
        <input type="submit" value="제출" className="form__btn--submit"></input>
      </div>
    </form>
  );
}
