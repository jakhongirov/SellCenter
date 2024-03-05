require('dotenv').config();
const model = require('./model')
const FS = require('../../lib/fs/fs');
const path = require('path');

module.exports = {
   GET_ADMIN: async (req, res) => {
      try {
         const { limit, offset } = req.query

         if (limit && offset) {
            const adgriculturalList = await model.adgriculturalList(limit, offset)

            if (adgriculturalList) {
               return res.json({
                  status: 200,
                  message: "Success",
                  data: adgriculturalList
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

   GET_VEHICLE_LIST: async (req, res) => {
      try {
         const { limit, offset } = req.query
         const {
            vehicle_condition,
            vehicle_category,
            vehicle_make,
            vehicle_model,
            vehicle_price_from,
            vehicle_price_to,
            vehicle_price_type,
            vehicle_vat,
            vehicle_power_from,
            vehicle_power_to,
            vehicle_construction_year_from,
            vehicle_construction_year_to,
            vehicle_operating_hours_from,
            vehicle_operating_hours_to,
            vehicle_country,
            city,
            zipcode,
            vehicle_radius,
            features,
            vehicle_air_conditioning,
            interior_features,
            vehicle_emissions_sticker,
            security,
            day,
            vehicle_municipal,
            vehicle_new_hu,
            vehicle_renting_possible,
            vehicle_discount_offers,
            vehicle_vendor,
            vehicle_dealer_rating,
            picture,
            video
         } = req.body

         if (limit && offset) {

            const vehicleList = await model.vehicleList(
               vehicle_condition,
               vehicle_category,
               vehicle_make,
               vehicle_model,
               vehicle_price_from,
               vehicle_price_to,
               vehicle_price_type,
               vehicle_vat,
               vehicle_power_from,
               vehicle_power_to,
               vehicle_construction_year_from,
               vehicle_construction_year_to,
               vehicle_operating_hours_from,
               vehicle_operating_hours_to,
               vehicle_country,
               city,
               zipcode,
               vehicle_radius,
               features,
               vehicle_air_conditioning,
               interior_features,
               vehicle_emissions_sticker,
               security,
               day,
               vehicle_municipal,
               vehicle_new_hu,
               vehicle_renting_possible,
               vehicle_discount_offers,
               vehicle_vendor,
               vehicle_dealer_rating,
               picture,
               video,
               limit,
               offset
            )

            if (vehicleList) {
               return res.json({
                  status: 200,
                  message: "Success",
                  data: vehicleList
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

   GET_VEHICLE_COUNT: async (req, res) => {
      try {
         const {
            vehicle_condition,
            vehicle_category,
            vehicle_make,
            vehicle_model,
            vehicle_price_from,
            vehicle_price_to,
            vehicle_price_type,
            vehicle_vat,
            vehicle_power_from,
            vehicle_power_to,
            vehicle_construction_year_from,
            vehicle_construction_year_to,
            vehicle_operating_hours_from,
            vehicle_operating_hours_to,
            vehicle_country,
            city,
            zipcode,
            vehicle_radius,
            features,
            vehicle_air_conditioning,
            interior_features,
            vehicle_emissions_sticker,
            security,
            day,
            vehicle_municipal,
            vehicle_new_hu,
            vehicle_renting_possible,
            vehicle_discount_offers,
            vehicle_vendor,
            vehicle_dealer_rating,
            picture,
            video
         } = req.body

         const vehicleCount = await model.vehicleCount(
            vehicle_condition,
            vehicle_category,
            vehicle_make,
            vehicle_model,
            vehicle_price_from,
            vehicle_price_to,
            vehicle_price_type,
            vehicle_vat,
            vehicle_power_from,
            vehicle_power_to,
            vehicle_construction_year_from,
            vehicle_construction_year_to,
            vehicle_operating_hours_from,
            vehicle_operating_hours_to,
            vehicle_country,
            city,
            zipcode,
            vehicle_radius,
            features,
            vehicle_air_conditioning,
            interior_features,
            vehicle_emissions_sticker,
            security,
            day,
            vehicle_municipal,
            vehicle_new_hu,
            vehicle_renting_possible,
            vehicle_discount_offers,
            vehicle_vendor,
            vehicle_dealer_rating,
            picture,
            video
         )

         if (vehicleCount) {
            return res.json({
               status: 200,
               message: "Success",
               data: vehicleCount
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

   GET_VEHICLE_ID: async (req, res) => {
      try {
         const { id } = req.params

         if (id) {
            const foundVehcileById = await model.foundVehcileById(id)
            const foundCompany = await model.foundCompany(foundVehcileById?.user_id)

            if (foundVehcileById) {
               return res.json({
                  status: 200,
                  message: "Success",
                  data: foundVehcileById,
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

   POST_VEHICLE: async (req, res) => {
      try {
         const uploadPhoto = req.files;
         const {
            vehicle_make,
            vehicle_model,
            vehicle_describtion,
            vehicle_video_link,
            vehicle_condition,
            vehicle_category,
            vehicle_price,
            vehicle_price_type,
            vehicle_vat,
            vehicle_power,
            vehicle_firt_date,
            vehicle_construction_year,
            vehicle_operating_hours,
            vehicle_country,
            vehicle_city_zipcode,
            vehicle_radius,
            features,
            vehicle_air_conditioning,
            interior_features,
            vehicle_emissions_sticker,
            security,
            vehicle_municipal,
            vehicle_new_hu,
            vehicle_renting_possible,
            vehicle_discount_offers,
            vehicle_vendor,
            vehicle_dealer_rating,
            user_id,
            user_phone,
            user_email
         } = req.body

         const vehicle_img_name = [];
         const vehicle_img = [];

         uploadPhoto?.forEach((e) => {
            vehicle_img.push(
               `${process.env.BACKEND_URL}/${e.filename}`,
            );
            vehicle_img_name.push(e.filename);
         });

         const addVehicle = await model.addVehicle(
            vehicle_make,
            vehicle_model,
            vehicle_describtion,
            vehicle_video_link,
            vehicle_condition,
            vehicle_category,
            vehicle_price,
            vehicle_price_type,
            vehicle_vat,
            vehicle_power,
            vehicle_firt_date,
            vehicle_construction_year,
            vehicle_operating_hours,
            vehicle_country,
            vehicle_city_zipcode,
            vehicle_radius,
            features?.split(','),
            vehicle_air_conditioning,
            interior_features?.split(','),
            vehicle_emissions_sticker,
            security?.split(','),
            vehicle_municipal,
            vehicle_new_hu,
            vehicle_renting_possible,
            vehicle_discount_offers,
            vehicle_vendor,
            vehicle_dealer_rating,
            user_id,
            user_phone,
            user_email,
            vehicle_img,
            vehicle_img_name
         )

         if (addVehicle) {
            return res.json({
               status: 200,
               message: "Success",
               data: addVehicle
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

   PUT_VEHICLE: async (req, res) => {
      try {
         const uploadPhoto = req.files;
         const {
            id,
            vehicle_make,
            vehicle_model,
            vehicle_describtion,
            vehicle_video_link,
            vehicle_condition,
            vehicle_category,
            vehicle_price,
            vehicle_price_type,
            vehicle_vat,
            vehicle_power,
            vehicle_firt_date,
            vehicle_construction_year,
            vehicle_operating_hours,
            vehicle_country,
            vehicle_city_zipcode,
            vehicle_radius,
            features,
            vehicle_air_conditioning,
            interior_features,
            vehicle_emissions_sticker,
            security,
            vehicle_municipal,
            vehicle_new_hu,
            vehicle_renting_possible,
            vehicle_discount_offers,
            vehicle_vendor,
            vehicle_dealer_rating,
            user_id,
            user_phone,
            user_email
         } = req.body

         const updateVehicle = await model.updateVehicle(
            id,
            vehicle_make,
            vehicle_model,
            vehicle_describtion,
            vehicle_video_link,
            vehicle_condition,
            vehicle_category,
            vehicle_price,
            vehicle_price_type,
            vehicle_vat,
            vehicle_power,
            vehicle_firt_date,
            vehicle_construction_year,
            vehicle_operating_hours,
            vehicle_country,
            vehicle_city_zipcode,
            vehicle_radius,
            features,
            vehicle_air_conditioning,
            interior_features,
            vehicle_emissions_sticker,
            security,
            vehicle_municipal,
            vehicle_new_hu,
            vehicle_renting_possible,
            vehicle_discount_offers,
            vehicle_vendor,
            vehicle_dealer_rating,
            user_id,
            user_phone,
            user_email
         )

         if (updateVehicle) {
            return res.json({
               status: 200,
               message: "Success",
               data: updateVehicle
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
         const foundVehcile = await model.foundVehcile(id)
         const vehicle_img_name = [];
         const vehicle_img = [];

         if (foundVehcile) {
            uploadPhoto?.forEach((e) => {
               vehicle_img.push(
                  `${process.env.BACKEND_URL}/${e.filename}`,
               );
               vehicle_img_name.push(e.filename);
            });

            const addImage = await model.addImage(id, vehicle_img, vehicle_img_name)

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
         const foundVehcile = await model.foundVehcile(id)

         if (foundVehcile) {
            const vehicle_images_url = foundVehcile?.vehicle_images_url.filter(e => e != delete_image_url)
            const vehicle_images_name = foundVehcile?.vehicle_images_name.filter(e => e != delete_image_name)

            const deleteOldImg = new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images', `${delete_image_name}`))
            deleteOldImg.delete()

            const deleteImage = await model.deleteImage(id, vehicle_images_url, vehicle_images_name)

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
         const foundVehcileById = await model.foundVehcileById(id)

         if (foundVehcileById) {
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

   DELETE_VEHICLE: async (req, res) => {
      try {
         const { id } = req.body

         if (id) {
            const foundVehcile = await model.foundVehcile(id)

            if (foundVehcile) {
               foundVehcile?.vehicle_images_name.forEach((e) => {
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

               const deleteVehicle = await model.deleteVehicle(id)

               if (deleteVehicle) {
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
   }
}