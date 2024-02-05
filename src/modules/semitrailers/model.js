const { fetch, fetchALL } = require("../../lib/postgres");

const BY_ID = `
   SELECT
      *
   FROM
      semi_trailers a
   INNER JOIN
      users b
   ON
      a.user_id = b.user_id
   WHERE
      trailer_id = $1;
`;

const FOUND_TRAILER = `
   SELECT
      trailer_images_url,
      trailer_images_name
   FROM
      semi_trailers
   WHERE
      trailer_id = $1;
`;

const DELETE_TRAILER = `
   DELETE FROM
      semi_trailers
   WHERE
      trailer_id = $1
   RETURNING *;
`;

const UPDATE_STAUS = `
   UPDATE
      semi_trailers
   SET
      trailer_active = $2
   WHERE
      trailer_id = $1
   RETURNING *;
`;

const ADD_TRAILER = `
   INSERT INTO
      semi_trailers (
         trailer_make,
         trailer_model,
         trailer_describtion,
         trailer_video_link,
         trailer_condition,
         trailer_category,
         trailer_firt_date,
         trailer_firt_date_year,
         trailer_price,
         trailer_price_type,
         trailer_vat,
         trailer_country,
         trailer_city_zipcode,
         trailer_radius,
         trailer_features,
         trailer_axles,
         trailer_gvw,
         trailer_load_capacity,
         trailer_security,
         trailer_new_hu,
         trailer_renting_possible,
         trailer_discount_offers,
         trailer_vendor,
         trailer_dealer_rating,
         user_id,
         user_phone,
         user_email,
         trailer_images_url,
         trailer_images_name
      )
      VALUES(
         $1,
         $2,
         $3,
         $4,
         $5,
         $6,
         $7,
         $8,
         $9,
         $10,
         $11,
         $12,
         $13,
         $14,
         $15,
         $16,
         $17,
         $18,
         $19,
         $20,
         $21,
         $22,
         $23,
         $24,
         $25,
         $26,
         $27,
         $28,
         $29
      ) RETURNING *;
`;

const UPDATE_TRAILER = `
   UPDATE
      semi_trailers
   SET
      trailer_make = $2,
      trailer_model = $3,
      trailer_describtion = $4,
      trailer_video_link = $5,
      trailer_condition = $6,
      trailer_category = $7,
      trailer_firt_date = $8,
      trailer_firt_date_year = $9,
      trailer_price = $10,
      trailer_price_type = $11,
      trailer_vat = $12,
      trailer_country = $13,
      trailer_city_zipcode = $14,
      trailer_radius = $15,
      trailer_features = $16,
      trailer_axles = $17,
      trailer_gvw = $18,
      trailer_load_capacity = $19,
      trailer_security = $20,
      trailer_new_hu = $21,
      trailer_renting_possible = $22,
      trailer_discount_offers = $23,
      trailer_vendor = $24,
      trailer_dealer_rating = $25,
      user_id = $26,
      user_phone = $27,
      user_email = $28,
      trailer_images_url = $29,
      trailer_images_name = $30
   WHERE
      trailer_id = $1
   RETURNING *;
`;

const semitrailerListAdmin = (limit, offset) => {
   const LIST = `
      SELECT
         *
      FROM
         semi_trailers
      ORDER BY
         trailer_id DESC
      LIMIT ${limit}
      OFFSET ${offset};
   `;

   return fetchALL(LIST)
}
const foundTrailerById = (id) => fetch(BY_ID, id)
const foundTrailer = (id) => fetch(FOUND_TRAILER, id)
const deleteTrailer = (id) => fetch(DELETE_TRAILER, id)
const updateStatus = (id, status) => fetch(UPDATE_STAUS, id, status)
const trailerList = (
   trailer_condition,
   trailer_category,
   trailer_make,
   trailer_model,
   trailer_firt_date_year_from,
   trailer_firt_date_year_to,
   trailer_price_from,
   trailer_price_to,
   trailer_price_type,
   trailer_vat,
   trailer_country,
   trailer_city,
   zipcode,
   trailer_radius,
   featuresId,
   trailer_axles,
   trailer_gvw_from,
   trailer_gvw_to,
   trailer_load_capacity_from,
   trailer_load_capacity_to,
   securityArr,
   day,
   trailer_new_hu,
   trailer_renting_possible,
   trailer_discount_offers,
   trailer_vendor,
   trailer_dealer_rating,
   picture,
   video,
   offset,
   limit
) => {
//   const cityConditions = trailer_city?.map(city => `trailer_city_zipcode = '${city}'`).join(' OR ');
   const featuresString = featuresId?.map(e => `'${e}'`).join(', ');
   const securityString = securityArr?.map(e => `'${e}'`).join(', ');

   const TRAILER_LIST = `
      SELECT
         *
      FROM
         semi_trailers
      WHERE
         trailer_active = true
         ${trailer_condition ? `and trailer_condition = '${trailer_condition}'` : ""}
         ${trailer_category ? `and trailer_category = '${trailer_category}'` : ""}
         ${trailer_make ? `and trailer_make = '${trailer_make}'` : ""}
         ${trailer_model ? `and trailer_model = '${trailer_model}'` : ""}
         ${trailer_firt_date_year_from ? `and ${trailer_firt_date_year_from} <=  trailer_firt_date_year` : ""}
         ${trailer_firt_date_year_to ? `and ${trailer_firt_date_year_to} >=  trailer_firt_date_year` : ""}
         ${trailer_price_from ? `and ${trailer_price_from} <=  trailer_price` : ""}
         ${trailer_price_to ? `and ${trailer_price_to} >=  trailer_price` : ""}
         ${trailer_price_type ? `and trailer_price_type = '${trailer_price_type}'` : ""}
         ${trailer_vat ? `and trailer_vat = '${trailer_vat}'` : ""}
         ${trailer_country ? `and trailer_country ilike '%${trailer_country}%'` : ""}
         ${trailer_city ? `and trailer_city_zipcode ilike '%${trailer_city}%'` : ""}
         ${zipcode ? `and trailer_city_zipcode ilike '%${zipcode}%'` : ""}
         ${trailer_radius ? `and ${trailer_radius} >=  trailer_radius` : ""}
         ${featuresId?.length > 0 ? `and trailer_features @> ARRAY[${featuresString}]` : ""}
         ${trailer_axles <= 3 ? `and ${trailer_axles} = trailer_axles` : trailer_axles > 3 ? `and 3 < trailer_axles` : ''}
         ${trailer_gvw_from ? `and ${trailer_gvw_from} <=  trailer_gvw` : ""}
         ${trailer_gvw_to ? `and ${trailer_gvw_to} >=  trailer_gvw` : ""}
         ${trailer_load_capacity_from ? `and ${trailer_load_capacity_from} <=  trailer_load_capacity` : ""}
         ${trailer_load_capacity_to ? `and ${trailer_load_capacity_to} >=  trailer_load_capacity` : ""}
         ${securityArr?.length > 0 ? `and trailer_security @> ARRAY[${securityString}]` : ''}
         ${trailer_new_hu == true ? `and trailer_new_hu = ${trailer_new_hu}` : ""}
         ${trailer_renting_possible == true ? `and trailer_renting_possible = ${trailer_renting_possible}` : ""}
         ${trailer_discount_offers == true ? `and trailer_discount_offers = ${trailer_discount_offers}` : ""}
         ${trailer_vendor ? `and trailer_vendor = '${trailer_vendor}'` : ""}
         ${trailer_dealer_rating ? `and trailer_dealer_rating >= ${trailer_dealer_rating} ` : ""}
         ${picture == true ? `and Array_Length(trailer_images_url, 1) > 0` : ""}
         ${video == true ? `and trailer_video_link != '' ` : ""}
         ${day ? `and trailer_ad_create_at > current_date - interval '${day} days'` : ""}
      ORDER BY
         trailer_id DESC
      LIMIT ${limit}
      OFFSET ${offset};
   `;

   return fetchALL(TRAILER_LIST)
}
const trailerCount = (
   trailer_condition,
   trailer_category,
   trailer_make,
   trailer_model,
   trailer_firt_date_year_from,
   trailer_firt_date_year_to,
   trailer_price_from,
   trailer_price_to,
   trailer_price_type,
   trailer_vat,
   trailer_country,
   trailer_city,
   zipcode,
   trailer_radius,
   featuresId,
   trailer_axles,
   trailer_gvw_from,
   trailer_gvw_to,
   trailer_load_capacity_from,
   trailer_load_capacity_to,
   securityArr,
   day,
   trailer_new_hu,
   trailer_renting_possible,
   trailer_discount_offers,
   trailer_vendor,
   trailer_dealer_rating,
   picture,
   video
) => {
//   const cityConditions = trailer_city?.map(city => `trailer_city_zipcode = '${city}'`).join(' OR ');
   const featuresString = featuresId?.map(e => `'${e}'`).join(', ');
   const securityString = securityArr?.map(e => `'${e}'`).join(', ');

   const TRAILER_LIST = `
      SELECT
         count(trailer_id)
      FROM
         semi_trailers
      WHERE
         trailer_active = true
         ${trailer_condition ? `and trailer_condition = '${trailer_condition}'` : ""}
         ${trailer_category ? `and trailer_category = '${trailer_category}'` : ""}
         ${trailer_make ? `and trailer_make = '${trailer_make}'` : ""}
         ${trailer_model ? `and trailer_model = '${trailer_model}'` : ""}
         ${trailer_firt_date_year_from ? `and ${trailer_firt_date_year_from} <=  trailer_firt_date_year` : ""}
         ${trailer_firt_date_year_to ? `and ${trailer_firt_date_year_to} >=  trailer_firt_date_year` : ""}
         ${trailer_price_from ? `and ${trailer_price_from} <=  trailer_price` : ""}
         ${trailer_price_to ? `and ${trailer_price_to} >=  trailer_price` : ""}
         ${trailer_price_type ? `and trailer_price_type = '${trailer_price_type}'` : ""}
         ${trailer_vat ? `and trailer_vat = '${trailer_vat}'` : ""}
         ${trailer_country ? `and trailer_country ilike '%${trailer_country}%'` : ""}
         ${trailer_city ? `and trailer_city_zipcode ilike '%${trailer_city}%'` : ""}
         ${zipcode ? `and trailer_city_zipcode ilike '%${zipcode}%'` : ""}
         ${trailer_radius ? `and ${trailer_radius} >=  trailer_radius` : ""}
         ${featuresId?.length > 0 ? `and trailer_features @> ARRAY[${featuresString}]` : ""}
         ${trailer_axles <= 3 ? `and ${trailer_axles} = trailer_axles` : trailer_axles > 3 ? `and 3 < trailer_axles` : ''}
         ${trailer_gvw_from ? `and ${trailer_gvw_from} <=  trailer_gvw` : ""}
         ${trailer_gvw_to ? `and ${trailer_gvw_to} >=  trailer_gvw` : ""}
         ${trailer_load_capacity_from ? `and ${trailer_load_capacity_from} <=  trailer_load_capacity` : ""}
         ${trailer_load_capacity_to ? `and ${trailer_load_capacity_to} >=  trailer_load_capacity` : ""}
         ${securityArr?.length > 0 ? `and trailer_security @> ARRAY[${securityString}]` : ''}
         ${trailer_new_hu == true ? `and trailer_new_hu = ${trailer_new_hu}` : ""}
         ${trailer_renting_possible == true ? `and trailer_renting_possible = ${trailer_renting_possible}` : ""}
         ${trailer_discount_offers == true ? `and trailer_discount_offers = ${trailer_discount_offers}` : ""}
         ${trailer_vendor ? `and trailer_vendor = '${trailer_vendor}'` : ""}
         ${trailer_dealer_rating ? `and trailer_dealer_rating >= ${trailer_dealer_rating} ` : ""}
         ${picture == true ? `and Array_Length(trailer_images_url, 1) > 0` : ""}
         ${video == true ? `and trailer_video_link != '' ` : ""}
         ${day ? `and trailer_ad_create_at > current_date - interval '${day} days'` : ""};
   `;

   return fetch(TRAILER_LIST)
}
const addTrailer = (
   trailer_make,
   trailer_model,
   trailer_describtion,
   trailer_video_link,
   trailer_condition,
   trailer_category,
   trailer_firt_date,
   trailer_firt_date_year,
   trailer_price,
   trailer_price_type,
   trailer_vat,
   trailer_country,
   trailer_city_zipcode,
   trailer_radius,
   featuresId,
   trailer_axles,
   trailer_gvw,
   trailer_load_capacity,
   trailer_security,
   trailer_new_hu,
   trailer_renting_possible,
   trailer_discount_offers,
   trailer_vendor,
   trailer_dealer_rating,
   user_id,
   user_phone,
   user_email,
   trailer_img,
   trailer_img_name
) => fetch(
   ADD_TRAILER,
   trailer_make,
   trailer_model,
   trailer_describtion,
   trailer_video_link,
   trailer_condition,
   trailer_category,
   trailer_firt_date,
   trailer_firt_date_year,
   trailer_price,
   trailer_price_type,
   trailer_vat,
   trailer_country,
   trailer_city_zipcode,
   trailer_radius,
   featuresId,
   trailer_axles,
   trailer_gvw,
   trailer_load_capacity,
   trailer_security,
   trailer_new_hu,
   trailer_renting_possible,
   trailer_discount_offers,
   trailer_vendor,
   trailer_dealer_rating,
   user_id,
   user_phone,
   user_email,
   trailer_img,
   trailer_img_name
)
const updateTrailer = (
   id,
   trailer_make,
   trailer_model,
   trailer_describtion,
   trailer_video_link,
   trailer_condition,
   trailer_category,
   trailer_firt_date,
   trailer_firt_date_year,
   trailer_price,
   trailer_price_type,
   trailer_vat,
   trailer_country,
   trailer_city_zipcode,
   trailer_radius,
   featuresId,
   trailer_axles,
   trailer_gvw,
   trailer_load_capacity,
   trailer_security,
   trailer_new_hu,
   trailer_renting_possible,
   trailer_discount_offers,
   trailer_vendor,
   trailer_dealer_rating,
   user_id,
   user_phone,
   user_email,
   trailer_img,
   trailer_img_name
) => fetch(
   UPDATE_TRAILER,
   id,
   trailer_make,
   trailer_model,
   trailer_describtion,
   trailer_video_link,
   trailer_condition,
   trailer_category,
   trailer_firt_date,
   trailer_firt_date_year,
   trailer_price,
   trailer_price_type,
   trailer_vat,
   trailer_country,
   trailer_city_zipcode,
   trailer_radius,
   featuresId,
   trailer_axles,
   trailer_gvw,
   trailer_load_capacity,
   trailer_security,
   trailer_new_hu,
   trailer_renting_possible,
   trailer_discount_offers,
   trailer_vendor,
   trailer_dealer_rating,
   user_id,
   user_phone,
   user_email,
   trailer_img,
   trailer_img_name
)

module.exports = {
   semitrailerListAdmin,
   foundTrailerById,
   foundTrailer,
   deleteTrailer,
   trailerList,
   trailerCount,
   addTrailer,
   updateTrailer,
   updateStatus
}
