import { db } from '@/lib/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(req) {

  //1. 프론트에서 전달받은 데이터 저장(아이디, 패스워드)
  const { username, password } = await req.json();
  const SECRET_KEY = 'test';

  //2. db에 기존 가입자가 있는지 조회
  const [users] = await db.query('SELECT * FROM users WHERE username=?', [username]);

  //3. 같은 아이디가 존재하지 않는다면 메세지 띄우기
  if (users.length === 0) {
    return new Response(JSON.stringify
      ({ message: '존재하는 아이디가 없습니다.' }),
      { status: 404 });
  }

  //4. 일치하는 사용자가 있으면
  const user = users[0];

  //5. 패스워드가 일치하는지 검사
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {//패스워드가 일치하지 않으면
    return new Response(JSON.stringify({ message: '비밀번호가 일치하지 않습니다. 다시 확인하세요.' }), {
      status: 401
    });
  }

  //6. 아이디, 패스워드가 맞으면 토큰생성하기
  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

  return new Response(JSON.stringify({ token }), { status: 200 });
}
