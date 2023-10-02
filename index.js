const express = require('express')
const fileupload= require('express-fileupload');
const cloudinary = require('cloudinary').v2;

const app = express()

cloudinary.config({
  //cloud_name: process.env.CLOUD_NAME
  cloud_name: "dzc7jqmsx",
  api_key: "991586239998375",
  api_secret: "6eP6lYfakIRppufaI6wisccjJxI"
})
app.set("view engine", "ejs");

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));

app.get("/myget", (req, res)=>{
   console.log( req.body);
    res.send( req.body);
  });

app.post("/mypost",async (req, res)=>{
    console.log( req.body);
    console.log(req.files);

let result;
let imageArray = []

// case mulitiple images
if (req.files){
  for (let index = 0; index< req.files.samplefile.length; index++ ){
    let result = await
cloudinary.uploader.upload(req.files.samplefile[index].tempFilePath, {
  folder: "users"
})

imageArray.push({
  public_id: result.public_id,
  secure_url: result.secure_url
})
  
} 
}
// // usecase for single image
// let file= req.files.samplefile;
// result = await cloudinary.uploader.upload(file.tempFilePath,{
//   folder: 'users'
// });
console.log(result);
details = {
  fullname: req.body.fullname,
  price: req.body.price,
  result,
  imageArray
};
console.log(details);
     res.send(details);
   });
// just to render the form
app.get("/mygetform", (req, res)=>{
  res.render("getform");
});

app.get("/mypostform", (req, res)=>{
    res.render("postform");
  });

  
app.listen(4000, ()=>{
    console.log(`server is running at port no. 4000`);
})