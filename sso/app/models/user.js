var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');


var userSchema = new mongoose.Schema({
    username:{type:String,lowercase:true,required:true,unique:true},
    password:{type:String,required:true},
    email:{type:String,required:true,lowercase:true,unique:true},
});

userSchema.pre('save', function(next) {
    var self=this;
    bcrypt.hash(self.password, null, null, function(err, hash) {
        if (err) return next();
    self.password=hash;
    next();
    });
  });

userSchema.methods.comparePassword = function(password){
    var temp=bcrypt.compareSync(password,this.password);
    return bcrypt.compareSync(password,this.password);

};

module.exports = mongoose.model('User',userSchema);

