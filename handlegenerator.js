
let jwt = require( 'jsonwebtoken' );
let config = require( './config' );
const usuario = require("./controllers/user");
var crypto = require('crypto');


class HandlerGenerator {
  login( req, res ) {
    let username = req.body.name;
    let password = req.body.password;

    user.getUser(req.body.name).then((user) => {
      let mockedUsername = 'a';
      let mockedPassword = 'a';
      console.log("User", user);
      if(user!=null){
        mockedUsername = user.name
        mockedPassword = user.password
      }
      username = crypto.createHash('md5').update(username).digest('hex');
      password = crypto.createHash('md5').update(password).digest('hex');
      console.log(mockedUsername, mockedPassword)
   
      if( username && password ) {
        if( username === mockedUsername && password === mockedPassword ) {
          let token
          if(user.role==="admin"){
            token = jwt.sign( { username: username },
              config.adminkey, { expiresIn: '24h' } );
          }else{
            token = jwt.sign( { username: username },
              config.userkey, { expiresIn: '24h' } );
          }
          res.json( {
            success: true,
            message: 'Authentication successful!',
            token: token
          } );
  
        } else {
          res.status( 403 ).send( {
            success: false,
            message: 'Incorrect username or password'
          } );
        }
      } else {
        res.status( 400 ).send( {
          success: false,
          message: 'Authentication failed! Please check the request'
        } );

      }
    });
  }
  index( req, res ) {
    res.json( {
      success: true,
      message: 'Index page'
    } );

  }
}
module.exports = HandlerGenerator;