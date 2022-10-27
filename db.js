const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect("mongodb+srv://admin1:Qq7z15qYO3ZVinEl@cluster0.48ovdxw.mongodb.net/?retryWrites=true&w=majority", {
   useNewUrlParser: true,
   useUnifiedTopology: true
});

const contactSchema = {
   email: String,
   query: String,
};


const Contact = mongoose.model("Contact", contactSchema);

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + 'views/index'));


app.get("/", function(req, res){
    res.render("index");
});
  
app.post("/contact", function (req, res) {
    console.log(req.body.email);
  const contact = new Contact({
      email: req.body.email,
      query: req.body.query,
  });
  contact.save(function (err) {
      if (err) {
          throw err;
      } else {
        res.render("index");
      }
  });
});
  
app.listen(3000, function(){
    console.log("App is running on Port 3000");
});

/*
//Testing Database Connection
.then( () => { console.log("Connected to mongodb database successfully…!")
})

.catch( (err) => { console.error(`${err}`);

})

app.post("/contact", function (req, res) {
   const contact = new Contact({
       email: req.body.email,
       query: req.body.query,
   });
   contact.save(function (err) {
       if (err) {
           res.redirect("/error");
       } else {
           res.redirect("/thank-you");
       }
   });
});
*/