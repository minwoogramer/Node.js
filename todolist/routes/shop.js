const router = require('express').Router
function loginHandler(req, res, next) {
  if (req.user) {//req.user가있는지만 검사해줌
    next() //있으면 통과시캬줌
  } else {
    res.send('로그인안하셨는데요?')//미들웨어만들었당
    //로그인 후 세션이 있으면 항상 req.user가 항상있음
  }
}
router.use('/shirts',loginHandler);//모든 라우터파일에 미들웨어를 적용하고싶으면
router.get('/shirts',function(req,res){///shop 생략가능
    res.send('셔츠 파는 페이지 입니다.');
  });
  router.get('/pants',function(req, res){
    res.send('바지 파는 페이지 입니다.')
  })

  module.exports = router;
  //moudule.exports=내보낼 변수명
  //requre('파일경로')/require('라이브러리명')
  //특정 라우터파일에 미들웨어를 적용하고 싶으면?
  //로그인한 사람만 방문가능하게 만들고싶으면? 중간에 함수넣으면 미들웨어 적용가능
  
  
  