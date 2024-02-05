const { fetch, fetchALL } = require("../../lib/postgres");

const BY_ID = `
   SELECT
      *
   FROM
      vans a
   INNER JOIN
      users b
   ON
      a.user_id = b.user_id
   WHERE
      van_id = $1;
`;

const FOUND_VAN = `
   SELECT
      van_images_url,
      van_images_name
   FROM
      vans
   WHERE
      van_id = $1;
`;

const DELETE_VAN = `
   DELETE FROM
      vans
   WHERE
      van_id = $1
   RETURNING *;
`;

const UPDATE_STATUS = `
   UPDATE
      vans
   SET
      van_active = $2
   WHERE
      van_id = $1
   RETURNING *;
`;

const ADD_VAN = `
   INSERT INTO
      vans (
         van_make,
         van_model,
         van_describtion,
         van_video_link,
         van_condition,
         van_category,
         van_firt_date,
         van_firt_date_year,
         van_kilometre,
         van_price,
         van_price_type,
         van_vat,
         van_power,
         van_country,
         van_city_zipcode,
         van_radius,
         van_fuel_type,
         van_transmission,
         van_emission_class,
         van_emissions_sticker,
         van_features,
         van_air_conditioning,
         van_gvw,
         van_parking_sensors,
         van_sliding_door,
         van_driving_cab,
         van_number_of_seats,
         van_cruise_control,
         van_trailer_coupling_fix,
         van_interior_features,
         van_exterior_colour,
         van_damaged,
         van_approved_used_programme,
         van_full_service_history,
         van_municipal,
         van_new_hu,
         van_renting_possible,
         van_discount_offers,
         van_vendor,
         user_id,
         user_phone,
         user_email,
         van_images_url,
         van_images_name
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
         $39,
         $40,
         $41,
         $42,
         $43,
         $44
      ) RETURNING *;
`;

const UPDATE_VAN = `
   UPDATE 
      vans
   SET
      van_make = $2,
      van_model = $3,
      van_describtion = $4,
      van_video_link = $5,
      van_condition = $6,
      van_category = $7,
      van_firt_date = $8,
      van_firt_date_year = $9,
      van_kilometre = $10,
      van_price = $11,
      van_price_type = $12,
      van_vat = $13,
      van_power = $14,
      van_country = $15,
      van_city_zipcode = $16,
      van_radius = $17,
      van_fuel_type = $18,
      van_transmission = $19,
      van_emission_class = $20,
      van_emissions_sticker = $21,
      van_features = $22,
      van_air_conditioning = $23,
      van_gvw = $24,
      van_parking_sensors = $25,
      van_sliding_door = $26,
      van_driving_cab = $27,
      van_number_of_seats = $28,
      van_cruise_control = $29,
      van_trailer_coupling_fix = $30,
      van_interior_features = $31,
      van_exterior_colour = $32,
      van_damaged = $33,
      van_approved_used_programme = $34,
      van_full_service_history = $35,
      van_municipal = $36,
      van_new_hu = $37,
      van_renting_possible = $38,
      van_discount_offers = $39,
      van_vendor = $40,
      user_id = $41,
      user_phone = $42,
      user_email = $43,
      van_images_url = $44,
      van_images_name = $45
   WHERE 
      van_id = $1
   RETURNING *;
`;

const vanListAdmin = (limit, offset) => {
   const LIST = `
      SELECT
         *
      FROM
         vans
      ORDER BY
         van_id DESC
      LIMIT ${limit}
      OFFSET ${offset}
   `;

   return fetchALL(LIST)
}
const foundVanById = (id) => fetch(BY_ID, id)
const foundVan = (id) => fetch(FOUND_VAN, id)
const deleteVan = (id) => fetch(DELETE_VAN, id)
const updateStatus = (id, status) => fetch(UPDATE_STATUS, id, status)
const vansList = (
   van_condition,
   van_category,
   van_make,
   van_model,
   van_firt_date_year_from,
   van_firt_date_year_to,
   van_kilometre_from,
   van_kilometre_to,
   van_price_from,
   van_price_to,
   van_price_type,
   van_vat,
   van_power_from,
   van_power_to,
   van_country,
   van_city,
   zipcode,
   van_radius,
   fuelArr,
   transmissionArr,
   van_emission_class,
   van_emissions_sticker,
   featuresId,
   van_air_conditioning,
   van_gvw_from,
   van_gvw_to,
   van_parking_sensors,
   van_sliding_door,
   van_driving_cab,
   van_number_of_seats_from,
   van_number_of_seats_to,
   van_cruise_control,
   van_trailer_coupling_fix,
   interiorFeaturesId,
   colorArr,
   day,
   van_damaged,
   van_approved_used_programme,
   van_full_service_history,
   van_municipal,
   van_new_hu,
   van_renting_possible,
   van_discount_offers,
   van_vendor,
   van_dealer_rating,
   picture,
   video,
   limit,
   offset
) => {
//   const cityConditions = van_city?.map(city => `van_city_zipcode = '${city}'`).join(' OR ');
   const fuelArrConditions = fuelArr?.map(e => `van_fuel_type = '${e}'`).join(' OR ');
   const transmissionConditions = transmissionArr?.map(e => `van_transmission = '${e}'`).join(' OR ');
   const featuresString = featuresId?.map(e => `'${e}'`).join(', ');
   const interiorFeaturesString = interiorFeaturesId?.map(e => `'${e}'`).join(', ');
   const colorConditions = colorArr?.map(e => `van_exterior_colour = '${e}'`).join(' OR ');

   const VAN_LIST = `
      SELECT
         *
      FROM
         vans
      WHERE
         van_active = true
         ${van_condition ? `and van_condition = '${van_condition}'` : ""}
         ${van_category ? `and van_category = '${van_category}'` : ""}
         ${van_make ? `and van_make = '${van_make}'` : ""}
         ${van_model ? `and van_model = '${van_model}'` : ""}
         ${van_firt_date_year_from ? `and ${van_firt_date_year_from} <= van_firt_date_year` : ""}
         ${van_firt_date_year_to ? `and ${van_firt_date_year_to} >= van_firt_date_year` : ""}
         ${van_kilometre_from ? `and ${van_kilometre_from} <= van_kilometre` : ""}
         ${van_kilometre_to ? `and ${van_kilometre_to} >= van_kilometre` : ""}
         ${van_price_from ? `and ${van_price_from} <= van_price` : ""}
         ${van_price_to ? `and ${van_price_to} >= van_price` : ""}
         ${van_price_type ? `and van_price_type = '${van_price_type}'` : ""}
         ${van_vat ? `and van_vat = '${van_vat}'` : ""}
         ${van_power_from ? `and ${van_power_from} <= van_power` : ""}
         ${van_power_to ? `and ${van_power_to} >= van_power` : ""}
         ${van_country ? `and van_country ilike '%${van_country}%'` : ""}
         ${van_city ? `and van_city_zipcode ilike '%${van_city}%'` : ""}
         ${zipcode ? `and van_city_zipcode ilike '%${zipcode}%'` : ""}
         ${van_radius ? `and ${van_radius} >= van_radius` : ""}
         ${fuelArrConditions ? `and (${fuelArrConditions})` : ''}
         ${transmissionConditions ? `and (${transmissionConditions})` : ''}
         ${van_emission_class ? `and van_emission_class = '${van_emission_class}'` : ""}
         ${van_emissions_sticker ? `and van_emissions_sticker = '${van_emissions_sticker}'` : ""}
         ${featuresId?.length > 0 ? `and van_features @> ARRAY[${featuresString}]` : ''}
         ${van_air_conditioning ? `and van_air_conditioning = '${van_air_conditioning}'` : ""}
         ${van_gvw_from ? `and ${van_gvw_from} <= van_gvw` : ""}
         ${van_gvw_to ? `and ${van_gvw_to} >= van_gvw` : ""}
         ${van_parking_sensors ? `and van_parking_sensors = '${van_parking_sensors}'` : ""}
         ${van_sliding_door ? `and van_sliding_door = '${van_sliding_door}'` : ""}
         ${van_driving_cab ? `and van_driving_cab = '${van_driving_cab}'` : ""}
         ${van_number_of_seats_from ? `and ${van_number_of_seats_from} <= van_number_of_seats` : ""}
         ${van_number_of_seats_to ? `and ${van_number_of_seats_to} >= van_number_of_seats` : ""}
         ${van_cruise_control ? `and van_cruise_control = '${van_cruise_control}'` : ""}
         ${van_trailer_coupling_fix == true ? `and van_trailer_coupling_fix = ${van_trailer_coupling_fix}` : ""}
         ${interiorFeaturesId?.length > 0 ? `and van_interior_features @> ARRAY[${interiorFeaturesString}]` : ''}
         ${colorConditions ? `and (${colorConditions})` : ''}
         ${van_damaged ? `and van_damaged = '${van_damaged}'` : ""}
         ${van_approved_used_programme ? `and van_approved_used_programme = '${van_approved_used_programme}'` : ""}
         ${van_full_service_history == true ? `and van_full_service_history = ${van_full_service_history}` : ""}
         ${van_municipal == true ? `and van_municipal = ${van_municipal}` : ""}
         ${van_new_hu == true ? `and van_new_hu = ${van_new_hu}` : ""}
         ${van_renting_possible == true ? `and van_renting_possible = ${van_renting_possible}` : ""}
         ${van_discount_offers == true ? `and van_discount_offers = ${van_discount_offers}` : ""}
         ${van_vendor ? `and van_vendor = '${van_vendor}'` : ""}
         ${van_dealer_rating ? `and van_dealer_rating >= ${van_dealer_rating} ` : ""}
         ${picture == true ? `and Array_Length(van_images_url, 1) > 0` : ""}
         ${video == true ? `and van_video_link != '' ` : ""}
         ${day ? `and van_ad_create_at > current_date - interval '${day} days'` : ""}
      ORDER BY
         van_id DESC
      LIMIT ${limit}
      OFFSET ${offset};
   `;

   return fetchALL(VAN_LIST)
}
const vansCount = (
   van_condition,
   van_category,
   van_make,
   van_model,
   van_firt_date_year_from,
   van_firt_date_year_to,
   van_kilometre_from,
   van_kilometre_to,
   van_price_from,
   van_price_to,
   van_price_type,
   van_vat,
   van_power_from,
   van_power_to,
   van_country,
   van_city,
   zipcode,
   van_radius,
   fuelArr,
   transmissionArr,
   van_emission_class,
   van_emissions_sticker,
   featuresId,
   van_air_conditioning,
   van_gvw_from,
   van_gvw_to,
   van_parking_sensors,
   van_sliding_door,
   van_driving_cab,
   van_number_of_seats_from,
   van_number_of_seats_to,
   van_cruise_control,
   van_trailer_coupling_fix,
   interiorFeaturesId,
   colorArr,
   day,
   van_damaged,
   van_approved_used_programme,
   van_full_service_history,
   van_municipal,
   van_new_hu,
   van_renting_possible,
   van_discount_offers,
   van_vendor,
   van_dealer_rating,
   picture,
   video,
) => {
//   const cityConditions = van_city?.map(city => `van_city_zipcode = '${city}'`).join(' OR ');
   const fuelArrConditions = fuelArr?.map(e => `van_fuel_type = '${e}'`).join(' OR ');
   const transmissionConditions = transmissionArr?.map(e => `van_transmission = '${e}'`).join(' OR ');
   const featuresString = featuresId?.map(e => `'${e}'`).join(', ');
   const interiorFeaturesString = interiorFeaturesId?.map(e => `'${e}'`).join(', ');
   const colorConditions = colorArr?.map(e => `van_exterior_colour = '${e}'`).join(' OR ');

   const VAN_LIST = `
      SELECT
         count(van_id)
      FROM
         vans
      WHERE
         van_active = true
         ${van_condition ? `and van_condition = '${van_condition}'` : ""}
         ${van_category ? `and van_category = '${van_category}'` : ""}
         ${van_make ? `and van_make = '${van_make}'` : ""}
         ${van_model ? `and van_model = '${van_model}'` : ""}
         ${van_firt_date_year_from ? `and ${van_firt_date_year_from} <= van_firt_date_year` : ""}
         ${van_firt_date_year_to ? `and ${van_firt_date_year_to} >= van_firt_date_year` : ""}
         ${van_kilometre_from ? `and ${van_kilometre_from} <= van_kilometre` : ""}
         ${van_kilometre_to ? `and ${van_kilometre_to} >= van_kilometre` : ""}
         ${van_price_from ? `and ${van_price_from} <= van_price` : ""}
         ${van_price_to ? `and ${van_price_to} >= van_price` : ""}
         ${van_price_type ? `and van_price_type = '${van_price_type}'` : ""}
         ${van_vat ? `and van_vat = '${van_vat}'` : ""}
         ${van_power_from ? `and ${van_power_from} <= van_power` : ""}
         ${van_power_to ? `and ${van_power_to} >= van_power` : ""}
         ${van_country ? `and van_country ilike '%${van_country}%'` : ""}
         ${van_city ? `and van_city_zipcode ilike '%${van_city}%'` : ""}
         ${zipcode ? `and van_city_zipcode ilike '%${zipcode}%'` : ""}
         ${van_radius ? `and ${van_radius} >= van_radius` : ""}
         ${fuelArrConditions ? `and (${fuelArrConditions})` : ''}
         ${transmissionConditions ? `and (${transmissionConditions})` : ''}
         ${van_emission_class ? `and van_emission_class = '${van_emission_class}'` : ""}
         ${van_emissions_sticker ? `and van_emissions_sticker = '${van_emissions_sticker}'` : ""}
         ${featuresId?.length > 0 ? `and van_features @> ARRAY[${featuresString}]` : ''}
         ${van_air_conditioning ? `and van_air_conditioning = '${van_air_conditioning}'` : ""}
         ${van_gvw_from ? `and ${van_gvw_from} <= van_gvw` : ""}
         ${van_gvw_to ? `and ${van_gvw_to} >= van_gvw` : ""}
         ${van_parking_sensors ? `and van_parking_sensors = '${van_parking_sensors}'` : ""}
         ${van_sliding_door ? `and van_sliding_door = '${van_sliding_door}'` : ""}
         ${van_driving_cab ? `and van_driving_cab = '${van_driving_cab}'` : ""}
         ${van_number_of_seats_from ? `and ${van_number_of_seats_from} <= van_number_of_seats` : ""}
         ${van_number_of_seats_to ? `and ${van_number_of_seats_to} >= van_number_of_seats` : ""}
         ${van_cruise_control ? `and van_cruise_control = '${van_cruise_control}'` : ""}
         ${van_trailer_coupling_fix == true ? `and van_trailer_coupling_fix = ${van_trailer_coupling_fix}` : ""}
         ${interiorFeaturesId?.length > 0 ? `and van_interior_features @> ARRAY[${interiorFeaturesString}]` : ''}
         ${colorConditions ? `and (${colorConditions})` : ''}
         ${van_damaged ? `and van_damaged = '${van_damaged}'` : ""}
         ${van_approved_used_programme ? `and van_approved_used_programme = '${van_approved_used_programme}'` : ""}
         ${van_full_service_history == true ? `and van_full_service_history = ${van_full_service_history}` : ""}
         ${van_municipal == true ? `and van_municipal = ${van_municipal}` : ""}
         ${van_new_hu == true ? `and van_new_hu = ${van_new_hu}` : ""}
         ${van_renting_possible == true ? `and van_renting_possible = ${van_renting_possible}` : ""}
         ${van_discount_offers == true ? `and van_discount_offers = ${van_discount_offers}` : ""}
         ${van_vendor ? `and van_vendor = '${van_vendor}'` : ""}
         ${van_dealer_rating ? `and van_dealer_rating >= ${van_dealer_rating} ` : ""}
         ${picture == true ? `and Array_Length(van_images_url, 1) > 0` : ""}
         ${video == true ? `and van_video_link != '' ` : ""}
         ${day ? `and van_ad_create_at > current_date - interval '${day} days'` : ""};
   `;

   return fetch(VAN_LIST)
}
const addVan = (
   van_make,
   van_model,
   van_describtion,
   van_video_link,
   van_condition,
   van_category,
   van_firt_date,
   van_firt_date_year,
   van_kilometre,
   van_price,
   van_price_type,
   van_vat,
   van_power,
   van_country,
   van_city_zipcode,
   van_radius,
   van_fuel_type,
   van_transmission,
   van_emission_class,
   van_emissions_sticker,
   featuresId,
   van_air_conditioning,
   van_gvw,
   van_parking_sensors,
   van_sliding_door,
   van_driving_cab,
   van_number_of_seats,
   van_cruise_control,
   van_trailer_coupling_fix,
   interiorFeaturesId,
   van_exterior_colour,
   van_damaged,
   van_approved_used_programme,
   van_full_service_history,
   van_municipal,
   van_new_hu,
   van_renting_possible,
   van_discount_offers,
   van_vendor,
   user_id,
   user_phone,
   user_email,
   van_img,
   van_img_name
) => fetch(
   ADD_VAN,
   van_make,
   van_model,
   van_describtion,
   van_video_link,
   van_condition,
   van_category,
   van_firt_date,
   van_firt_date_year,
   van_kilometre,
   van_price,
   van_price_type,
   van_vat,
   van_power,
   van_country,
   van_city_zipcode,
   van_radius,
   van_fuel_type,
   van_transmission,
   van_emission_class,
   van_emissions_sticker,
   featuresId,
   van_air_conditioning,
   van_gvw,
   van_parking_sensors,
   van_sliding_door,
   van_driving_cab,
   van_number_of_seats,
   van_cruise_control,
   van_trailer_coupling_fix,
   interiorFeaturesId,
   van_exterior_colour,
   van_damaged,
   van_approved_used_programme,
   van_full_service_history,
   van_municipal,
   van_new_hu,
   van_renting_possible,
   van_discount_offers,
   van_vendor,
   user_id,
   user_phone,
   user_email,
   van_img,
   van_img_name
)
const updateVan = (
   id,
   van_make,
   van_model,
   van_describtion,
   van_video_link,
   van_condition,
   van_category,
   van_firt_date,
   van_firt_date_year,
   van_kilometre,
   van_price,
   van_price_type,
   van_vat,
   van_power,
   van_country,
   van_city_zipcode,
   van_radius,
   van_fuel_type,
   van_transmission,
   van_emission_class,
   van_emissions_sticker,
   featuresId,
   van_air_conditioning,
   van_gvw,
   van_parking_sensors,
   van_sliding_door,
   van_driving_cab,
   van_number_of_seats,
   van_cruise_control,
   van_trailer_coupling_fix,
   interiorFeaturesId,
   van_exterior_colour,
   van_damaged,
   van_approved_used_programme,
   van_full_service_history,
   van_municipal,
   van_new_hu,
   van_renting_possible,
   van_discount_offers,
   van_vendor,
   user_id,
   user_phone,
   user_email,
   van_img,
   van_img_name
) => fetch(
   UPDATE_VAN,
   id,
   van_make,
   van_model,
   van_describtion,
   van_video_link,
   van_condition,
   van_category,
   van_firt_date,
   van_firt_date_year,
   van_kilometre,
   van_price,
   van_price_type,
   van_vat,
   van_power,
   van_country,
   van_city_zipcode,
   van_radius,
   van_fuel_type,
   van_transmission,
   van_emission_class,
   van_emissions_sticker,
   featuresId,
   van_air_conditioning,
   van_gvw,
   van_parking_sensors,
   van_sliding_door,
   van_driving_cab,
   van_number_of_seats,
   van_cruise_control,
   van_trailer_coupling_fix,
   interiorFeaturesId,
   van_exterior_colour,
   van_damaged,
   van_approved_used_programme,
   van_full_service_history,
   van_municipal,
   van_new_hu,
   van_renting_possible,
   van_discount_offers,
   van_vendor,
   user_id,
   user_phone,
   user_email,
   van_img,
   van_img_name
)

module.exports = {
   vanListAdmin,
   foundVanById,
   foundVan,
   deleteVan,
   vansList,
   vansCount,
   addVan,
   updateVan,
   updateStatus
}