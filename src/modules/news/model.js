const { fetch, fetchALL } = require("../../lib/postgres");

const FOUND_NEWS = `
   SELECT
      *
   FROM
      news
   WHERE
      news_id = $1;
`;

const UPDATE_NEWS = `
   UPDATE
      news
   SET
      news_title = $2,
      news_lang = $3,
      news_desc = $4,
      news_image_url = $5,
      news_image_name = $6
   WHERE
      news_id = $1
   RETURNING *;
`;

const DELETE_NEWS = `
   DELETE FROM
      news
   WHERE
      news_id = $1
   RETURNING *;
`;

const UPDATE_STATUS = `
   UPDATE
      news
   SET
      news_active = $2
   WHERE
      news_id = $1
   RETURNING *;
`;

const ADD_NEWS = `
   INSERT INTO
      news (
         news_title,
         news_lang,
         news_desc,
         news_image_url,
         news_image_name
      ) VALUES (
         $1,
         $2,
         $3,
         $4,
         $5
      ) RETURNING *;
`;

const newsAdminList = (limit, offset) => {
   const list = `
      SELECT
         *
      FROM
         news
      ORDER BY
         news_id
      LIMIT ${limit}
      OFFSET ${offset}
   `;

   return fetchALL(list)
}
const newsList = (limit, offset, lang) => {
   const list = `
      SELECT
         *
      FROM
         news
      WHERE
         news_active = true
         and news_lang = '${lang}'
      ORDER BY
         news_id DESC
      LIMIT ${limit}
      OFFSET ${offset}
   `;

   return fetchALL(list)
}
const newsById = (id) => fetch(FOUND_NEWS, id)
const addNews = (
   title,
   news_lang,
   news_desc,
   news_img_url,
   news_img_name
) => fetch(
   ADD_NEWS,
   title,
   news_lang,
   news_desc,
   news_img_url,
   news_img_name
)
const updateNews = (
   id,
   title,
   news_lang,
   news_desc,
   news_img_url,
   news_img_name
) => fetch(
   UPDATE_NEWS,
   id,
   title,
   news_lang,
   news_desc,
   news_img_url,
   news_img_name
)
const updateStatus = (id, status) => fetch(UPDATE_STATUS, id, status)
const deleteNews = (id) => fetch(DELETE_NEWS, id)

module.exports = {
   newsAdminList,
   newsList,
   newsById,
   addNews,
   updateNews,
   updateStatus,
   deleteNews
}