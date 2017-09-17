var mongoose = require('mongoose');

var clientSchema = new mongoose.Schema({
    clientId : {type:String,required:true,lowercase:true,unique:true},
    callback : {type:String,required:true,lowercase:true,unique:true}
});

module.exports = mongoose.model('Client',clientSchema);