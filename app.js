'use strict';

require('babel-polyfill');

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Router = require('koa-router');
var knex = require('koa-knex');
var bodyParser = require('koa-bodyparser');
//const config = require('config');


var app = new _koa2.default();
var router = new Router();

console.log('yo');
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'sens_critique'
  },
  pool: { min: 0, max: 7 }
});

router.get('/', function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            ctx.body = "this is the index page";

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

router.get('/test', function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(ctx, next) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            ctx.body = "this is the test page";
            console.log(ctx.url); // Output: /test

          case 2:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

router.get('/user/:id', function () {
  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(ctx, next) {
    var str, id, user;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            str = ctx.request.path;
            id = str.match(/\d+/);
            user = knex.select('name').from('Persons').where('PersonID', id);
            return _context3.abrupt('return', user.map(function (row) {
              ctx.body = "my name is " + row.name;
            }));

          case 4:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());

router.get('/movie/:id', function () {
  var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(ctx, next) {
    var str, id, user;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            str = ctx.request.path;
            id = str.match(/\d+/);
            user = knex.select('title').from('movies').where('id', id);
            return _context4.abrupt('return', user.map(function (row) {
              ctx.body = "the good movie " + row.title;
            }));

          case 4:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());

router.get('/profile/:id', function () {
  var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(ctx, next) {
    var str, id, movies;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            str = ctx.request.path;
            id = str.match(/\d+/);

            // var user = knex.select('name').from('Persons').where('PersonID', id);
            // return user.map(row => {
            //   console.log(row.name);
            // })


            movies = knex('movies').where('userID', id).join('user_likes', 'movies.id', '=', 'user_likes.movieID').select('title');
            return _context5.abrupt('return', movies.map(function (row) {
              ctx.body = row.title;
            }));

          case 4:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());

app.use(router.routes()).use(router.allowedMethods());

app.listen(3001);
