import Header from './header/page';
import Footer from './footer/page';
import Main from './main/page';
import './css/reset.css';
import './css/common.css';

export default function Home() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}
