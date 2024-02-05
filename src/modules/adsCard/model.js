const { fetch, fetchALL } = require("../../lib/postgres");

const ADS_RANDOM = `
   SELECT
      *
   FROM
      ads_cards
   WHERE
      card_active = true
   ORDER BY
      random()
   LIMIT 2;
`;

const BY_ID = `
   SELECT
      *
   FROM
      ads_cards
   WHERE
      card_id = $1;
`;

const UPDATE_ADS = `
   UPDATE
      ads_cards
   SET
      card_title = $2,
      card_text = $3,
      card_link = $4,
      card_image_url = $5,
      card_image_name = $6
   WHERE
      card_id = $1
   RETURNING *;
`;

const UPDATE_STATUS = `
   UPDATE
      ads_cards
   SET
      card_active = $2
   WHERE
      card_id = $1
   RETURNING *;
`;

const DELETE_ADS = `
   DELETE FROM
      ads_cards
   WHERE
      card_id = $1
   RETURNING *;
`;

const ADD_ADS = `
   INSERT INTO
      ads_cards (
         card_title,
         card_text,
         card_link,
         card_image_url,
         card_image_name
      ) VALUES (
         $1,
         $2,
         $3,
         $4,
         $5
      )
   RETURNING *;
`;

const adsList = (limit, offset) => {
   const ADS_LIST = `
      SELECT
         *
      FROM
         ads_cards
      ORDER BY
         card_id
      LIMIT ${limit}
      OFFSET ${offset}
   `;

   return fetchALL(ADS_LIST)
}
const adsRandom = () => fetchALL(ADS_RANDOM)
const adsById = (id) => fetch(BY_ID, id)
const addAds = (
   ads_title,
   ads_text,
   ads_link,
   ads_img_url,
   ads_img_name
) => fetch(
   ADD_ADS,
   ads_title,
   ads_text,
   ads_link,
   ads_img_url,
   ads_img_name
)
const updateAds = (
   id,
   ads_title,
   ads_text,
   ads_link,
   ads_img_url,
   ads_img_name
) => fetch(
   UPDATE_ADS,
   id,
   ads_title,
   ads_text,
   ads_link,
   ads_img_url,
   ads_img_name
)
const updateStatus = (id, status) => fetch(UPDATE_STATUS, id, status)
const deleteAds = (id) => fetch(DELETE_ADS, id)

module.exports = {
   adsList,
   adsRandom,
   adsById,
   addAds,
   updateAds,
   updateStatus,
   deleteAds
}