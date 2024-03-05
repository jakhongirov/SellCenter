const { fetch, fetchALL } = require("../../lib/postgres");

const BY_ID = `
   SELECT 
      *
   FROM
      forklift_trucks a
   INNER JOIN
      users b
   ON
      a.user_id = b.user_id
   WHERE
      forklift_id = $1;
`;

const FOUND_COMPANY = `
   SELECT
      *
   FROM
      user_companies
   WHERE
      user_id = $1;
`;

const FOUND_FORKLIFT = `
   SELECT 
      forklift_images_url,
      forklift_images_name
   FROM
      forklift_trucks
   WHERE
      forklift_id = $1;
`;


const UPDATE_STATUS = `
   UPDATE
      forklift_trucks
   SET
      forklift_active = $2
   WHERE
      forklift_id = $1
   RETURNING *;
`;

const UPDATE_FORKLIFT = `
   UPDATE
      forklift_trucks
   SET
      forklift_make = $2,
      forklift_model = $3,
      forklift_describtion = $4,
      forklift_video_link = $5,
      forklift_condition = $6,
      forklift_category = $7,
      forklift_price = $8,
      forklift_price_type = $9,
      forklift_vat = $10,
      forklift_firt_date = $11,
      forklift_construction_year = $12,
      forklift_operating_hours = $13,
      forklift_country = $14,
      forklift_city_zipcode = $15,
      forklift_radius = $16,
      forklift_fuel_type = $17,
      forklift_transmission = $18,
      forklift_features = $19,
      forklift_lifting_capacity = $20,
      forklift_lifting_height = $21,
      forklift_height = $22,
      forklift_security = $23,
      forklift_renting_possible = $24,
      forklift_discount_offers = $25,
      forklift_vendor = $26,
      forklift_dealer_rating = $27,
      user_id = $28,
      user_phone = $29,
      user_email = $30,
      forklift_images_url = $31,
      forklift_images_name = $32
   WHERE
      forklift_id = $1
   RETURNING *;
`;

const ADD_FORKLIFT = `
   INSERT INTO
      forklift_trucks (
         forklift_make,
         forklift_model,
         forklift_describtion,
         forklift_video_link,
         forklift_condition,
         forklift_category,
         forklift_price,
         forklift_price_type,
         forklift_vat,
         forklift_firt_date,
         forklift_construction_year,
         forklift_operating_hours,
         forklift_country,
         forklift_city_zipcode,
         forklift_radius,
         forklift_fuel_type,
         forklift_transmission,
         forklift_features,
         forklift_lifting_capacity,
         forklift_lifting_height,
         forklift_height,
         forklift_security,
         forklift_renting_possible,
         forklift_discount_offers,
         forklift_vendor,
         forklift_dealer_rating,
         user_id,
         user_phone,
         user_email,
         forklift_images_url,
         forklift_images_name
      ) VALUES (
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
         $29,
         $30,
         $31
      )
   RETURNING *;
`;

const DELETE_FORKLIFT = `
   DELETE FROM
      forklift_trucks
   WHERE
      forklift_id = $1
   RETURNING *;
`;

const ADD_PHOTO = `
   UPDATE
      forklift_trucks
   SET
      forklift_images_url = array_cat(forklift_images_url, $2),
      forklift_images_name = array_cat(forklift_images_name, $3)
   WHERE
      forklift_id = $1
   RETURNING *;
`;

const DELETE_PHOTO = `
   UPDATE
      forklift_trucks
   SET
      forklift_images_url = $2,
      forklift_images_name = $3
   WHERE
      forklift_id = $1
   RETURNING *;
`;

const forkliftListAdmin = (limit, offset) => {
   const LIST = `
      SELECT
         *
      FROM
         forklift_trucks
      ORDER BY
         forklift_id DESC
      LIMIT ${limit}
      OFFSET ${offset}
   `;

   return fetchALL(LIST)
}
const foundForkliftById = (id) => fetch(BY_ID, id)
const foundCompany = (user_id) => fetch(FOUND_COMPANY, user_id)
const foundForklift = (id) => fetch(FOUND_FORKLIFT, id)
const deleteForklift = (id) => fetch(DELETE_FORKLIFT, id)
const updateStatus = (id, status) => fetch(UPDATE_STATUS, id, status)
const forkliftList = (
   forklift_condition,
   forklift_category,
   forklift_make,
   forklift_model,
   forklift_price_from,
   forklift_price_to,
   forklift_price_type,
   forklift_vat,
   forklift_construction_year_from,
   forklift_construction_year_to,
   forklift_operating_hours_from,
   forklift_operating_hours_to,
   forklift_country,
   forklift_city,
   zipcode,
   forklift_radius,
   fuelArr,
   transmissionArr,
   featuresId,
   forklift_lifting_capacity_from,
   forklift_lifting_capacity_to,
   forklift_lifting_height_from,
   forklift_lifting_height_to,
   forklift_height_from,
   forklift_height_to,
   securityArr,
   forklift_renting_possible,
   forklift_discount_offers,
   forklift_vendor,
   forklift_dealer_rating,
   picture,
   video,
   day,
   limit,
   offset
) => {
   //   const cityConditions = forklift_city?.map(city => `forklift_city_zipcode = '${city}'`).join(' OR ');
   const fuelConditions = fuelArr?.map(e => `forklift_fuel_type = '${e}'`).join(' OR ');
   const transmissionConditions = transmissionArr?.map(e => `forklift_transmission = '${e}'`).join(' OR ');
   const featuresString = featuresId?.map(e => `'${e}'`).join(', ');
   const securityString = securityArr?.map(e => `'${e}'`).join(', ');

   const FORKLIFT_LIST = `
      SELECT
         *
      FROM
         forklift_trucks
      WHERE
         forklift_active = true
         ${forklift_condition ? `and forklift_condition = '${forklift_condition}'` : ""}
         ${forklift_category ? `and forklift_category = '${forklift_category}'` : ""}
         ${forklift_make ? `and forklift_make = '${forklift_make}'` : ""}
         ${forklift_model ? `and forklift_model ilike '%${forklift_model}%'` : ""}
         ${forklift_price_from ? `and ${forklift_price_from} <= forklift_price` : ""}
         ${forklift_price_to ? `and ${forklift_price_to} >= forklift_price` : ""}
         ${forklift_price_type ? `and forklift_price_type = '${forklift_price_type}'` : ""}
         ${forklift_vat ? `and forklift_vat = '${forklift_vat}'` : ""}
         ${forklift_construction_year_from ? `and ${forklift_construction_year_from} <= forklift_construction_year` : ""}
         ${forklift_construction_year_to ? `and ${forklift_construction_year_to} >= forklift_construction_year` : ""}
         ${forklift_operating_hours_from ? `and ${forklift_operating_hours_from} <= forklift_operating_hours` : ""}
         ${forklift_operating_hours_to ? `and ${forklift_operating_hours_to} >= forklift_operating_hours` : ""}
         ${forklift_country ? `and  forklift_country = '${forklift_country}'` : ""}
         ${forklift_city ? `and  forklift_city_zipcode ilike '%${forklift_city}%'` : ""}
         ${zipcode ? `and forklift_city_zipcode ilike '%${zipcode}%'` : ""}
         ${forklift_radius ? `and ${forklift_radius} >= forklift_radius` : ""}
         ${fuelConditions ? `and (${fuelConditions})` : ''}
         ${transmissionConditions ? `and (${transmissionConditions})` : ''}
         ${featuresId?.length > 0 ? `and forklift_features @> ARRAY[${featuresString}]` : ""}
         ${forklift_lifting_capacity_from ? `and ${forklift_lifting_capacity_from} <= forklift_lifting_capacity` : ""}
         ${forklift_lifting_capacity_to ? `and ${forklift_lifting_capacity_to} >= forklift_lifting_capacity` : ""}
         ${forklift_lifting_height_from ? `and ${forklift_lifting_height_from} <= forklift_lifting_height` : ""}
         ${forklift_lifting_height_to ? `and ${forklift_lifting_height_to} >= forklift_lifting_height` : ""}
         ${forklift_height_from ? `and ${forklift_height_from} <= forklift_height` : ""}
         ${forklift_height_to ? `and ${forklift_height_to} >= forklift_height` : ""}
         ${securityArr?.length > 0 ? `and forklift_security @> ARRAY[${securityString}]` : ""}
         ${forklift_renting_possible == true ? `and forklift_renting_possible = ${forklift_renting_possible}` : ""}
         ${forklift_discount_offers == true ? `and forklift_discount_offers = ${forklift_discount_offers}` : ""}
         ${forklift_vendor ? `and forklift_vendor = '${forklift_vendor}'` : ""}
         ${forklift_dealer_rating ? `and ${forklift_dealer_rating} <= forklift_dealer_rating` : ""}
         ${picture == true ? `and Array_Length(forklift_images_url, 1) > 0` : ""}
         ${video == true ? `and forklift_video_link != '' ` : ""}
         ${day ? `and forklift_ad_create_at > current_date - interval '${day} days'` : ""}
      ORDER BY
         forklift_id DESC
      LIMIT ${limit}
      OFFSET ${offset}
   `;

   return fetchALL(FORKLIFT_LIST)
}
const forkliftCount = (
   forklift_condition,
   forklift_category,
   forklift_make,
   forklift_model,
   forklift_price_from,
   forklift_price_to,
   forklift_price_type,
   forklift_vat,
   forklift_construction_year_from,
   forklift_construction_year_to,
   forklift_operating_hours_from,
   forklift_operating_hours_to,
   forklift_country,
   forklift_city,
   zipcode,
   forklift_radius,
   fuelArr,
   transmissionArr,
   featuresId,
   forklift_lifting_capacity_from,
   forklift_lifting_capacity_to,
   forklift_lifting_height_from,
   forklift_lifting_height_to,
   forklift_height_from,
   forklift_height_to,
   securityArr,
   forklift_renting_possible,
   forklift_discount_offers,
   forklift_vendor,
   forklift_dealer_rating,
   picture,
   video,
   day
) => {
   //   const cityConditions = forklift_city?.map(city => `forklift_city_zipcode = '${city}'`).join(' OR ');
   const fuelConditions = fuelArr?.map(e => `forklift_fuel_type = '${e}'`).join(' OR ');
   const transmissionConditions = transmissionArr?.map(e => `forklift_transmission = '${e}'`).join(' OR ');
   const featuresString = featuresId?.map(e => `'${e}'`).join(', ');
   const securityString = securityArr?.map(e => `'${e}'`).join(', ');

   const FORKLIFT_LIST = `
      SELECT
         count(forklift_id)
      FROM
         forklift_trucks
      WHERE
         forklift_active = true
         ${forklift_condition ? `and forklift_condition = '${forklift_condition}'` : ""}
         ${forklift_category ? `and forklift_category = '${forklift_category}'` : ""}
         ${forklift_make ? `and forklift_make = '${forklift_make}'` : ""}
         ${forklift_model ? `and forklift_model ilike '%${forklift_model}%'` : ""}
         ${forklift_price_from ? `and ${forklift_price_from} <= forklift_price` : ""}
         ${forklift_price_to ? `and ${forklift_price_to} >= forklift_price` : ""}
         ${forklift_price_type ? `and forklift_price_type = '${forklift_price_type}'` : ""}
         ${forklift_vat ? `and forklift_vat = '${forklift_vat}'` : ""}
         ${forklift_construction_year_from ? `and ${forklift_construction_year_from} <= forklift_construction_year` : ""}
         ${forklift_construction_year_to ? `and ${forklift_construction_year_to} >= forklift_construction_year` : ""}
         ${forklift_operating_hours_from ? `and ${forklift_operating_hours_from} <= forklift_operating_hours` : ""}
         ${forklift_operating_hours_to ? `and ${forklift_operating_hours_to} >= forklift_operating_hours` : ""}
         ${forklift_country ? `and forklift_country = '${forklift_country}'` : ""}
         ${forklift_city ? `and  forklift_city_zipcode ilike '%${forklift_city}%'` : ""}
         ${zipcode ? `and forklift_city_zipcode ilike '%${zipcode}%'` : ""}
         ${forklift_radius ? `and ${forklift_radius} >= forklift_radius` : ""}
         ${fuelConditions ? `and (${fuelConditions})` : ''}
         ${transmissionConditions ? `and (${transmissionConditions})` : ''}
         ${featuresId?.length > 0 ? `and forklift_features @> ARRAY[${featuresString}]` : ""}
         ${forklift_lifting_capacity_from ? `and ${forklift_lifting_capacity_from} <= forklift_lifting_capacity` : ""}
         ${forklift_lifting_capacity_to ? `and ${forklift_lifting_capacity_to} >= forklift_lifting_capacity` : ""}
         ${forklift_lifting_height_from ? `and ${forklift_lifting_height_from} <= forklift_lifting_height` : ""}
         ${forklift_lifting_height_to ? `and ${forklift_lifting_height_to} >= forklift_lifting_height` : ""}
         ${forklift_height_from ? `and ${forklift_height_from} <= forklift_height` : ""}
         ${forklift_height_to ? `and ${forklift_height_to} >= forklift_height` : ""}
         ${securityArr?.length > 0 ? `and forklift_security @> ARRAY[${securityString}]` : ""}
         ${forklift_renting_possible == true ? `and forklift_renting_possible = ${forklift_renting_possible}` : ""}
         ${forklift_discount_offers == true ? `and forklift_discount_offers = ${forklift_discount_offers}` : ""}
         ${forklift_vendor ? `and forklift_vendor = '${forklift_vendor}'` : ""}
         ${forklift_dealer_rating ? `and ${forklift_dealer_rating} <= forklift_dealer_rating` : ""}
         ${picture == true ? `and Array_Length(forklift_images_url, 1) > 0` : ""}
         ${video == true ? `and forklift_video_link != '' ` : ""}
         ${day ? `and forklift_ad_create_at > current_date - interval '${day} days'` : ""};
   `;

   return fetch(FORKLIFT_LIST)
}
const addForklift = (
   forklift_make,
   forklift_model,
   forklift_describtion,
   forklift_video_link,
   forklift_condition,
   forklift_category,
   forklift_price,
   forklift_price_type,
   forklift_vat,
   forklift_firt_date,
   forklift_construction_year,
   forklift_operating_hours,
   forklift_country,
   forklift_city_zipcode,
   forklift_radius,
   forklift_fuel_type,
   forklift_transmission,
   featuresId,
   forklift_lifting_capacity,
   forklift_lifting_height,
   forklift_height,
   securityArr,
   forklift_renting_possible,
   forklift_discount_offers,
   forklift_vendor,
   forklift_dealer_rating,
   user_id,
   user_phone,
   user_email,
   forklift_img,
   forklift_img_name
) => fetch(
   ADD_FORKLIFT,
   forklift_make,
   forklift_model,
   forklift_describtion,
   forklift_video_link,
   forklift_condition,
   forklift_category,
   forklift_price,
   forklift_price_type,
   forklift_vat,
   forklift_firt_date,
   forklift_construction_year,
   forklift_operating_hours,
   forklift_country,
   forklift_city_zipcode,
   forklift_radius,
   forklift_fuel_type,
   forklift_transmission,
   featuresId,
   forklift_lifting_capacity,
   forklift_lifting_height,
   forklift_height,
   securityArr,
   forklift_renting_possible,
   forklift_discount_offers,
   forklift_vendor,
   forklift_dealer_rating,
   user_id,
   user_phone,
   user_email,
   forklift_img,
   forklift_img_name
)
const updateForklift = (
   id,
   forklift_make,
   forklift_model,
   forklift_describtion,
   forklift_video_link,
   forklift_condition,
   forklift_category,
   forklift_price,
   forklift_price_type,
   forklift_vat,
   forklift_firt_date,
   forklift_construction_year,
   forklift_operating_hours,
   forklift_country,
   forklift_city_zipcode,
   forklift_radius,
   forklift_fuel_type,
   forklift_transmission,
   featuresId,
   forklift_lifting_capacity,
   forklift_lifting_height,
   forklift_height,
   securityArr,
   forklift_renting_possible,
   forklift_discount_offers,
   forklift_vendor,
   forklift_dealer_rating,
   user_id,
   user_phone,
   user_email,
   forklift_img,
   forklift_img_name
) => fetch(
   UPDATE_FORKLIFT,
   id,
   forklift_make,
   forklift_model,
   forklift_describtion,
   forklift_video_link,
   forklift_condition,
   forklift_category,
   forklift_price,
   forklift_price_type,
   forklift_vat,
   forklift_firt_date,
   forklift_construction_year,
   forklift_operating_hours,
   forklift_country,
   forklift_city_zipcode,
   forklift_radius,
   forklift_fuel_type,
   forklift_transmission,
   featuresId,
   forklift_lifting_capacity,
   forklift_lifting_height,
   forklift_height,
   securityArr,
   forklift_renting_possible,
   forklift_discount_offers,
   forklift_vendor,
   forklift_dealer_rating,
   user_id,
   user_phone,
   user_email,
   forklift_img,
   forklift_img_name
)
const addImage = (id, forklift_img, forklift_img_name) => fetch(ADD_PHOTO, id, forklift_img, forklift_img_name)
const deleteImage = (id, forklift_images_url, forklift_images_name) => fetch(DELETE_PHOTO, id, forklift_images_url, forklift_images_name)

module.exports = {
   forkliftListAdmin,
   forkliftList,
   forkliftCount,
   foundForkliftById,
   foundCompany,
   foundForklift,
   addForklift,
   updateForklift,
   deleteForklift,
   updateStatus,
   addImage,
   deleteImage
}