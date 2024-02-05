require('dotenv').config();
const model = require('./model')
const FS = require('../../lib/fs/fs');
const path = require('path');

module.exports = {
   GET_ADMIN: async (req, res) => {
      try {
         const { limit, offset } = req.query

         if (limit && offset) {
            const constructionListAdmin = await model.constructionListAdmin(limit, offset)

            if (constructionListAdmin) {
               return res.json({
                  status: 200,
                  message: "Success",
                  data: constructionListAdmin
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

   GET_CONSTRUCTION_LIST: async (req, res) => {
      try {
         const { offset, limit } = req.query
         const {
            machine_condition,
            machine_category,
            machine_make,
            machine_model,
            machine_price_from,
            machine_price_to,
            machine_price_type,
            machine_vat,
            machine_construction_year_from,
            machine_construction_year_to,
            machine_operating_hours_from,
            machine_operating_hours_to,
            machine_country,
            city,
            zipcode,
            machine_radius,
            features,
            machine_emissions_sticker,
            safety,
            machine_renting_possible,
            machine_road_licence,
            machine_discount_offers,
            machine_vendor,
            machine_dealer_rating,
            picture,
            video,
            day,
         } = req.body

         if (limit && offset) {

            const constructionList = await model.constructionList(
               machine_condition,
               machine_category,
               machine_make,
               machine_model,
               machine_price_from,
               machine_price_to,
               machine_price_type,
               machine_vat,
               machine_construction_year_from,
               machine_construction_year_to,
               machine_operating_hours_from,
               machine_operating_hours_to,
               machine_country,
               city,
               zipcode,
               machine_radius,
               features,
               machine_emissions_sticker,
               safety,
               machine_renting_possible,
               machine_road_licence,
               machine_discount_offers,
               machine_vendor,
               machine_dealer_rating,
               picture,
               video,
               day,
               limit,
               offset
            )

            if (constructionList) {
               return res.json({
                  status: 200,
                  message: "Success",
                  data: constructionList
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

   GET_CONSTRUCTION_COUNT: async (req, res) => {
      try {
         const {
            machine_condition,
            machine_category,
            machine_make,
            machine_model,
            machine_price_from,
            machine_price_to,
            machine_price_type,
            machine_vat,
            machine_construction_year_from,
            machine_construction_year_to,
            machine_operating_hours_from,
            machine_operating_hours_to,
            machine_country,
            city,
            zipcode,
            machine_radius,
            features,
            machine_emissions_sticker,
            safety,
            machine_renting_possible,
            machine_road_licence,
            machine_discount_offers,
            machine_vendor,
            machine_dealer_rating,
            picture,
            video,
            day,
         } = req.body

         const constructionCount = await model.constructionCount(
            machine_condition,
            machine_category,
            machine_make,
            machine_model,
            machine_price_from,
            machine_price_to,
            machine_price_type,
            machine_vat,
            machine_construction_year_from,
            machine_construction_year_to,
            machine_operating_hours_from,
            machine_operating_hours_to,
            machine_country,
            city,
            zipcode,
            machine_radius,
            features,
            machine_emissions_sticker,
            safety,
            machine_renting_possible,
            machine_road_licence,
            machine_discount_offers,
            machine_vendor,
            machine_dealer_rating,
            picture,
            video,
            day,
         )

         if (constructionCount) {
            return res.json({
               status: 200,
               message: "Success",
               data: constructionCount
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


   GET_CONSTRUCTION_ID: async (req, res) => {
      try {
         const { id } = req.params

         if (id) {
            const foundConstructionById = await model.foundConstructionById(id)

            if (foundConstructionById) {
               return res.json({
                  status: 200,
                  message: "Success",
                  data: foundConstructionById
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

   POST_CONSTRUCTION: async (req, res) => {
      try {
         const uploadPhoto = req.files;
         const {
            machine_make,
            machine_model,
            machine_describtion,
            machine_video_link,
            machine_condition,
            machine_category,
            machine_price,
            machine_price_type,
            machine_vat,
            machine_firt_date,
            machine_construction_year,
            machine_operating_hours,
            machine_country,
            machine_city_zipcode,
            machine_radius,
            features,
            machine_emissions_sticker,
            safety,
            machine_renting_possible,
            machine_road_licence,
            machine_discount_offers,
            machine_vendor,
            machine_dealer_rating,
            user_id,
            user_phone,
            user_email
         } = req.body

         const construction_img_name = [];
         const construction_img = [];

         uploadPhoto?.forEach((e) => {
            construction_img.push(
               `${process.env.BACKEND_URL}/${e.filename}`,
            );
            construction_img_name.push(e.filename);
         });

         const addConstruction = await model.addConstruction(
            machine_make,
            machine_model,
            machine_describtion,
            machine_video_link,
            machine_condition,
            machine_category,
            machine_price,
            machine_price_type,
            machine_vat,
            machine_firt_date,
            machine_construction_year,
            machine_operating_hours,
            machine_country,
            machine_city_zipcode,
            machine_radius,
            features?.split(','),
            machine_emissions_sticker,
            safety?.split(','),
            machine_renting_possible,
            machine_road_licence,
            machine_discount_offers,
            machine_vendor,
            machine_dealer_rating,
            user_id,
            user_phone,
            user_email,
            construction_img,
            construction_img_name
         )

         if (addConstruction) {
            return res.json({
               status: 200,
               message: "Success",
               data: addConstruction
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

   PUT_CONSTRUCTION: async (req, res) => {
      try {
         const uploadPhoto = req.files;
         const {
            id,
            machine_make,
            machine_model,
            machine_describtion,
            machine_video_link,
            machine_condition,
            machine_category,
            machine_price,
            machine_price_type,
            machine_vat,
            machine_firt_date,
            machine_construction_year,
            machine_operating_hours,
            machine_country,
            machine_city_zipcode,
            machine_radius,
            features,
            machine_emissions_sticker,
            safety,
            machine_renting_possible,
            machine_road_licence,
            machine_discount_offers,
            machine_vendor,
            machine_dealer_rating,
            user_id,
            user_phone,
            user_email
         } = req.body

         const foundConstruction = await model.foundConstruction(id)
         const construction_img_name = [];
         const construction_img = [];

         if (uploadPhoto.length) {
            foundConstruction?.machine_images_name.forEach((e) => {
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
               construction_img.push(
                  `${process.env.BACKEND_URL}/${e.filename}`,
               );
               construction_img_name.push(e.filename);
            });
         } else {
            foundConstruction?.machine_images_url.forEach((e) => {
               construction_img.push(e);
            });
            foundConstruction?.machine_images_name.forEach((e) => {
               construction_img_name.push(e);
            });
         }

         const updateConstruction = await model.updateConstruction(
            id,
            machine_make,
            machine_model,
            machine_describtion,
            machine_video_link,
            machine_condition,
            machine_category,
            machine_price,
            machine_price_type,
            machine_vat,
            machine_firt_date,
            machine_construction_year,
            machine_operating_hours,
            machine_country,
            machine_city_zipcode,
            machine_radius,
            features?.split(','),
            machine_emissions_sticker,
            safety?.split(','),
            machine_renting_possible,
            machine_road_licence,
            machine_discount_offers,
            machine_vendor,
            machine_dealer_rating,
            user_id,
            user_phone,
            user_email,
            construction_img,
            construction_img_name
         )

         if (updateConstruction) {
            return res.json({
               status: 200,
               message: "Success",
               data: updateConstruction
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
         const foundConstructionById = await model.foundConstructionById(id)

         if (foundConstructionById) {
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

   DELETE_CONSTRUCTION: async (req, res) => {
      try {
         const { id } = req.body
         const foundConstruction = await model.foundConstruction(id)

         if (foundConstruction) {
            foundConstruction?.machine_images_name.forEach((e) => {
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

            const deleteConstruction = await model.deleteConstruction(id)

            if (deleteConstruction) {
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