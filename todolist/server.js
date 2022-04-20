const express = require('express')
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
    console.log('listening on 8080')

    app.post('/add', function (req, res) {
      res.send('전송완료');
      console.log('전송완료');
      db.collection('counter').findOne({ name: '게시물갯수' }, function (err, result) {
        console.log(result.totalPost)
        let totalPosting = result.totalPost

        db.collection('post').insertOne({ _id: totalPosting + 1, 제목: req.body.title, 날짜: req.body.date }, function (err, result) {
          console.log('저장완료');
          db.collection('counter').updateOne({ name: '게시물갯수' }, { $inc: { totalPost: 1 } }, function (err, result) {
            if (err) { return console.log(err) }
          })

        });
      })

    })
  });
});

app.get('/', function (req, res) {
  res.render(__dirname + 'index.ejs')
})
app.get('/write', function (req, res) {
  res.render(__dirname + 'write.ejs')
})
app.get('/detail', function (req, res) {
  res.render(__dirname + 'index.ejs')
})

//list 로 get요청으로 접속하면
//실제 db에 저장된 데이터들로 예브게 꾸며진 html을보여줌

app.get('/list', function (req, res) {
  //디비에 저장된 post라는 collection안의 모든 데이터를 꺼내주세요.
  db.collection('post').find().toArray(function (err, res) {
    console.log(result);
    res.render('list.ejs', { posts: result });
  });
  //db에서 자료 찾아주세요.
  //찾은걸 ejs파일에 집어넣어주세요.
  app.delete('/delete', function (req, res) {
    console.log(req.body)
    req.body._id = parseInt(req.body._id);
    db.collection('post').deleteOne(req.body, function (err, result) {
      console.log('삭제완료')
      res.status(200).send({ message: '성공했습니다' });
    })
  })



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
});

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const sessions = require('express-sessions');


app.use(session({ secret: '비밀코드', resave: true, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/login', function (req, res) {
  res.render('login.ejs')
})

app.post('/login', passport.authenticate('local', {
  failureRedirect: '/fail'
}), function (req, res) {
  res.redirect('/')
})

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