'use client';
import Link from 'next/link';
import { useState } from 'react';


function Loginpage() {

  //1. 상태변수 선언
  const [form, setform] = useState({
    username: '',
    password: '',
  })

  //2. 아이디, 패스워드 입력시 데이터 담기
  const handleChange=(e) => {
    setform({
      ...form, [e.target.name]: e.target.value
    })
  }

  //3. 로그인버튼 클릭시 입력된 정보 서버에 전송하기
  const handleSubmit= async(e)=>{
    e.preventDefault();
    const res = await fetch('/api/login', {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(form),
    });

    const data = await res.json();
    if(res.ok){
      alert('로그인 성공!');
      //토큰저장
      localStorage.setItem('token', data.token); //토큰저장

      //로그인성공 후 메인페이지로 이동
      window.location.href="/";
    }else{
      alert(data.message||'로그인 실패');
    }
  };


  return (
    <section>
      <h2>로그인 폼</h2>
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="username">아이디 : </label>
          <input type="text" id="username" name="username" onChange={handleChange} placeholder='아이디' required />
        </p>
        <p>
          <label htmlFor="password">패스워드 : </label>
          <input type="password" id="password" name="password" onChange={handleChange} placeholder='패스워드' required />
        </p>

        <p>
          <input type="submit" value="로그인" />
        </p>

        <Link href="/idsearch">아이디 찾기</Link> &#10072; &nbsp;
        <Link href="/pwsearch">비번찾기 찾기</Link> &#10072; &nbsp;
        <Link href="/register">회원가입</Link>
      </form>
    </section>
  );
}

export default Loginpage;