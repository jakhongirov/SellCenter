require('dotenv').config();
const model = require('./model')
const FS = require('../../lib/fs/fs');
const path = require('path');

module.exports = {
   GET_ADMIN: async (req, res) => {
      try {
         const { limit, offset } = req.query

         if (limit && offset) {
            const motorhomeListAdmin = await model.motorhomeListAdmin(limit, offset)

            if (motorhomeListAdmin) {
               return res.json({
                  status: 200,
                  message: "Success",
                  data: motorhomeListAdmin
               })
            } else {
               return res.json({
                  status: 404,
                  message: 'Not found'
               })
            }

         } else {
            return res.json({
               status: 400,
               message: 'Bad request'
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

   GET_MOTOR_HOME: async (req, res) => {
      try {
         const { offset, limit } = req.query
         const {
            motor_home_condition,
            motor_home_make,
            motor_home_model,
            types,
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
            city,
            zipcode,
            motor_home_city_radius,
            fuel_type,
            transmission,
            features,
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
            interior_features,
            exterior_colour,
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
         } = req.body

         if (offset && limit) {

            const foundMotorhomeList = await model.foundMotorhomeList(
               motor_home_condition,
               motor_home_make,
               motor_home_model,
               types,
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
               city,
               zipcode,
               motor_home_city_radius,
               fuel_type,
               transmission,
               features,
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
               interior_features,
               exterior_colour,
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
            )

            if (foundMotorhomeList) {
               return res.json({
                  status: 200,
                  message: "Success",
                  data: foundMotorhomeList
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

   GET_COUNT_MOTOR_HOME: async (req, res) => {
      try {
         const {
            motor_home_condition,
            motor_home_make,
            motor_home_model,
            types,
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
            city,
            zipcode,
            motor_home_city_radius,
            fuel_type,
            transmission,
            features,
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
            interior_features,
            exterior_colour,
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
         } = req.body

         const foundMotorhomeCount = await model.foundMotorhomeCount(
            motor_home_condition,
            motor_home_make,
            motor_home_model,
            types,
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
            city,
            zipcode,
            motor_home_city_radius,
            fuel_type,
            transmission,
            features,
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
            interior_features,
            exterior_colour,
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
         )

         if (foundMotorhomeCount) {
            return res.json({
               status: 200,
               message: "Success",
               data: foundMotorhomeCount
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

   GET_MOTORHOME_ID: async (req, res) => {
      try {
         const { id } = req.params

         if (id) {
            const foundMotorhomeById = await model.foundMotorhomeById(id)
            const foundCompany = await model.foundCompany(foundMotorhomeById?.user_id)

            if (foundMotorhomeById) {
               return res.json({
                  status: 200,
                  message: "Success",
                  data: foundMotorhomeById,
                  company: foundCompany
               })
            } else {
               return res.json({
                  status: 404,
                  message: "Not found"
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

   POST_MOTOR_HOME: async (req, res) => {
      try {
         const uploadPhoto = req.files;
         const {
            motor_home_make,
            motor_home_model,
            motor_home_describtion,
            motor_home_video_link,
            motor_home_condition,
            types,
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
            features,
            motor_home_length,
            motor_home_gvw,
            motor_home_number_of_bunks,
            motor_home_axles,
            motor_home_trailer_coupling,
            motor_home_cruise_control,
            motor_home_radio,
            motor_home_parking_sensors,
            motor_home_air_conditioning,
            interior_features,
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
            user_id,
            user_phone,
            user_email
         } = req.body

         const motorhome_img_name = [];
         const motorhome_img = [];

         uploadPhoto?.forEach((e) => {
            motorhome_img.push(
               `${process.env.BACKEND_URL}/${e.filename}`,
            );
            motorhome_img_name.push(e.filename);
         });

         const addMotorhome = await model.addMotorhome(
            motor_home_make,
            motor_home_model,
            motor_home_describtion,
            motor_home_video_link,
            motor_home_condition,
            types,
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
            features?.split(','),
            motor_home_length,
            motor_home_gvw,
            motor_home_number_of_bunks,
            motor_home_axles,
            motor_home_trailer_coupling,
            motor_home_cruise_control,
            motor_home_radio,
            motor_home_parking_sensors,
            motor_home_air_conditioning,
            interior_features?.split(','),
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

         if (addMotorhome) {
            return res.json({
               status: 200,
               message: "Success",
               data: addMotorhome
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

   PUT_MOTOR_HOME: async (req, res) => {
      try {
         const {
            id,
            motor_home_make,
            motor_home_model,
            motor_home_describtion,
            motor_home_video_link,
            motor_home_condition,
            types,
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
            features,
            motor_home_length,
            motor_home_gvw,
            motor_home_number_of_bunks,
            motor_home_axles,
            motor_home_trailer_coupling,
            motor_home_cruise_control,
            motor_home_radio,
            motor_home_parking_sensors,
            motor_home_air_conditioning,
            interior_features,
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
            user_id,
            user_phone,
            user_email
         } = req.body

         const updateMotorhome = await model.updateMotorhome(
            id,
            motor_home_make,
            motor_home_model,
            motor_home_describtion,
            motor_home_video_link,
            motor_home_condition,
            types,
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
            features,
            motor_home_length,
            motor_home_gvw,
            motor_home_number_of_bunks,
            motor_home_axles,
            motor_home_trailer_coupling,
            motor_home_cruise_control,
            motor_home_radio,
            motor_home_parking_sensors,
            motor_home_air_conditioning,
            interior_features,
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
            user_id,
            user_phone,
            user_email
         )

         if (updateMotorhome) {
            return res.json({
               status: 200,
               message: "Success",
               data: updateMotorhome
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

   ADD_PHOTO: async (req, res) => {
      try {
         const uploadPhoto = req.files;
         const { id } = req.body
         const motorhome_img_name = [];
         const motorhome_img = [];
         const foundMotorhome = await model.foundMotorhome(id)

         if (foundMotorhome) {
            uploadPhoto?.forEach((e) => {
               motorhome_img.push(
                  `${process.env.BACKEND_URL}/${e.filename}`,
               );
               motorhome_img_name.push(e.filename);
            });

            const addImage = await model.addImage(id, motorhome_img, motorhome_img_name)

            if (addImage) {
               return res.json({
                  status: 200,
                  message: "Success",
                  data: addImage
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

   DELETE_PHOTO: async (req, res) => {
      try {
         const { id, delete_image_url, delete_image_name } = req.body
         const foundMotorhome = await model.foundMotorhome(id)

         if (foundMotorhome) {
            const motor_home_images_url = foundMotorhome?.motor_home_images_url.filter(e => e != delete_image_url)
            const motor_home_images_name = foundMotorhome?.motor_home_images_name.filter(e => e !=delete_image_name)

            const deleteOldImg = new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images', `${delete_image_name}`))
            deleteOldImg.delete()

            const deleteImage = await model.deleteImage(id, motor_home_images_url, motor_home_images_name)

            if (deleteImage) {
               return res.json({
                  status: 200,
                  message: "Success",
                  data: deleteImage
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

   UPDATE_STATUS: async (req, res) => {
      try {
         const { id, status } = req.body
         const foundMotorhomeById = await model.foundMotorhomeById(id)

         if (foundMotorhomeById) {
            const updateStatus = await model.updateStatus(id, status)

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

   DELETE_MOTOR_HOME: async (req, res) => {
      try {
         const { id } = req.body
         const foundMotorhome = await model.foundMotorhome(id)

         if (foundMotorhome) {
            foundMotorhome?.motor_home_images_name.forEach((e) => {
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

            const deleteMotorhome = await model.deleteMotorhome(id)

            if (deleteMotorhome) {
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