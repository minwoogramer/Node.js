const express = require('express')
const app = express();
//listen(서버띄울 포트번호, 띄운후 실행할코드)
//port가 뭐냐? 네트워크 통신을 위한 구멍이 있는데 8080구멍을통해 들어오는 사람들은 이렇게해주세요

app.listen(8080, function () {
  console.log('listening on 8080')
})
app.get('/pat', function (req, res) {
  res.send('펫용품 쇼핑할 수 있는 페이지입니다.')

});
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
});
app.get('/write', function (req, res) {
  res.sendFile(__dirname + '/write.html')
});
