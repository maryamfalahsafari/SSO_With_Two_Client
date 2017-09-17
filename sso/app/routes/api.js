var user = require('../models/user');
var client = require('../models/client');
var jwt = require('jsonwebtoken');
var secret = 'harrypotter';

module.exports = function(app,router,passport){

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, authorization");
        next();
    });

    router.post('/users',function(req,res){
        var _user=new user();
        _user.username=req.body.username;
        _user.email=req.body.email;
        _user.password=req.body.password;
        _user.save(function(err){
            if (err){
                res.json({ success:false, message:'Could not create user'});
            }else{
                res.json({success : true , message : 'User created' });
            }
        });
    });
    router.post('/authenticate',function(req,res){
        console.log('header',req.headers['content-type']);
        console.log('body',req.body);
        var self = user;
        user.findOne({username : req.body.username}).select('username email password').exec(function(err,user){
          if (err) throw err;
          
          if (!user){
              res.json({ success:false, message:'Could not authenticate user'});
          } else if (user){
              var validPassword = user.comparePassword(req.body.password);
              if(!validPassword){
                  res.json({success:false , message : 'Could not authenticate password'});
              }else{
                  var token = jwt.sign({username:user.username, email : user.email}, secret , { expiresIn: '24h' });
                  self.update({username : req.body.username},{$set : { token : token }}).exec();
                  res.json({success : true , message : 'User authenticated' , token : token});
              }

          }
      });
    });
    router.post('/test',function(req,res){
        res.json(req.body);
        
    });
    router.get('/get-data',passport.authenticate('jwt', { session: false }),function(req,res){
        res.send({secure_data:'Hello World'});
    })
    router.post('/me',passport.authenticate('jwt', { session: false }),function(req,res){
        var token = req.headers['authorization'].replace('Bearer ','').replace('bearer ','');
        if (token){
            jwt.verify(token,secret,function(err,decoded){
                if (err){
                    res.json({success : false , message : 'Invalid token'});
                }else{
                    res.send(decoded);
                }
            });

        }else{
            res.json({success : false , message : 'No token provided'});
        }

    });
    router.post('/decode_token',function(req,res){
        var token = req.body.token;
        if (token){
            jwt.verify(token,secret,function(err,decoded){
                if (err){
                    res.json({success : false , message : 'Invalid token' , info : null });
                }else{
                    res.json({success : true , message : 'Success' , info : decoded });
                }
            });

        }else{
            res.json({success : false , message : 'No token provided'});
        }  
    });
    router.post('/check_client',function(req,res){
        console.log('clientId',req.body.clientId);
        client.findOne({clientId : req.body.clientId}).select('clientId callback').exec(function(err,client){
            if (err) throw err;
            
            if (!client){
                res.json({ success:false, message:'Could not find client',client : null});
            } else {
                res.json({success : true , message : 'Success' , client : client});
            }
        });

    });


    

    // router.use(function(req,res,next){
    //     var token = req.body.token || req.body.query || req.headers['x-access-token'];

    //     if (token){
    //         jwt.verify(token,secret,function(err,decoded){
    //             if (err){
    //                 res.json({success : false , message : 'Invalid token'});
    //             }else{
    //                 req.decoded = decoded;
    //                 next();
    //             }
    //         });

    //     }else{
    //         res.json({success : false , message : 'No token provided'});
    //     }
       
    // });
    // router.post('/me',function(req,res){
    //     res.send(req.decoded);

    // });


    return router;
};
