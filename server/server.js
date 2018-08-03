var express=require('express');
var bodyParser=require('body-parser');
var {mongoose}=require('./db/mongoose');

var {Todo}=require('./models/todo');
var {User}=require('./models/user');

var app=express();

app.use(bodyParser.json())
app.post('/todos',(req,res)=>{
   var todo=new Todo({
      text:req.body.text
   });

   
   todo.save().then((doc)=>{
         res.send(doc);
   },(e)=>{
        res.status(400).send(e);
   });
}); 

 app.get('/todos',(req,res)=>{
Todo.find().then((todo)=>{
           res.send(todo);
},(err)=>{
        res.status(400).send(err);
});
 });
module.exports={app}


app.listen(3000,()=>{
console.log('started on port 3000');
});