const { fetch, fetchALL } = require("../../lib/postgres");

const ADD_PRICE_ITEM = `
   INSERT INTO
      price_list (
         price_item_title,
         price_item_desc,
         price_item_price,
         price_item_lang
      ) VALUES (
         $1,
         $2,
         $3,
         $4
      ) RETURNING *;
`;

const UPDATE_PRICE_ITEM = `
   UPDATE
      price_list
   SET
      price_item_title = $2,
      price_item_desc = $3,
      price_item_price = $4,
      price_item_lang = $5
   WHERE
      price_item_id = $1
   RETURNING *;
`;

const UPDATE_STATUS = `
   UPDATE
      price_list
   SET
      price_item_active = $2
   WHERE
      price_item_id = $1
   RETURNING *;
`;

const DELETE_PRICE_ITEM = `
   DELETE FROM
      price_list
   WHERE
      price_item_id = $1
   RETURNING *;
`;

const priceListAdmin = (limit, offset) => {
   const PRICE_LIST = `
      SELECT
         *
      FROM
         price_list
      ORDER BY
         price_item_price
      LIMIT ${limit}
      OFFSET ${offset};
   `;

   return fetchALL(PRICE_LIST)
}
const priceList = (limit, offset, lang) => {
   const PRICE_LIST = `
      SELECT
         *
      FROM
         price_list
      WHERE
         price_item_active = true
         and price_item_lang = '${lang}'
      ORDER BY
         price_item_price
      LIMIT ${limit}
      OFFSET ${offset}
   `;

   return fetchALL(PRICE_LIST)
}
const addPriceItem = (title, desc, price, lang) => fetch(ADD_PRICE_ITEM, title, desc, price, lang)
const updatePriceItem = (id, title, desc, price, lang) => fetch(UPDATE_PRICE_ITEM, id, title, desc, price, lang)
const updateStatus = (id, status) => fetch(UPDATE_STATUS, id, status)
const deletePrice = (id) => fetch(DELETE_PRICE_ITEM, id)

module.exports = {
   priceListAdmin,
   priceList,
   addPriceItem,
   updatePriceItem,
   updateStatus,
   deletePrice
}