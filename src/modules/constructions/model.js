const { fetch, fetchALL } = require("../../lib/postgres");

const BY_ID = `
   SELECT 
      *
   FROM
      construction_machines a
   INNER JOIN
      users b
   ON
      a.user_id = b.user_id
   WHERE
      machine_id = $1;
`;

const FOUND_COMPANY = `
   SELECT
      *
   FROM
      user_companies
   WHERE
      user_id = $1;
`;

const FOUND_CONSTRUCTION = `
   SELECT 
      machine_images_url,
      machine_images_name
   FROM
      construction_machines
   WHERE
      machine_id = $1;
`;

const DELETE_CONSTRUCTION = `
   DELETE FROM
      construction_machines
   WHERE
      machine_id = $1
   RETURNING *;
`;

const UPDATE_STATUS = `
   UPDATE
      construction_machines
   SET
      machine_active = $2
   WHERE
      machine_id = $1
   RETURNING *;
`;

const UPDATE_CONSTRUCTION = `
   UPDATE
      construction_machines
   SET
      machine_make = $2,
      machine_model = $3,
      machine_describtion = $4,
      machine_video_link = $5,
      machine_condition = $6,
      machine_category = $7,
      machine_price = $8,
      machine_price_type = $9,
      machine_vat = $10,
      machine_firt_date = $11,
      machine_construction_year = $12,
      machine_operating_hours = $13,
      machine_country = $14,
      machine_city_zipcode = $15,
      machine_radius = $16,
      machine_features = $17,
      machine_emissions_sticker = $18,
      machine_safety = $19,
      machine_renting_possible = $20,
      machine_road_licence = $21,
      machine_discount_offers = $22,
      machine_vendor = $23,
      machine_dealer_rating = $24,
      user_id = $25,
      user_phone = $26,
      user_email = $27
   WHERE
      machine_id = $1
   RETURNING *;
`;

const ADD_CONSTRUCTION = `
   INSERT INTO
      construction_machines (
         machine_make,
         machine_model,
         machine_describtion,
         machine_video_link,
         machine_condition,
         machine_category,
         machine_price,
         machine_price_type,
         machine_vat,
         machine_firt_date,
         machine_construction_year,
         machine_operating_hours,
         machine_country,
         machine_city_zipcode,
         machine_radius,
         machine_features,
         machine_emissions_sticker,
         machine_safety,
         machine_renting_possible,
         machine_road_licence,
         machine_discount_offers,
         machine_vendor,
         machine_dealer_rating,
         user_id,
         user_phone,
         user_email,
         machine_images_url,
         machine_images_name
      ) VALUES(
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
         $28
      )
   RETURNING *;
`;

const ADD_PHOTO = `
   UPDATE
      construction_machines
   SET
      machine_images_url = array_cat(machine_images_url, $2),
      machine_images_name = array_cat(machine_images_name, $3)
   WHERE
      machine_id = $1
   RETURNING *;
`;

const DELETE_PHOTO = `
   UPDATE
      construction_machines
   SET
      machine_images_url = $2,
      machine_images_name = $3
   WHERE
      machine_id = $1
   RETURNING *;
`;

const constructionListAdmin = (limit, offset) => {
   const LIST = `
      SELECT
         *
      FROM
         construction_machines
      ORDER BY
         machine_id DESC
      LIMIT ${limit}
      OFFSET ${offset}
   `;

   return fetchALL(LIST)
}
const foundConstructionById = (id) => fetch(BY_ID, id)
const foundCompany = (user_id) => fetch(FOUND_COMPANY, user_id)
const foundConstruction = (id) => fetch(FOUND_CONSTRUCTION, id)
const deleteConstruction = (id) => fetch(DELETE_CONSTRUCTION, id)
const updateStatus = (id, status) => fetch(UPDATE_STATUS, id, status)
const constructionList = (
   machine_condition,
   machine_category,
   machine_make,
   machine_model,
   machine_price_from,
   machine_price_to,
   machine_price_type,
   machine_vat,
   machine_construction_year_from,
   machine_construction_year_to,
   machine_operating_hours_from,
   machine_operating_hours_to,
   machine_country,
   machine_city,
   zipcode,
   machine_radius,
   featuresId,
   machine_emissions_sticker,
   safetyId,
   machine_renting_possible,
   machine_road_licence,
   machine_discount_offers,
   machine_vendor,
   machine_dealer_rating,
   picture,
   video,
   day,
   limit,
   offset
) => {
   //   const cityConditions = machine_city?.map(city = `machine_city_zipcode = '${city}'`).join(' OR ');
   const safetyString = safetyId?.map(e => `'${e}'`).join(', ');
   const featuresString = featuresId?.map(e => `'${e}'`).join(', ');

   const CONSTRUCTION_LIST = `
      SELECT
         *
      FROM
         construction_machines
      WHERE
         machine_active = true
         ${machine_condition ? `and machine_condition = '${machine_condition}'` : ""}
         ${machine_category ? `and machine_category = '${machine_category}'` : ""}
         ${machine_make ? `and machine_make = '${machine_make}'` : ""}
         ${machine_model ? `and machine_model ilike '%${machine_model}%'` : ""}
         ${machine_price_from ? `and ${machine_price_from} <= machine_price` : ""}
         ${machine_price_to ? `and ${machine_price_to} >= machine_price` : ""}
         ${machine_price_type ? `and machine_price_type = '${machine_price_type}'` : ""}
         ${machine_vat ? `and machine_vat = '${machine_vat}'` : ""}
         ${machine_construction_year_from ? `and ${machine_construction_year_from} <= machine_construction_year` : ""}
         ${machine_construction_year_to ? `and ${machine_construction_year_to} >= machine_construction_year` : ""}
         ${machine_operating_hours_from ? `and ${machine_operating_hours_from} <= machine_operating_hours` : ""}
         ${machine_operating_hours_to ? `and ${machine_operating_hours_to} >= machine_operating_hours` : ""}
         ${machine_country ? `and machine_country = '${machine_country}'` : ""}
         ${machine_city ? `and  machine_city_zipcode ilike '%${machine_city}%'` : ""}
         ${zipcode ? `and machine_city_zipcode ilike '%${zipcode}%'` : ""}
         ${machine_radius ? `and ${machine_radius} >= machine_radius` : ""}
         ${safetyId?.length > 0 ? `and machine_safety @> ARRAY[${safetyString}]` : ""}
         ${machine_emissions_sticker ? `and machine_emissions_sticker = '${machine_emissions_sticker}'` : ""}
         ${featuresId?.length > 0 ? `and machine_features @> ARRAY[${featuresString}]` : ""}
         ${machine_renting_possible == true ? `and machine_renting_possible = ${machine_renting_possible}` : ""}
         ${machine_road_licence == true ? `and machine_road_licence = ${machine_road_licence}` : ""}
         ${machine_discount_offers == true ? `and machine_discount_offers = ${machine_discount_offers}` : ""}
         ${machine_vendor ? `and machine_vendor = '${machine_vendor}'` : ""}
         ${machine_dealer_rating ? `and ${machine_dealer_rating} <= machine_dealer_rating` : ""}
         ${picture == true ? `and Array_Length(machine_images_url, 1) > 0` : ""}
         ${video == true ? `and machine_video_link != '' ` : ""}
         ${day ? `and machine_ad_create_at > current_date - interval '${day} days'` : ""}
      ORDER BY
         machine_id DESC
      LIMIT ${limit}
      OFFSET ${offset}
   `;

   return fetchALL(CONSTRUCTION_LIST)
}
const constructionCount = (
   machine_condition,
   machine_category,
   machine_make,
   machine_model,
   machine_price_from,
   machine_price_to,
   machine_price_type,
   machine_vat,
   machine_construction_year_from,
   machine_construction_year_to,
   machine_operating_hours_from,
   machine_operating_hours_to,
   machine_country,
   machine_city,
   zipcode,
   machine_radius,
   featuresId,
   machine_emissions_sticker,
   safetyId,
   machine_renting_possible,
   machine_road_licence,
   machine_discount_offers,
   machine_vendor,
   machine_dealer_rating,
   picture,
   video,
   day,
) => {
   //   const cityConditions = machine_city?.map(city => `machine_city_zipcode = '${city}'`).join(' OR ');
   const safetyString = safetyId?.map(e => `'${e}'`).join(', ');
   const featuresString = featuresId?.map(e => `'${e}'`).join(', ');

   const CONSTRUCTION_LIST = `
      SELECT
         count(machine_id)
      FROM
         construction_machines
      WHERE
         machine_active = true
         ${machine_condition ? `and machine_condition = '${machine_condition}'` : ""}
         ${machine_category ? `and machine_category = '${machine_category}'` : ""}
         ${machine_make ? `and machine_make = '${machine_make}'` : ""}
         ${machine_model ? `and machine_model ilike '%${machine_model}%'` : ""}
         ${machine_price_from ? `and ${machine_price_from} <= machine_price` : ""}
         ${machine_price_to ? `and ${machine_price_to} >= machine_price` : ""}
         ${machine_price_type ? `and machine_price_type = '${machine_price_type}'` : ""}
         ${machine_vat ? `and machine_vat = '${machine_vat}'` : ""}
         ${machine_construction_year_from ? `and ${machine_construction_year_from} <= machine_construction_year` : ""}
         ${machine_construction_year_to ? `and ${machine_construction_year_to} >= machine_construction_year` : ""}
         ${machine_operating_hours_from ? `and ${machine_operating_hours_from} <= machine_operating_hours` : ""}
         ${machine_operating_hours_to ? `and ${machine_operating_hours_to} >= machine_operating_hours` : ""}
         ${machine_country ? `and machine_country = '${machine_country}'` : ""}
         ${machine_city ? `and  machine_city_zipcode ilike '%${machine_city}%'` : ""}
         ${zipcode ? `and machine_city_zipcode ilike '%${zipcode}%'` : ""}
         ${machine_radius ? `and ${machine_radius} >= machine_radius` : ""}
         ${safetyId?.length > 0 ? `and machine_safety @> ARRAY[${safetyString}]` : ""}
         ${machine_emissions_sticker ? `and machine_emissions_sticker = '${machine_emissions_sticker}'` : ""}
         ${featuresId?.length > 0 ? `and machine_features @> ARRAY[${featuresString}]` : ""}
         ${machine_renting_possible == true ? `and machine_renting_possible = ${machine_renting_possible}` : ""}
         ${machine_road_licence == true ? `and machine_road_licence = ${machine_road_licence}` : ""}
         ${machine_discount_offers == true ? `and machine_discount_offers = ${machine_discount_offers}` : ""}
         ${machine_vendor ? `and machine_vendor = '${machine_vendor}'` : ""}
         ${machine_dealer_rating ? `and ${machine_dealer_rating} >= machine_dealer_rating` : ""}
         ${picture == true ? `and Array_Length(machine_images_url, 1) > 0` : ""}
         ${video == true ? `and machine_video_link != '' ` : ""}
         ${day ? `and machine_ad_create_at > current_date - interval '${day} days'` : ""};
   `;

   return fetch(CONSTRUCTION_LIST)
}
const addConstruction = (
   machine_make,
   machine_model,
   machine_describtion,
   machine_video_link,
   machine_condition,
   machine_category,
   machine_price,
   machine_price_type,
   machine_vat,
   machine_firt_date,
   machine_construction_year,
   machine_operating_hours,
   machine_country,
   machine_city_zipcode,
   machine_radius,
   featuresId,
   machine_emissions_sticker,
   safetyId,
   machine_renting_possible,
   machine_road_licence,
   machine_discount_offers,
   machine_vendor,
   machine_dealer_rating,
   user_id,
   user_phone,
   user_email,
   construction_img,
   construction_img_name
) => fetch(
   ADD_CONSTRUCTION,
   machine_make,
   machine_model,
   machine_describtion,
   machine_video_link,
   machine_condition,
   machine_category,
   machine_price,
   machine_price_type,
   machine_vat,
   machine_firt_date,
   machine_construction_year,
   machine_operating_hours,
   machine_country,
   machine_city_zipcode,
   machine_radius,
   featuresId,
   machine_emissions_sticker,
   safetyId,
   machine_renting_possible,
   machine_road_licence,
   machine_discount_offers,
   machine_vendor,
   machine_dealer_rating,
   user_id,
   user_phone,
   user_email,
   construction_img,
   construction_img_name
)
const updateConstruction = (
   id,
   machine_make,
   machine_model,
   machine_describtion,
   machine_video_link,
   machine_condition,
   machine_category,
   machine_price,
   machine_price_type,
   machine_vat,
   machine_firt_date,
   machine_construction_year,
   machine_operating_hours,
   machine_country,
   machine_city_zipcode,
   machine_radius,
   featuresId,
   machine_emissions_sticker,
   safetyId,
   machine_renting_possible,
   machine_road_licence,
   machine_discount_offers,
   machine_vendor,
   machine_dealer_rating,
   user_id,
   user_phone,
   user_email
) => fetch(
   UPDATE_CONSTRUCTION,
   id,
   machine_make,
   machine_model,
   machine_describtion,
   machine_video_link,
   machine_condition,
   machine_category,
   machine_price,
   machine_price_type,
   machine_vat,
   machine_firt_date,
   machine_construction_year,
   machine_operating_hours,
   machine_country,
   machine_city_zipcode,
   machine_radius,
   featuresId,
   machine_emissions_sticker,
   safetyId,
   machine_renting_possible,
   machine_road_licence,
   machine_discount_offers,
   machine_vendor,
   machine_dealer_rating,
   user_id,
   user_phone,
   user_email
)
const addImage = (id, construction_img, construction_img_name) => fetch(ADD_PHOTO, id, construction_img, construction_img_name)
const deleteImage = (id, machine_images_url, machine_images_name) => fetch(DELETE_PHOTO, id, machine_images_url, machine_images_name)

module.exports = {
   constructionListAdmin,
   constructionList,
   constructionCount,
   foundConstructionById,
   foundCompany,
   addConstruction,
   foundConstruction,
   updateConstruction,
   deleteConstruction,
   updateStatus,
   addImage,
   deleteImage
}