import { Link } from "react-router-dom";

export default function PostDetail() {
  return (
    <>
      <div className="post__detail">
        <div className="post__box">
          <div className="post__title">안녕하세요 블로그입니다</div>
          <div className="post__profile-box">
            <div className="post__profile"></div>
            <div className="post__auth-name">조윤환</div>
            <div className="post__date">2023.02.29</div>
          </div>
          <div className="post__util-box">
            <div className="post__edit">
              <Link to={`/posts/edit/1`}>수정</Link>
            </div>
            <div className="post__delete">삭제</div>
          </div>
          <div className="post__text">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </div>
        </div>
      </div>
    </>
  );
}
