require('dotenv').config();
const model = require('./model')
const FS = require('../../lib/fs/fs');
const path = require('path');

module.exports = {
   GET_ADMIN: async (req, res) => {
      try {
         const { offset, limit } = req.query

         if (limit && offset) {
            const carsList = await model.carsList(limit, offset)

            if (carsList) {
               return res.json({
                  status: 200,
                  message: "Success",
                  data: carsList
               })
            } else {
               return res.json({
                  status: 400,
                  message: "Bad request"
               })
            }

         } else {
            return res.json({
               status: 400,
               message: "Bad request"
            })
         }

      } catch (error) {
         console.log(error)
         res.json({
            status: 500,
            message: "Internal Server Error",
         })
      }
   },

   GET_CARS: async (req, res) => {
      try {
         const { offset, limit } = req.query
         const {
            car_make,
            car_model,
            car_description,
            car_variant,
            body,
            car_number_seats,
            car_number_door,
            car_silding_door,
            car_type,
            type,
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
            city,
            zipcode,
            car_radius,
            fuel_type,
            car_power_from,
            car_power_up_to,
            car_cubic_capacity_from,
            car_cubic_capacity_to,
            transmission,
            car_fuel_consumption,
            car_emissions_sticker,
            car_emission_class,
            exterior_colour,
            car_trailer_coupling,
            parking_sensors,
            car_cruise_control,
            interior_colour,
            interior_material,
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
         } = req.body

         // const bodyArr = body ? body?.split(',') : false
         // const typeArr = type ? type?.split(',') : false
         // const car_city = city ? city?.split(',') : false
         // const fuelArr = fuel_type ? fuel_type?.split(',') : false
         // const transmissionArr = transmission ? transmission?.split(',') : false
         // const colorArr = exterior_colour ? exterior_colour?.split(',') : false
         // const parkingArr = parking_sensors ? parking_sensors?.split(',') : false
         // const interiorColourgArr = interior_colour ? interior_colour?.split(',') : false
         // const interiorMaterialgArr = interior_material ? interior_material?.split(',') : false

         const foundCarsList = await model.foundCarsList(
            car_make,
            car_model,
            car_description,
            car_variant,
            body,
            car_number_seats,
            car_number_door,
            car_silding_door,
            car_type,
            type,
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
            city,
            zipcode,
            car_radius,
            fuel_type,
            car_power_from,
            car_power_up_to,
            car_cubic_capacity_from,
            car_cubic_capacity_to,
            transmission,
            car_fuel_consumption,
            car_emissions_sticker,
            car_emission_class,
            exterior_colour,
            car_trailer_coupling,
            parking_sensors,
            car_cruise_control,
            interior_colour,
            interior_material,
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
         )

         if (foundCarsList) {
            return res.json({
               status: 200,
               message: "Success",
               data: foundCarsList
            })
         } else {
            return res.json({
               status: 400,
               message: "Bad request"
            })
         }

      } catch (error) {
         console.log(error)
         res.json({
            status: 500,
            message: "Internal Server Error",
         })
      }
   },

   GET_CARS_COUNT: async (req, res) => {
      try {
         const {
            car_make,
            car_model,
            car_description,
            car_variant,
            body,
            car_number_seats,
            car_number_door,
            car_silding_door,
            car_type,
            type,
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
            city,
            zipcode,
            car_radius,
            fuel_type,
            car_power_from,
            car_power_up_to,
            car_cubic_capacity_from,
            car_cubic_capacity_to,
            transmission,
            car_fuel_consumption,
            car_emissions_sticker,
            car_emission_class,
            exterior_colour,
            car_trailer_coupling,
            parking_sensors,
            car_cruise_control,
            interior_colour,
            interior_material,
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
         } = req.body

         // const bodyArr = body ? body?.split(',') : false
         // const typeArr = type ? type?.split(',') : false
         // const car_city = city ? city?.split(',') : false
         // const fuelArr = fuel_type ? fuel_type?.split(',') : false
         // const transmissionArr = transmission ? transmission?.split(',') : false
         // const colorArr = exterior_colour ? exterior_colour?.split(',') : false
         // const parkingArr = parking_sensors ? parking_sensors?.split(',') : false
         // const interiorColourgArr = interior_colour ? interior_colour?.split(',') : false
         // const interiorMaterialgArr = interior_material ? interior_material?.split(',') : false

         const foundCarsCount = await model.foundCarsCount(
            car_make,
            car_model,
            car_description,
            car_variant,
            body,
            car_number_seats,
            car_number_door,
            car_silding_door,
            car_type,
            type,
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
            city,
            zipcode,
            car_radius,
            fuel_type,
            car_power_from,
            car_power_up_to,
            car_cubic_capacity_from,
            car_cubic_capacity_to,
            transmission,
            car_fuel_consumption,
            car_emissions_sticker,
            car_emission_class,
            exterior_colour,
            car_trailer_coupling,
            parking_sensors,
            car_cruise_control,
            interior_colour,
            interior_material,
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
         )

         if (foundCarsCount) {
            return res.json({
               status: 200,
               message: "Success",
               data: foundCarsCount
            })
         } else {
            return res.json({
               status: 404,
               message: "Not found"
            })
         }

      } catch (error) {
         console.log(error)
         res.json({
            status: 500,
            message: "Internal Server Error",
         })
      }
   },

   GET_CAR_ID: async (req, res) => {
      try {
         const { id } = req.params

         if (id) {
            const foundCarById = await model.foundCarById(id)

            if (foundCarById) {
               return res.json({
                  status: 200,
                  message: "Success",
                  data: foundCarById
               })
            } else {
               return res.json({
                  status: 404,
                  message: "Not found"
               })
            }
         } else {
            return res.json({
               status: 404,
               message: "Not found"
            })
         }

      } catch (error) {
         console.log(error)
         res.json({
            status: 500,
            message: "Internal Server Error",
         })
      }
   },

   POST_BASIC_DATA: async (req, res) => {
      try {
         const uploadPhoto = req.files;
         const {
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
            car_vide_link
         } = req.body

         const car_img_name = [];
         const car_img = [];

         console.log(uploadPhoto);

         uploadPhoto?.forEach((e) => {
            car_img.push(
               `${process.env.BACKEND_URL}/${e.filename}`,
            );
            car_img_name.push(e.filename);
         });

         const addCar = await model.addCar(
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

         if (addCar) {
            return res.json({
               status: 200,
               message: "Success",
               data: addCar
            })
         } else {
            return res.json({
               status: 400,
               message: "Bad request"
            })
         }

      } catch (error) {
         console.log(error)
         res.json({
            status: 500,
            message: "Internal Server Error",
         })
      }
   },

   PUT_ENGINE: async (req, res) => {
      try {
         const {
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
            others
         } = req.body

         const addEngineData = await model.addEngineData(
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
            others
         )

         if (addEngineData) {
            return res.json({
               status: 200,
               message: "Success",
               data: addEngineData
            })
         } else {
            return res.json({
               status: 400,
               message: "Bad request"
            })
         }

      } catch (error) {
         console.log(error)
         res.json({
            status: 500,
            message: "Internal Server Error",
         })
      }
   },

   PUT_INTERIOR: async (req, res) => {
      try {
         const {
            car_id,
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
            car_description
         } = req.body

         const addInteriorData = await model.addInteriorData(
            car_id,
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
            car_description
         )

         if (addInteriorData) {
            return res.json({
               status: 200,
               message: "Success",
               data: addInteriorData
            })
         } else {
            return res.json({
               status: 400,
               message: "Bad request"
            })
         } ƒ

      } catch (error) {
         console.log(error)
         res.json({
            status: 500,
            message: "Internal Server Error",
         })
      }
   },

   UPDATE_CAR: async (req, res) => {
      try {
         const uploadPhoto = req.files;
         const {
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
            others
         } = req.body

         let car_img_name = [];
         let car_img = [];
         const foundCar = await model.foundCar(car_id)

         if (uploadPhoto?.length) {
            foundCar?.car_images_name.forEach((e) => {
               new FS(
                  path.resolve(
                     __dirname,
                     '..',
                     '..',
                     '..',
                     'public',
                     'images',
                     `${e}`,
                  ),
               ).delete();
            });

            uploadPhoto?.forEach((e) => {
               car_img.push(
                  `${process.env.BACKEND_URL}/${e.filename}`,
               );
               car_img_name.push(e.filename);
            });
         } else {
            foundCar?.car_images_url.forEach((e) => {
               car_img.push(e);
            });
            foundCar?.car_images_name.forEach((e) => {
               car_img_name.push(e);
            });
         }

         console.log(others, extras);

         const updateCar = await model.updateCar(
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
            extras?.split(','),
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
            others?.split(','),
            car_img,
            car_img_name
         )

         if (updateCar) {
            return res.json({
               status: 200,
               message: "Success",
               data: updateCar
            })
         } else {
            return res.json({
               status: 400,
               message: "Bad request"
            })
         }

      } catch (error) {
         console.log(error)
         res.json({
            status: 500,
            message: "Internal Server Error",
         })
      }
   },

   UPDATE_STATUS: async (req, res) => {
      try {
         const { car_id, status } = req.body
         const foundCarById = await model.foundCarById(car_id)

         if (foundCarById) {
            const updateStatus = await model.updateStatus(car_id, status)

            if (updateStatus) {
               return res.json({
                  status: 200,
                  message: "Success",
                  data: updateStatus
               })
            } else {
               return res.json({
                  status: 400,
                  message: "Bad request"
               })
            }

         } else {
            return res.json({
               status: 404,
               message: "Not found"
            })
         }

      } catch (error) {
         console.log(error)
         res.json({
            status: 500,
            message: "Internal Server Error",
         })
      }
   },

   DELETE_CAR: async (req, res) => {
      try {
         const { car_id } = req.body
         const foundCar = await model.foundCar(car_id)

         if (foundCar) {
            foundCar?.car_images_name.forEach((e) => {
               new FS(
                  path.resolve(
                     __dirname,
                     '..',
                     '..',
                     '..',
                     'public',
                     'images',
                     `${e}`,
                  ),
               ).delete();
            });

            const deleteCar = await model.deleteCar(car_id)

            if (deleteCar) {
               return res.json({
                  status: 200,
                  message: "Success"
               })
            }

         } else {
            return res.json({
               status: 404,
               message: "Not found"
            })
         }

      } catch (error) {
         console.log(error)
         res.json({
            status: 500,
            message: "Internal Server Error",
         })
      }
   }
}