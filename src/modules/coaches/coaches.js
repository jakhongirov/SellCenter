require('dotenv').config();
const model = require('./model')
const FS = require('../../lib/fs/fs');
const path = require('path');

module.exports = {
   GET_ADMIN: async (req, res) => {
      try {
         const { limit, offset } = req.query

         if (limit && offset) {
            const coacheListAdmin = await model.coacheListAdmin(limit, offset)

            if (coacheListAdmin) {
               return res.json({
                  status: 200,
                  message: "Success",
                  data: coacheListAdmin
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

   GET_COACHES_LIST: async (req, res) => {
      try {
         const { offset, limit } = req.query
         const {
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
            city,
            zipcode,
            coache_radius,
            fuel_type,
            transmission,
            coache_emission_class,
            coache_emissions_sticker,
            features,
            coache_air_conditioning,
            coache_number_of_seats_from,
            coache_number_of_seats_to,
            coache_cruise_control,
            coache_trailer_coupling_fix,
            interior_features,
            exterior_colour,
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
         } = req.body

         if (offset && limit) {
            const coachesList = await model.coachesList(
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
               city,
               zipcode,
               coache_radius,
               fuel_type,
               transmission,
               coache_emission_class,
               coache_emissions_sticker,
               features,
               coache_air_conditioning,
               coache_number_of_seats_from,
               coache_number_of_seats_to,
               coache_cruise_control,
               coache_trailer_coupling_fix,
               interior_features,
               exterior_colour,
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
            )

            if (coachesList) {
               return res.json({
                  status: 200,
                  message: "Success",
                  data: coachesList
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
         return res.json({
            status: 500,
            message: "Bad request"
         })
      }
   },

   GET_COACHES_COUNT: async (req, res) => {
      try {
         const {
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
            city,
            zipcode,
            coache_radius,
            fuel_type,
            transmission,
            coache_emission_class,
            coache_emissions_sticker,
            features,
            coache_air_conditioning,
            coache_number_of_seats_from,
            coache_number_of_seats_to,
            coache_cruise_control,
            coache_trailer_coupling_fix,
            interior_features,
            exterior_colour,
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
         } = req.body

         const coachesCount = await model.coachesCount(
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
            city,
            zipcode,
            coache_radius,
            fuel_type,
            transmission,
            coache_emission_class,
            coache_emissions_sticker,
            features,
            coache_air_conditioning,
            coache_number_of_seats_from,
            coache_number_of_seats_to,
            coache_cruise_control,
            coache_trailer_coupling_fix,
            interior_features,
            exterior_colour,
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
         )

         if (coachesCount) {
            return res.json({
               status: 200,
               message: "Success",
               data: coachesCount
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

   GET_COACHE_ID: async (req, res) => {
      try {
         const { id } = req.params

         if (id) {
            const foundCoacheById = await model.foundCoacheById(id)

            if (foundCoacheById) {
               return res.json({
                  status: 200,
                  message: 'Success',
                  data: foundCoacheById
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

   POST_COACHE: async (req, res) => {
      try {
         const uploadPhoto = req.files;
         const {
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
            features,
            coache_air_conditioning,
            coache_number_of_seats,
            coache_cruise_control,
            coache_trailer_coupling_fix,
            interior_features,
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
            user_email
         } = req.body

         const coache_img_name = [];
         const coache_img = [];

         uploadPhoto?.forEach((e) => {
            coache_img.push(
               `${process.env.BACKEND_URL}/${e.filename}`,
            );
            coache_img_name.push(e.filename);
         });

         const addCoache = await model.addCoache(
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
            features?.split(','),
            coache_air_conditioning,
            coache_number_of_seats,
            coache_cruise_control,
            coache_trailer_coupling_fix,
            interior_features?.split(','),
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

         if (addCoache) {
            return res.json({
               status: 200,
               message: "Success",
               data: addCoache
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

   PUT_COACHE: async (req, res) => {
      try {
         const uploadPhoto = req.files;
         const {
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
            features,
            coache_air_conditioning,
            coache_number_of_seats,
            coache_cruise_control,
            coache_trailer_coupling_fix,
            interior_features,
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
            user_email
         } = req.body

         const foundCoache = await model.foundCoache(id)
         const coache_img_name = [];
         const coache_img = [];

         if (uploadPhoto.length) {
            foundCoache?.coache_images_name.forEach((e) => {
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
               coache_img.push(
                  `${process.env.BACKEND_URL}/${e.filename}`,
               );
               coache_img_name.push(e.filename);
            });
         } else {
            foundCoache?.coache_images_url.forEach((e) => {
               coache_img.push(e);
            });
            foundCoache?.coache_images_name.forEach((e) => {
               coache_img_name.push(e);
            });
         }

         const updateCoache = await model.updateCoache(
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
            features?.split(','),
            coache_air_conditioning,
            coache_number_of_seats,
            coache_cruise_control,
            coache_trailer_coupling_fix,
            interior_features?.split(','),
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

         if (updateCoache) {
            return res.json({
               status: 200,
               message: "Success",
               data: updateCoache
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
         const { id, status } = req.body
         const foundCoacheById = await model.foundCoacheById(id)

         if (foundCoacheById) {
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

   DELETE_COACHE: async (req, res) => {
      try {
         const { id } = req.body
         const foundCoache = await model.foundCoache(id)

         if (foundCoache) {
            foundCoache?.coache_images_name.forEach((e) => {
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

            const deleteCoache = await model.deleteCoache(id)

            if (deleteCoache) {
               return res.json({
                  status: 200,
                  message: "Success"
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
   }
}