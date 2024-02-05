const { fetch, fetchALL } = require("../../lib/postgres");

const BY_ID = `
   SELECT
      *
   FROM
      semi_trailer_trucks a
   INNER JOIN
      users b
   ON
      a.user_id = b.user_id
   WHERE
      truck_id = $1;
`;

const FOUND_SEMI_TRUCK = `
   SELECT
      truck_images_url,
      truck_images_name
   FROM
      semi_trailer_trucks
   WHERE
      truck_id = $1;
`;

const DELETE_SEMI_TRUCK = `
   DELETE FROM
      semi_trailer_trucks
   WHERE
      truck_id = $1
   RETURNING *;
`;

const UPDATE_STATUS = `
   UPDATE
      semi_trailer_trucks
   SET
      truck_active = $2
   WHERE
      truck_id = $1
   RETURNING *;
`;

const UPDATE_SEMI_TRUCK = `
   UPDATE
      semi_trailer_trucks
   SET
      truck_make = $2,
      truck_model = $3,
      truck_describtion = $4,
      truck_video_link = $5,
      truck_condition = $6,
      truck_category = $7,
      truck_firt_date = $8,
      truck_firt_date_year = $9,
      truck_kilometre = $10,
      truck_price = $11,
      truck_price_type = $12,
      truck_vat = $13,
      truck_power = $14,
      truck_country = $15,
      truck_city_zipcode = $16,
      truck_radius = $17,
      truck_fuel_type = $18,
      truck_transmission = $19,
      truck_emission_class = $20,
      truck_emissions_sticker = $21,
      truck_features = $22,
      truck_air_conditioning = $23,
      truck_axles = $24,
      truck_wheel_formula = $25,
      truck_gvw = $26,
      truck_cruise_control = $27,
      truck_hydraulic_installation = $28,
      truck_driving_cab = $29,
      truck_interior_features = $30,
      truck_exterior_colour = $31,
      truck_damaged = $32,
      truck_full_service_history = $33,
      truck_new_hu = $34,
      truck_renting_possible = $35,
      truck_discount_offers = $36,
      truck_vendor = $37,
      truck_dealer_rating = $38,
      user_id = $39,
      user_phone = $40,
      user_email = $41,
      truck_images_url = $42,
      truck_images_name = $43
   WHERE
      truck_id = $1
   RETURNING *;
`;

const ADD_SEMI_TRUCK = `
   INSERT INTO
      semi_trailer_trucks (
         truck_make,
         truck_model,
         truck_describtion,
         truck_video_link,
         truck_condition,
         truck_category,
         truck_firt_date,
         truck_firt_date_year,
         truck_kilometre,
         truck_price,
         truck_price_type,
         truck_vat,
         truck_power,
         truck_country,
         truck_city_zipcode,
         truck_radius,
         truck_fuel_type,
         truck_transmission,
         truck_emission_class,
         truck_emissions_sticker,
         truck_features,
         truck_air_conditioning,
         truck_axles,
         truck_wheel_formula,
         truck_gvw,
         truck_cruise_control,
         truck_hydraulic_installation,
         truck_driving_cab,
         truck_interior_features,
         truck_exterior_colour,
         truck_damaged,
         truck_full_service_history,
         truck_new_hu,
         truck_renting_possible,
         truck_discount_offers,
         truck_vendor,
         truck_dealer_rating,
         user_id,
         user_phone,
         user_email,
         truck_images_url,
         truck_images_name
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
         $42
      ) RETURNING *;
`;

const semitruckListAdmin = (limit, offset) => {
   const LIST = `
      SELECT
         *
      FROM
         semi_trailer_trucks
      ORDER BY 
         truck_id DESC
      LIMIT ${limit}
      OFFSET ${offset}
   `;
}
const foundSemitruckById = (id) => fetch(BY_ID, id)
const foundTruck = (id) => fetch(FOUND_SEMI_TRUCK, id)
const updateStatus = (id, status) => fetch(UPDATE_STATUS, id, status)
const deleteSemitruck = (id) => fetch(DELETE_SEMI_TRUCK, id)
const semitruckList = (
   truck_condition,
   truck_category,
   truck_make,
   truck_model,
   truck_firt_date_year_from,
   truck_firt_date_year_to,
   truck_kilometre_from,
   truck_kilometre_to,
   truck_price_from,
   truck_price_to,
   truck_price_type,
   truck_vat,
   truck_power_from,
   truck_power_to,
   truck_country,
   truck_city,
   zipcode,
   truck_radius,
   fuelArr,
   transmissionArr,
   truck_emission_class,
   truck_emissions_sticker,
   featuresId,
   truck_air_conditioning,
   truck_axles,
   wheelformulaArr,
   truck_gvw_from,
   truck_gvw_to,
   truck_cruise_control,
   truck_hydraulic_installation,
   truck_driving_cab,
   interiorFeaturesId,
   colorArr,
   day,
   truck_damaged,
   truck_full_service_history,
   truck_new_hu,
   truck_renting_possible,
   truck_discount_offers,
   truck_vendor,
   truck_dealer_rating,
   picture,
   video,
   limit,
   offset
) => {
//   const cityConditions = truck_city?.map(city => `truck_city_zipcode = '${city}'`).join(' OR ');
   const fuelArrConditions = fuelArr?.map(e => `truck_fuel_type = '${e}'`).join(' OR ');
   const transmissionConditions = transmissionArr?.map(e => `truck_transmission = '${e}'`).join(' OR ');
   const featuresString = featuresId?.map(e => `'${e}'`).join(', ');
   const interiorFeaturesString = interiorFeaturesId?.map(e => `'${e}'`).join(', ');
   const wheelformulaConditions = wheelformulaArr?.map(e => `truck_wheel_formula = '${e}'`).join(' OR ');
   const colorArrConditions = colorArr?.map(e => `truck_exterior_colour = '${e}'`).join(' OR ');

   const SEMI_TRUCK_LIST = `
      SELECT
         *
      FROM
         semi_trailer_trucks
      WHERE
         truck_active = true
         ${truck_condition ? `and truck_condition ilike '%${truck_condition}%'` : ""}
         ${truck_category ? `and truck_category ilike '%${truck_category}%'` : ""}
         ${truck_make ? `and truck_make = '${truck_make}'` : ""}
         ${truck_model ? `and truck_model = '${truck_model}'` : ""}
         ${truck_firt_date_year_from ? `and ${truck_firt_date_year_from} <= truck_firt_date_year` : ""}
         ${truck_firt_date_year_to ? `and ${truck_firt_date_year_to} >= truck_firt_date_year` : ""}
         ${truck_kilometre_from ? `and ${truck_kilometre_from} <= truck_kilometre` : ""}
         ${truck_kilometre_to ? `and ${truck_kilometre_to} >= truck_kilometre` : ""}
         ${truck_price_from ? `and ${truck_price_from} <= truck_price` : ""}
         ${truck_price_to ? `and ${truck_price_to} >= truck_price` : ""}
         ${truck_price_type ? `and truck_price_type = '${truck_price_type}'` : ""}
         ${truck_vat ? `and truck_vat = '${truck_vat}'` : ""}
         ${truck_power_from ? `and ${truck_power_from} <= truck_power` : ""}
         ${truck_power_to ? `and ${truck_power_to} >= truck_power` : ""}
         ${truck_country ? `and truck_country ilike '%${truck_country}%'` : ""}
         ${truck_city ? `and truck_city_zipcode ilike '%${truck_city}%'` : ""}
         ${zipcode ? `and truck_city_zipcode ilike '%${zipcode}%'` : ""}
         ${truck_radius ? `and ${truck_radius} >= truck_radius` : ""}
         ${fuelArrConditions ? `and (${fuelArrConditions})` : ''}
         ${transmissionConditions ? `and (${transmissionConditions})` : ''}
         ${truck_emission_class ? `and truck_emission_class = '${truck_emission_class}'` : ""}
         ${truck_emissions_sticker ? `and truck_emissions_sticker = '${truck_emissions_sticker}'` : ""}
         ${featuresId?.length > 0 ? `and truck_features @> ARRAY[${featuresString}]` : ""}
         ${truck_air_conditioning ? `and truck_air_conditioning = '${truck_air_conditioning}'` : ""}
         ${truck_axles <= 3 ? `and ${truck_axles} = truck_axles` : truck_axles > 3 ? `and 3 < truck_axles` : ''}
         ${wheelformulaConditions ? `and (${wheelformulaConditions})` : ''}
         ${truck_gvw_from ? `and ${truck_gvw_from} <= truck_gvw` : ""}
         ${truck_gvw_to ? `and ${truck_gvw_to} >= truck_gvw` : ""}
         ${truck_cruise_control ? `and truck_cruise_control = '${truck_cruise_control}'` : ""}
         ${truck_hydraulic_installation ? `and truck_hydraulic_installation = '${truck_hydraulic_installation}'` : ""}
         ${truck_driving_cab ? `and truck_driving_cab = '${truck_driving_cab}'` : ""}
         ${interiorFeaturesId?.length > 0 ? `and truck_interior_features @> ARRAY[${interiorFeaturesString}]` : ""}
         ${colorArrConditions ? `and (${colorArrConditions})` : ''}
         ${truck_damaged ? `and truck_damaged = '${truck_damaged}'` : ""}
         ${truck_full_service_history == true ? `and truck_full_service_history = ${truck_full_service_history}` : ""}
         ${truck_new_hu == true ? `and truck_new_hu = ${truck_new_hu}` : ""}
         ${truck_renting_possible == true ? `and truck_renting_possible = ${truck_renting_possible}` : ""}
         ${truck_discount_offers == true ? `and truck_discount_offers = ${truck_discount_offers}` : ""}
         ${truck_vendor ? `and truck_vendor = '${truck_vendor}'` : ""}
         ${truck_dealer_rating ? `and truck_dealer_rating >= ${truck_dealer_rating} ` : ""}
         ${picture == true ? `and Array_Length(truck_images_url, 1) > 0` : ""}
         ${video == true ? `and truck_video_link != '' ` : ""}
         ${day ? `and truck_ad_create_at > current_date - interval '${day} days'` : ""}
      ORDER BY
         truck_id DESC
      LIMIT ${limit}
      OFFSET ${offset};
   `;

   return fetchALL(SEMI_TRUCK_LIST)
}
const semitruckCount = (
   truck_condition,
   truck_category,
   truck_make,
   truck_model,
   truck_firt_date_year_from,
   truck_firt_date_year_to,
   truck_kilometre_from,
   truck_kilometre_to,
   truck_price_from,
   truck_price_to,
   truck_price_type,
   truck_vat,
   truck_power_from,
   truck_power_to,
   truck_country,
   truck_city,
   zipcode,
   truck_radius,
   fuelArr,
   transmissionArr,
   truck_emission_class,
   truck_emissions_sticker,
   featuresId,
   truck_air_conditioning,
   truck_axles,
   wheelformulaArr,
   truck_gvw_from,
   truck_gvw_to,
   truck_cruise_control,
   truck_hydraulic_installation,
   truck_driving_cab,
   interiorFeaturesId,
   colorArr,
   day,
   truck_damaged,
   truck_full_service_history,
   truck_new_hu,
   truck_renting_possible,
   truck_discount_offers,
   truck_vendor,
   truck_dealer_rating,
   picture,
   video,
) => {
//   const cityConditions = truck_city?.map(city => `truck_city_zipcode = '${city}'`).join(' OR ');
   const fuelArrConditions = fuelArr?.map(e => `truck_fuel_type = '${e}'`).join(' OR ');
   const transmissionConditions = transmissionArr?.map(e => `truck_transmission = '${e}'`).join(' OR ');
   const featuresString = featuresId?.map(e => `'${e}'`).join(', ');
   const interiorFeaturesString = interiorFeaturesId?.map(e => `'${e}'`).join(', ');
   const wheelformulaConditions = wheelformulaArr?.map(e => `truck_wheel_formula = '${e}'`).join(' OR ');
   const colorArrConditions = colorArr?.map(e => `truck_exterior_colour = '${e}'`).join(' OR ');

   const SEMI_TRUCK_LIST = `
      SELECT
         count(truck_id)
      FROM
         semi_trailer_trucks
      WHERE
         truck_active = true
         ${truck_condition ? `and truck_condition ilike '%${truck_condition}%'` : ""}
         ${truck_category ? `and truck_category ilike '%${truck_category}%'` : ""}
         ${truck_make ? `and truck_make = '${truck_make}'` : ""}
         ${truck_model ? `and truck_model = '${truck_model}'` : ""}
         ${truck_firt_date_year_from ? `and ${truck_firt_date_year_from} <= truck_firt_date_year` : ""}
         ${truck_firt_date_year_to ? `and ${truck_firt_date_year_to} >= truck_firt_date_year` : ""}
         ${truck_kilometre_from ? `and ${truck_kilometre_from} <= truck_kilometre` : ""}
         ${truck_kilometre_to ? `and ${truck_kilometre_to} >= truck_kilometre` : ""}
         ${truck_price_from ? `and ${truck_price_from} <= truck_price` : ""}
         ${truck_price_to ? `and ${truck_price_to} >= truck_price` : ""}
         ${truck_price_type ? `and truck_price_type = '${truck_price_type}'` : ""}
         ${truck_vat ? `and truck_vat = '${truck_vat}'` : ""}
         ${truck_power_from ? `and ${truck_power_from} <= truck_power` : ""}
         ${truck_power_to ? `and ${truck_power_to} >= truck_power` : ""}
         ${truck_country ? `and truck_country ilike '%${truck_country}%'` : ""}
         ${truck_city ? `and truck_city_zipcode ilike '%${truck_city}%'` : ""}
         ${zipcode ? `and truck_city_zipcode ilike '%${zipcode}%'` : ""}
         ${truck_radius ? `and ${truck_radius} >= truck_radius` : ""}
         ${fuelArrConditions ? `and (${fuelArrConditions})` : ''}
         ${transmissionConditions ? `and (${transmissionConditions})` : ''}
         ${truck_emission_class ? `and truck_emission_class = '${truck_emission_class}'` : ""}
         ${truck_emissions_sticker ? `and truck_emissions_sticker = '${truck_emissions_sticker}'` : ""}
         ${featuresId?.length > 0 ? `and truck_features @> ARRAY[${featuresString}]` : ""}
         ${truck_air_conditioning ? `and truck_air_conditioning = '${truck_air_conditioning}'` : ""}
         ${truck_axles <= 3 ? `and ${truck_axles} = truck_axles` : truck_axles > 3 ? `and 3 < truck_axles` : ''}
         ${wheelformulaConditions ? `and (${wheelformulaConditions})` : ''}
         ${truck_gvw_from ? `and ${truck_gvw_from} <= truck_gvw` : ""}
         ${truck_gvw_to ? `and ${truck_gvw_to} >= truck_gvw` : ""}
         ${truck_cruise_control ? `and truck_cruise_control = '${truck_cruise_control}'` : ""}
         ${truck_hydraulic_installation ? `and truck_hydraulic_installation = '${truck_hydraulic_installation}'` : ""}
         ${truck_driving_cab ? `and truck_driving_cab = '${truck_driving_cab}'` : ""}
         ${interiorFeaturesId?.length > 0 ? `and truck_interior_features @> ARRAY[${interiorFeaturesString}]` : ""}
         ${colorArrConditions ? `and (${colorArrConditions})` : ''}
         ${truck_damaged ? `and truck_damaged = '${truck_damaged}'` : ""}
         ${truck_full_service_history == true ? `and truck_full_service_history = ${truck_full_service_history}` : ""}
         ${truck_new_hu == true ? `and truck_new_hu = ${truck_new_hu}` : ""}
         ${truck_renting_possible == true ? `and truck_renting_possible = ${truck_renting_possible}` : ""}
         ${truck_discount_offers == true ? `and truck_discount_offers = ${truck_discount_offers}` : ""}
         ${truck_vendor ? `and truck_vendor = '${truck_vendor}'` : ""}
         ${truck_dealer_rating ? `and truck_dealer_rating >= ${truck_dealer_rating} ` : ""}
         ${picture == true ? `and Array_Length(truck_images_url, 1) > 0` : ""}
         ${video == true ? `and truck_video_link != '' ` : ""}
         ${day ? `and truck_ad_create_at > current_date - interval '${day} days'` : ""};
   `;

   return fetch(SEMI_TRUCK_LIST)
}
const addSemitruck = (
   truck_make,
   truck_model,
   truck_describtion,
   truck_video_link,
   truck_condition,
   truck_category,
   truck_firt_date,
   truck_firt_date_year,
   truck_kilometre,
   truck_price,
   truck_price_type,
   truck_vat,
   truck_power,
   truck_country,
   truck_city_zipcode,
   truck_radius,
   truck_fuel_type,
   truck_transmission,
   truck_emission_class,
   truck_emissions_sticker,
   featuresId,
   truck_air_conditioning,
   truck_axles,
   truck_wheel_formula,
   truck_gvw,
   truck_cruise_control,
   truck_hydraulic_installation,
   truck_driving_cab,
   interiorFeaturesId,
   truck_exterior_colour,
   truck_damaged,
   truck_full_service_history,
   truck_new_hu,
   truck_renting_possible,
   truck_discount_offers,
   truck_vendor,
   truck_dealer_rating,
   user_id,
   user_phone,
   user_email,
   truck_img,
   truck_img_name
) => fetch(
   ADD_SEMI_TRUCK,
   truck_make,
   truck_model,
   truck_describtion,
   truck_video_link,
   truck_condition,
   truck_category,
   truck_firt_date,
   truck_firt_date_year,
   truck_kilometre,
   truck_price,
   truck_price_type,
   truck_vat,
   truck_power,
   truck_country,
   truck_city_zipcode,
   truck_radius,
   truck_fuel_type,
   truck_transmission,
   truck_emission_class,
   truck_emissions_sticker,
   featuresId,
   truck_air_conditioning,
   truck_axles,
   truck_wheel_formula,
   truck_gvw,
   truck_cruise_control,
   truck_hydraulic_installation,
   truck_driving_cab,
   interiorFeaturesId,
   truck_exterior_colour,
   truck_damaged,
   truck_full_service_history,
   truck_new_hu,
   truck_renting_possible,
   truck_discount_offers,
   truck_vendor,
   truck_dealer_rating,
   user_id,
   user_phone,
   user_email,
   truck_img,
   truck_img_name
)
const updateSemitruck = (
   id,
   truck_make,
   truck_model,
   truck_describtion,
   truck_video_link,
   truck_condition,
   truck_category,
   truck_firt_date,
   truck_firt_date_year,
   truck_kilometre,
   truck_price,
   truck_price_type,
   truck_vat,
   truck_power,
   truck_country,
   truck_city_zipcode,
   truck_radius,
   truck_fuel_type,
   truck_transmission,
   truck_emission_class,
   truck_emissions_sticker,
   featuresId,
   truck_air_conditioning,
   truck_axles,
   truck_wheel_formula,
   truck_gvw,
   truck_cruise_control,
   truck_hydraulic_installation,
   truck_driving_cab,
   interiorFeaturesId,
   truck_exterior_colour,
   truck_damaged,
   truck_full_service_history,
   truck_new_hu,
   truck_renting_possible,
   truck_discount_offers,
   truck_vendor,
   truck_dealer_rating,
   user_id,
   user_phone,
   user_email,
   truck_img,
   truck_img_name
) => fetch(
   UPDATE_SEMI_TRUCK,
   id,
   truck_make,
   truck_model,
   truck_describtion,
   truck_video_link,
   truck_condition,
   truck_category,
   truck_firt_date,
   truck_firt_date_year,
   truck_kilometre,
   truck_price,
   truck_price_type,
   truck_vat,
   truck_power,
   truck_country,
   truck_city_zipcode,
   truck_radius,
   truck_fuel_type,
   truck_transmission,
   truck_emission_class,
   truck_emissions_sticker,
   featuresId,
   truck_air_conditioning,
   truck_axles,
   truck_wheel_formula,
   truck_gvw,
   truck_cruise_control,
   truck_hydraulic_installation,
   truck_driving_cab,
   interiorFeaturesId,
   truck_exterior_colour,
   truck_damaged,
   truck_full_service_history,
   truck_new_hu,
   truck_renting_possible,
   truck_discount_offers,
   truck_vendor,
   truck_dealer_rating,
   user_id,
   user_phone,
   user_email,
   truck_img,
   truck_img_name
)

module.exports = {
   semitruckListAdmin,
   foundSemitruckById,
   foundTruck,
   deleteSemitruck,
   semitruckList,
   semitruckCount,
   addSemitruck,
   updateSemitruck,
   updateStatus
}