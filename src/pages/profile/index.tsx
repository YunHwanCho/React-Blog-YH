import Header from "../../components/Header";
import Profile from "../../components/Porfile";
import PostList from "../../components/PostList";
import Footer from "../../components/footer";

export default function ProfilePage() {
  return (
    <>
      <Header />
      <Profile />
      <PostList hasNavigation={false} defaultTab="my" />
      {/* profile오류 발생 */}
      <Footer />
    </>
  );
}
