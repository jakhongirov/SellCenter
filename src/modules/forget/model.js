const { } = require('../../lib/postgres')

const FOUND_USER = `
   SELECT
      *
   FROM
      users
   WHERE
      user_email = $1;
`;

const ADD_CODE = `
   INSERT INTO 
      codes (
         code,
         user_mail
      ) VALUES (
         $1,
         $2
      ) RETURNING *;
`;

const UPDATE_ACTIVE = `
   UPDATE
      codes
   SET
      code_active = false
   WHERE
      id = $1
   RETUNING *;
`;

const FOUND_CODE = `
   SELECT
      *
   FROM
      codes
   WHERE
      user_mail = $1,
      code = $2;
`;

const foundUser = (email) => fetch(FOUND_USER, email)
const addCode = (code, email) => fetch(ADD_CODE, code, email)
const updeteActive = (id) => fetch(UPDATE_ACTIVE, id)
const foundCode = (email, code) => fetch(FOUND_CODE, email, code)

module.exports = {
   foundUser,
   addCode,
   updeteActive,
   foundCode
}