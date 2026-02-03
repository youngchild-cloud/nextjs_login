'use client'; //Next.js 13버전부터 App Router에서 도입된 'client Component'선언문
import Link from 'next/link';
import {useState} from 'react';
import {useRouter} from 'next/navigation'; //홈으로 클릭시 메인으로 돌아가기 위함

function RegisterPage(props) {
  //1. 상태변수 선언
  const [form, setForm] = useState({
    username:'',
    password:''
  });

  //홈으로 메뉴 클릭시 메인으로 돌아가기 위해 router설정
  const router = useRouter(); //next.js문법
  //const navigate = useNavigate(); //리액트 문법

  //2. 함수작성 - 아이디, 패스워드 입력값을 각각 키:값으로 저장함.
  const handleChange =(e)=>{
    setForm({
      ...form, [e.target.name]:e.target.value
    })
  }

  //3. 전송하기 - 사용자가 회원가입 버튼을 클릭시 호출되는 함수
  const handleSubmit = async (e)=>{
    e.preventDefault(); //새로고침 방지

    const res = await fetch('/api/register', { //API주소로 POST방식 요청을 함.
      method:'POST',
      headers:{
        'Content-Type' :'application/json'
      },
      body:JSON.stringify(form), //form객체를 json문자열로 변환하여 전송을 한다.
    });

    let data={};
    try{ //통신이 성공하면
      data = await res.json();
    }catch(e){ //실패하면
      data = {message:'서버 응답이 올바르지 않습니다.'};
    }

    if(res.ok){ //응답이 정상일 경우
      alert('회원가입이 완료되었습니다.'); //알림창 띄우기
      setForm({username:'', password:''}); //폼입력 초기화

      router.push('/'); //메인페이지로 이동하기
    }else{ //응답이 정상이 아닐 경우(실패일 경우)
      alert(data.message); //서버가 보낸 메세지를 출력한다.
    }
  }

  return (
    <section>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="username">아이디 : </label>
          <input type="text" id="username" name="username" placeholder='아이디' required onChange={handleChange} value={form.username} />
        </p>
        <p>
          <label htmlFor="password">패스워드</label>
          <input type="password" id="password" name="password" required onChange={handleChange} value={form.password} />
        </p>
        <p>
          <input type="submit" value="가입하기" />
          &#10072; &nbsp;
          <Link href='/'>홈으로</Link>&#10072; &nbsp;
          <Link href='/login'>로그인</Link>
        </p>
      </form>
    </section>
  );
}

export default RegisterPage;