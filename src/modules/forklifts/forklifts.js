require('dotenv').config();
const model = require('./model')
const FS = require('../../lib/fs/fs');
const path = require('path');

module.exports = {
   GET_ADMIN: async (req, res) => {
      try {
         const { limit, offset } = req.query

         if (limit && offset) {
            const forkliftListAdmin = await model.forkliftListAdmin(limit, offset)

            if (forkliftListAdmin) {
               return res.json({
                  status: 200,
                  message: "Success",
                  data: forkliftListAdmin
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

   GET_FORKLIFT_LIST: async (req, res) => {
      try {
         const { offset, limit } = req.query
         const {
            forklift_condition,
            forklift_category,
            forklift_make,
            forklift_model,
            forklift_price_from,
            forklift_price_to,
            forklift_price_type,
            forklift_vat,
            forklift_construction_year_from,
            forklift_construction_year_to,
            forklift_operating_hours_from,
            forklift_operating_hours_to,
            forklift_country,
            city,
            zipcode,
            forklift_radius,
            fuel_type,
            transmission,
            features,
            forklift_lifting_capacity_from,
            forklift_lifting_capacity_to,
            forklift_lifting_height_from,
            forklift_lifting_height_to,
            forklift_height_from,
            forklift_height_to,
            security,
            forklift_renting_possible,
            forklift_discount_offers,
            forklift_vendor,
            forklift_dealer_rating,
            picture,
            video,
            day
         } = req.body

         if (offset && limit) {

            const forkliftList = await model.forkliftList(
               forklift_condition,
               forklift_category,
               forklift_make,
               forklift_model,
               forklift_price_from,
               forklift_price_to,
               forklift_price_type,
               forklift_vat,
               forklift_construction_year_from,
               forklift_construction_year_to,
               forklift_operating_hours_from,
               forklift_operating_hours_to,
               forklift_country,
               city,
               zipcode,
               forklift_radius,
               fuel_type,
               transmission,
               features,
               forklift_lifting_capacity_from,
               forklift_lifting_capacity_to,
               forklift_lifting_height_from,
               forklift_lifting_height_to,
               forklift_height_from,
               forklift_height_to,
               security,
               forklift_renting_possible,
               forklift_discount_offers,
               forklift_vendor,
               forklift_dealer_rating,
               picture,
               video,
               day,
               limit,
               offset
            )

            if (forkliftList) {
               return res.json({
                  status: 200,
                  message: "Success",
                  data: forkliftList
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

   GET_FORKLIFT_COUNT: async (req, res) => {
      try {
         const {
            forklift_condition,
            forklift_category,
            forklift_make,
            forklift_model,
            forklift_price_from,
            forklift_price_to,
            forklift_price_type,
            forklift_vat,
            forklift_construction_year_from,
            forklift_construction_year_to,
            forklift_operating_hours_from,
            forklift_operating_hours_to,
            forklift_country,
            city,
            zipcode,
            forklift_radius,
            fuel_type,
            transmission,
            features,
            forklift_lifting_capacity_from,
            forklift_lifting_capacity_to,
            forklift_lifting_height_from,
            forklift_lifting_height_to,
            forklift_height_from,
            forklift_height_to,
            security,
            forklift_renting_possible,
            forklift_discount_offers,
            forklift_vendor,
            forklift_dealer_rating,
            picture,
            video,
            day
         } = req.body

         const forkliftCount = await model.forkliftCount(
            forklift_condition,
            forklift_category,
            forklift_make,
            forklift_model,
            forklift_price_from,
            forklift_price_to,
            forklift_price_type,
            forklift_vat,
            forklift_construction_year_from,
            forklift_construction_year_to,
            forklift_operating_hours_from,
            forklift_operating_hours_to,
            forklift_country,
            city,
            zipcode,
            forklift_radius,
            fuel_type,
            transmission,
            features,
            forklift_lifting_capacity_from,
            forklift_lifting_capacity_to,
            forklift_lifting_height_from,
            forklift_lifting_height_to,
            forklift_height_from,
            forklift_height_to,
            security,
            forklift_renting_possible,
            forklift_discount_offers,
            forklift_vendor,
            forklift_dealer_rating,
            picture,
            video,
            day
         )

         if (forkliftCount) {
            return res.json({
               status: 200,
               message: "Success",
               data: forkliftCount
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

   GET_FORKLIFT_ID: async (req, res) => {
      try {
         const { id } = req.params

         if (id) {
            const foundForkliftById = await model.foundForkliftById(id)
            const foundCompany = await model.foundCompany(foundForkliftById?.user_id)

            if (foundForkliftById) {
               return res.json({
                  status: 200,
                  message: "Success",
                  data: foundForkliftById,
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

   POST_FORKLIFT: async (req, res) => {
      try {
         const uploadPhoto = req.files;
         const {
            forklift_make,
            forklift_model,
            forklift_describtion,
            forklift_video_link,
            forklift_condition,
            forklift_category,
            forklift_price,
            forklift_price_type,
            forklift_vat,
            forklift_firt_date,
            forklift_construction_year,
            forklift_operating_hours,
            forklift_country,
            forklift_city_zipcode,
            forklift_radius,
            forklift_fuel_type,
            forklift_transmission,
            features,
            forklift_lifting_capacity,
            forklift_lifting_height,
            forklift_height,
            security,
            forklift_renting_possible,
            forklift_discount_offers,
            forklift_vendor,
            forklift_dealer_rating,
            user_id,
            user_phone,
            user_email
         } = req.body

         const forklift_img_name = [];
         const forklift_img = [];

         uploadPhoto?.forEach((e) => {
            forklift_img.push(
               `${process.env.BACKEND_URL}/${e.filename}`,
            );
            forklift_img_name.push(e.filename);
         });

         const addForklift = await model.addForklift(
            forklift_make,
            forklift_model,
            forklift_describtion,
            forklift_video_link,
            forklift_condition,
            forklift_category,
            forklift_price,
            forklift_price_type,
            forklift_vat,
            forklift_firt_date,
            forklift_construction_year,
            forklift_operating_hours,
            forklift_country,
            forklift_city_zipcode,
            forklift_radius,
            forklift_fuel_type,
            forklift_transmission,
            features?.split(','),
            forklift_lifting_capacity,
            forklift_lifting_height,
            forklift_height,
            security?.split(','),
            forklift_renting_possible,
            forklift_discount_offers,
            forklift_vendor,
            forklift_dealer_rating,
            user_id,
            user_phone,
            user_email,
            forklift_img,
            forklift_img_name
         )

         if (addForklift) {
            return res.json({
               status: 200,
               message: "Success",
               data: addForklift
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

   PUT_FORKLIFT: async (req, res) => {
      try {
         const {
            id,
            forklift_make,
            forklift_model,
            forklift_describtion,
            forklift_video_link,
            forklift_condition,
            forklift_category,
            forklift_price,
            forklift_price_type,
            forklift_vat,
            forklift_firt_date,
            forklift_construction_year,
            forklift_operating_hours,
            forklift_country,
            forklift_city_zipcode,
            forklift_radius,
            forklift_fuel_type,
            forklift_transmission,
            features,
            forklift_lifting_capacity,
            forklift_lifting_height,
            forklift_height,
            security,
            forklift_renting_possible,
            forklift_discount_offers,
            forklift_vendor,
            forklift_dealer_rating,
            user_id,
            user_phone,
            user_email
         } = req.body

         const updateForklift = await model.updateForklift(
            id,
            forklift_make,
            forklift_model,
            forklift_describtion,
            forklift_video_link,
            forklift_condition,
            forklift_category,
            forklift_price,
            forklift_price_type,
            forklift_vat,
            forklift_firt_date,
            forklift_construction_year,
            forklift_operating_hours,
            forklift_country,
            forklift_city_zipcode,
            forklift_radius,
            forklift_fuel_type,
            forklift_transmission,
            features,
            forklift_lifting_capacity,
            forklift_lifting_height,
            forklift_height,
            security,
            forklift_renting_possible,
            forklift_discount_offers,
            forklift_vendor,
            forklift_dealer_rating,
            user_id,
            user_phone,
            user_email,
         )

         if (updateForklift) {
            return res.json({
               status: 200,
               message: "Success",
               data: updateForklift
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
         const foundForklift = await model.foundForklift(id)
         const forklift_img_name = [];
         const forklift_img = [];

         if (foundForklift) {
            uploadPhoto?.forEach((e) => {
               forklift_img.push(
                  `${process.env.BACKEND_URL}/${e.filename}`,
               );
               forklift_img_name.push(e.filename);
            });

            const addImage = await model.addImage(id, forklift_img, forklift_img_name)

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
         const foundForklift = await model.foundForklift(id)

         if (foundForklift) {
            const forklift_images_url = foundForklift?.forklift_images_url.filter(e => e != delete_image_url)
            const forklift_images_name = foundForklift?.forklift_images_name.filter(e => e != delete_image_name)

            const deleteOldImg = new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images', `${delete_image_name}`))
            deleteOldImg.delete()

            const deleteImage = await model.deleteImage(id, forklift_images_url, forklift_images_name)

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
         const foundForkliftById = await model.foundForkliftById(id)

         if (foundForkliftById) {
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

   DELETE_FORKLIFT: async (req, res) => {
      try {
         const { id } = req.body
         const foundForklift = await model.foundForklift(id)

         if (foundForklift) {
            foundForklift?.forklift_images_name?.forEach((e) => {
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

            const deleteForklift = await model.deleteForklift(id)

            if (deleteForklift) {
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