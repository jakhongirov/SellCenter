const { fetch, fetchALL } = require("../../lib/postgres");

const BY_ID = `
   SELECT
      *
   FROM
      agricultural_vehicles a
   INNER JOIN
      users b
   ON
      a.user_id = b.user_id
   WHERE
      vehicle_id = $1;
`;

const FOUND_COMPANY = `
   SELECT
      *
   FROM
      user_companies
   WHERE
      user_id = $1;
`;

const FOUND_VEHICLE = `
   SELECT
      vehicle_images_url,
      vehicle_images_name
   FROM
      agricultural_vehicles
   WHERE
      vehicle_id = $1;
`;

const DELETE_VEHICLE = `
   DELETE FROM
      agricultural_vehicles
   WHERE
      vehicle_id = $1
   RETURNING *;
`;

const UPDATE_STATUS = `
   UPDATE
      agricultural_vehicles
   SET
      vehicle_active = $2
   WHERE
      vehicle_id = $1
   RETURNING *;
`;

const UPDATE_VEHICLE = `
   UPDATE
      agricultural_vehicles
   SET
      vehicle_make = $2,
      vehicle_model = $3,
      vehicle_describtion = $4,
      vehicle_video_link = $5,
      vehicle_condition = $6,
      vehicle_category = $7,
      vehicle_price = $8,
      vehicle_price_type = $9,
      vehicle_vat = $10,
      vehicle_power = $11,
      vehicle_firt_date = $12,
      vehicle_construction_year = $13,
      vehicle_operating_hours = $14,
      vehicle_country = $15,
      vehicle_city_zipcode = $16,
      vehicle_radius = $17,
      vehicle_features = $18,
      vehicle_air_conditioning = $19,
      vehicle_interior_features = $20,
      vehicle_emissions_sticker = $21,
      vehicle_security = $22,
      vehicle_municipal = $23,
      vehicle_new_hu = $24,
      vehicle_renting_possible = $25,
      vehicle_discount_offers = $26,
      vehicle_vendor = $27,
      vehicle_dealer_rating = $28,
      user_id = $29,
      user_phone = $30,
      user_email = $31
   WHERE
      vehicle_id = $1
   RETURNING *;
`;

const ADD_VEHICLE = `
   INSERT INTO
      agricultural_vehicles (
         vehicle_make,
         vehicle_model,
         vehicle_describtion,
         vehicle_video_link,
         vehicle_condition,
         vehicle_category,
         vehicle_price,
         vehicle_price_type,
         vehicle_vat,
         vehicle_power,
         vehicle_firt_date,
         vehicle_construction_year,
         vehicle_operating_hours,
         vehicle_country,
         vehicle_city_zipcode,
         vehicle_radius,
         vehicle_features,
         vehicle_air_conditioning,
         vehicle_interior_features,
         vehicle_emissions_sticker,
         vehicle_security,
         vehicle_municipal,
         vehicle_new_hu,
         vehicle_renting_possible,
         vehicle_discount_offers,
         vehicle_vendor,
         vehicle_dealer_rating,
         user_id,
         user_phone,
         user_email,
         vehicle_images_url,
         vehicle_images_name
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
         $31,
         $32
      )
   RETURNING *;
`;

const ADD_PHOTO = `
   UPDATE
      agricultural_vehicles
   SET
      vehicle_images_url = array_cat(vehicle_images_url, $2),
      vehicle_images_name = array_cat(vehicle_images_name, $3)
   WHERE
      vehicle_id = $1
   RETURNING *;
`;

const DELETE_PHOTO = `
   UPDATE
      agricultural_vehicles
   SET
      vehicle_images_url = $2,
      vehicle_images_name = $3
   WHERE
      vehicle_id = $1
   RETURNING *;
`;

const adgriculturalList = (limit, offset) => {
   const LIST = `
      SELECT
         *
      FROM
         agricultural_vehicles
      ORDER BY
         vehicle_id DESC
      LIMIT ${limit}
      OFFSET ${offset}
   `;

   return fetchALL(LIST)
}
const foundVehcileById = (id) => fetch(BY_ID, id)
const foundCompany = (user_id) => fetch(FOUND_COMPANY, user_id)
const foundVehcile = (id) => fetch(FOUND_VEHICLE, id)
const deleteVehicle = (id) => fetch(DELETE_VEHICLE, id)
const updateStatus = (id, status) => fetch(UPDATE_STATUS, id, status)
const vehicleList = (
   vehicle_condition,
   vehicle_category,
   vehicle_make,
   vehicle_model,
   vehicle_price_from,
   vehicle_price_to,
   vehicle_price_type,
   vehicle_vat,
   vehicle_power_from,
   vehicle_power_to,
   vehicle_construction_year_from,
   vehicle_construction_year_to,
   vehicle_operating_hours_from,
   vehicle_operating_hours_to,
   vehicle_country,
   vehicle_city,
   zipcode,
   vehicle_radius,
   featuresId,
   vehicle_air_conditioning,
   interiorFeaturesId,
   vehicle_emissions_sticker,
   securityArr,
   day,
   vehicle_municipal,
   vehicle_new_hu,
   vehicle_renting_possible,
   vehicle_discount_offers,
   vehicle_vendor,
   vehicle_dealer_rating,
   picture,
   video,
   limit,
   offset
) => {
   //   const cityConditions = vehicle_city?.map(e => `vehicle_city_zipcode = '${e}'`).join(' OR ');
   const featuresString = featuresId?.map(e => `'${e}'`).join(', ');
   const interiorFeaturesString = interiorFeaturesId?.map(e => `'${e}'`).join(', ');
   const securityString = securityArr?.map(e => `'${e}'`).join(', ');

   const VEHICLE_LIST = `
      SELECT
         *
      FROM
         agricultural_vehicles
      WHERE
         vehicle_active = true
         ${vehicle_condition ? `and vehicle_condition = '${vehicle_condition}'` : ""}
         ${vehicle_category ? `and vehicle_category = '${vehicle_category}'` : ""}
         ${vehicle_make ? `and vehicle_make = '${vehicle_make}'` : ""}
         ${vehicle_model ? `and vehicle_model ilike '%${vehicle_model}%'` : ""}
         ${vehicle_price_from ? `and ${vehicle_price_from} <= vehicle_price` : ""}
         ${vehicle_price_to ? `and ${vehicle_price_to} >= vehicle_price` : ""}
         ${vehicle_price_type ? `and vehicle_price_type = '${vehicle_price_type}'` : ""}
         ${vehicle_vat ? `and vehicle_vat = '${vehicle_vat}'` : ""}
         ${vehicle_power_from ? `and ${vehicle_power_from} <= vehicle_power` : ""}
         ${vehicle_power_to ? `and ${vehicle_power_to} >= vehicle_power` : ""}
         ${vehicle_construction_year_from ? `and ${vehicle_construction_year_from} <= vehicle_construction_year` : ""}
         ${vehicle_construction_year_to ? `and ${vehicle_construction_year_to} >= vehicle_construction_year` : ""}
         ${vehicle_operating_hours_from ? `and ${vehicle_operating_hours_from} <= vehicle_operating_hours` : ""}
         ${vehicle_operating_hours_to ? `and ${vehicle_operating_hours_to} >= vehicle_operating_hours` : ""}
         ${vehicle_country ? `and vehicle_country ilike '%${vehicle_country}%'` : ""}
         ${vehicle_city ? `and vehicle_city_zipcode ilike '%${vehicle_city}%'` : ""}
         ${zipcode ? `and vehicle_city_zipcode ilike '%${zipcode}%'` : ""}
         ${vehicle_radius ? `and ${vehicle_radius} >= vehicle_radius` : ""}
         ${featuresId?.length > 0 ? `and vehicle_features @> ARRAY[${featuresString}]` : ''}
         ${vehicle_air_conditioning ? `and vehicle_air_conditioning = '${vehicle_air_conditioning}'` : ""}
         ${interiorFeaturesId?.length > 0 ? `and  vehicle_interior_features @> ARRAY[${interiorFeaturesString}]` : ''}
         ${vehicle_emissions_sticker ? `and vehicle_emissions_sticker = '${vehicle_emissions_sticker}'` : ""}
         ${securityArr?.length > 0 ? `and vehicle_security @> ARRAY[${securityString}]` : ''}
         ${vehicle_municipal == true ? `and vehicle_municipal = ${vehicle_municipal}` : ""}
         ${vehicle_new_hu == true ? `and vehicle_new_hu = ${vehicle_new_hu}` : ""}
         ${vehicle_renting_possible == true ? `and vehicle_renting_possible = ${vehicle_renting_possible}` : ""}
         ${vehicle_discount_offers == true ? `and vehicle_discount_offers = ${vehicle_discount_offers}` : ""}
         ${vehicle_vendor ? `and vehicle_vendor = '${vehicle_vendor}'` : ""}
         ${vehicle_dealer_rating ? `and vehicle_dealer_rating >= ${van_dealer_rating} ` : ""}
         ${picture == true ? `and Array_Length(vehicle_images_url, 1) > 0` : ""}
         ${video == true ? `and vehicle_video_link != '' ` : ""}
         ${day ? `and vehicle_ad_create_at > current_date - interval '${day} days'` : ""}
      ORDER BY
         vehicle_id DESC
      LIMIT ${limit}
      OFFSET ${offset};
   `;

   return fetchALL(VEHICLE_LIST)
}
const vehicleCount = (
   vehicle_condition,
   vehicle_category,
   vehicle_make,
   vehicle_model,
   vehicle_price_from,
   vehicle_price_to,
   vehicle_price_type,
   vehicle_vat,
   vehicle_power_from,
   vehicle_power_to,
   vehicle_construction_year_from,
   vehicle_construction_year_to,
   vehicle_operating_hours_from,
   vehicle_operating_hours_to,
   vehicle_country,
   vehicle_city,
   zipcode,
   vehicle_radius,
   featuresId,
   vehicle_air_conditioning,
   interiorFeaturesId,
   vehicle_emissions_sticker,
   securityArr,
   day,
   vehicle_municipal,
   vehicle_new_hu,
   vehicle_renting_possible,
   vehicle_discount_offers,
   vehicle_vendor,
   vehicle_dealer_rating,
   picture,
   video
) => {
   //   const cityConditions = vehicle_city?.map(e => `vehicle_city_zipcode = '${e}'`).join(' OR ');
   const featuresString = featuresId?.map(e => `'${e}'`).join(', ');
   const interiorFeaturesString = interiorFeaturesId?.map(e => `'${e}'`).join(', ');
   const securityString = securityArr?.map(e => `'${e}'`).join(', ');

   const VEHICLE_LIST = `
      SELECT
         count(vehicle_id)
      FROM
         agricultural_vehicles
      WHERE
         vehicle_active = true
         ${vehicle_condition ? `and vehicle_condition = '${vehicle_condition}'` : ""}
         ${vehicle_category ? `and vehicle_category = '${vehicle_category}'` : ""}
         ${vehicle_make ? `and vehicle_make = '${vehicle_make}'` : ""}
         ${vehicle_model ? `and vehicle_model ilike '%${vehicle_model}%'` : ""}
         ${vehicle_price_from ? `and ${vehicle_price_from} <= vehicle_price` : ""}
         ${vehicle_price_to ? `and ${vehicle_price_to} >= vehicle_price` : ""}
         ${vehicle_price_type ? `and vehicle_price_type = '${vehicle_price_type}'` : ""}
         ${vehicle_vat ? `and vehicle_vat = '${vehicle_vat}'` : ""}
         ${vehicle_power_from ? `and ${vehicle_power_from} <= vehicle_power` : ""}
         ${vehicle_power_to ? `and ${vehicle_power_to} >= vehicle_power` : ""}
         ${vehicle_construction_year_from ? `and ${vehicle_construction_year_from} <= vehicle_construction_year` : ""}
         ${vehicle_construction_year_to ? `and ${vehicle_construction_year_to} >= vehicle_construction_year` : ""}
         ${vehicle_operating_hours_from ? `and ${vehicle_operating_hours_from} <= vehicle_operating_hours` : ""}
         ${vehicle_operating_hours_to ? `and ${vehicle_operating_hours_to} >= vehicle_operating_hours` : ""}
         ${vehicle_country ? `and vehicle_country ilike '%${vehicle_country}%'` : ""}
         ${vehicle_city ? `and vehicle_city_zipcode ilike '%${vehicle_city}%'` : ""}
         ${zipcode ? `and vehicle_city_zipcode ilike '%${zipcode}%'` : ""}
         ${vehicle_radius ? `and ${vehicle_radius} >= vehicle_radius` : ""}
         ${featuresId?.length > 0 ? `and vehicle_features @> ARRAY[${featuresString}]` : ''}
         ${vehicle_air_conditioning ? `and vehicle_air_conditioning = '${vehicle_air_conditioning}'` : ""}
         ${interiorFeaturesId?.length > 0 ? `and vehicle_interior_features @> ARRAY[${interiorFeaturesString}]` : ''}
         ${vehicle_emissions_sticker ? `and vehicle_emissions_sticker = '${vehicle_emissions_sticker}'` : ""}
         ${securityArr?.length > 0 ? `and vehicle_security @> ARRAY[${securityString}]` : ''}
         ${vehicle_municipal == true ? `and vehicle_municipal = ${vehicle_municipal}` : ""}
         ${vehicle_new_hu == true ? `and vehicle_new_hu = ${vehicle_new_hu}` : ""}
         ${vehicle_renting_possible == true ? `and vehicle_renting_possible = ${vehicle_renting_possible}` : ""}
         ${vehicle_discount_offers == true ? `and vehicle_discount_offers = ${vehicle_discount_offers}` : ""}
         ${vehicle_vendor ? `and vehicle_vendor = '${vehicle_vendor}'` : ""}
         ${vehicle_dealer_rating ? `and vehicle_dealer_rating >= ${van_dealer_rating} ` : ""}
         ${picture == true ? `and Array_Length(vehicle_images_url, 1) > 0` : ""}
         ${video == true ? `and vehicle_video_link != '' ` : ""}
         ${day ? `and vehicle_ad_create_at > current_date - interval '${day} days'` : ""};
   `;

   return fetch(VEHICLE_LIST)
}
const addVehicle = (
   vehicle_make,
   vehicle_model,
   vehicle_describtion,
   vehicle_video_link,
   vehicle_condition,
   vehicle_category,
   vehicle_price,
   vehicle_price_type,
   vehicle_vat,
   vehicle_power,
   vehicle_firt_date,
   vehicle_construction_year,
   vehicle_operating_hours,
   vehicle_country,
   vehicle_city_zipcode,
   vehicle_radius,
   featuresId,
   vehicle_air_conditioning,
   interiorFeaturesId,
   vehicle_emissions_sticker,
   securityArr,
   vehicle_municipal,
   vehicle_new_hu,
   vehicle_renting_possible,
   vehicle_discount_offers,
   vehicle_vendor,
   vehicle_dealer_rating,
   user_id,
   user_phone,
   user_email,
   vehicle_img,
   vehicle_img_name
) => fetch(
   ADD_VEHICLE,
   vehicle_make,
   vehicle_model,
   vehicle_describtion,
   vehicle_video_link,
   vehicle_condition,
   vehicle_category,
   vehicle_price,
   vehicle_price_type,
   vehicle_vat,
   vehicle_power,
   vehicle_firt_date,
   vehicle_construction_year,
   vehicle_operating_hours,
   vehicle_country,
   vehicle_city_zipcode,
   vehicle_radius,
   featuresId,
   vehicle_air_conditioning,
   interiorFeaturesId,
   vehicle_emissions_sticker,
   securityArr,
   vehicle_municipal,
   vehicle_new_hu,
   vehicle_renting_possible,
   vehicle_discount_offers,
   vehicle_vendor,
   vehicle_dealer_rating,
   user_id,
   user_phone,
   user_email,
   vehicle_img,
   vehicle_img_name
)
const updateVehicle = (
   id,
   vehicle_make,
   vehicle_model,
   vehicle_describtion,
   vehicle_video_link,
   vehicle_condition,
   vehicle_category,
   vehicle_price,
   vehicle_price_type,
   vehicle_vat,
   vehicle_power,
   vehicle_firt_date,
   vehicle_construction_year,
   vehicle_operating_hours,
   vehicle_country,
   vehicle_city_zipcode,
   vehicle_radius,
   featuresId,
   vehicle_air_conditioning,
   interiorFeaturesId,
   vehicle_emissions_sticker,
   securityArr,
   vehicle_municipal,
   vehicle_new_hu,
   vehicle_renting_possible,
   vehicle_discount_offers,
   vehicle_vendor,
   vehicle_dealer_rating,
   user_id,
   user_phone,
   user_email
) => fetch(
   UPDATE_VEHICLE,
   id,
   vehicle_make,
   vehicle_model,
   vehicle_describtion,
   vehicle_video_link,
   vehicle_condition,
   vehicle_category,
   vehicle_price,
   vehicle_price_type,
   vehicle_vat,
   vehicle_power,
   vehicle_firt_date,
   vehicle_construction_year,
   vehicle_operating_hours,
   vehicle_country,
   vehicle_city_zipcode,
   vehicle_radius,
   featuresId,
   vehicle_air_conditioning,
   interiorFeaturesId,
   vehicle_emissions_sticker,
   securityArr,
   vehicle_municipal,
   vehicle_new_hu,
   vehicle_renting_possible,
   vehicle_discount_offers,
   vehicle_vendor,
   vehicle_dealer_rating,
   user_id,
   user_phone,
   user_email
)
const addImage = (id, vehicle_img, vehicle_img_name) => fetch(ADD_PHOTO, id, vehicle_img, vehicle_img_name)
const deleteImage = (id, vehicle_images_url, vehicle_images_name) => fetch(DELETE_PHOTO, id, vehicle_images_url, vehicle_images_name)

module.exports = {
   foundVehcileById,
   foundCompany,
   foundVehcile,
   deleteVehicle,
   vehicleList,
   vehicleCount,
   addVehicle,
   updateVehicle,
   adgriculturalList,
   updateStatus,
   addImage,
   deleteImage
}
