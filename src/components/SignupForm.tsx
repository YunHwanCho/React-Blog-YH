import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { app } from "firebaseApp";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

export default function SignupForm() {
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordconfirm, setPasswordConfirm] = useState<string>("");
  const navigate = useNavigate();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("회원가입이 성공했습니다.");
      navigate("/");
    } catch (error: any) {
      console.log(error);
      toast.error(error?.code);
    }
  };

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        setError("비밀번호는 8자리 이상으로 설정해주세요");
      } else if (passwordconfirm?.length > 8 && value !== passwordconfirm) {
        setError("비밀번호와 비밀번호 확인 값이 다릅니다. 다시 확인해주세요");
      } else {
        setError("");
      }
    }
    if (name === "passwordconfirm") {
      setPasswordConfirm(value);
      if (value?.length < 8) {
        setError("비밀번호와 비밀번호 확인 값이 다릅니다. 다시 확인해주세요");
      } else if (value !== password) {
        setError("비밀번호가 다릅니다.");
      } else {
        setError("");
      }
    }
  };

  return (
    <>
      <div className="login-container">
        {" "}
        <form onSubmit={onSubmit} className="form login">
          <div className="header__logo login__logo">Yunhwan Blog</div>
          <h3 style={{ color: "blue" }}>회원가입</h3>
          <div className="form__block">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="이메일 입력"
              required
              onChange={change}
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
              onChange={change}
            />
          </div>
          <div className="form__block">
            <label htmlFor="password">비밀번호 확인</label>
            <input
              type="password"
              name="passwordconfirm"
              id="passwordconfirm"
              placeholder="비밀번호 입력"
              required
              onChange={change}
            />
          </div>
          {error && error?.length > 0 && (
            <div className="form__block">
              <div className="form__error">{error}</div>
            </div>
          )}
          <div className="form__block">
            계정이 이미 있으신가요?{" "}
            <Link to={"/login"} className="form__link">
              로그인하기
            </Link>
          </div>
          <div className="form__block">
            <input
              type="submit"
              value="회원가입 "
              className="form__btn--submit"
              disabled={error?.length > 0}
            />
          </div>
        </form>
      </div>
    </>
  );
}
