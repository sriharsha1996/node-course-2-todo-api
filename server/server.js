
const express=require('express');
const bodyParser=require('body-parser');
const _ =require('lodash');

const    {ObjectID}=require('mongodb');
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


 app.get('/todos/:id',(req,res)=>{
     var id=req.params.id;

     if(!ObjectID.isValid(id)){
           return res.status(404).send();
     }

    Todo.findById(id).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        else{
            res.send(todo);
        }
    }).catch((e)=>{
        res.status(400).send();
    });
 });

 app.delete('/todos/:id',(req,res)=>{
      var id=req.params.id;
       if(!ObjectID.isValid(id)){
             return res.status(404).send();
       }
       Todo.findByIdAndRemove(id).then((todo)=>{
            if(!todo){
                return res.status(404).send();
            }
            else{
                res.send(todo);
            }
        }).catch((e)=>{
            res.status(400).send();
        });
 });
    
 app.patch('/todos/:id',(req,res)=>{
     console.log("body",req.body);
        var id=req.params.id;
        var body=_.pick(req.body,['text','completed']);
        if(!ObjectID.isValid(id)){
            console.log("error check")
            return res.status(404).send();
        }
    if(_.isBoolean(body.completed && body.completed)){
           body.completedAt=new Date().getTime();
    }
    else{
           body.completed=false;
           body.completedAt=null;
    }
       Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
                if(!todo){
                    return res.status(404).send();
                }
                res.send(todo);
       }).catch((err)=>{
              res.status(400).send()
       });

       
    
          
 });

module.exports={app}



app.listen(3000,()=>{
console.log('started on port 3000');
});