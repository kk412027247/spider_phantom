const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const uri = 'mongodb://localhost:27017/mongoose_test';
mongoose.connect(uri, {useMongoClient: true});

const MyModel = mongoose.model('Test',new mongoose.Schema({name:String, age:Number}));

//then()后面就是接callback function的位置，如果用 async await 的方式的话，就是可以实现顺序操作了。

// MyModel.create({name:'val', age:2}).then(console.log);
//
// MyModel.find({name:'val'},{name:1}).then(console.log);
// MyModel.find({name:'val'}).then(console.log);



//MyModel.update({_id: '5a007da7539883089031a5d3'},{name:'ttt',age:123}).then(console.log);


MyModel.remove({_id: '5a007e6b398a8d153cd1c797'}).then(result=>console.log(result.result));
