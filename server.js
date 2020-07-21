const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const app = express();
const Post = require("./models/Post");
const User = require("./models/User");
const Comment = require("./models/Comment");
const Reply = require("./models/Reply");
/*
const File = require("./models/File");
var multer = require('multer')
var cors = require('cors');
var fs = require('fs');
*/

//chunks
/*const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const path = require('path');
 */
//const router = express.Router();

/*chunks
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
*/

/*
app.use(cors());
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

var upload = multer({ storage: storage }).single('file');
*/


//chunks
/*
const mongoURI = db;
 
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = file.originalname;
      const fileInfo = {
        filename: filename,
        bucketName: 'uploads'
      };
      resolve(fileInfo);
    });
  }
});
 
const conn = mongoose.createConnection(mongoURI);
 
// Init gfs
let gfs;
 
conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});
 
 
var upload = multer({ storage: storage });
//.single('file');
 
app.post('/upload', upload.single('file'), (req, res) => {
  res.redirect('/');
});
 
//end of chunk
 
 
//attempt to upload post (with title, country, body, and uploads)
/*app.post("/api/posts", upload.single('file'), (req, res) => {
 
  Post.create({
    //_id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    country: req.body.country,
    body: req.body.body,
    upload: req.file.path
  })
    .then(result => {
      console.log(result);
      res.json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
*/

//uploading files to the destination 'uploads'
/*
app.post('/api/uploadFiles', function (req, res) {

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }
    return res.status(200).send(req.file)

  });

});
*/


/*
router.post('/api/posts', upload.single('file'), (req, res, next) => {
  const reqFiles = "";
  const url = req.protocol + '://' + req.get('host')
  reqFiles.push(url + '/public/' + req.file.filename)
 
  const post = new Post({
    title: req.post.title,
    country: req.post.country,
    body: req.post.body,
    upload: reqFiles
  });
 
  user.save().then(result => {
    res.status(201).json({
      message: "Done upload!",
      userCreated: {
        title: result.title,
        country: result.country,
        body: result.body,
        upload: reqFiles
      }
    })
  }).catch(err => {
    console.log(err),
      res.status(500).json({
        error: err
      });
  })
})
*/


// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());
// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect(
    db,
    //'mongodb://localhost:27017/stats1',
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);

//posting posts to database
app.post('/api/posts', function (req, res) {
  Post.create({
    title: req.body.title,
    country: req.body.country,
    category: req.body.category,
    location: req.body.location,
    budget: req.body.budget,
    review: req.body.review,
    type: req.body.type,
    likes: 0
  }).then(post => {
    res.json(post)
  });
});

app.get('/api/posts', function (req, res) {
  Post.find({}).then(eachOne => {
    res.json(eachOne)
  });
});

app.get('/api/posts/ExperiencePosts', function (req, res) {
  Post.find({}).then(eachOne => {
    res.json(eachOne)
  });
});

app.get('/api/posts/PlacePosts', function (req, res) {
  Post.find({}).then(eachOne => {
    res.json(eachOne)
  });
});

app.get('/api/posts/:postId', function (req, res) {
  Post.findById(req.params.postId).then(post => {
    if (!post) { return res.status(404).end(); }
    return res.status(200).json(post);
    //res.json(post)
  }).catch(err => next(err));
});

app.post('/api/comments/:postId', function (req, res) {
  Comment.create({
    comment: req.body.text,
    user: req.body.user.user.name,
    id: req.params.postId
  }).then(comment => {
    res.json(comment)
  });
});

app.post('/api/like/:postId', function (req, res) {
  Post.findByIdAndUpdate(req.params.postId, { likes: req.body.likes + 1 },
    function (err) {
      if (err) {
        res.send(err);
        return;
      }
      res.send({ data: "Record has been Updated..!!" });
    }

  );

});

app.post('/api/userLike/:postId', function (req, res) {
  User.findByIdAndUpdate(req.body.id,
    {
      $push:
        { liked: req.params.postId }
    },
    function (err) {
      if (err) {
        res.send(err);
        return;
      }
      res.send({ data: "Record has been Updated..!!" });
    }
  )

});

app.post('/api/userUnlike/:postId', function (req, res) {
  User.findByIdAndUpdate(req.body.id,
    { $pull: { liked: req.params.postId } },
    function (err) {
      if (err) {
        res.send(err);
        return;
      }
      res.send({ data: "Record has been Updated..!!" });
    })

});

app.get('/api/userLike/:userId', function (req, res) {
  User.findById(req.params.userId).then(post => {
    if (!post) { return res.status(404).end(); }
    return res.status(200).json(post.liked);
  }).catch(err => next(err));
});

/*
app.get('/api/userLiked/:postId', function (req, res) {
  User.findById(req.body.id).then(post => {
    if (!post) { return res.status(404).end(); }
    if (post.liked === req.params.postId) {
      return res.status(200).json(true);
    } else {
      return res.status(200).json(false);
    }
  }).catch(err => next(err));
});
*/

app.post('/api/unlike/:postId', function (req, res) {
  Post.findByIdAndUpdate(req.params.postId, { likes: req.body.likes <= 0 ? 0 : req.body.likes - 1 },
    function (err) {
      if (err) {
        res.send(err);
        return;
      }
      res.send({ data: "Record has been Updated..!!" });
    });
})

app.get('/api/comments/:postId', function (req, res) {
  Comment.find({ id: req.params.postId }).then(eachOne => {
    res.json(eachOne)
  });
});

app.get('/api/comment/:commentId', function (req, res) {
  Comment.findById(req.params.commentId).then(comment => {
    if (!comment) { return res.status(404).end(); }
    return res.status(200).json(comment);
  }).catch(err => next(err));
});

app.post('/api/replies/:commentId', function (req, res) {
  Reply.create({
    reply: req.body.text,
    user: req.body.user.user.name,
    id: req.params.commentId
  }).then(reply => {
    res.json(reply)
  });
});

app.get('/api/replies/:commentId', function (req, res) {
  Reply.find({ id: req.params.commentId }).then(eachOne => {
    res.json(eachOne)
  });
});

/**
 * Production Build
 */
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, './client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './', 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));