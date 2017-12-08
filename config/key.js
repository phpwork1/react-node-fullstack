//keys.js decide of what credentials to return

if(process.env.NODE_ENV === 'production'){
    //Production env
    module.exports = require('./prod');
}else{
    //Development Env
    module.exports = require('./dev');
}