import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));


var posts = [];

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  //Step 1 - Make the get route work and render the index.ejs file.
  res.render("index.ejs");
});

app.get("/submit", (req, res) => {
  //Step 1 - Make the get route work and render the index.ejs file.
  res.render("index.ejs", {
    posts: posts,

  });
});

app.post("/submit", (req, res) => {
  const titleVar = req.body["title"];
  const contentVar = req.body["content"];
  const colours = ["red","yellow","pink","green","orange","blue","purple"] //colours of the day
  posts.push({ title: titleVar, content: contentVar, date: new Date().toLocaleDateString(), index: 0, color: colours[new Date().getDay()] });
  for (let i = 0; i < posts.length; i++) {
    posts[i].index = i + 1;
  }
  //Step 2 - Make the generate name functionality work
  //Hint: When the "Generate Name" button in index.ejs is clicked, it should hit up this route.
  //Then:
  //1. You should randomly pick an adjective from the const "adj" and a noun from const "noun",
  //scroll down to see the two arrays.
  //2. Send the index.ejs as a response and add the adjective and noun to the res.render
  //3. Test to make sure that the random words display in the h1 element in index.ejs
  // const randomAdj = adj[Math.floor(Math.random() * adj.length)];
  // const randomNoun = noun[Math.floor(Math.random() * noun.length)];
  res.render("index.ejs", {
    posts: posts,
    // title: titleVar,
    // content: contentVar,
    // randomAdj: randomAdj,
    // randomNoun: randomNoun,
  });
});

app.post("/delete", (req, res) => {
  const index = req.body["index"];
  console.log("index is ", index);
  posts = posts.filter((post) => post.index != index);
  for (let i = 0; i < posts.length; i++) {
    posts[i].index = i + 1;
  }
  res.render("index.ejs", {
    posts: posts,
  });
});

app.post("/view", (req, res) => {
  const index = req.body["index"];
  console.log("index is ", index);
  res.render("view.ejs", {
    posts: posts,
    index: index, 
  });

});
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


