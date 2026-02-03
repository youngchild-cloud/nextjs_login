'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

function Header(props) {

  //1. 상태변수 선언
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //2. 페이지 로딩시 토큰값을 한번만 불러온다.
  useEffect(() => {
    //토큰이 있으면 로그인 상태로 간주한다.
    const token = localStorage.getItem('token');
    //상태함수에 token값을 넣어서 true,false
    //!! == 삼항조건연산자
    setIsLoggedIn(!!token);
  }, []);

  return (
    <header>
      <h1>상단로고</h1>
      <nav>
        {isLoggedIn ? (
          <>
            <Link href='../logout'>로그아웃</Link>
          </>
        ) : (
          <>
            <Link href='../login'>로그인</Link> &nbsp; &#10072; &nbsp;
            <Link href='../register'>회원가입</Link>
          </>
        )}

      </nav>
    </header>
  );
}

export default Header;