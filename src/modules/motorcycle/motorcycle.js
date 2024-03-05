require('dotenv').config();
const model = require('./model')
const FS = require('../../lib/fs/fs');
const path = require('path');

module.exports = {
   GET_ADMIN: async (req, res) => {
      try {
         const { limit, offset } = req.query

         if (limit && offset) {
            const motorcycleListAdmin = await model.motorcycleListAdmin(limit, offset)

            if (motorcycleListAdmin) {
               return res.json({
                  status: 200,
                  message: "Success",
                  data: motorcycleListAdmin
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

   GET_MOTORCYCLE: async (req, res) => {
      try {
         const { offset, limit } = req.query
         const {
            motorcycle_condition,
            motorcycle_make,
            motorcycle_model,
            types,
            motorcycle_price_from,
            motorcycle_price_to,
            motorcycle_firt_date_year_from,
            motorcycle_firt_date_year_to,
            motorcycle_mileage_from,
            motorcycle_mileage_to,
            motorcycle_power_from,
            motorcycle_power_to,
            motorcycle_country,
            city,
            zipcode,
            motorcycle_radius,
            fuel_type,
            driving_mode,
            transmission,
            motorcycle_cubic_capacity_from,
            motorcycle_cubic_capacity_to,
            exterior_colour,
            others,
            motorcycle_vat,
            days,
            picture,
            video,
            motorcycle_discount_offers,
            motorcycle_vendor,
            motorcycle_dealer_rating,
            history,
            motorcycle_damaged,
            motorcycle_number_owners,
            motorcycle_approved_used_programme
         } = req.body

         if (offset, limit) {

            const motorcycleList = await model.motorcycleList(
               motorcycle_condition,
               motorcycle_make,
               motorcycle_model,
               types,
               motorcycle_price_from,
               motorcycle_price_to,
               motorcycle_firt_date_year_from,
               motorcycle_firt_date_year_to,
               motorcycle_mileage_from,
               motorcycle_mileage_to,
               motorcycle_power_from,
               motorcycle_power_to,
               motorcycle_country,
               city,
               zipcode,
               motorcycle_radius,
               fuel_type,
               driving_mode,
               transmission,
               motorcycle_cubic_capacity_from,
               motorcycle_cubic_capacity_to,
               exterior_colour,
               others,
               motorcycle_vat,
               days,
               picture,
               video,
               motorcycle_discount_offers,
               motorcycle_vendor,
               motorcycle_dealer_rating,
               history,
               motorcycle_damaged,
               motorcycle_number_owners,
               motorcycle_approved_used_programme,
               offset,
               limit
            )

            return res.json({
               status: 200,
               message: 'Success',
               data: motorcycleList
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

   GET_MOTORCYCLE_COUNT: async (req, res) => {
      try {
         const {
            motorcycle_condition,
            motorcycle_make,
            motorcycle_model,
            type,
            motorcycle_price_from,
            motorcycle_price_to,
            motorcycle_firt_date_year_from,
            motorcycle_firt_date_year_to,
            motorcycle_mileage_from,
            motorcycle_mileage_to,
            motorcycle_power_from,
            motorcycle_power_to,
            motorcycle_country,
            city,
            zipcode,
            motorcycle_radius,
            fuel_type,
            driving_mode,
            transmission,
            motorcycle_cubic_capacity_from,
            motorcycle_cubic_capacity_to,
            exterior_colour,
            others,
            motorcycle_vat,
            days,
            picture,
            video,
            motorcycle_discount_offers,
            motorcycle_vendor,
            motorcycle_dealer_rating,
            history,
            motorcycle_damaged,
            motorcycle_number_owners,
            motorcycle_approved_used_programme
         } = req.body

         const motorcycleCount = await model.motorcycleCount(
            motorcycle_condition,
            motorcycle_make,
            motorcycle_model,
            type,
            motorcycle_price_from,
            motorcycle_price_to,
            motorcycle_firt_date_year_from,
            motorcycle_firt_date_year_to,
            motorcycle_mileage_from,
            motorcycle_mileage_to,
            motorcycle_power_from,
            motorcycle_power_to,
            motorcycle_country,
            city,
            zipcode,
            motorcycle_radius,
            fuel_type,
            driving_mode,
            transmission,
            motorcycle_cubic_capacity_from,
            motorcycle_cubic_capacity_to,
            exterior_colour,
            others,
            motorcycle_vat,
            days,
            picture,
            video,
            motorcycle_discount_offers,
            motorcycle_vendor,
            motorcycle_dealer_rating,
            history,
            motorcycle_damaged,
            motorcycle_number_owners,
            motorcycle_approved_used_programme
         )

         if (motorcycleCount) {
            return res.json({
               status: 200,
               message: 'Success',
               data: motorcycleCount
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

   GET_MOTORCYCLE_ID: async (req, res) => {
      try {
         const { id } = req.params

         if (id) {
            const foundMotorcycleById = await model.foundMotorcycleById(id)
            const foundCompany = await model.foundCompany(foundMotorcycleById?.user_id)

            if (foundMotorcycleById) {
               return res.json({
                  status: 200,
                  message: "Success",
                  data: foundMotorcycleById,
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

   POST_MOTORCYCLE: async (req, res) => {
      try {
         const uploadPhoto = req.files;
         const {
            motorcycle_make,
            motorcycle_model,
            motorcycle_description,
            motorcycle_condition,
            motorcycle_vide_link,
            motorcycle_type,
            motorcycle_price,
            motorcycle_firt_date,
            motorcycle_firt_date_year,
            motorcycle_mileage,
            motorcycle_power,
            motorcycle_country,
            motorcycle_city_zipcode,
            motorcycle_radius,
            motorcycle_fuel_type,
            motorcycle_driving_mode,
            motorcycle_transmission,
            motorcycle_cubic_capacity,
            motorcycle_exterior_colour,
            others,
            motorcycle_vat,
            motorcycle_discount_offers,
            motorcycle_vendor,
            motorcycle_history,
            motorcycle_damaged,
            motorcycle_number_owners,
            motorcycle_approved_used_programme,
            motorcycle_dealer_rating,
            user_id,
            user_phone,
            user_email
         } = req.body

         const motorcycle_img_name = [];
         const motorcycle_img = [];

         uploadPhoto?.forEach((e) => {
            motorcycle_img.push(
               `${process.env.BACKEND_URL}/${e.filename}`,
            );
            motorcycle_img_name.push(e.filename);
         });

         const addMotorcycle = await model.addMotorcycle(
            motorcycle_make,
            motorcycle_model,
            motorcycle_description,
            motorcycle_condition,
            motorcycle_vide_link,
            motorcycle_type,
            motorcycle_price,
            motorcycle_firt_date,
            motorcycle_firt_date_year,
            motorcycle_mileage,
            motorcycle_power,
            motorcycle_country,
            motorcycle_city_zipcode,
            motorcycle_radius,
            motorcycle_fuel_type,
            motorcycle_driving_mode,
            motorcycle_transmission,
            motorcycle_cubic_capacity,
            motorcycle_exterior_colour,
            others?.split(','),
            motorcycle_vat,
            motorcycle_discount_offers,
            motorcycle_vendor,
            motorcycle_history,
            motorcycle_damaged,
            motorcycle_number_owners,
            motorcycle_approved_used_programme,
            motorcycle_dealer_rating,
            user_id,
            user_phone,
            user_email,
            motorcycle_img,
            motorcycle_img_name
         )

         if (addMotorcycle) {
            return res.json({
               status: 200,
               message: "Success",
               data: addMotorcycle
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

   PUT_MOTORCYCLE: async (req, res) => {
      try {
         const {
            motorcycle_id,
            motorcycle_make,
            motorcycle_model,
            motorcycle_description,
            motorcycle_condition,
            motorcycle_vide_link,
            motorcycle_type,
            motorcycle_price,
            motorcycle_firt_date,
            motorcycle_firt_date_year,
            motorcycle_mileage,
            motorcycle_power,
            motorcycle_country,
            motorcycle_city_zipcode,
            motorcycle_radius,
            motorcycle_fuel_type,
            motorcycle_driving_mode,
            motorcycle_transmission,
            motorcycle_cubic_capacity,
            motorcycle_exterior_colour,
            others,
            motorcycle_vat,
            motorcycle_discount_offers,
            motorcycle_vendor,
            motorcycle_history,
            motorcycle_damaged,
            motorcycle_number_owners,
            motorcycle_approved_used_programme,
            motorcycle_dealer_rating,
            user_id,
            user_phone,
            user_email
         } = req.body

         const updateMotorcycle = await model.updateMotorcycle(
            motorcycle_id,
            motorcycle_make,
            motorcycle_model,
            motorcycle_description,
            motorcycle_condition,
            motorcycle_vide_link,
            motorcycle_type,
            motorcycle_price,
            motorcycle_firt_date,
            motorcycle_firt_date_year,
            motorcycle_mileage,
            motorcycle_power,
            motorcycle_country,
            motorcycle_city_zipcode,
            motorcycle_radius,
            motorcycle_fuel_type,
            motorcycle_driving_mode,
            motorcycle_transmission,
            motorcycle_cubic_capacity,
            motorcycle_exterior_colour,
            others,
            motorcycle_vat,
            motorcycle_discount_offers,
            motorcycle_vendor,
            motorcycle_history,
            motorcycle_damaged,
            motorcycle_number_owners,
            motorcycle_approved_used_programme,
            motorcycle_dealer_rating,
            user_id,
            user_phone,
            user_email
         )

         if (updateMotorcycle) {
            return res.json({
               status: 200,
               message: "Success",
               data: updateMotorcycle
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
         const { motorcycle_id } = req.body
         const foundMotorCycle = await model.foundMotorCycle(motorcycle_id)
         const motorcycle_img_name = [];
         const motorcycle_img = [];

         if (foundMotorCycle) {
            uploadPhoto?.forEach((e) => {
               motorcycle_img.push(
                  `${process.env.BACKEND_URL}/${e.filename}`,
               );
               motorcycle_img_name.push(e.filename);
            });

            const addImage = await model.addImage(motorcycle_id, motorcycle_img, motorcycle_img_name)

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
         const { motorcycle_id, delete_image_url, delete_image_name } = req.body
         const foundMotorCycle = await model.foundMotorCycle(motorcycle_id)

         if (foundMotorCycle) {
            const motorcycle_images_url = foundMotorCycle?.motorcycle_images_url.filter(e => e != delete_image_url)
            const motorcycle_images_name = foundMotorCycle?.motorcycle_images_name.filter(e => e != delete_image_name)

            const deleteOldImg = new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images', `${delete_image_name}`))
            deleteOldImg.delete()
            const deleteImage = await model.deleteImage(motorcycle_id, motorcycle_images_url, motorcycle_images_name)

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
         const { motorcycle_id, status } = req.body
         const foundMotorcycleById = await model.foundMotorcycleById(motorcycle_id)

         if (foundMotorcycleById) {
            const updateStatus = await model.updateStatus(motorcycle_id, status)

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

   DELETE_MOTORCYCLE: async (req, res) => {
      try {
         const { id } = req.body
         const foundMotorCycle = await model.foundMotorCycle(id)

         console.log(id);

         if (foundMotorCycle) {
            foundMotorCycle?.motorcycle_images_name.forEach((e) => {
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

            const deleteMotorcycle = await model.deleteMotorcycle(id)

            if (deleteMotorcycle) {
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