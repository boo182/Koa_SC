import 'babel-polyfill';
import Koa from 'koa';
var Router = require('koa-router');
var knex = require('koa-knex');
const bodyParser = require('koa-bodyparser');
//const config = require('config');


var app = new Koa();
var router = new Router();

console.log('yo');
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : 'root',
    database : 'sens_critique'
  },
   pool: { min: 0, max: 7 }
});

router.get('/', async(ctx, next) => {
  ctx.body="this is the index page";
})

router.get('/test', async (ctx, next) => {
  ctx.body ="this is the test page";
  console.log(ctx.url) // Output: /test
})

router.get('/user/:id', async(ctx, next) => {
  var str = ctx.request.path;
  var id = str.match(/\d+/);
   
   var user = knex.select('name').from('Persons').where('PersonID', id);
    return user.map(row => {
    ctx.body="my name is "+row.name;
  });
    
})

router.get('/movie/:id', async(ctx, next) => {
  var str = ctx.request.path;
  var id = str.match(/\d+/);

   var user = knex.select('title').from('movies').where('id', id);
    return user.map(row => {
    ctx.body="the good movie "+row.title;
  });
    
})

router.get('/profile/:id', async(ctx, next)=>{
  var str = ctx.request.path;
  var id = str.match(/\d+/);

  // var user = knex.select('name').from('Persons').where('PersonID', id);
  // return user.map(row => {
  //   console.log(row.name);
  // })
  


var movies = knex('movies').where('userID', id).join('user_likes', 'movies.id', '=', 'user_likes.movieID').select('title');
return movies.map(row => {
 ctx.body = row.title;
})



})

  

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3001);