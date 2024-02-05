const { fetch, fetchALL } = require("../../lib/postgres");

const FOUND_MOTORCYCLE_BY_ID = `
   SELECT
      *
   FROM
      motorcycles a
   INNER JOIN
      users b
   ON
      a.user_id = b.user_id
   WHERE
      motorcycle_id = $1;
`;

const ADD_MOTORCYCLE = `
   INSERT INTO
      motorcycles (
         motorcycle_make,
         motorcycle_model,
         motorcycle_description,
         motorcycle_condition,
         motorcycle_vide_link,
         motorcycle_type,
         motorcycle_price,
         motorcycle_firt_date,
         motorcycle_firt_date_year,
         motorcycle_mileage,
         motorcycle_power,
         motorcycle_country,
         motorcycle_city_zipcode,
         motorcycle_radius,
         motorcycle_fuel_type,
         motorcycle_driving_mode,
         motorcycle_transmission,
         motorcycle_cubic_capacity,
         motorcycle_exterior_colour,
         others,
         motorcycle_vat,
         motorcycle_discount_offers,
         motorcycle_vendor,
         motorcycle_history,
         motorcycle_damaged,
         motorcycle_number_owners,
         motorcycle_approved_used_programme,
         motorcycle_dealer_rating,
         user_id,
         user_phone,
         user_email,
         motorcycle_images_url,
         motorcycle_images_name
      )
      VALUES (
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
         $32,
         $33
      ) RETURNING *;
`;

const FOUND_MOTORCYCLE = `
   SELECT
      motorcycle_id,
      motorcycle_images_url,
      motorcycle_images_name
   FROM
      motorcycles
   WHERE 
      motorcycle_id = $1;
`;

const UPDATE_MOTORCYCLE = `
   UPDATE
      motorcycles
   SET
      motorcycle_make = $2,
      motorcycle_model = $3,
      motorcycle_description = $4,
      motorcycle_condition = $5,
      motorcycle_vide_link = $6,
      motorcycle_type = $7,
      motorcycle_price = $8,
      motorcycle_firt_date = $9,
      motorcycle_firt_date_year = $10,
      motorcycle_mileage = $11,
      motorcycle_power = $12,
      motorcycle_country = $13,
      motorcycle_city_zipcode = $14,
      motorcycle_radius = $15,
      motorcycle_fuel_type = $16,
      motorcycle_driving_mode = $17,
      motorcycle_transmission = $18,
      motorcycle_cubic_capacity = $19,
      motorcycle_exterior_colour = $20,
      others = $21,
      motorcycle_vat = $22,
      motorcycle_discount_offers = $23,
      motorcycle_vendor = $24,
      motorcycle_history = $25,
      motorcycle_damaged = $26,
      motorcycle_number_owners = $27,
      motorcycle_approved_used_programme = $28,
      motorcycle_dealer_rating = $29,
      user_id = $30,
      user_phone = $31,
      user_email = $32,
      motorcycle_images_url = $33,
      motorcycle_images_name = $34
   WHERE
      motorcycle_id = $1
   RETURNING *;
`;

const DELETE_MOTORCYCLE = `
   DELETE FROM
      motorcycles
   WHERE
      motorcycle_id = $1
   RETURNING *;
`;

const UPDATE_STATUS = `
   UPDATE
      motorcycles
   SET
      motorcycle_active = $2
   WHERE
      motorcycle_id = $1
   RETURNING *;
`;

const motorcycleListAdmin = (limit, offset) => {
   const LIST = `
      SELECT
         *
      FROM
         motorcycles
      ORDER BY
         motorcycle_id DESC
      LIMIT ${limit}
      OFFSET ${offset};
   `;

   return fetchALL(LIST)
}
const motorcycleList = (
   motorcycle_condition,
   motorcycle_make,
   motorcycle_model,
   types,
   motorcycle_price_from,
   motorcycle_price_to,
   motorcycle_firt_date_year_from,
   motorcycle_firt_date_year_to,
   motorcycle_mileage_from,
   motorcycle_mileage_to,
   motorcycle_power_from,
   motorcycle_power_to,
   motorcycle_country,
   motorcycle_city,
   zipcode,
   motorcycle_radius,
   fuelArr,
   modeArr,
   transmissionArr,
   motorcycle_cubic_capacity_from,
   motorcycle_cubic_capacity_to,
   colorArr,
   others,
   motorcycle_vat,
   days,
   picture,
   video,
   motorcycle_discount_offers,
   motorcycle_vendor,
   motorcycle_dealer_rating,
   historyArr,
   motorcycle_damaged,
   motorcycle_number_owners,
   motorcycle_approved_used_programme,
   offset,
   limit
) => {
    const typesConditions = types?.map(e => `motorcycle_type = '${e}'`).join(' OR ');
//   const cityConditions = motorcycle_city?.map(city => `motorcycle_city_zipcode = '${city}'`).join(' OR ');
   const fuelArrConditions = fuelArr?.map(e => `motorcycle_fuel_type = '${e}'`).join(' OR ');
   const modeArrConditions = modeArr?.map(e => `motorcycle_driving_mode = '${e}'`).join(' OR ');
   const colorArrConditions = colorArr?.map(e => `motorcycle_exterior_colour = '${e}'`).join(' OR ');
   const transmissionArrConditions = transmissionArr?.map(e => `motorcycle_transmission = '${e}'`).join(' OR ');
   const historyArrConditions = historyArr?.map(e => `motorcycle_history = '${e}'`).join(' OR ');
   const othersString = others?.map(other => `'${other}'`).join(', ');

   const FOUND_MOTORCYCLE_LIST = `
      SELECT
         *
      FROM
         motorcycles
      WHERE
         motorcycle_active = true
         ${motorcycle_condition ? `and motorcycle_condition = '${motorcycle_condition}'` : ""}
         ${motorcycle_make ? `and motorcycle_make = '${motorcycle_make}'` : ""}
         ${motorcycle_model ? `and motorcycle_model ilike '%${motorcycle_model}%'` : ""}
         ${typesConditions ? `and (${typesConditions})` : ""}
         ${motorcycle_price_from ? `and motorcycle_price >= ${motorcycle_price_from}` : ""}
         ${motorcycle_price_to ? `and motorcycle_price =< ${motorcycle_price_to}` : ""}
         ${motorcycle_firt_date_year_from ? `and motorcycle_firt_date_year >= ${motorcycle_firt_date_year_from}` : ""}
         ${motorcycle_firt_date_year_to ? `and motorcycle_firt_date_year =< ${motorcycle_firt_date_year_to}` : ""}
         ${motorcycle_mileage_from ? `and motorcycle_mileage >= ${motorcycle_mileage_from}` : ""}
         ${motorcycle_mileage_to ? `and motorcycle_mileage =< ${motorcycle_mileage_to}` : ""}
         ${motorcycle_power_from ? `and motorcycle_power >= ${motorcycle_power_from}` : ""}
         ${motorcycle_power_to ? `and motorcycle_power =< ${motorcycle_power_to}` : ""}
         ${motorcycle_country ? `and motorcycle_country ilike '%${motorcycle_country}%'` : ""}
         ${motorcycle_city ? `and motorcycle_city_zipcode ilike '%${motorcycle_city}%'` : ""}
         ${zipcode ? `and motorcycle_city_zipcode ilike '%${zipcode}%'` : ""}
         ${motorcycle_radius ? `and motorcycle_radius = ${motorcycle_radius}` : ""}
         ${fuelArrConditions ? `and (${fuelArrConditions})` : ''}
         ${modeArrConditions ? `and (${modeArrConditions})` : ''}
         ${transmissionArrConditions ? `and (${transmissionArrConditions})` : ''}
         ${motorcycle_cubic_capacity_from ? `and motorcycle_cubic_capacity >= ${motorcycle_cubic_capacity_from}` : ""}
         ${motorcycle_cubic_capacity_to ? `and motorcycle_cubic_capacity =< ${motorcycle_cubic_capacity_to}` : ""}
         ${colorArrConditions ? `and (${colorArrConditions})` : ''}
         ${others?.length > 0 ? `and others @> ARRAY[${othersString}]` : ""}
         ${motorcycle_vat ? `and motorcycle_vat = '${motorcycle_vat}'` : ""}
         ${days ? `and motorcycle_ad_create_at > current_date - interval '${days} days'` : ""}
         ${picture == true ? `and Array_Length(motorcycle_images_url, 1) > 0` : ""}
         ${video == true ? `and motorcycle_vide_link != '' ` : ""}
         ${motorcycle_vendor ? `and motorcycle_vendor = '${motorcycle_vendor}'` : ""}
         ${motorcycle_dealer_rating ? `and motorcycle_dealer_rating = ${motorcycle_dealer_rating}` : ""}
         ${historyArrConditions ? `and (${historyArrConditions})` : ''}
         ${motorcycle_damaged ? `and motorcycle_damaged = '${motorcycle_damaged}'` : ""}
         ${motorcycle_number_owners ? `and motorcycle_number_owners = ${motorcycle_number_owners}` : ""}
         ${motorcycle_approved_used_programme ? `and motorcycle_number_owners = '${motorcycle_approved_used_programme}'` : ""}
         ${motorcycle_discount_offers == true ? `and motorcycle_discount_offers = ${motorcycle_discount_offers}` : ""}
      ORDER BY
         motorcycle_id DESC
      LIMIT ${limit}
      OFFSET ${offset};
   `;

   return fetchALL(FOUND_MOTORCYCLE_LIST)
}
const motorcycleCount = (
   motorcycle_condition,
   motorcycle_make,
   motorcycle_model,
   types,
   motorcycle_price_from,
   motorcycle_price_to,
   motorcycle_firt_date_year_from,
   motorcycle_firt_date_year_to,
   motorcycle_mileage_from,
   motorcycle_mileage_to,
   motorcycle_power_from,
   motorcycle_power_to,
   motorcycle_country,
   motorcycle_city,
   zipcode,
   motorcycle_radius,
   fuelArr,
   modeArr,
   transmissionArr,
   motorcycle_cubic_capacity_from,
   motorcycle_cubic_capacity_to,
   colorArr,
   others,
   motorcycle_vat,
   days,
   picture,
   video,
   motorcycle_discount_offers,
   motorcycle_vendor,
   motorcycle_dealer_rating,
   historyArr,
   motorcycle_damaged,
   motorcycle_number_owners,
   motorcycle_approved_used_programme
) => {
  const typesConditions = types?.map(e => `motorcycle_type = '${e}'`).join(' OR ');
//   const cityConditions = motorcycle_city?.map(city => `motorcycle_city_zipcode = '${city}'`).join(' OR ');
   const fuelArrConditions = fuelArr?.map(e => `motorcycle_fuel_type = '${e}'`).join(' OR ');
   const modeArrConditions = modeArr?.map(e => `motorcycle_driving_mode = '${e}'`).join(' OR ');
   const colorArrConditions = colorArr?.map(e => `motorcycle_exterior_colour = '${e}'`).join(' OR ');
   const transmissionArrConditions = transmissionArr?.map(e => `motorcycle_transmission = '${e}'`).join(' OR ');
   const historyArrConditions = historyArr?.map(e => `motorcycle_history = '${e}'`).join(' OR ');
   const othersString = others?.map(other => `'${other}'`).join(', ');

   const FOUND_MOTORCYCLE_COUNT = `
   SELECT
      count(motorcycle_id)
   FROM
      motorcycles
   WHERE
      motorcycle_active = true
      ${motorcycle_condition ? `and motorcycle_condition = '${motorcycle_condition}'` : ""}
      ${motorcycle_make ? `and motorcycle_make = '${motorcycle_make}'` : ""}
      ${motorcycle_model ? `and motorcycle_model ilike '%${motorcycle_model}%'` : ""}
      ${typesConditions ? `and (${typesConditions})` : ""}
      ${motorcycle_price_from ? `and motorcycle_price >= ${motorcycle_price_from}` : ""}
      ${motorcycle_price_to ? `and motorcycle_price =< ${motorcycle_price_to}` : ""}
      ${motorcycle_firt_date_year_from ? `and motorcycle_firt_date_year >= ${motorcycle_firt_date_year_from}` : ""}
      ${motorcycle_firt_date_year_to ? `and motorcycle_firt_date_year =< ${motorcycle_firt_date_year_to}` : ""}
      ${motorcycle_mileage_from ? `and motorcycle_mileage >= ${motorcycle_mileage_from}` : ""}
      ${motorcycle_mileage_to ? `and motorcycle_mileage =< ${motorcycle_mileage_to}` : ""}
      ${motorcycle_power_from ? `and motorcycle_power >= ${motorcycle_power_from}` : ""}
      ${motorcycle_power_to ? `and motorcycle_power =< ${motorcycle_power_to}` : ""}
      ${motorcycle_country ? `and motorcycle_country ilike '%${motorcycle_country}%'` : ""}
      ${motorcycle_city ? `and motorcycle_city_zipcode ilike '%${motorcycle_city}%'` : ""}
      ${zipcode ? `and motorcycle_city_zipcode ilike '%${zipcode}%'` : ""}
      ${motorcycle_radius ? `and motorcycle_radius = ${motorcycle_radius}` : ""}
      ${fuelArrConditions ? `and (${fuelArrConditions})` : ''}
      ${modeArrConditions ? `and (${modeArrConditions})` : ''}
      ${transmissionArrConditions ? `and (${transmissionArrConditions})` : ''}
      ${motorcycle_cubic_capacity_from ? `and motorcycle_cubic_capacity >= ${motorcycle_cubic_capacity_from}` : ""}
      ${motorcycle_cubic_capacity_to ? `and motorcycle_cubic_capacity =< ${motorcycle_cubic_capacity_to}` : ""}
      ${colorArrConditions ? `and (${colorArrConditions})` : ''}
      ${others?.length ? `and others @> ARRAY[${othersString}]` : ""}
      ${motorcycle_vat ? `and motorcycle_vat = '${motorcycle_vat}'` : ""}
      ${days ? `and motorcycle_ad_create_at > current_date - interval '${days} days'` : ""}
      ${picture == true ? `and Array_Length(motorcycle_images_url, 1) > 0` : ""}
      ${video == true ? `and motorcycle_vide_link != '' ` : ""}
      ${motorcycle_vendor ? `and motorcycle_vendor = '${motorcycle_vendor}'` : ""}
      ${motorcycle_dealer_rating ? `and motorcycle_dealer_rating = ${motorcycle_dealer_rating}` : ""}
      ${historyArrConditions ? `and (${historyArrConditions})` : ''}
      ${motorcycle_damaged ? `and motorcycle_damaged = '${motorcycle_damaged}'` : ""}
      ${motorcycle_number_owners ? `and motorcycle_number_owners = ${motorcycle_number_owners}` : ""}
      ${motorcycle_approved_used_programme ? `and motorcycle_number_owners = '${motorcycle_approved_used_programme}'` : ""}
      ${motorcycle_discount_offers == true ? `and motorcycle_discount_offers = ${motorcycle_discount_offers}` : ""};
`;

   return fetch(FOUND_MOTORCYCLE_COUNT)
}
const foundMotorcycleById = (id) => fetch(FOUND_MOTORCYCLE_BY_ID, id)
const addMotorcycle = (
   motorcycle_make,
   motorcycle_model,
   motorcycle_description,
   motorcycle_condition,
   motorcycle_vide_link,
   typesId,
   motorcycle_price,
   motorcycle_firt_date,
   motorcycle_firt_date_year,
   motorcycle_mileage,
   motorcycle_power,
   motorcycle_country,
   motorcycle_city_zipcode,
   motorcycle_radius,
   motorcycle_fuel_type,
   motorcycle_driving_mode,
   motorcycle_transmission,
   motorcycle_cubic_capacity,
   motorcycle_exterior_colour,
   othersId,
   motorcycle_vat,
   motorcycle_discount_offers,
   motorcycle_vendor,
   motorcycle_history,
   motorcycle_damaged,
   motorcycle_number_owners,
   motorcycle_approved_used_programme,
   motorcycle_dealer_rating,
   user_id,
   user_phone,
   user_email,
   motorcycle_img,
   motorcycle_img_name
) => fetch(
   ADD_MOTORCYCLE,
   motorcycle_make,
   motorcycle_model,
   motorcycle_description,
   motorcycle_condition,
   motorcycle_vide_link,
   typesId,
   motorcycle_price,
   motorcycle_firt_date,
   motorcycle_firt_date_year,
   motorcycle_mileage,
   motorcycle_power,
   motorcycle_country,
   motorcycle_city_zipcode,
   motorcycle_radius,
   motorcycle_fuel_type,
   motorcycle_driving_mode,
   motorcycle_transmission,
   motorcycle_cubic_capacity,
   motorcycle_exterior_colour,
   othersId,
   motorcycle_vat,
   motorcycle_discount_offers,
   motorcycle_vendor,
   motorcycle_history,
   motorcycle_damaged,
   motorcycle_number_owners,
   motorcycle_approved_used_programme,
   motorcycle_dealer_rating,
   user_id,
   user_phone,
   user_email,
   motorcycle_img,
   motorcycle_img_name
)
const foundMotorCycle = (motorcycle_id) => fetch(FOUND_MOTORCYCLE, motorcycle_id)
const updateMotorcycle = (
   motorcycle_id,
   motorcycle_make,
   motorcycle_model,
   motorcycle_description,
   motorcycle_condition,
   motorcycle_vide_link,
   typesId,
   motorcycle_price,
   motorcycle_firt_date,
   motorcycle_firt_date_year,
   motorcycle_mileage,
   motorcycle_power,
   motorcycle_country,
   motorcycle_city_zipcode,
   motorcycle_radius,
   motorcycle_fuel_type,
   motorcycle_driving_mode,
   motorcycle_transmission,
   motorcycle_cubic_capacity,
   motorcycle_exterior_colour,
   othersId,
   motorcycle_vat,
   motorcycle_discount_offers,
   motorcycle_vendor,
   motorcycle_history,
   motorcycle_damaged,
   motorcycle_number_owners,
   motorcycle_approved_used_programme,
   motorcycle_dealer_rating,
   user_id,
   user_phone,
   user_email,
   motorcycle_img,
   motorcycle_img_name
) => fetch(
   UPDATE_MOTORCYCLE,
   motorcycle_id,
   motorcycle_make,
   motorcycle_model,
   motorcycle_description,
   motorcycle_condition,
   motorcycle_vide_link,
   typesId,
   motorcycle_price,
   motorcycle_firt_date,
   motorcycle_firt_date_year,
   motorcycle_mileage,
   motorcycle_power,
   motorcycle_country,
   motorcycle_city_zipcode,
   motorcycle_radius,
   motorcycle_fuel_type,
   motorcycle_driving_mode,
   motorcycle_transmission,
   motorcycle_cubic_capacity,
   motorcycle_exterior_colour,
   othersId,
   motorcycle_vat,
   motorcycle_discount_offers,
   motorcycle_vendor,
   motorcycle_history,
   motorcycle_damaged,
   motorcycle_number_owners,
   motorcycle_approved_used_programme,
   motorcycle_dealer_rating,
   user_id,
   user_phone,
   user_email,
   motorcycle_img,
   motorcycle_img_name
)
const deleteMotorcycle = (motorcycle_id) => fetch(DELETE_MOTORCYCLE, motorcycle_id)
const updateStatus = (motorcycle_id, status) => fetch(UPDATE_STATUS, motorcycle_id, status)

module.exports = {
   motorcycleListAdmin,
   motorcycleList,
   motorcycleCount,
   foundMotorcycleById,
   addMotorcycle,
   foundMotorCycle,
   updateMotorcycle,
   deleteMotorcycle,
   updateStatus
}