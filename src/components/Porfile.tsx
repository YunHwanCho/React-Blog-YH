import { Link, useNavigate } from "react-router-dom";
import PostList from "./PostList";
import { getAuth, signOut } from "firebase/auth";
import { app } from "firebaseApp";
import { toast } from "react-toastify";
import { useContext } from "react";
import AuthContext from "context/AuthContext";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const onSignOut = async () => {
    try {
      const auth = getAuth(app);
      signOut(auth);
      toast.success("로그아웃 됐습니다.");
      navigate("/");
    } catch (error: any) {
      console.log(error);
      toast.error(error?.code);
    }
  };

  return (
    <>
      <div className="profile__box">
        <div className="flex__box-lg">
          <div className="profile__image" />
          <div>
            <div className="profile__email">{user?.email}</div>
            <div className="profile__name">
              {user?.displayName || "에드워드"}
            </div>
          </div>
        </div>
        <div
          role="presentation"
          className="profile__logout"
          onClick={onSignOut}
        >
          logout
        </div>
      </div>
      <PostList hasNavigation={false} />
    </>
  );
}
