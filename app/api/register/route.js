import {db} from '@/lib/db';
import bcrypt from 'bcrypt';

//api폴더 안의 문서는 함수로 작성
export async function POST(req) {
  //1. 변수선언
  const {username, password} = await req.json();

  //2. 프론트에서 넘겨받은 데이터 유효성검사
  if(!username || !password){
    return new Response(JSON.stringify({message:'필수 항목 누락'}),{
      status:400,
      headers:{'Content-Type':'application/json'},
    })
  }

  //서버(/api/register)에서 항상 JSON 응답을 반환하도록 설정해야 합니다.
  //Response 객체를 생성 시 반드시 JSON.stringify(...)와 'Content-Type': 'application/json' 헤더를 포함해야

    //3. 넘겨받은 데이터가 일치하는게 있는지 확인
    const [existing] = await db.query(
      'SELECT * FROM users WHERE username=?',[username]
    );

    if(existing.length>0){ //일치하는 데이터의 개수가 1개라도 있으면
      return new Response(JSON.stringify({message:'이미 사용중인 아이디입니다.'}),
    {
      status:409,
      headers:{'Content-Type':'application/json'},
    });
  }

  //4. 일치하는 데이터가 없다면 쿼리문으로 데이터 입력하여 회원정보를 추가한다.
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.query(
    'INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]
  );

  //5. http 응답 설정
  return new Response(
    JSON.stringify({message:'회원가입이 완료되었습니다.'}),
    {
      status:201,
      headers:{'Content-Type': 'application/json'},
    }
  );
}