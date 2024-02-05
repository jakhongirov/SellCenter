require('dotenv').config();
const model = require('./model')
const FS = require('../../lib/fs/fs');
const path = require('path');

module.exports = {
   GET_ADS_LIST: async (req, res) => {
      try {
         const { limit, offset } = req.query

         if (limit && offset) {
            const adsList = await model.adsList(limit, offset)

            if (adsList) {
               return res.json({
                  status: 200,
                  message: "Success",
                  data: adsList
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

   GET_ADS: async (_, res) => {
      try {
         const adsRandom = await model.adsRandom()

         if (adsRandom) {
            return res.json({
               status: 200,
               message: "Success",
               data: adsRandom
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

   GET_ADS_ID: async (req, res) => {
      try {
         const { id } = req.params

         if (id) {
            const adsById = await model.adsById(id)

            if (adsById) {
               return res.json({
                  status: 200,
                  message: "Success",
                  data: adsById
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

   POST_ADS: async (req, res) => {
      try {
         const uploadPhoto = req.file;
         const {
            ads_title,
            ads_text,
            ads_link
         } = req.body

         console.log(uploadPhoto);

         const ads_img_name = uploadPhoto?.filename
         const ads_img_url = `${process.env.BACKEND_URL}/${uploadPhoto?.filename}`

         const addAds = await model.addAds(
            ads_title,
            ads_text,
            ads_link,
            ads_img_url,
            ads_img_name
         )

         if (addAds) {
            return res.json({
               status: 200,
               message: "Success",
               data: addAds
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

   PUT_ADS: async (req, res) => {
      try {
         const uploadPhoto = req.file;
         const {
            id,
            ads_title,
            ads_text,
            ads_link,
         } = req.body

         const foundAds = await model.adsById(id)
         let ads_img_name = ''
         let ads_img_url = ''

         if (uploadPhoto) {
            const deleteOldImg = new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images', `${foundAds?.card_image_name}`))
            deleteOldImg.delete()
            ads_img_name = uploadPhoto.filename
            ads_img_url = `${process.env.BACKEND_URL}/${uploadPhoto.filename}`
         } else {
            ads_img_name = foundAds?.card_image_name
            ads_img_url = foundAds?.card_image_url
         }

         const updateAds = await model.updateAds(
            id,
            ads_title,
            ads_text,
            ads_link,
            ads_img_url,
            ads_img_name
         )

         if (updateAds) {
            return res.json({
               status: 200,
               message: "Success",
               data: updateAds
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

   PUT_STATUS: async (req, res) => {
      try {
         const { id, status } = req.body

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

      } catch (error) {
         console.log(error)
         res.json({
            status: 500,
            message: "Internal Server Error",
         })
      }
   },

   DELETE_ADS: async (req, res) => {
      try {
         const { id } = req.body

         if (id) {
            const foundAds = await model.adsById(id)

            if (foundAds?.card_image_name) {
               const deleteOldImg = new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images', `${foundAds?.card_image_name}`))
               deleteOldImg.delete()
            }

            const deleteAds = await model.deleteAds(id)

            if (deleteAds) {
               return res.json({
                  status: 200,
                  message: "Success",
                  data: deleteAds
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
   }
}