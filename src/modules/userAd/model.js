const { fetch, fetchALL } = require("../../lib/postgres");

const FOUND_USER = `
   SELECT
      *
   FROM
      users
   WHERE
      user_id =$1;
`;

const foundUser = (id) => fetch(FOUND_USER, id)
const userAdsList = (id, limit, offset, tb_name) => {
   const LIST = `
      SELECT
         *
      FROM
         ${tb_name}
      WHERE
         user_id = ${id}
      LIMIT ${limit ? limit : 50}
      OFFSET ${offset ? offset : 0};
   `;

   return fetchALL(LIST)
}

module.exports = {
   foundUser,
   userAdsList
}