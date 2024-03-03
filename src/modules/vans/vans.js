require('dotenv').config();
const model = require('./model')
const FS = require('../../lib/fs/fs');
const path = require('path');

module.exports = {
   GET_ADMIN: async (req, res) => {
      try {
         const { limit, offset } = req.query

         if (limit && offset) {
            const vanListAdmin = await model.vanListAdmin(limit, offset)

            if (vanListAdmin) {
               return res.json({
                  status: 200,
                  message: "Success",
                  data: vanListAdmin
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

   GET_VAN_LIST: async (req, res) => {
      try {
         const { offset, limit } = req.query
         const {
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
            city,
            zipcode,
            van_radius,
            fuel_type,
            transmission,
            van_emission_class,
            van_emissions_sticker,
            features,
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
            interior_features,
            exterior_colour,
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
            video
         } = req.body

         if (offset && limit) {

            const vansList = await model.vansList(
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
               city,
               zipcode,
               van_radius,
               fuel_type,
               transmission,
               van_emission_class,
               van_emissions_sticker,
               features,
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
               interior_features,
               exterior_colour,
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
            )

            if (vansList) {
               return res.json({
                  status: 200,
                  message: "Success",
                  data: vansList
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

   GET_VAN_COUNT: async (req, res) => {
      try {
         const {
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
            city,
            zipcode,
            van_radius,
            fuel_type,
            transmission,
            van_emission_class,
            van_emissions_sticker,
            features,
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
            interior_features,
            exterior_colour,
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
            video
         } = req.body

         const vansCount = await model.vansCount(
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
            city,
            zipcode,
            van_radius,
            fuel_type,
            transmission,
            van_emission_class,
            van_emissions_sticker,
            features,
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
            interior_features,
            exterior_colour,
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
            video
         )

         if (vansCount) {
            return res.json({
               status: 200,
               message: "Success",
               data: vansCount
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

   GET_VAN_ID: async (req, res) => {
      try {
         const { id } = req.params

         if (id) {
            const foundVanById = await model.foundVanById(id)

            if (foundVanById) {
               return res.json({
                  status: 200,
                  message: 'Success',
                  data: foundVanById
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

   POST_VAN: async (req, res) => {
      try {
         const uploadPhoto = req.files;
         const {
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
            features,
            van_air_conditioning,
            van_gvw,
            van_parking_sensors,
            van_sliding_door,
            van_driving_cab,
            van_number_of_seats,
            van_cruise_control,
            van_trailer_coupling_fix,
            interior_features,
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
            user_email
         } = req.body

         const van_img_name = [];
         const van_img = [];

         uploadPhoto?.forEach((e) => {
            van_img.push(
               `${process.env.BACKEND_URL}/${e.filename}`,
            );
            van_img_name.push(e.filename);
         });

         const addVan = await model.addVan(
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
            features?.split(","),
            van_air_conditioning,
            van_gvw,
            van_parking_sensors,
            van_sliding_door,
            van_driving_cab,
            van_number_of_seats,
            van_cruise_control,
            van_trailer_coupling_fix,
            interior_features?.split(","),
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

         if (addVan) {
            return res.json({
               status: 200,
               message: "Success",
               data: addVan
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

   PUT_VAN: async (req, res) => {
      try {
         const {
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
            features,
            van_air_conditioning,
            van_gvw,
            van_parking_sensors,
            van_sliding_door,
            van_driving_cab,
            van_number_of_seats,
            van_cruise_control,
            van_trailer_coupling_fix,
            interior_features,
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
            user_email
         } = req.body

         const updateVan = await model.updateVan(
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
            features?.split(","),
            van_air_conditioning,
            van_gvw,
            van_parking_sensors,
            van_sliding_door,
            van_driving_cab,
            van_number_of_seats,
            van_cruise_control,
            van_trailer_coupling_fix,
            interior_features?.split(","),
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
            user_email
         )

         if (updateVan) {
            return res.json({
               status: 200,
               message: "Success",
               data: updateVan
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
         const foundVan = await model.foundVan(id)
         const van_img_name = [];
         const van_img = [];

         if (foundVan) {
            uploadPhoto?.forEach((e) => {
               van_img.push(
                  `${process.env.BACKEND_URL}/${e.filename}`,
               );
               van_img_name.push(e.filename);
            });

            const addImage = await model.addImage(id, van_img, van_img_name)

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
         const foundVan = await model.foundVan(id)

         if (foundVan) {
            const van_images_url = foundVan?.van_images_url.filter(e => e != delete_image_url)
            const van_images_name = foundVan?.van_images_name.filter(e => e != delete_image_name)

            const deleteOldImg = new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images', `${delete_image_name}`))
            deleteOldImg.delete()

            const deleteImage = await model.deleteImage(id, van_images_url, van_images_name)

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
         const foundVanById = await model.foundVanById(id)

         if (foundVanById) {
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

   DELETE_VAN: async (req, res) => {
      try {
         const { id } = req.body
         const foundVan = await model.foundVan(id)

         if (foundVan) {
            foundVan?.van_images_name.forEach((e) => {
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

            const deleteVan = await model.deleteVan(id)

            if (deleteVan) {
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