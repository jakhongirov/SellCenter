"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require("pg"),
    Pool = _require.Pool;

var _require2 = require("../config"),
    connection = _require2.connection; // const pool = new Pool({
//   connectionString: connection.connectionStringEL,
// });


var credentials = {
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'Sellcenter2024',
  database: 'postgres'
};
var pool = new Pool(credentials);

var fetch = function fetch(SQL) {
  var client,
      _len,
      params,
      _key,
      _ref,
      _ref$rows,
      row,
      _args = arguments;

  return regeneratorRuntime.async(function fetch$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(pool.connect());

        case 2:
          client = _context.sent;
          _context.prev = 3;

          for (_len = _args.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            params[_key - 1] = _args[_key];
          }

          _context.next = 7;
          return regeneratorRuntime.awrap(client.query(SQL, params.length ? params : null));

        case 7:
          _ref = _context.sent;
          _ref$rows = _slicedToArray(_ref.rows, 1);
          row = _ref$rows[0];
          return _context.abrupt("return", row);

        case 11:
          _context.prev = 11;
          client.release();
          return _context.finish(11);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3,, 11, 14]]);
};

var fetchALL = function fetchALL(SQL) {
  var client,
      _len2,
      params,
      _key2,
      _ref2,
      rows,
      _args2 = arguments;

  return regeneratorRuntime.async(function fetchALL$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(pool.connect());

        case 2:
          client = _context2.sent;
          _context2.prev = 3;

          for (_len2 = _args2.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            params[_key2 - 1] = _args2[_key2];
          }

          _context2.next = 7;
          return regeneratorRuntime.awrap(client.query(SQL, params.length ? params : null));

        case 7:
          _ref2 = _context2.sent;
          rows = _ref2.rows;
          return _context2.abrupt("return", rows);

        case 10:
          _context2.prev = 10;
          client.release();
          return _context2.finish(10);

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[3,, 10, 13]]);
};

module.exports = {
  fetch: fetch,
  fetchALL: fetchALL
};