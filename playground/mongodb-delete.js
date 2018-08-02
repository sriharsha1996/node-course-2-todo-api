const {MongoClient,ObjectID}=require('mongodb');

  
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    if(err){
       return console.log('unable o connect to mongodb server');
    }
    //console.log('connected to mongodb server');
    //console.log('client',client);
     const db=client.db('Users');
    //  db.collection('Users').deleteMany({name:'harsha'})
    
    //  db.collection('Todos').deleteOne({text:'eat lunch'}).then((result)=>{
    //     console.log(result);
    // });
     db.collection('Users').findOneAndDelete({
        _id:new ObjectID('5b6183ee4744d125bc9f75a2')
     }).then((result)=>{
             console.log(result);
      });
});
