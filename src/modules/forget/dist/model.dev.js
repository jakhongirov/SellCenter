"use strict";

var _require = require('../../lib/postgres'),
    fetch = _require.fetch,
    fetchALL = _require.fetchALL;

var FOUND_USER = "\n   SELECT\n      *\n   FROM\n      users\n   WHERE\n      user_email = $1;\n";
var ADD_CODE = "\n   INSERT INTO \n      codes (\n         code,\n         user_mail\n      ) VALUES (\n         $1,\n         $2\n      ) RETURNING *;\n";
var UPDATE_ACTIVE = "\n   UPDATE\n      codes\n   SET\n      code_active = false\n   WHERE\n      id = $1\n   RETURNING *;\n";
var FOUND_CODE = "\n   SELECT\n      *\n   FROM\n      codes\n   WHERE\n      user_mail = $1\n      and code = $2;\n";
var UPDATE_PASSWORD = "\n   UPDATE\n      users\n   SET\n      user_password = $2\n   WHERE\n      user_email = $1\n   RETURNING *;\n";

var foundUser = function foundUser(email) {
  return fetch(FOUND_USER, email);
};

var addCode = function addCode(code, email) {
  return fetch(ADD_CODE, code, email);
};

var updeteActive = function updeteActive(id) {
  return fetch(UPDATE_ACTIVE, id);
};

var foundCode = function foundCode(email, code) {
  return fetch(FOUND_CODE, email, code);
};

var updateUserPassword = function updateUserPassword(email, pass_hash) {
  return fetch(UPDATE_PASSWORD, email, pass_hash);
};

module.exports = {
  foundUser: foundUser,
  addCode: addCode,
  updeteActive: updeteActive,
  foundCode: foundCode,
  updateUserPassword: updateUserPassword
};