import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "firebaseApp";
import { toast } from "react-toastify";

export default function LoginForm() {
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("로그인이 성공했습니다.");
      navigate("/");
    } catch (error: any) {
      toast.error(error?.code);
      console.log(error);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === "email") {
      setEmail(value);
      const validRegex =
        /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
      if (!value?.match(validRegex)) {
        setError("이메일 형식이 옳바르지 않습니다.");
      } else {
        setError("");
      }
    }
    if (name === "password") {
      setPassword(value);
      if (value?.length < 8) {
        setError("비밀번호는 8자리 이상입니다. 확인해주세요");
      } else {
        setError("");
      }
    }
  };
  return (
    <>
      <div className="login-container">
        {" "}
        <form onSubmit={signIn} className="form login">
          <div className="header__logo login__logo">Yunhwan Blog</div>
          <h3 style={{ color: "blue" }}>로그인</h3>
          <div className="form__block">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="이메일 입력"
              required
              onChange={onChange}
              value={email}
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
              onChange={onChange}
              value={password}
            />
          </div>
          {error && error?.length > 0 && (
            <div className="form__block">
              <div className="form__error">{error}</div>
            </div>
          )}
          <div className="form__block">
            계정이 없으신가요?{" "}
            <Link to={"/signup"} className="form__link">
              회원가입하기
            </Link>
          </div>
          <div className="form__block">
            <input
              type="submit"
              value="로그인"
              className="form__btn--submit"
              disabled={error?.length > 0}
            />
          </div>
        </form>
      </div>
    </>
  );
}
