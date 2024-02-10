const { fetch, fetchALL } = require("../../lib/postgres");

const ADD_ENGINE_DATA = `
   UPDATE
      cars
   SET
      car_fuel_type = $2,
      car_power = $3,
      car_cubic_capacity = $4,
      car_transmission = $5,
      car_fuel_consumption = $6,
      car_emissions_sticker = $7,
      car_emission_class = $8,
      car_exterior_colour = $9,
      car_trailer_coupling = $10,
      car_parking_sensors = $11,
      car_cruise_control = $12,
      others = $13
   WHERE
      car_id = $1
   RETURNING *;
`;

const ADD_INTERIOR_DATA = `
   UPDATE
      cars
   SET
      car_interior_colour = $2,
      car_interior_material = $3,
      car_airbags = $4,
      car_air_conditioning = $5,
      extras = $6,
      car_vendor = $7,
      car_dealer_rating = $8,
      car_discount_offers = $9,
      car_non_smoker = $10,
      car_taxi = $11,
      car_vat = $12,
      car_warranty = $13,
      car_environmental_bonus = $14,
      car_damaged = $15,
      car_commercial = $16,
      car_programme = $17,
      car_description = $18,
      car_active = true
   WHERE
      car_id = $1
   RETURNING *;
`;

const UPDATE_STATUS = `
   UPDATE 
      cars
   SET
      car_active = $2
   WHERE
      car_id = $1
   RETURNING *;
`;

const ADD_CAR = `
   INSERT INTO
      cars (
         user_id,
         car_make,
         car_model,
         car_variant,
         car_body,
         car_number_seats,
         car_number_door,
         car_silding_door,
         car_condition,
         car_type,
         car_payment_type,
         car_price,
         car_firt_date,
         car_firt_date_year,
         car_mileage,
         car_hu_valid_until,
         car_previous_owners,
         car_full_service_history,
         car_roadworthy,
         car_country,
         car_city_zipcode,
         car_radius,
         car_images_url,
         car_images_name,
         user_email,
         user_phone,
         car_vide_link
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
         $27
      )
      RETURNING *;
`;

const UPDATE_CAR = `
   UPDATE
      cars
   SET
      user_id = $2,
      car_make = $3,
      car_model = $4,
      car_variant = $5,
      car_body = $6,
      car_number_seats = $7,
      car_number_door = $8,
      car_silding_door = $9,
      car_condition = $10,
      car_type = $11,
      car_payment_type = $12,
      car_price  = $13,
      car_firt_date = $14,
      car_firt_date_year = $15,
      car_mileage = $16,
      car_hu_valid_until = $17,
      car_previous_owners = $18,
      car_full_service_history = $19,
      car_roadworthy = $20,
      car_country = $21,
      car_city_zipcode = $22,
      car_radius = $23,
      user_email = $24,
      user_phone = $25,
      car_vide_link = $26,
      car_interior_colour = $27,
      car_interior_material = $28,
      car_airbags = $29,
      car_air_conditioning = $30,
      extras = $31,
      car_vendor = $32,
      car_dealer_rating = $33,
      car_discount_offers = $34,
      car_non_smoker = $35,
      car_taxi = $36,
      car_vat = $37,
      car_warranty = $38,
      car_environmental_bonus = $39,
      car_damaged = $40,
      car_commercial = $41,
      car_programme = $42,
      car_description = $43,
      car_fuel_type = $44,
      car_power = $45,
      car_cubic_capacity = $46,
      car_transmission = $47,
      car_fuel_consumption = $48,
      car_emissions_sticker = $49,
      car_emission_class = $50,
      car_exterior_colour = $51,
      car_trailer_coupling = $52,
      car_parking_sensors = $53,
      car_cruise_control = $54,
      others = $55,
      car_images_url = $56,
      car_images_name = $57
   WHERE
      car_id = $1
   RETURNING *;
`;

const FOUND_CAR = `
   SELECT
      car_id,
      car_images_url,
      car_images_name
   FROM
      cars
   WHERE
      car_id = $1;
`;

const DELETE_CAR = `
   DELETE FROM
      cars
   WHERE
      car_id = $1
   RETURNING *;
`;

const FOUND_CAR_BY_ID = `
   SELECT
      *
   FROM
      cars a
   INNER JOIN
      users b
   ON
      a.user_id = b.user_id
   WHERE
      car_id = $1
`;

const carsList = (limit, offset) => {
   const CARS_LIST = `
      SELECT
         *
      FROM
         cars
      ORDER BY
         car_id DESC
      LIMIT ${limit}
      OFFSET ${offset};
   `;

   return fetchALL(CARS_LIST)
}
const foundCarsList = (
   car_make,
   car_model,
   car_description,
   car_variant,
   bodyArr,
   car_number_seats,
   car_number_door,
   car_silding_door,
   car_condition,
   typeArr,
   car_payment_type,
   car_price_from,
   car_price_up_to,
   car_firt_date_year_from,
   car_firt_date_year_up_to,
   car_mileage_from,
   car_mileage_up_to,
   car_hu_valid_until,
   car_previous_owners,
   car_full_service_history,
   car_roadworthy,
   car_country,
   car_city,
   zipcode,
   car_radius,
   fuelArr,
   car_power_from,
   car_power_up_to,
   car_cubic_capacity_from,
   car_cubic_capacity_to,
   transmissionArr,
   car_fuel_consumption,
   car_emissions_sticker,
   car_emission_class,
   colorArr,
   car_trailer_coupling,
   parkingArr,
   car_cruise_control,
   interiorColourgArr,
   interiorMaterialgArr,
   car_airbags,
   car_air_conditioning,
   extras,
   others,
   car_vendor,
   car_dealer_rating,
   car_discount_offers,
   car_non_smoker,
   car_taxi,
   car_vat,
   car_warranty,
   car_environmental_bonus,
   car_damaged,
   car_commercial,
   car_programme,
   video,
   picture,
   days,
   offset,
   limit
) => {
   const bodyConditions = bodyArr?.map(body => `car_body = '${body}'`).join(' OR ') || '';
   const Conditions = car_condition?.map(type => `car_condition = '${type}'`).join(' OR ') || '';
   //   const cityConditions = car_city.length > 0 ? car_city?.map(city => `car_city_zipcode = '${city}'`).join(' OR ') : '';
   const fuelConditions = fuelArr?.map(car_fuel_type => `car_fuel_type = '${car_fuel_type}'`).join(' OR ') || '';
   const transmissionConditions = transmissionArr?.map(transmission => `car_transmission = '${transmission}'`).join(' OR ') || '';
   const colorConditions = colorArr?.map(color => `car_exterior_colour = '${color}'`).join(' OR ') || '';
   const parkingConditions = parkingArr?.map(parking => `car_parking_sensors = '${parking}'`).join(' OR ') || '';
   const interiorColourConditions = interiorColourgArr?.map(e => `car_interior_colour = '${e}'`).join(' OR ') || '';
   const interiorMaterialConditions = interiorMaterialgArr?.map(e => `car_interior_material = '${e}'`).join(' OR ') || '';
   const extrasString = extras?.map(extra => `'${extra}'`).join(', ') || '';
   const othersString = others?.map(other => `'${other}'`).join(', ') || '';

   const FOUND_CARS_LIST = `
      SELECT 
         *
      FROM
         cars
      WHERE
         car_active = true
         ${car_make ? `and car_make = '${car_make}'` : ""}
         ${car_model ? `and car_model = '${car_model}'` : ""}
         ${car_description ? `and car_description ilike '%${car_description}%'` : ""}
         ${car_variant ? `and car_variant = '${car_variant}'` : ""}
         ${bodyConditions ? `and (${bodyConditions})` : ""}
         ${car_number_seats ? `and car_number_seats = ${car_number_seats}` : ""}
         ${car_number_door ? `and car_number_door = ${car_number_door}` : ""}
         ${car_silding_door ? `and car_silding_door = '${car_silding_door}'` : ""}
         ${Conditions ? `and (${Conditions})` : ""}
         ${typeArr ? `and  car_type = '${typeArr}'` : ""}
         ${car_payment_type ? `and car_payment_type = '${car_payment_type}'` : ""}
         ${car_price_from ? `and car_price >= ${car_price_from}` : ""}
         ${car_price_up_to ? `and car_price <= ${car_price_up_to}` : ""}
         ${car_firt_date_year_from ? `and car_firt_date_year >= ${car_firt_date_year_from}` : ""}
         ${car_firt_date_year_up_to ? `and car_firt_date_year <= ${car_firt_date_year_up_to}` : ""}
         ${car_mileage_from ? `and car_mileage >= ${car_mileage_from}` : ""}
         ${car_mileage_up_to ? `and car_mileage <= ${car_mileage_up_to}` : ""}
         ${car_hu_valid_until ? `and car_hu_valid_until = '${car_hu_valid_until}'` : ""}
         ${car_previous_owners ? `and car_previous_owners = ${car_previous_owners}` : ""}
         ${car_full_service_history ? `and car_full_service_history = '${car_full_service_history}'` : ""}
         ${car_roadworthy ? `and car_roadworthy = '${car_roadworthy}'` : ""}
         ${car_country ? `and car_country = '${car_country}'` : ""}
         ${car_city ? `and car_city_zipcode ilike '%${car_city}%'` : ""}
         ${zipcode ? `and car_city_zipcode ilike '%${zipcode}%'` : ""}
         ${car_radius ? `and car_radius = ${car_radius}` : ""}
         ${fuelConditions ? `and (${fuelConditions})` : ''}
         ${car_power_from ? `and car_power >= ${car_power_from}` : ""}
         ${car_power_up_to ? `and car_power <= ${car_power_up_to}` : ""}
         ${car_cubic_capacity_from ? `and car_cubic_capacity >= ${car_cubic_capacity_from}` : ""}
         ${car_cubic_capacity_to ? `and car_cubic_capacity <= ${car_cubic_capacity_to}` : ""}
         ${transmissionConditions ? `and (${transmissionConditions})` : ''}
         ${car_fuel_consumption ? `and car_fuel_consumption = ${car_fuel_consumption}` : ""}
         ${car_emissions_sticker ? `and car_emissions_sticker = '${car_emissions_sticker}'` : ""}
         ${car_emission_class ? `and car_emission_class = '${car_emission_class}'` : ""}
         ${colorConditions ? `and (${colorConditions})` : ''}
         ${car_trailer_coupling ? `and car_trailer_coupling = '${car_trailer_coupling}'` : ""}
         ${parkingConditions ? `and (${parkingConditions}) ` : ''}
         ${car_cruise_control ? `and car_cruise_control = '${car_cruise_control}'` : ""}
         ${interiorColourConditions ? `and (${interiorColourConditions})` : ''}
         ${interiorMaterialConditions ? `and (${interiorMaterialConditions})` : ''}
         ${car_airbags ? `and car_airbags = '${car_airbags}'` : ""}
         ${car_air_conditioning ? `and car_air_conditioning = '${car_air_conditioning}'` : ""}
         ${car_vendor ? `and car_vendor = '${car_vendor}'` : ""}
         ${car_dealer_rating ? `and car_dealer_rating >= ${car_dealer_rating}` : ""}
         ${car_discount_offers == true ? `and car_discount_offers = ${car_discount_offers}` : ""}
         ${car_non_smoker == true ? `and car_non_smoker = ${car_non_smoker}` : ""}
         ${car_taxi == true ? `and car_taxi = ${car_taxi}` : ""}
         ${car_vat == true ? `and car_vat = ${car_vat}` : ""}
         ${car_warranty == true ? `and car_warranty = ${car_warranty}` : ""}
         ${car_environmental_bonus == true ? `and car_environmental_bonus = ${car_environmental_bonus}` : ""}
         ${car_damaged ? `and car_damaged = '${car_damaged}'` : ""}
         ${car_commercial ? `and car_commercial = '${car_commercial}'` : ""}
         ${car_programme ? `and car_programme = '${car_programme}'` : ""}
         ${extras?.length > 0 ? `and extras @> ARRAY[${extrasString}]` : ""}
         ${others?.length > 0 ? `and others @> ARRAY[${othersString}]` : ""}
         ${picture == true ? `and Array_Length(car_images_url, 1) > 0` : ""}
         ${video == true ? `and car_vide_link != '' ` : ""}
         ${days ? `and car_ad_create_at > current_date - interval '${days} days'` : ""}
      ORDER BY
         car_id desc
      LIMIT ${limit}
      OFFSET ${offset};
   `;

   return fetchALL(FOUND_CARS_LIST)
}
const foundCarsCount = (
   car_make,
   car_model,
   car_description,
   car_variant,
   bodyArr,
   car_number_seats,
   car_number_door,
   car_silding_door,
   car_condition,
   typeArr,
   car_payment_type,
   car_price_from,
   car_price_up_to,
   car_firt_date_year_from,
   car_firt_date_year_up_to,
   car_mileage_from,
   car_mileage_up_to,
   car_hu_valid_until,
   car_previous_owners,
   car_full_service_history,
   car_roadworthy,
   car_country,
   car_city,
   zipcode,
   car_radius,
   fuelArr,
   car_power_from,
   car_power_up_to,
   car_cubic_capacity_from,
   car_cubic_capacity_to,
   transmissionArr,
   car_fuel_consumption,
   car_emissions_sticker,
   car_emission_class,
   colorArr,
   car_trailer_coupling,
   parkingArr,
   car_cruise_control,
   interiorColourgArr,
   interiorMaterialgArr,
   car_airbags,
   car_air_conditioning,
   extras,
   others,
   car_vendor,
   car_dealer_rating,
   car_discount_offers,
   car_non_smoker,
   car_taxi,
   car_vat,
   car_warranty,
   car_environmental_bonus,
   car_damaged,
   car_commercial,
   car_programme,
   video,
   picture,
   days
) => {
   const bodyConditions = bodyArr?.map(body => `car_body = '${body}'`).join(' OR ') || '';
   const Conditions = car_condition?.map(type => `car_condition = '${type}'`).join(' OR ') || '';
   //   const cityConditions = car_city.length > 0 ? car_city?.map(city => `car_city_zipcode = '${city}'`).join(' OR ') : '';
   const fuelConditions = fuelArr?.map(car_fuel_type => `car_fuel_type = '${car_fuel_type}'`).join(' OR ') || '';
   const transmissionConditions = transmissionArr?.map(transmission => `car_transmission = '${transmission}'`).join(' OR ') || '';
   const colorConditions = colorArr?.map(color => `car_exterior_colour = '${color}'`).join(' OR ') || '';
   const parkingConditions = parkingArr?.map(parking => `car_parking_sensors = '${parking}'`).join(' OR ') || '';
   const interiorColourConditions = interiorColourgArr?.map(e => `car_interior_colour = '${e}'`).join(' OR ') || '';
   const interiorMaterialConditions = interiorMaterialgArr?.map(e => `car_interior_material = '${e}'`).join(' OR ') || '';
   const extrasString = extras?.map(extra => `'${extra}'`).join(', ');
   const othersString = others?.map(other => `'${other}'`).join(', ');

   const FOUND_CARS_COUNT = `
   SELECT 
      count(car_id)
   FROM
      cars
   WHERE
      car_active = true
      ${car_make ? `and car_make = '${car_make}'` : ""}
      ${car_model ? `and car_model = '${car_model}'` : ""}
      ${car_description ? `and car_description ilike '%${car_description}%'` : ""}
      ${car_variant ? `and car_variant = '${car_variant}'` : ""}
      ${bodyConditions ? `and (${bodyConditions})` : ''}
      ${car_number_seats ? `and car_number_seats = ${car_number_seats}` : ""}
      ${car_number_door ? `and car_number_door = ${car_number_door}` : ""}
      ${car_silding_door ? `and car_silding_door = '${car_silding_door}'` : ""}
      ${Conditions ? `and (${Conditions})` : ""}
      ${typeArr ? `and car_type = '${typeArr}'` : ''}
      ${car_payment_type ? `and car_payment_type = '${car_payment_type}'` : ""}
      ${car_price_from ? `and car_price >= ${car_price_from}` : ""}
      ${car_price_up_to ? `and car_price <= ${car_price_up_to}` : ""}
      ${car_firt_date_year_from ? `and car_firt_date_year >= ${car_firt_date_year_from}` : ""}
      ${car_firt_date_year_up_to ? `and car_firt_date_year <= ${car_firt_date_year_up_to}` : ""}
      ${car_mileage_from ? `and car_mileage >= ${car_mileage_from}` : ""}
      ${car_mileage_up_to ? `and car_mileage <= ${car_mileage_up_to}` : ""}
      ${car_hu_valid_until ? `and car_hu_valid_until = '${car_hu_valid_until}'` : ""}
      ${car_previous_owners ? `and car_previous_owners = ${car_previous_owners}` : ""}
      ${car_full_service_history ? `and car_full_service_history = '${car_full_service_history}'` : ""}
      ${car_roadworthy ? `and car_roadworthy = '${car_roadworthy}'` : ""}
      ${car_country ? `and car_country = '${car_country}'` : ""}
      ${car_city ? `and car_city_zipcode ilike '%${car_city}%'` : ""}
      ${zipcode ? `and car_city_zipcode ilike '%${zipcode}%'` : ""}
      ${car_radius ? `and car_radius = ${car_radius}` : ""}
      ${fuelConditions ? `and (${fuelConditions})` : ''}
      ${car_power_from ? `and car_power >= ${car_power_from}` : ""}
      ${car_power_up_to ? `and car_power <= ${car_power_up_to}` : ""}
      ${car_cubic_capacity_from ? `and car_cubic_capacity >= ${car_cubic_capacity_from}` : ""}
      ${car_cubic_capacity_to ? `and car_cubic_capacity <= ${car_cubic_capacity_to}` : ""}
      ${transmissionConditions ? `and (${transmissionConditions})` : ''}
      ${car_fuel_consumption ? `and car_fuel_consumption = ${car_fuel_consumption}` : ""}
      ${car_emissions_sticker ? `and car_emissions_sticker = '${car_emissions_sticker}'` : ""}
      ${car_emission_class ? `and car_emission_class = '${car_emission_class}'` : ""}
      ${colorConditions ? `and (${colorConditions})` : ''}
      ${car_trailer_coupling ? `and car_trailer_coupling = '${car_trailer_coupling}'` : ""}
      ${parkingConditions ? `and (${parkingConditions})` : ''}
      ${car_cruise_control ? `and car_cruise_control = '${car_cruise_control}'` : ""}
      ${interiorColourConditions ? `and (${interiorColourConditions})` : ''}
      ${interiorMaterialConditions ? `and (${interiorMaterialConditions})` : ''}
      ${car_airbags ? `and car_airbags = '${car_airbags}'` : ""}
      ${car_air_conditioning ? `and car_air_conditioning = '${car_air_conditioning}'` : ""}
      ${car_vendor ? `and car_vendor = '${car_vendor}'` : ""}
      ${car_dealer_rating ? `and car_dealer_rating >= ${car_dealer_rating}` : ""}
      ${car_discount_offers == true ? `and car_discount_offers = ${car_discount_offers}` : ""}
      ${car_non_smoker == true ? `and car_non_smoker = ${car_non_smoker}` : ""}
      ${car_taxi == true ? `and car_taxi = ${car_taxi}` : ""}
      ${car_vat == true ? `and car_vat = ${car_vat}` : ""}
      ${car_warranty == true ? `and car_warranty = ${car_warranty}` : ""}
      ${car_environmental_bonus == true ? `and car_environmental_bonus = ${car_environmental_bonus}` : ""}
      ${car_damaged ? `and car_damaged = '${car_damaged}'` : ""}
      ${car_commercial ? `and car_commercial = '${car_commercial}'` : ""}
      ${car_programme ? `and car_programme = '${car_programme}'` : ""}
      ${extras?.length > 0 ? `and extras @> ARRAY[${extrasString}]` : ""}
      ${others?.length > 0 ? `and others @> ARRAY[${othersString}]` : ""}
      ${picture == true ? `and Array_Length(car_images_url, 1) > 0` : ""}
      ${video == true ? `and car_vide_link != '' ` : ""}
      ${days ? `and car_ad_create_at > current_date - interval '${days} days'` : ""};
`;

   return fetch(FOUND_CARS_COUNT)
}
const foundCarById = (id) => fetch(FOUND_CAR_BY_ID, id)
const foundCar = (car_id) => fetch(FOUND_CAR, car_id)
const addCar = (
   user_id,
   car_make,
   car_model,
   car_variant,
   car_body,
   car_number_seats,
   car_number_door,
   car_silding_door,
   car_condition,
   car_type,
   car_payment_type,
   car_price,
   car_firt_date,
   car_firt_date_year,
   car_mileage,
   car_hu_valid_until,
   car_previous_owners,
   car_full_service_history,
   car_roadworthy,
   car_country,
   car_city_zipcode,
   car_radius,
   car_img,
   car_img_name,
   user_email,
   user_phone,
   car_vide_link
) => fetch(
   ADD_CAR,
   user_id,
   car_make,
   car_model,
   car_variant,
   car_body,
   car_number_seats,
   car_number_door,
   car_silding_door,
   car_condition,
   car_type,
   car_payment_type,
   car_price,
   car_firt_date,
   car_firt_date_year,
   car_mileage,
   car_hu_valid_until,
   car_previous_owners,
   car_full_service_history,
   car_roadworthy,
   car_country,
   car_city_zipcode,
   car_radius,
   car_img,
   car_img_name,
   user_email,
   user_phone,
   car_vide_link
)
const addEngineData = (
   car_id,
   car_fuel_type,
   car_power,
   car_cubic_capacity,
   car_transmission,
   car_fuel_consumption,
   car_emissions_sticker,
   car_emission_class,
   car_exterior_colour,
   car_trailer_coupling,
   car_parking_sensors,
   car_cruise_control,
   othersId
) => fetch(
   ADD_ENGINE_DATA,
   car_id,
   car_fuel_type,
   car_power,
   car_cubic_capacity,
   car_transmission,
   car_fuel_consumption,
   car_emissions_sticker,
   car_emission_class,
   car_exterior_colour,
   car_trailer_coupling,
   car_parking_sensors,
   car_cruise_control,
   othersId
)
const addInteriorData = (
   car_id,
   car_interior_colour,
   car_interior_material,
   car_airbags,
   car_air_conditioning,
   extrasId,
   car_vendor,
   car_dealer_rating,
   car_discount_offers,
   car_non_smoker,
   car_taxi,
   car_vat,
   car_warranty,
   car_environmental_bonus,
   car_damaged,
   car_commercial,
   car_programme,
   car_description
) => fetch(
   ADD_INTERIOR_DATA,
   car_id,
   car_interior_colour,
   car_interior_material,
   car_airbags,
   car_air_conditioning,
   extrasId,
   car_vendor,
   car_dealer_rating,
   car_discount_offers,
   car_non_smoker,
   car_taxi,
   car_vat,
   car_warranty,
   car_environmental_bonus,
   car_damaged,
   car_commercial,
   car_programme,
   car_description
)
const updateCar = (
   car_id,
   user_id,
   car_make,
   car_model,
   car_variant,
   car_body,
   car_number_seats,
   car_number_door,
   car_silding_door,
   car_condition,
   car_type,
   car_payment_type,
   car_price,
   car_firt_date,
   car_firt_date_year,
   car_mileage,
   car_hu_valid_until,
   car_previous_owners,
   car_full_service_history,
   car_roadworthy,
   car_country,
   car_city_zipcode,
   car_radius,
   user_email,
   user_phone,
   car_vide_link,
   car_interior_colour,
   car_interior_material,
   car_airbags,
   car_air_conditioning,
   extras,
   car_vendor,
   car_dealer_rating,
   car_discount_offers,
   car_non_smoker,
   car_taxi,
   car_vat,
   car_warranty,
   car_environmental_bonus,
   car_damaged,
   car_commercial,
   car_programme,
   car_description,
   car_fuel_type,
   car_power,
   car_cubic_capacity,
   car_transmission,
   car_fuel_consumption,
   car_emissions_sticker,
   car_emission_class,
   car_exterior_colour,
   car_trailer_coupling,
   car_parking_sensors,
   car_cruise_control,
   others,
   car_img,
   car_img_name
) => fetch(
   UPDATE_CAR,
   car_id,
   user_id,
   car_make,
   car_model,
   car_variant,
   car_body,
   car_number_seats,
   car_number_door,
   car_silding_door,
   car_condition,
   car_type,
   car_payment_type,
   car_price,
   car_firt_date,
   car_firt_date_year,
   car_mileage,
   car_hu_valid_until,
   car_previous_owners,
   car_full_service_history,
   car_roadworthy,
   car_country,
   car_city_zipcode,
   car_radius,
   user_email,
   user_phone,
   car_vide_link,
   car_interior_colour,
   car_interior_material,
   car_airbags,
   car_air_conditioning,
   extras,
   car_vendor,
   car_dealer_rating,
   car_discount_offers,
   car_non_smoker,
   car_taxi,
   car_vat,
   car_warranty,
   car_environmental_bonus,
   car_damaged,
   car_commercial,
   car_programme,
   car_description,
   car_fuel_type,
   car_power,
   car_cubic_capacity,
   car_transmission,
   car_fuel_consumption,
   car_emissions_sticker,
   car_emission_class,
   car_exterior_colour,
   car_trailer_coupling,
   car_parking_sensors,
   car_cruise_control,
   others,
   car_img,
   car_img_name
)
const deleteCar = (car_id) => fetch(DELETE_CAR, car_id)
const updateStatus = (car_id, status) => fetch(UPDATE_STATUS, car_id, status)

module.exports = {
   carsList,
   foundCarsList,
   foundCarsCount,
   addCar,
   updateCar,
   foundCar,
   foundCarById,
   deleteCar,
   addEngineData,
   addInteriorData,
   updateStatus
}