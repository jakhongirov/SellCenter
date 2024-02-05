const { fetch, fetchALL } = require("../../lib/postgres");

const BY_ID = `
   SELECT
      *
   FROM
      motor_homes a
   INNER JOIN
      users b
   ON
      a.user_id = b.user_id
   WHERE
      motor_home_id = $1;
`;

const FOUND_MOTOR_HOME = `
   SELECT
      motor_home_images_url,
      motor_home_images_name
   FROM
      motor_homes
   WHERE
      motor_home_id = $1;
`;

const DELETE_MOTOR_HOME = `
   DELETE FROM
      motor_homes
   WHERE
      motor_home_id = $1
   RETURNING *;
`;

const UPDATE_STATUS = `
   UPDATE
      motor_homes
   SET
      motor_home_active = $2
   WHERE
      motor_home_id = $1
   RETURNING *;
`;

const ADD_MOTOR_HOME = `
   INSERT INTO
      motor_homes (
         motor_home_make,
         motor_home_model,
         motor_home_describtion,
         motor_home_video_link,
         motor_home_condition,
         motor_home_type,
         motor_home_price,
         motor_home_firt_date,
         motor_home_firt_date_year,
         motor_home_construction_year,
         motor_home_kilometre,
         motor_home_power,
         motor_home_country,
         motor_home_city_zipcode,
         motor_home_city_radius,
         motor_home_fuel_type,
         motor_home_transmission,
         motor_home_emission_class,
         motor_home_emissions_sticker,
         motor_home_features,
         motor_home_length,
         motor_home_gvw,
         motor_home_number_of_bunks,
         motor_home_axles,
         motor_home_trailer_coupling,
         motor_home_cruise_control,
         motor_home_radio,
         motor_home_parking_sensors,
         motor_home_air_conditioning,
         motor_home_interior_features,
         motor_home_exterior_colour,
         motor_home_vat,
         motor_home_damaged,
         motor_home_numbrt_of_owner,
         motor_home_damage_by_hail,
         motor_home_full_service_history,
         motor_home_new_hu,
         motor_home_renting_possible,
         motor_home_warranty,
         motor_home_discount_offers,
         motor_home_vendor,
         motor_home_dealer_rating,
         motor_home_images_url,
         motor_home_images_name,
         user_id,
         user_phone,
         user_email
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
      $44,
      $45,
      $46,
      $47
   )
   RETURNING * ;
`
const UPDATE_MOTOR_HOME = `
   UPDATE
      motor_homes
   SET
      motor_home_make = $2,
      motor_home_model = $3,
      motor_home_describtion = $4,
      motor_home_video_link = $5,
      motor_home_condition = $6,
      motor_home_type = $7,
      motor_home_price = $8,
      motor_home_firt_date = $9,
      motor_home_firt_date_year = $10,
      motor_home_construction_year = $11,
      motor_home_kilometre = $12,
      motor_home_power = $13,
      motor_home_country = $14,
      motor_home_city_zipcode = $15,
      motor_home_city_radius = $16,
      motor_home_fuel_type = $17,
      motor_home_transmission = $18,
      motor_home_emission_class = $19,
      motor_home_emissions_sticker = $20,
      motor_home_features = $21,
      motor_home_length = $22,
      motor_home_gvw = $23,
      motor_home_number_of_bunks = $24,
      motor_home_axles = $25,
      motor_home_trailer_coupling = $26,
      motor_home_cruise_control = $27,
      motor_home_radio = $28,
      motor_home_parking_sensors = $29,
      motor_home_air_conditioning = $30,
      motor_home_interior_features = $31,
      motor_home_exterior_colour = $32,
      motor_home_vat = $33,
      motor_home_damaged = $34,
      motor_home_numbrt_of_owner = $35,
      motor_home_damage_by_hail = $36,
      motor_home_full_service_history = $37,
      motor_home_new_hu = $38,
      motor_home_renting_possible = $39,
      motor_home_warranty = $40,
      motor_home_discount_offers = $41,
      motor_home_vendor = $42,
      motor_home_dealer_rating = $43,
      motor_home_images_url = $44,
      motor_home_images_name = $45,
      user_id = $46,
      user_phone = $47,
      user_email = $48
   WHERE
      motor_home_id = $1
   RETURNING *;
`;

const motorhomeListAdmin = (limit, offset) => {
   const LIST = `
      SELECT
         *
      FROM
         motor_homes
      ORDER BY
         motor_home_id DESC
      LIMIT ${limit}
      OFFSET ${offset};
   `;

   return fetchALL(LIST)
}
const foundMotorhomeById = (id) => fetch(BY_ID, id)
const foundMotorhome = (id) => fetch(FOUND_MOTOR_HOME, id)
const updateStatus = (id, status) => fetch(UPDATE_STATUS, id, status)
const deleteMotorhome = (id) => fetch(DELETE_MOTOR_HOME, id)
const foundMotorhomeList = (
   motor_home_condition,
   motor_home_make,
   motor_home_model,
   typesId,
   motor_home_price_from,
   motor_home_price_to,
   motor_home_firt_date_year_from,
   motor_home_firt_date_year_to,
   motor_home_construction_year_from,
   motor_home_construction_year_to,
   motor_home_kilometre_from,
   motor_home_kilometre_to,
   motor_home_power_from,
   motor_home_power_to,
   motor_home_country,
   motor_home_city,
   zipcode,
   motor_home_city_radius,
   fuelArr,
   transmissionArr,
   featuresId,
   motor_home_length_from,
   motor_home_length_to,
   motor_home_gvw_from,
   motor_home_gvw_to,
   motor_home_number_of_bunks_from,
   motor_home_number_of_bunks_to,
   motor_home_axles,
   motor_home_trailer_coupling,
   motor_home_cruise_control,
   motor_home_radio,
   motor_home_parking_sensors,
   motor_home_air_conditioning,
   interiorFeaturesId,
   colorArr,
   day,
   motor_home_vat,
   motor_home_damaged,
   motor_home_numbrt_of_owner,
   motor_home_damage_by_hail,
   motor_home_full_service_history,
   motor_home_new_hu,
   motor_home_renting_possible,
   motor_home_warranty,
   motor_home_discount_offers,
   motor_home_vendor,
   motor_home_dealer_rating,
   pictures,
   video,
   offset,
   limit
) => {
   const typesConditions = typesId?.map(e => `motor_home_type = '${e}'`).join(' OR ');
//   const cityConditions = motor_home_city?.map(city => `motor_home_city_zipcode = '${city}'`).join(' OR ');
   const fuelArrConditions = fuelArr?.map(e => `motor_home_fuel_type = '${e}'`).join(' OR ');
   const transmissionArrConditions = transmissionArr?.map(e => `motor_home_transmission = '${e}'`).join(' OR ');
   const featuresString = featuresId?.map(e => `'${e}'`).join(', ');
   const interiorFeaturesString = interiorFeaturesId?.map(e => `'${e}'`).join(', ');
   const colorArrConditions = colorArr?.map(e => `motor_home_exterior_colour = '${e}'`).join(' OR ');

   const MOTOR_HOME_LIST = `
      SELECT
         *
      FROM
         motor_homes
      WHERE
         motor_home_active = true
         ${motor_home_condition ? `and motor_home_condition ilike '%${motor_home_condition}%'` : ''}
         ${motor_home_make ? `and motor_home_make = '${motor_home_make}'` : ''}
         ${motor_home_model ? `and motor_home_make = '${motor_home_model}'` : ''}
         ${typesConditions ? `and (${typesConditions})` : ''}
         ${fuelArrConditions ? `and (${fuelArrConditions})` : ''}
         ${transmissionArrConditions ? `and (${transmissionArrConditions})` : ''}
         ${featuresId?.length > 0 ? `and motor_home_features @> ARRAY[${featuresString}]` : ''}
         ${interiorFeaturesId?.length > 0 ? `and motor_home_interior_features @> ARRAY[${interiorFeaturesString}]` : ''}
         ${colorArrConditions ? `and (${colorArrConditions})` : ''}
         ${motor_home_price_from ? `and ${motor_home_price_from} <= motor_home_price` : ""}
         ${motor_home_price_to ? `and ${motor_home_price_to} >= motor_home_price` : ""}
         ${motor_home_firt_date_year_from ? `and ${motor_home_firt_date_year_from} <= motor_home_firt_date_year` : ""}
         ${motor_home_firt_date_year_to ? `and ${motor_home_firt_date_year_to} >= motor_home_firt_date_year` : ""}
         ${motor_home_construction_year_from ? `and ${motor_home_construction_year_from} <= motor_home_construction_year` : ""}
         ${motor_home_construction_year_to ? `and ${motor_home_construction_year_to} >= motor_home_construction_year` : ""}
         ${motor_home_kilometre_from ? `and ${motor_home_kilometre_from} <= motor_home_kilometre` : ""}
         ${motor_home_kilometre_to ? `and ${motor_home_kilometre_to} >= motor_home_kilometre` : ""}
         ${motor_home_power_from ? `and ${motor_home_power_from} <= motor_home_power` : ""}
         ${motor_home_power_to ? `and ${motor_home_power_to} >= motor_home_power` : ""}
         ${motor_home_length_from ? `and ${motor_home_length_from} <= motor_home_length` : ""}
         ${motor_home_length_to ? `and ${motor_home_length_to} >= motor_home_length` : ""}
         ${motor_home_gvw_from ? `and ${motor_home_gvw_from} <= motor_home_gvw` : ""}
         ${motor_home_gvw_to ? `and ${motor_home_gvw_to} >= motor_home_gvw` : ""}
         ${motor_home_number_of_bunks_from ? `and ${motor_home_number_of_bunks_from} <= motor_home_number_of_bunks` : ""}
         ${motor_home_number_of_bunks_to ? `and ${motor_home_number_of_bunks_to} >= motor_home_number_of_bunks` : ""}
         ${motor_home_numbrt_of_owner ? `and ${motor_home_numbrt_of_owner} >= motor_home_numbrt_of_owner` : ""}
         ${motor_home_country ? `and ${motor_home_country} ilike '%motor_home_country%'` : ""}
         ${motor_home_city ? `and  motor_home_city_zipcode ilike '%${motor_home_city}%'` : ""}
         ${zipcode ? `and motor_home_city_zipcode ilike '%${zipcode}%'` : ""}
         ${motor_home_city_radius ? `and ${motor_home_city_radius} <= motor_home_city_radius` : ""}
         ${motor_home_axles <= 3 ? `and ${motor_home_axles} = motor_home_axles` : motor_home_axles > 3 ? `and 3 < motor_home_axles` : ''}
         ${motor_home_trailer_coupling ? `and motor_home_trailer_coupling ilike '%${motor_home_trailer_coupling}%' ` : ""}
         ${motor_home_cruise_control ? `and motor_home_cruise_control ilike '%${motor_home_cruise_control}%' ` : ""}
         ${motor_home_radio ? `and motor_home_radio ilike '%${motor_home_radio}%' ` : ""}
         ${motor_home_parking_sensors ? `and motor_home_parking_sensors ilike '%${motor_home_parking_sensors}%' ` : ""}
         ${motor_home_air_conditioning ? `and motor_home_air_conditioning ilike '%${motor_home_air_conditioning}%' ` : ""}
         ${motor_home_vat ? `and motor_home_vat ilike '%${motor_home_vat}%' ` : ""}
         ${motor_home_damaged ? `and motor_home_damaged ilike '%${motor_home_damaged}%' ` : ""}
         ${motor_home_damage_by_hail ? `and motor_home_damage_by_hail = ${motor_home_damage_by_hail} ` : ""}
         ${motor_home_full_service_history ? `and motor_home_full_service_history = ${motor_home_full_service_history} ` : ""}
         ${motor_home_new_hu ? `and motor_home_new_hu = ${motor_home_new_hu} ` : ""}
         ${motor_home_renting_possible ? `and motor_home_renting_possible = ${motor_home_renting_possible} ` : ""}
         ${motor_home_warranty ? `and motor_home_warranty = ${motor_home_warranty} ` : ""}
         ${motor_home_discount_offers ? `and motor_home_discount_offers = ${motor_home_discount_offers} ` : ""}
         ${motor_home_vendor ? `and motor_home_vendor = ${motor_home_vendor} ` : ""}
         ${motor_home_dealer_rating ? `and motor_home_dealer_rating >= ${motor_home_dealer_rating} ` : ""}
         ${pictures == true ? `and Array_Length(motor_home_images_url, 1) > 0` : ""}
         ${video == true ? `and motor_home_video_link != '' ` : ""}
         ${day ? `and motor_home_ad_create_at > current_date - interval '${day} days'` : ""}
      ORDER BY
         motor_home_id DESC
      LIMIT ${limit}
      OFFSET ${offset}
   `;

   return fetchALL(MOTOR_HOME_LIST)
}

const foundMotorhomeCount = (
   motor_home_condition,
   motor_home_make,
   motor_home_model,
   typesId,
   motor_home_price_from,
   motor_home_price_to,
   motor_home_firt_date_year_from,
   motor_home_firt_date_year_to,
   motor_home_construction_year_from,
   motor_home_construction_year_to,
   motor_home_kilometre_from,
   motor_home_kilometre_to,
   motor_home_power_from,
   motor_home_power_to,
   motor_home_country,
   motor_home_city,
   zipcode,
   motor_home_city_radius,
   fuelArr,
   transmissionArr,
   featuresId,
   motor_home_length_from,
   motor_home_length_to,
   motor_home_gvw_from,
   motor_home_gvw_to,
   motor_home_number_of_bunks_from,
   motor_home_number_of_bunks_to,
   motor_home_axles,
   motor_home_trailer_coupling,
   motor_home_cruise_control,
   motor_home_radio,
   motor_home_parking_sensors,
   motor_home_air_conditioning,
   interiorFeaturesId,
   colorArr,
   day,
   motor_home_vat,
   motor_home_damaged,
   motor_home_numbrt_of_owner,
   motor_home_damage_by_hail,
   motor_home_full_service_history,
   motor_home_new_hu,
   motor_home_renting_possible,
   motor_home_warranty,
   motor_home_discount_offers,
   motor_home_vendor,
   motor_home_dealer_rating,
   pictures,
   video
) => {
   const typesConditions = typesId?.map(e => `motor_home_type = '${e}'`).join(' OR ');
//   const cityConditions = motor_home_city?.map(city => `motor_home_city_zipcode = '${city}'`).join(' OR ');
   const fuelArrConditions = fuelArr?.map(e => `motor_home_fuel_type = '${e}'`).join(' OR ');
   const transmissionArrConditions = transmissionArr?.map(e => `motor_home_transmission = '${e}'`).join(' OR ');
   const featuresString = featuresId?.map(e => `'${e}'`).join(', ');
   const interiorFeaturesString = interiorFeaturesId?.map(e => `'${e}'`).join(', ');
   const colorArrConditions = colorArr?.map(e => `motor_home_exterior_colour = '${e}'`).join(' OR ');

   const MOTOR_HOME_LIST = `
      SELECT
         count(motor_home_id)
      FROM
         motor_homes
      WHERE
         motor_home_active = true
         ${motor_home_condition ? `and motor_home_condition ilike '%${motor_home_condition}%'` : ''}
         ${motor_home_make ? `and motor_home_make = '${motor_home_make}'` : ''}
         ${motor_home_model ? `and motor_home_make = '${motor_home_model}'` : ''}
         ${typesConditions ? `and (${typesConditions})` : ''}
         ${fuelArrConditions ? `and (${fuelArrConditions})` : ''}
         ${transmissionArrConditions ? `and (${transmissionArrConditions})` : ''}
         ${featuresId?.length > 0 ? `and motor_home_features @> ARRAY[${featuresString}]` : ''}
         ${interiorFeaturesId?.length > 0 ? `and motor_home_interior_features @> ARRAY[${interiorFeaturesString}]` : ''}
         ${colorArrConditions ? `and (${colorArrConditions})` : ''}
         ${motor_home_price_from ? `and ${motor_home_price_from} <= motor_home_price` : ""}
         ${motor_home_price_to ? `and ${motor_home_price_to} >= motor_home_price` : ""}
         ${motor_home_firt_date_year_from ? `and ${motor_home_firt_date_year_from} <= motor_home_firt_date_year` : ""}
         ${motor_home_firt_date_year_to ? `and ${motor_home_firt_date_year_to} >= motor_home_firt_date_year` : ""}
         ${motor_home_construction_year_from ? `and ${motor_home_construction_year_from} <= motor_home_construction_year` : ""}
         ${motor_home_construction_year_to ? `and ${motor_home_construction_year_to} >= motor_home_construction_year` : ""}
         ${motor_home_kilometre_from ? `and ${motor_home_kilometre_from} <= motor_home_kilometre` : ""}
         ${motor_home_kilometre_to ? `and ${motor_home_kilometre_to} >= motor_home_kilometre` : ""}
         ${motor_home_power_from ? `and ${motor_home_power_from} <= motor_home_power` : ""}
         ${motor_home_power_to ? `and ${motor_home_power_to} >= motor_home_power` : ""}
         ${motor_home_length_from ? `and ${motor_home_length_from} <= motor_home_length` : ""}
         ${motor_home_length_to ? `and ${motor_home_length_to} >= motor_home_length` : ""}
         ${motor_home_gvw_from ? `and ${motor_home_gvw_from} <= motor_home_gvw` : ""}
         ${motor_home_gvw_to ? `and ${motor_home_gvw_to} >= motor_home_gvw` : ""}
         ${motor_home_number_of_bunks_from ? `and ${motor_home_number_of_bunks_from} <= motor_home_number_of_bunks` : ""}
         ${motor_home_number_of_bunks_to ? `and ${motor_home_number_of_bunks_to} >= motor_home_number_of_bunks` : ""}
         ${motor_home_numbrt_of_owner ? `and ${motor_home_numbrt_of_owner} >= motor_home_numbrt_of_owner` : ""}
         ${motor_home_country ? `and ${motor_home_country} ilike '%motor_home_country%'` : ""}
         ${motor_home_city ? `and  motor_home_city_zipcode ilike '%${motor_home_city}%'` : ""}
         ${zipcode ? `and motor_home_city_zipcode ilike '%${zipcode}%'` : ""}
         ${motor_home_city_radius ? `and ${motor_home_city_radius} <= motor_home_city_radius` : ""}
         ${motor_home_axles <= 3 ? `and ${motor_home_axles} = motor_home_axles` : motor_home_axles > 3 ? `3 < motor_home_axles` : ''}
         ${motor_home_trailer_coupling ? `and motor_home_trailer_coupling ilike '%${motor_home_trailer_coupling}%' ` : ""}
         ${motor_home_cruise_control ? `and motor_home_cruise_control ilike '%${motor_home_cruise_control}%' ` : ""}
         ${motor_home_radio ? `and motor_home_radio ilike '%${motor_home_radio}%' ` : ""}
         ${motor_home_parking_sensors ? `and motor_home_parking_sensors ilike '%${motor_home_parking_sensors}%' ` : ""}
         ${motor_home_air_conditioning ? `and motor_home_air_conditioning ilike '%${motor_home_air_conditioning}%' ` : ""}
         ${motor_home_vat ? `and motor_home_vat ilike '%${motor_home_vat}%' ` : ""}
         ${motor_home_damaged ? `and motor_home_damaged ilike '%${motor_home_damaged}%' ` : ""}
         ${motor_home_damage_by_hail ? `and motor_home_damage_by_hail = ${motor_home_damage_by_hail} ` : ""}
         ${motor_home_full_service_history ? `and motor_home_full_service_history = ${motor_home_full_service_history} ` : ""}
         ${motor_home_new_hu ? `and motor_home_new_hu = ${motor_home_new_hu} ` : ""}
         ${motor_home_renting_possible ? `and motor_home_renting_possible = ${motor_home_renting_possible} ` : ""}
         ${motor_home_warranty ? `and motor_home_warranty = ${motor_home_warranty} ` : ""}
         ${motor_home_discount_offers ? `and motor_home_discount_offers = ${motor_home_discount_offers} ` : ""}
         ${motor_home_vendor ? `and motor_home_vendor = '${motor_home_vendor}' ` : ""}
         ${motor_home_dealer_rating ? `and motor_home_dealer_rating = ${motor_home_dealer_rating} ` : ""}
         ${pictures == true ? `and Array_Length(motor_home_images_url, 1) > 0` : ""}
         ${video == true ? `and motor_home_video_link != '' ` : ""}
         ${day ? `and motor_home_ad_create_at > current_date - interval '${day} days'` : ""};
   `;

   return fetch(MOTOR_HOME_LIST)
}
const addMotorhome = (
   motor_home_make,
   motor_home_model,
   motor_home_describtion,
   motor_home_video_link,
   motor_home_condition,
   typesId,
   motor_home_price,
   motor_home_firt_date,
   motor_home_firt_date_year,
   motor_home_construction_year,
   motor_home_kilometre,
   motor_home_power,
   motor_home_country,
   motor_home_city_zipcode,
   motor_home_city_radius,
   motor_home_fuel_type,
   motor_home_transmission,
   motor_home_emission_class,
   motor_home_emissions_sticker,
   featuresId,
   motor_home_length,
   motor_home_gvw,
   motor_home_number_of_bunks,
   motor_home_axles,
   motor_home_trailer_coupling,
   motor_home_cruise_control,
   motor_home_radio,
   motor_home_parking_sensors,
   motor_home_air_conditioning,
   interiorFeaturesId,
   motor_home_exterior_colour,
   motor_home_vat,
   motor_home_damaged,
   motor_home_numbrt_of_owner,
   motor_home_damage_by_hail,
   motor_home_full_service_history,
   motor_home_new_hu,
   motor_home_renting_possible,
   motor_home_warranty,
   motor_home_discount_offers,
   motor_home_vendor,
   motor_home_dealer_rating,
   motorhome_img,
   motorhome_img_name,
   user_id,
   user_phone,
   user_email
) => fetch(
   ADD_MOTOR_HOME,
   motor_home_make,
   motor_home_model,
   motor_home_describtion,
   motor_home_video_link,
   motor_home_condition,
   typesId,
   motor_home_price,
   motor_home_firt_date,
   motor_home_firt_date_year,
   motor_home_construction_year,
   motor_home_kilometre,
   motor_home_power,
   motor_home_country,
   motor_home_city_zipcode,
   motor_home_city_radius,
   motor_home_fuel_type,
   motor_home_transmission,
   motor_home_emission_class,
   motor_home_emissions_sticker,
   featuresId,
   motor_home_length,
   motor_home_gvw,
   motor_home_number_of_bunks,
   motor_home_axles,
   motor_home_trailer_coupling,
   motor_home_cruise_control,
   motor_home_radio,
   motor_home_parking_sensors,
   motor_home_air_conditioning,
   interiorFeaturesId,
   motor_home_exterior_colour,
   motor_home_vat,
   motor_home_damaged,
   motor_home_numbrt_of_owner,
   motor_home_damage_by_hail,
   motor_home_full_service_history,
   motor_home_new_hu,
   motor_home_renting_possible,
   motor_home_warranty,
   motor_home_discount_offers,
   motor_home_vendor,
   motor_home_dealer_rating,
   motorhome_img,
   motorhome_img_name,
   user_id,
   user_phone,
   user_email
)
const updateMotorhome = (
   id,
   motor_home_make,
   motor_home_model,
   motor_home_describtion,
   motor_home_video_link,
   motor_home_condition,
   typesId,
   motor_home_price,
   motor_home_firt_date,
   motor_home_firt_date_year,
   motor_home_construction_year,
   motor_home_kilometre,
   motor_home_power,
   motor_home_country,
   motor_home_city_zipcode,
   motor_home_city_radius,
   motor_home_fuel_type,
   motor_home_transmission,
   motor_home_emission_class,
   motor_home_emissions_sticker,
   featuresId,
   motor_home_length,
   motor_home_gvw,
   motor_home_number_of_bunks,
   motor_home_axles,
   motor_home_trailer_coupling,
   motor_home_cruise_control,
   motor_home_radio,
   motor_home_parking_sensors,
   motor_home_air_conditioning,
   interiorFeaturesId,
   motor_home_exterior_colour,
   motor_home_vat,
   motor_home_damaged,
   motor_home_numbrt_of_owner,
   motor_home_damage_by_hail,
   motor_home_full_service_history,
   motor_home_new_hu,
   motor_home_renting_possible,
   motor_home_warranty,
   motor_home_discount_offers,
   motor_home_vendor,
   motor_home_dealer_rating,
   motorhome_img,
   motorhome_img_name,
   user_id,
   user_phone,
   user_email
) => fetch(
   UPDATE_MOTOR_HOME,
   id,
   motor_home_make,
   motor_home_model,
   motor_home_describtion,
   motor_home_video_link,
   motor_home_condition,
   typesId,
   motor_home_price,
   motor_home_firt_date,
   motor_home_firt_date_year,
   motor_home_construction_year,
   motor_home_kilometre,
   motor_home_power,
   motor_home_country,
   motor_home_city_zipcode,
   motor_home_city_radius,
   motor_home_fuel_type,
   motor_home_transmission,
   motor_home_emission_class,
   motor_home_emissions_sticker,
   featuresId,
   motor_home_length,
   motor_home_gvw,
   motor_home_number_of_bunks,
   motor_home_axles,
   motor_home_trailer_coupling,
   motor_home_cruise_control,
   motor_home_radio,
   motor_home_parking_sensors,
   motor_home_air_conditioning,
   interiorFeaturesId,
   motor_home_exterior_colour,
   motor_home_vat,
   motor_home_damaged,
   motor_home_numbrt_of_owner,
   motor_home_damage_by_hail,
   motor_home_full_service_history,
   motor_home_new_hu,
   motor_home_renting_possible,
   motor_home_warranty,
   motor_home_discount_offers,
   motor_home_vendor,
   motor_home_dealer_rating,
   motorhome_img,
   motorhome_img_name,
   user_id,
   user_phone,
   user_email
)

module.exports = {
   motorhomeListAdmin,
   foundMotorhomeById,
   foundMotorhome,
   updateStatus,
   deleteMotorhome,
   foundMotorhomeList,
   foundMotorhomeCount,
   addMotorhome,
   updateMotorhome
}