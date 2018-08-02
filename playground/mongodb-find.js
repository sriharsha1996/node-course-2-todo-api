const {MongoClient,ObjectID}=require('mongodb');

  
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    if(err){
       return console.log('unable o connect to mongodb server');
    }
    console.log('connected to mongodb server');
    const db=client.db('Users');

    db.collection('Users').find({name:'harsha'}).toArray().then((docs)=>{
        console.log(JSON.stringify(docs,undefined,3))
        
    },(err)=>{
        console.log('unable to fetch todos',err);
    });
});