import { Link } from "react-router-dom";


export default function SignupForm() {
  return (
    <>
      <div className="login-container"> {/* 로그인 컨테이너를 추가합니다. */}
        <form action="/post" method="POST" className="form login">
          <div className="header__logo login__logo">Yunhwan Blog</div>
          <h3 style={{color: "blue"}}>회원가입</h3>
          <div className="form__block">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="이메일 입력"
              required
            />
          </div>
          <div className="form__block">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="비밀번호 입력"
              required
            />
          </div>
          <div className="form__block">
            <label htmlFor="password">비밀번호 확인</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="비밀번호 입력"
              required
            />
          </div>
          <div className="form__block">
            아이디가 이미 있으신가요?{" "}
            <Link to={"/login"} className="form__link">
              로그인하기
            </Link>
          </div>
          <div className="form__block">
            <input
              type="submit"
              value="로그인"
              className="form__btn--submit"
            />
          </div>
        </form>
      </div>
    </>
  );
}
