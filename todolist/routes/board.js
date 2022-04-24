const router = require('express').Router


router.get('/sports', function(req,res){///shop 생략가능
    res.send('셔츠 파는 페이지 입니다.');
  });
  router.get('/game', function(req, res){
    res.send('바지 파는 페이지 입니다.')
  })

  module.exports = router;
  //moudule.exports=내보낼 변수명
  //requre('파일경로')/require('라이브러리명')
  