import mysql from 'mysql2/promise';

//db연결정보
export const db = mysql.createPool({
  host:process.env.svc.sel3.cloudtype.app,
  port:Number(process.env.31404),
  user:process.env.root,
  password:process.env.1234,
  database:process.env.kdt,
  waitForConnections:true, //연결 개수가 풀일 때 기다리게해야...
  connectionLimit:10, //db연결 최대 수
  queueLimit:0, //대기 요청수 '0'이면 무제한
});
