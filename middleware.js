let jwt = require( 'jsonwebtoken' );
const config = require( './config.js' );

let checkToken = ( req, res, next ) => {
  let token = req.headers[ 'x-access-token' ] || req.headers[ 'authorization' ];
  console.log("key","found")

  if( token ) {
    if ( token.startsWith( 'Bearer ' ) ) {
        console.log("key","found")
        token = token.slice(7, token.length );
    }
        jwt.verify( token, config.userkey, ( err, decoded ) => {
        if( err ) {
          jwt.verify( token, config.adminkey, ( err, decoded ) => {
            if( err ) {
              return res.json( {
                success: false,
                message: 'Token is not valid'
              } );
            } else {
              req.decoded = decoded;
              next();
            }
          } );
        } else {
          req.decoded = decoded;
          next();
        }
      } );
  } else {
    return res.json( {
      success: false,
      message: 'Auth token is not supplied'
    } );
  }
};

let checkToken_admin = ( req, res, next ) => {
  let token = req.headers[ 'x-access-token' ] || req.headers[ 'authorization' ];
  console.log("key","found")
  if( token ) {
    if ( token.startsWith( 'Bearer ' ) ) {
        token = token.slice(7, token.length );
    }
        jwt.verify( token, config.adminkey, ( err, decoded ) => {

        if( err ) {
          return res.json( {
            success: false,
            message: 'Token is not valid'
          } );
        } else {
          req.decoded = decoded;
          next();
        }
      } );
  } else {
    return res.json( {
      success: false,
      message: 'Auth token is not supplied'
    } );
  }
};
module.exports = {
  checkToken: checkToken,
  checkToken_admin: checkToken_admin
}