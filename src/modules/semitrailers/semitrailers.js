require('dotenv').config();
const model = require('./model')
const FS = require('../../lib/fs/fs');
const path = require('path');

module.exports = {
   GET_ADMIN: async (req, res) => {
      try {
         const { limit, offset } = req.query

         if (limit && offset) {
            const semitrailerListAdmin = await model.semitrailerListAdmin(limit, offset)

            if (semitrailerListAdmin) {
               return res.json({
                  status: 200,
                  message: "Success",
                  data: semitrailerListAdmin
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

   GET_TRAILER_LIST: async (req, res) => {
      try {
         const { offset, limit } = req.query
         const {
            trailer_condition,
            trailer_category,
            trailer_make,
            trailer_model,
            trailer_firt_date_year_from,
            trailer_firt_date_year_to,
            trailer_price_from,
            trailer_price_to,
            trailer_price_type,
            trailer_vat,
            trailer_country,
            city,
            zipcode,
            trailer_radius,
            features,
            trailer_axles,
            trailer_gvw_from,
            trailer_gvw_to,
            trailer_load_capacity_from,
            trailer_load_capacity_to,
            security,
            day,
            trailer_new_hu,
            trailer_renting_possible,
            trailer_discount_offers,
            trailer_vendor,
            trailer_dealer_rating,
            picture,
            video,
         } = req.body

         if (limit && offset) {

            const trailerList = await model.trailerList(
               trailer_condition,
               trailer_category,
               trailer_make,
               trailer_model,
               trailer_firt_date_year_from,
               trailer_firt_date_year_to,
               trailer_price_from,
               trailer_price_to,
               trailer_price_type,
               trailer_vat,
               trailer_country,
               city,
               zipcode,
               trailer_radius,
               features,
               trailer_axles,
               trailer_gvw_from,
               trailer_gvw_to,
               trailer_load_capacity_from,
               trailer_load_capacity_to,
               security,
               day,
               trailer_new_hu,
               trailer_renting_possible,
               trailer_discount_offers,
               trailer_vendor,
               trailer_dealer_rating,
               picture,
               video,
               offset,
               limit
            )

            if (trailerList) {
               return res.json({
                  status: 200,
                  message: "Success",
                  data: trailerList
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

   GET_TRAILER_COUNT: async (req, res) => {
      try {
         const {
            trailer_condition,
            trailer_category,
            trailer_make,
            trailer_model,
            trailer_firt_date_year_from,
            trailer_firt_date_year_to,
            trailer_price_from,
            trailer_price_to,
            trailer_price_type,
            trailer_vat,
            trailer_country,
            city,
            zipcode,
            trailer_radius,
            features,
            trailer_axles,
            trailer_gvw_from,
            trailer_gvw_to,
            trailer_load_capacity_from,
            trailer_load_capacity_to,
            security,
            day,
            trailer_new_hu,
            trailer_renting_possible,
            trailer_discount_offers,
            trailer_vendor,
            trailer_dealer_rating,
            picture,
            video,
         } = req.body

         const trailerCount = await model.trailerCount(
            trailer_condition,
            trailer_category,
            trailer_make,
            trailer_model,
            trailer_firt_date_year_from,
            trailer_firt_date_year_to,
            trailer_price_from,
            trailer_price_to,
            trailer_price_type,
            trailer_vat,
            trailer_country,
            city,
            zipcode,
            trailer_radius,
            features,
            trailer_axles,
            trailer_gvw_from,
            trailer_gvw_to,
            trailer_load_capacity_from,
            trailer_load_capacity_to,
            security,
            day,
            trailer_new_hu,
            trailer_renting_possible,
            trailer_discount_offers,
            trailer_vendor,
            trailer_dealer_rating,
            picture,
            video,
         )

         if (trailerCount) {
            return res.json({
               status: 200,
               message: "Success",
               data: trailerCount
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

   GET_TRAILER_BY_ID: async (req, res) => {
      try {
         const { id } = req.params

         if (id) {
            const foundTrailerById = await model.foundTrailerById(id)

            if (foundTrailerById) {
               return res.json({
                  status: 200,
                  message: "Success",
                  data: foundTrailerById
               })
            } else {
               return res.json({
                  status: 404,
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

   POST_TRAILER: async (req, res) => {
      try {
         const uploadPhoto = req.files;
         const {
            trailer_make,
            trailer_model,
            trailer_describtion,
            trailer_video_link,
            trailer_condition,
            trailer_category,
            trailer_firt_date,
            trailer_firt_date_year,
            trailer_price,
            trailer_price_type,
            trailer_vat,
            trailer_country,
            trailer_city_zipcode,
            trailer_radius,
            features,
            trailer_axles,
            trailer_gvw,
            trailer_load_capacity,
            security,
            trailer_new_hu,
            trailer_renting_possible,
            trailer_discount_offers,
            trailer_vendor,
            trailer_dealer_rating,
            user_id,
            user_phone,
            user_email
         } = req.body

         const trailer_img_name = [];
         const trailer_img = [];

         uploadPhoto?.forEach((e) => {
            trailer_img.push(
               `${process.env.BACKEND_URL}/${e.filename}`,
            );
            trailer_img_name.push(e.filename);
         });

         const addTrailer = await model.addTrailer(
            trailer_make,
            trailer_model,
            trailer_describtion,
            trailer_video_link,
            trailer_condition,
            trailer_category,
            trailer_firt_date,
            trailer_firt_date_year,
            trailer_price,
            trailer_price_type,
            trailer_vat,
            trailer_country,
            trailer_city_zipcode,
            trailer_radius,
            features?.split(','),
            trailer_axles,
            trailer_gvw,
            trailer_load_capacity,
            security?.split(','),
            trailer_new_hu,
            trailer_renting_possible,
            trailer_discount_offers,
            trailer_vendor,
            trailer_dealer_rating,
            user_id,
            user_phone,
            user_email,
            trailer_img,
            trailer_img_name
         )

         if (addTrailer) {
            return res.json({
               status: 200,
               message: "Success",
               data: addTrailer
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

   PUT_TRAILER: async (req, res) => {
      try {
         const uploadPhoto = req.files;
         const {
            id,
            trailer_make,
            trailer_model,
            trailer_describtion,
            trailer_video_link,
            trailer_condition,
            trailer_category,
            trailer_firt_date,
            trailer_firt_date_year,
            trailer_price,
            trailer_price_type,
            trailer_vat,
            trailer_country,
            trailer_city_zipcode,
            trailer_radius,
            features,
            trailer_axles,
            trailer_gvw,
            trailer_load_capacity,
            security,
            trailer_new_hu,
            trailer_renting_possible,
            trailer_discount_offers,
            trailer_vendor,
            trailer_dealer_rating,
            user_id,
            user_phone,
            user_email
         } = req.body

         const foundTrailer = await model.foundTrailer(id)
         const trailer_img_name = [];
         const trailer_img = [];

         if (uploadPhoto.length) {
            foundTrailer?.truck_images_name.forEach((e) => {
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
               trailer_img.push(
                  `${process.env.BACKEND_URL}/${e.filename}`,
               );
               trailer_img_name.push(e.filename);
            });
         } else {
            foundTrailer?.trailer_images_url.forEach((e) => {
               trailer_img.push(e);
            });
            foundTrailer?.trailer_images_name.forEach((e) => {
               trailer_img_name.push(e);
            });
         }

         const updateTrailer = await model.updateTrailer(
            id,
            trailer_make,
            trailer_model,
            trailer_describtion,
            trailer_video_link,
            trailer_condition,
            trailer_category,
            trailer_firt_date,
            trailer_firt_date_year,
            trailer_price,
            trailer_price_type,
            trailer_vat,
            trailer_country,
            trailer_city_zipcode,
            trailer_radius,
            features?.split(','),
            trailer_axles,
            trailer_gvw,
            trailer_load_capacity,
            security?.split(','),
            trailer_new_hu,
            trailer_renting_possible,
            trailer_discount_offers,
            trailer_vendor,
            trailer_dealer_rating,
            user_id,
            user_phone,
            user_email,
            trailer_img,
            trailer_img_name
         )

         if (updateTrailer) {
            return res.json({
               status: 200,
               message: "Success",
               data: updateTrailer
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
         const foundTrailerById = await model.foundTrailerById(id)

         if (foundTrailerById) {
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

   DELETE_TRAILER: async (req, res) => {
      try {
         const { id } = req.body
         const foundTrailer = await model.foundTrailer(id)

         if (foundTrailer) {
            foundTrailer?.trailer_images_name.forEach((e) => {
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

            const deleteTrailer = await model.deleteTrailer(id)

            if (deleteTrailer) {
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
   },
}