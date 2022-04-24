const express = require('express');
const req = require('express/lib/request');
const app = express();
app.use(express.urlencoded({ extended: true }));
const MongoClient = require('mongodb').MongoClient;
const methodOverride = require('method-override')
app.use(methodOverride('_method'))
app.set('view engine', 'ejs');
app.use('/public', express.static('public'))
let db;
MongoClient.connect('mongodb://admin:qwer1234@cluster0-shard-00-00.mscja.mongodb.net:27017,cluster0-shard-00-01.mscja.mongodb.net:27017,cluster0-shard-00-02.mscja.mongodb.net:27017/todoapp?ssl=true&replicaSet=atlas-ezx6h2-shard-0&authSource=admin&retryWrites=true&w=majority', { useUnifiedTopology: true }, function (에러, client) {
  if (에러) return console.log(에러)
  db = client.db('todoapp');


  app.listen(8080, function () {
    console.log('listening on 8080')},
    

  
   
app.get('/', function (req, res) {
  res.render(__dirname + 'index.ejs')
}),
app.get('/write', function (req, res) {
  res.render(__dirname + 'write.ejs')
}),
app.get('/detail', function (req, res) {
  res.render(__dirname + 'index.ejs')
}),

//list 로 get요청으로 접속하면
//실제 db에 저장된 데이터들로 예브게 꾸며진 html을보여줌

app.get('/list', function (req, res) {
  //디비에 저장된 post라는 collection안의 모든 데이터를 꺼내주세요.
  db.collection('post').find().toArray(function (err, res) {
    console.log(result);
    res.render('list.ejs', { posts: result });
  });
}),
app.get('/search', function (req, res) {
  new Date()
  //디비에 저장된 post라는 collection안의 모든 데이터를 꺼내주세요.
  console.log(req.query.value)
  let 검색조건 =[
    
      {
        $search: {
          index: 'titleSearch',
          text: {
            query: 요청.query.value,
            path:'제목'  // 제목날짜 둘다 찾고 싶으면 ['제목', '날짜']
          }//검색요청하는 부분임
        }
      },
    { $sort : {_id :1}},//결과 정렬하기
    {$limit :10},//갯수 limit 주기
    {$project : { 제목 :1, _id : 0, score: {$meta:"searchScore"}}} // search score 얼마나관련있는지 점수임 이런것도알려줌 제목 : 1 제목은 가져오셈 id => id 빼고가져오셈

  ]
  db.collection('post').aggregate(검색조건).toArray(function (err, res) { //aggregate 는 검색조건을 여러개 넣어줄수있음
    console.log(result)// 이런식으로 하면 or식으로 찾아줌 개꿀; -쓰면 제외가능 "어쩌구 저쩌구"정확히 일치하는것만 가능 text index의 문제점=>한글친화적이지않음 해결책 첫번째 1.text index 쓰지말고 검색할 문서의양을 제한해주십쇼 랭킹이나 날짜로 제한도 가능 2.text index 만들때 다르게 만들기 띄어쓰기 단위로 indexing 금지 글자 두개 단위로 indexing해봐라 (nGram)3.방금만든 index 만드셈 search index 쓰셈 한국어 친화적으로 만들수있음 index Name 잘지으셈 titelSearch라고만들어보셈 어떤 collection에서 설정해주셈 index Analyzer 루씬머시기말고 다른걸로 바꾸셈 랭귀지를 코리안으로 바꾸셈 루씬.korean 한국어 형태소 분석기임 한국어에서 필요없는 조사들을 걸러서 을,를 같은거 쓸데없는 조사를 제거해줌 검색정확도 상승 =>add Field 해주셈
    res.render('search.ejs', { posts: result });//정확히 일치하는것만 찾아주는거 해결하는거 해결할려면 1.정규식쓰셈 근데 이거 임시방편임 문제점은 게시물이 겁나많아지면 문제가됌 왜냐하면 게시물이 많아지면 찾는시간이 오래걸림
    //find()로하지말고 indexing이라고하면 게시물 1억개라도 찾기가 빨라짐 그중에 하나의 게시물이 찾고싶을때 db야 id가 70인게시물찾아와 컴퓨터는 바보라서 하나씩 찾아봄;; 무슨하나 찾는데하루종일걸리노
    //1부터 100까지 하나 생각할테니까 하나 맞춰보셈 예 ,아니오로만답변가능 바보는 1인가요?라고물어봄 2인가요? 이렇게물어볼듯 똑똑한사람들은 니가 지금 생각하고있는게 50이상이냐? 75이상이냐? 계속 반을 짤라가면서 물어봅니다 그러면 개빨라짐 ㅇㅇ
    //효율적임 이게바로 Binary Search 라고합니다.
    //전제 조건이 하나있음 숫자순으로 미리 정렬이 되있어야댐
    //제목들을 미리 정렬해주면 (indexing) 몽고디비는 알아서 Binary search 해줌
    //index 생성방법 Collections ->indexes 들어가셈 ->create index ->field(제목) : "text(type)" 숫자순으로하고 싶으면 "_id" : 1 ,or -1 동시 에러개하고싶으면 여러개 만들면댐
    //만드는 이유가뭐냐 검색을 빨리 하고싶으면 만들어야되는거임 미리만들어놓으셈
    //문자자료를 index할때는 한꺼번에 다해야댐 MongoDB 문자자료는 index할때 한꺼번에 해놔야댐
    //db조작은 원래 터미널로함
  });
}))
  
  //db에서 자료 찾아주세요.
  //찾은걸 ejs파일에 집어넣어주세요.
  

  

  app.get('/detail/:id', function (req, res) {
    db.collection('post').findOne({ _id: parseInt(req.params.id) }, function (err, result) {
      console.log(result)
      res.render('detail.ejs', { data: result })
    })

  })
  app.get('/edit/:id', function (req, res) {
    db.collection('post').findOne({ _id: parseInt(req.params.id) }, function (err, result) {

    })
    res.render('edit.ejs', { post: result })
  })


const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-sessions');


app.use(session({ secret: '비밀코드', resave: true, saveUninitialized: false }));
app.use(passport.initialize());//전역 미들웨어
app.use(passport.session());

app.get('/login', function (req, res) {
  res.render('login.ejs')
})

app.post('/login', passport.authenticate('local', {
  failureRedirect: '/fail'
}), function (req, res) {
  res.redirect('/')
})
app.get('/mypage', loginHandler, function (req, res) {
  req.user
  res.render('mypage.ejs',{사용자 : req.user
  });
})
function loginHandler(req, res, next) {
  if (req.user) {//req.user가있는지만 검사해줌
    next() //있으면 통과시캬줌
  } else {
    res.send('로그인안하셨는데요?')//미들웨어만들었당
    //로그인 후 세션이 있으면 항상 req.user가 항상있음
  }
}

passport.use(new LocalStrategy({
  usernameField: 'id',
  passwordField: 'pw',
  session: true,
  passReqToCallback: false,
}, function (입력한아이디, 입력한비번, done) {
  //console.log(입력한아이디, 입력한비번);
  db.collection('login').findOne({ id: 입력한아이디 }, function (에러, 결과) {
    if (에러) return done(에러)

    if (!결과) return done(null, false, { message: '존재하지않는 아이디요' })
    if (입력한비번 == 결과.pw) {
      return done(null, 결과)
    } else {
      return done(null, false, { message: '비번틀렸어요' })
    }
  })
}));
passport.serializeUser(function (user, done) {
  done(null, user.id)
})
passport.deserializeUser(function (아이디, done) {
  db.collection('login').findOne({ id: 아이디 }, function (에러, 결과) {
    done(null, 결과)
  })
  //로그인한 유저의 개인정보를 db에서 찾는역할
})
//회원기능이 필요하면 passport 셋팅하는 부분이  위로 있어야함
app.post('/register', function(req,res){
  if(!req.body.id){
  db.collection('login').insertOne({ id : req.body.id, pw: req.body.pw}, function(err, result){
    res.redirect('/')//아이디 중복검사는 하고 저장해야될듯
  })}else{
    res.send({message:'이미 있는 아이디입니다'})
  }
  //저장전에 id가 이미 있는지 먼저 찾아봐야
  //id에 알파벳 숫자만 잘들어있나
  //비번 저장전에 암호화를 했냐
})
app.post('/add', function (req, res) {
  res.user.id//현재로그인한 사람의 정보가 들어있음
  res.send('전송완료');
  console.log('전송완료');
  db.collection('counter').findOne({ name: '게시물갯수' }, function (err, result) {
    console.log(result.totalPost)
    let totalPosting = result.totalPost
    let 저장할꺼 ={_id: totalPosting + 1,
      작성자 :req.user._id,
      제목: req.body.title,
       날짜: req.body.date,
      }
    db.collection('post').insertOne({
      저장할꺼
       }, function (err, result) {
      console.log('저장완료');
      db.collection('counter').updateOne({ name: '게시물갯수' }, { $inc: { totalPost: 1 } }, function (err, result) {
        if (err) { return console.log(err) }
      })

    });
  })
  let 삭제할데이터 = { _id : req.body._id, 작성자 : req.user._id}

  app.delete('/delete', function (req, res) {
    console.log(req.body)
    req.body._id = parseInt(req.body._id);
    db.collection('post').deleteOne(삭제할데이터, function (err, result) {
      console.log('삭제완료')
      if(err){console.log(err)}
      res.status(200).send({ message: '성공했습니다' });
    })
  })

})
});
app.use('/shop', require('./routes/shop'));//미들웨어 쓰고싶을때 쓰는 app.use() 요청과 응답 사이에 실행되는 코드
app.use('/board/sub', require('./routes/board.js'))
//전역 미들웨어

//그냥 미들웨어

app.get('/upload', function(req, res){
  res.render('upload.ejs')

})//보통 작업폴더안에 저장시킴
//이미지는 일반하드에 저장하는게 싸고편함
const multer = require('multer')
let storage = multer.diskStorage({
  destination : function(req, file, cb){
    cb(null, './public/image')
  },
  filename : function(req, file, cb){
    cb(null, file.originalname)
  },
  filefilter : function(req, file, cb){
    let ext = path.extname(file.originalname);
    if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
        return callback(new Error('PNG, JPG만 업로드하세요'))
    }
    callback(null, true)
  },limits:{
    fileSize: 1024 * 1024
}
  /*filename : function(req, file, cb){
    cb(null, file.originalname + '날짜' + new Date())
  }*/
})
let upload = multer({storage : storage})

app.post('/upload', upload.array('프로필',10), function(req, res){
  res.send('업로드완료')
});
//:기호 붙이면 url 파라미터 문법
app.get('/image/:imageName',function(req,res){
  res.sendFile(__dirname + 'public/image/' + req.params.imageName)
})


// 이미지 하드에저장하기 memoryStorage ->램에다 저장해주세요

