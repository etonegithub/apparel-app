const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//Mongo connection
mongoose.connect('mongodb+srv://admin:LJVRsz0lCEuzWymQ@apparel-app.qaodr.mongodb.net/data?retryWrites=true&w=majority', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);


let mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error'));
mdb.once('open', callback => {});

//Schema for clothing
let clothesSchema = mongoose.Schema({
    itemId: String,
    type: String,
    color: String,
    dateAdded: String,
    imgData: String,
    username: String
  });

let Clothing = mongoose.model('Clothing', clothesSchema);


//set clothing with the username of user
exports.createClothing = (req, res) => {
    let clothing = new Clothing({
        itemId: req.body.itemId,
        type: req.body.type,
        color: req.body.color,
        dateAdded: req.body.dateAdded,
        imgData: req.body.imgData,
        username: req.body.username
      });
      clothing.save((err) => {
        if (err) return console.error(err);
        console.log(req.body.type + ' added');
      });
  }
  
  //user Account schema
  let accountSchema = mongoose.Schema({
    username: String,
    password: String,
  });

  
let Account = mongoose.model('Account_Collection', accountSchema);

  
exports.createAccount = (req, res) => {
  //set account to user input
    let account = new Account({
      username: req.body.userName,
      password: req.body.passWord,
    });
    //save and redirect to signin
    account.save((err) => {
      if (err) return console.error(err);
      console.log(req.body.userName + ' added');
    });
    res.redirect('../pages/signin.html');
  }

  //API get of clothing with userName
exports.getClothing = (req, res) => {
  Clothing.find({ username: req.params.userName}, (err, clothing) => {
    if (err) return console.error(err);
    console.log(req.params.username);

    res.json(clothing);
})
}

  
