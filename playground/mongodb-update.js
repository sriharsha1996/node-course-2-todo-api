const {MongoClient,ObjectID}=require('mongodb');

  
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    if(err){
       return console.log('unable o connect to mongodb server');
    }
    console.log('connected to mongodb server');
    const db=client.db('TodoApp');
    db.collection('Todos').findOneAndUpdate({
         _id:new ObjectID('5b62d900d5562116d8331b74')
    },
    {
     $set:{
       completed:true,
       text:'eat lunch'
     }
    },
      {
          returnOriginal:false,
          
      
     }).then((result)=>{
            console.log(result);
     });
});