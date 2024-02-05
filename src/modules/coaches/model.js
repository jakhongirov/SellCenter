const { fetch, fetchALL } = require("../../lib/postgres");

const BY_ID = `
   SELECT 
      *
   FROM
      coaches a
   INNER JOIN
      users b
   ON
      a.user_id = b.user_id
   WHERE
      coache_id = $1;
`;

const FOUND_COACHE = `
   SELECT 
      coache_images_url,
      coache_images_name
   FROM
      coaches
   WHERE
      coache_id = $1;
`;

const DELETE_COACHE = `
   DELETE FROM
      coaches
   WHERE
      coache_id = $1
   RETURNING *;
`;

const UPDATE_STATUS = `
   UPDATE
      coaches
   SET
      coache_active = $2
   WHERE
      coache_id = $1
   RETURNING *;
`;

const ADD_COACHE = `
    INSERT INTO
      coaches (
         coache_make,
         coache_model,
         coache_describtion,
         coache_video_link,
         coache_condition,
         coache_category,
         coache_firt_date,
         coache_firt_date_year,
         coache_kilometre,
         coache_price,
         coache_price_type,
         coache_vat,
         coache_power,
         coache_country,
         coache_city_zipcode,
         coache_radius,
         coache_fuel_type,
         coache_transmission,
         coache_emission_class,
         coache_emissions_sticker,
         coache_features,
         coache_air_conditioning,
         coache_number_of_seats,
         coache_cruise_control,
         coache_trailer_coupling_fix,
         coache_interior_features,
         coache_exterior_colour,
         coache_damaged,
         coache_full_service_history,
         coache_new_hu,
         coache_renting_possible,
         coache_discount_offers,
         coache_vendor,
         coache_dealer_rating,
         user_id,
         user_phone,
         user_email,
         coache_images_url,
         coache_images_name
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
         $32,
         $33,
         $34,
         $35,
         $36,
         $37,
         $38,
         $39
      ) 
   RETURNING *;
`;

const UPDATE_COACHE = `
   UPDATE
      coaches
   SET
      coache_make = $2,
      coache_model = $3,
      coache_describtion = $4,
      coache_video_link = $5,
      coache_condition = $6,
      coache_category = $7,
      coache_firt_date = $8,
      coache_firt_date_year = $9,
      coache_kilometre = $10,
      coache_price = $11,
      coache_price_type = $12,
      coache_vat = $13,
      coache_power = $14,
      coache_country = $15,
      coache_city_zipcode = $16,
      coache_radius = $17,
      coache_fuel_type = $18,
      coache_transmission = $19,
      coache_emission_class = $20,
      coache_emissions_sticker = $21,
      coache_features = $22,
      coache_air_conditioning = $23,
      coache_number_of_seats = $24,
      coache_cruise_control = $25,
      coache_trailer_coupling_fix = $26,
      coache_interior_features = $27,
      coache_exterior_colour = $28,
      coache_damaged = $29,
      coache_full_service_history = $30,
      coache_new_hu = $31,
      coache_renting_possible = $32,
      coache_discount_offers = $33,
      coache_vendor = $34,
      coache_dealer_rating = $35,
      user_id = $36,
      user_phone = $37,
      user_email = $38,
      coache_images_url = $39,
      coache_images_name = $40
   WHERE
      coache_id = $1
   RETURNING *;
`;

const coacheListAdmin = (limit, offset) => {
   const LIST = `
      SELECT
         *
      FROM
         coaches
      ORDER BY 
         coache_id DESC
      LIMIT ${limit}
      OFFSET ${offset}
   `;

   return fetchALL(LIST)
}
const foundCoacheById = (id) => fetch(BY_ID, id)
const foundCoache = (id) => fetch(FOUND_COACHE, id)
const deleteCoache = (id) => fetch(DELETE_COACHE, id)
const updateStatus = (id, status) => fetch(UPDATE_STATUS, id, status)
const coachesList = (
   coache_condition,
   coache_category,
   coache_make,
   coache_model,
   coache_firt_date_year_from,
   coache_firt_date_year_to,
   coache_kilometre_from,
   coache_kilometre_to,
   coache_price_from,
   coache_price_to,
   coache_price_type,
   coache_vat,
   coache_power_from,
   coache_power_to,
   coache_country,
   coache_city,
   zipcode,
   coache_radius,
   fuelArr,
   transmissionArr,
   coache_emission_class,
   coache_emissions_sticker,
   featuresId,
   coache_air_conditioning,
   coache_number_of_seats_from,
   coache_number_of_seats_to,
   coache_cruise_control,
   coache_trailer_coupling_fix,
   interiorFeaturesId,
   colorArr,
   day,
   coache_damaged,
   coache_full_service_history,
   coache_new_hu,
   coache_renting_possible,
   coache_discount_offers,
   coache_vendor,
   coache_dealer_rating_from,
   picture,
   video,
   limit,
   offset
) => {
//   const cityConditions = coache_city?.map(city => `coache_city_zipcode = '${city}'`).join(' OR ');
   const fuelConditions = fuelArr?.map(e => `coache_fuel_type = '${e}'`).join(' OR ');
   const transmissionConditions = transmissionArr?.map(e => `coache_transmission = '${e}'`).join(' OR ');
   const featuresString = featuresId?.map(e => `'${e}'`).join(', ');
   const interiorFeaturesString = interiorFeaturesId?.map(e => `'${e}'`).join(', ');
   const colorConditions = colorArr?.map(e => `coache_exterior_colour = '${e}'`).join(' OR ');

   const COACHE_LIST = `
      SELECT
         *
      FROM
         coaches
      WHERE
         coache_active = true
         ${coache_condition ? `and coache_condition = '${coache_condition}'` : ""}
         ${coache_category ? `and coache_category = '${coache_category}'` : ""}
         ${coache_make ? `and coache_make = '${coache_make}'` : ""}
         ${coache_model ? `and coache_model ilike '%${coache_model}%'` : ""}
         ${coache_firt_date_year_from ? `and ${coache_firt_date_year_from} <= coache_firt_date_year` : ""}
         ${coache_firt_date_year_to ? `and ${coache_firt_date_year_to} >= coache_firt_date_year` : ""}
         ${coache_kilometre_from ? `and ${coache_kilometre_from} <= coache_kilometre` : ""}
         ${coache_kilometre_to ? `and ${coache_kilometre_to} >= coache_kilometre` : ""}
         ${coache_price_from ? `and ${coache_price_from} <= coache_price` : ""}
         ${coache_price_to ? `and ${coache_price_to} >= coache_price` : ""}
         ${coache_price_type ? `and coache_price_type = '${coache_price_type}'` : ""}
         ${coache_vat ? `and coache_vat = '${coache_vat}'` : ""}
         ${coache_power_from ? `and ${coache_power_from} <= coache_power` : ""}
         ${coache_power_to ? `and ${coache_power_to} >= coache_power` : ""}
         ${coache_country ? `and coache_country ilike '%${coache_country}%'` : ""}
         ${coache_city ? `and coache_city_zipcode ilike '%${coache_city}%'` : ""}
         ${zipcode ? `and coache_city_zipcode ilike '%${zipcode}%'` : ""}
         ${coache_radius ? `and ${coache_radius} >= coache_radius` : ""}
         ${fuelConditions ? `and (${fuelConditions})` : ''}
         ${transmissionConditions ? `and (${transmissionConditions})` : ''}
         ${coache_emission_class ? `and coache_emission_class = '${coache_emission_class}'` : ""}
         ${coache_emissions_sticker ? `and coache_emissions_sticker = '${coache_emissions_sticker}'` : ""}
         ${featuresId?.length > 0 ? `and coache_features @> ARRAY[${featuresString}]` : ''}
         ${coache_air_conditioning ? `and coache_air_conditioning = '${coache_air_conditioning}'` : ""}
         ${coache_number_of_seats_from ? `and ${coache_number_of_seats_from} <= coache_number_of_seats` : ""}
         ${coache_number_of_seats_to ? `and ${coache_number_of_seats_to} >= coache_number_of_seats` : ""}
         ${coache_cruise_control ? `and coache_cruise_control = '${coache_cruise_control}'` : ""}
         ${coache_trailer_coupling_fix == true ? `and coache_trailer_coupling_fix = ${coache_trailer_coupling_fix}` : ""}
         ${interiorFeaturesId?.length > 0 ? `and coache_interior_features @> ARRAY[${interiorFeaturesString}]` : ''}
         ${colorConditions ? `and (${colorConditions})` : ''}
         ${coache_damaged ? `and coache_damaged = '${coache_damaged}'` : ""}
         ${coache_full_service_history == true ? `and coache_full_service_history = ${coache_full_service_history}` : ""}
         ${coache_new_hu == true ? `and coache_new_hu = ${coache_new_hu}` : ""}
         ${coache_renting_possible == true ? `and coache_renting_possible = ${coache_renting_possible}` : ""}
         ${coache_discount_offers == true ? `and coache_discount_offers = ${coache_discount_offers}` : ""}
         ${coache_vendor ? `and coache_vendor = '${coache_vendor}'` : ""}
         ${coache_dealer_rating_from ? `and coache_dealer_rating_from >= ${coache_dealer_rating_from} ` : ""}
         ${picture == true ? `and Array_Length(coache_images_url, 1) > 0` : ""}
         ${video == true ? `and coache_video_link != '' ` : ""}
         ${day ? `and coache_ad_create_at > current_date - interval '${day} days'` : ""}
      ORDER BY
         coache_id DESC
      LIMIT ${limit}
      OFFSET ${offset}
   `;

   return fetchALL(COACHE_LIST)
}
const coachesCount = (
   coache_condition,
   coache_category,
   coache_make,
   coache_model,
   coache_firt_date_year_from,
   coache_firt_date_year_to,
   coache_kilometre_from,
   coache_kilometre_to,
   coache_price_from,
   coache_price_to,
   coache_price_type,
   coache_vat,
   coache_power_from,
   coache_power_to,
   coache_country,
   coache_city,
   zipcode,
   coache_radius,
   fuelArr,
   transmissionArr,
   coache_emission_class,
   coache_emissions_sticker,
   featuresId,
   coache_air_conditioning,
   coache_number_of_seats_from,
   coache_number_of_seats_to,
   coache_cruise_control,
   coache_trailer_coupling_fix,
   interiorFeaturesId,
   colorArr,
   day,
   coache_damaged,
   coache_full_service_history,
   coache_new_hu,
   coache_renting_possible,
   coache_discount_offers,
   coache_vendor,
   coache_dealer_rating_from,
   picture,
   video
) => {
//   const cityConditions = coache_city?.map(city => `coache_city_zipcode = '${city}'`).join(' OR ');
   const fuelConditions = fuelArr?.map(e => `coache_fuel_type = '${e}'`).join(' OR ');
   const transmissionConditions = transmissionArr?.map(e => `coache_transmission = '${e}'`).join(' OR ');
   const colorConditions = colorArr?.map(e => `coache_exterior_colour = '${e}'`).join(' OR ');
   const featuresString = featuresId?.map(e => `'${e}'`).join(', ');
   const interiorFeaturesString = interiorFeaturesId?.map(e => `'${e}'`).join(', ');

   const COACHE_LIST = `
   SELECT
      count(coache_id)
   FROM
      coaches
   WHERE
      coache_active = true
      ${coache_condition ? `and coache_condition = '${coache_condition}'` : ""}
      ${coache_category ? `and coache_category = '${coache_category}'` : ""}
      ${coache_make ? `and coache_make = '${coache_make}'` : ""}
      ${coache_model ? `and coache_model ilike '%${coache_model}%'` : ""}
      ${coache_firt_date_year_from ? `and ${coache_firt_date_year_from} <= coache_firt_date_year` : ""}
      ${coache_firt_date_year_to ? `and ${coache_firt_date_year_to} >= coache_firt_date_year` : ""}
      ${coache_kilometre_from ? `and ${coache_kilometre_from} <= coache_kilometre` : ""}
      ${coache_kilometre_to ? `and ${coache_kilometre_to} >= coache_kilometre` : ""}
      ${coache_price_from ? `and ${coache_price_from} <= coache_price` : ""}
      ${coache_price_to ? `and ${coache_price_to} >= coache_price` : ""}
      ${coache_price_type ? `and coache_price_type = '${coache_price_type}'` : ""}
      ${coache_vat ? `and coache_vat = '${coache_vat}'` : ""}
      ${coache_power_from ? `and ${coache_power_from} <= coache_power` : ""}
      ${coache_power_to ? `and ${coache_power_to} >= coache_power` : ""}
      ${coache_country ? `and coache_country ilike '%${coache_country}%'` : ""}
      ${coache_city ? `and coache_city_zipcode ilike '%${coache_city}%'` : ""}
      ${zipcode ? `and coache_city_zipcode ilike '%${zipcode}%'` : ""}
      ${coache_radius ? `and ${coache_radius} >= coache_radius` : ""}
      ${fuelConditions ? `and (${fuelConditions})` : ''}
      ${transmissionConditions ? `and (${transmissionConditions})` : ''}
      ${coache_emission_class ? `and coache_emission_class = '${coache_emission_class}'` : ""}
      ${coache_emissions_sticker ? `and coache_emissions_sticker = '${coache_emissions_sticker}'` : ""}
      ${featuresId?.length > 0 ? `and coache_features @> ARRAY[${featuresString}]` : ''}
      ${coache_air_conditioning ? `and coache_air_conditioning = '${coache_air_conditioning}'` : ""}
      ${coache_number_of_seats_from ? `and ${coache_number_of_seats_from} <= coache_number_of_seats` : ""}
      ${coache_number_of_seats_to ? `and ${coache_number_of_seats_to} >= coache_number_of_seats` : ""}
      ${coache_cruise_control ? `and coache_cruise_control = '${coache_cruise_control}'` : ""}
      ${coache_trailer_coupling_fix == true ? `and coache_trailer_coupling_fix = ${coache_trailer_coupling_fix}` : ""}
      ${interiorFeaturesId?.length > 0 ? `and coache_interior_features @> ARRAY[${interiorFeaturesString}]` : ''}
      ${colorConditions ? `and (${colorConditions})` : ''}
      ${coache_damaged ? `and coache_damaged = '${coache_damaged}'` : ""}
      ${coache_full_service_history == true ? `and coache_full_service_history = ${coache_full_service_history}` : ""}
      ${coache_new_hu == true ? `and coache_new_hu = ${coache_new_hu}` : ""}
      ${coache_renting_possible == true ? `and coache_renting_possible = ${coache_renting_possible}` : ""}
      ${coache_discount_offers == true ? `and coache_discount_offers = ${coache_discount_offers}` : ""}
      ${coache_vendor ? `and coache_vendor = '${coache_vendor}'` : ""}
      ${coache_dealer_rating_from ? `and coache_dealer_rating_from >= ${coache_dealer_rating_from} ` : ""}
      ${picture == true ? `and Array_Length(coache_images_url, 1) > 0` : ""}
      ${video == true ? `and coache_video_link != '' ` : ""}
      ${day ? `and coache_ad_create_at > current_date - interval '${day} days'` : ""};
`;

   return fetch(COACHE_LIST)
}
const addCoache = (
   coache_make,
   coache_model,
   coache_describtion,
   coache_video_link,
   coache_condition,
   coache_category,
   coache_firt_date,
   coache_firt_date_year,
   coache_kilometre,
   coache_price,
   coache_price_type,
   coache_vat,
   coache_power,
   coache_country,
   coache_city_zipcode,
   coache_radius,
   coache_fuel_type,
   coache_transmission,
   coache_emission_class,
   coache_emissions_sticker,
   featuresId,
   coache_air_conditioning,
   coache_number_of_seats,
   coache_cruise_control,
   coache_trailer_coupling_fix,
   interiorFeaturesId,
   coache_exterior_colour,
   coache_damaged,
   coache_full_service_history,
   coache_new_hu,
   coache_renting_possible,
   coache_discount_offers,
   coache_vendor,
   coache_dealer_rating,
   user_id,
   user_phone,
   user_email,
   coache_img,
   coache_img_name
) => fetch(
   ADD_COACHE,
   coache_make,
   coache_model,
   coache_describtion,
   coache_video_link,
   coache_condition,
   coache_category,
   coache_firt_date,
   coache_firt_date_year,
   coache_kilometre,
   coache_price,
   coache_price_type,
   coache_vat,
   coache_power,
   coache_country,
   coache_city_zipcode,
   coache_radius,
   coache_fuel_type,
   coache_transmission,
   coache_emission_class,
   coache_emissions_sticker,
   featuresId,
   coache_air_conditioning,
   coache_number_of_seats,
   coache_cruise_control,
   coache_trailer_coupling_fix,
   interiorFeaturesId,
   coache_exterior_colour,
   coache_damaged,
   coache_full_service_history,
   coache_new_hu,
   coache_renting_possible,
   coache_discount_offers,
   coache_vendor,
   coache_dealer_rating,
   user_id,
   user_phone,
   user_email,
   coache_img,
   coache_img_name
)

const updateCoache = (
   id,
   coache_make,
   coache_model,
   coache_describtion,
   coache_video_link,
   coache_condition,
   coache_category,
   coache_firt_date,
   coache_firt_date_year,
   coache_kilometre,
   coache_price,
   coache_price_type,
   coache_vat,
   coache_power,
   coache_country,
   coache_city_zipcode,
   coache_radius,
   coache_fuel_type,
   coache_transmission,
   coache_emission_class,
   coache_emissions_sticker,
   featuresId,
   coache_air_conditioning,
   coache_number_of_seats,
   coache_cruise_control,
   coache_trailer_coupling_fix,
   interiorFeaturesId,
   coache_exterior_colour,
   coache_damaged,
   coache_full_service_history,
   coache_new_hu,
   coache_renting_possible,
   coache_discount_offers,
   coache_vendor,
   coache_dealer_rating,
   user_id,
   user_phone,
   user_email,
   coache_img,
   coache_img_name
) => fetch(
   UPDATE_COACHE,
   id,
   coache_make,
   coache_model,
   coache_describtion,
   coache_video_link,
   coache_condition,
   coache_category,
   coache_firt_date,
   coache_firt_date_year,
   coache_kilometre,
   coache_price,
   coache_price_type,
   coache_vat,
   coache_power,
   coache_country,
   coache_city_zipcode,
   coache_radius,
   coache_fuel_type,
   coache_transmission,
   coache_emission_class,
   coache_emissions_sticker,
   featuresId,
   coache_air_conditioning,
   coache_number_of_seats,
   coache_cruise_control,
   coache_trailer_coupling_fix,
   interiorFeaturesId,
   coache_exterior_colour,
   coache_damaged,
   coache_full_service_history,
   coache_new_hu,
   coache_renting_possible,
   coache_discount_offers,
   coache_vendor,
   coache_dealer_rating,
   user_id,
   user_phone,
   user_email,
   coache_img,
   coache_img_name
)

module.exports = {
   coacheListAdmin,
   foundCoacheById,
   foundCoache,
   deleteCoache,
   coachesList,
   coachesCount,
   addCoache,
   updateCoache,
   updateStatus
}