require('dotenv').config();
const model = require('./model')
const FS = require('../../lib/fs/fs');
const path = require('path');

module.exports = {
   GET_ADMIN: async (req, res) => {
      try {
         const { limit, offset } = req.query

         if (limit && offset) {
            const sliderListAdmin = await model.sliderListAdmin(limit, offset)

            if (sliderListAdmin) {
               return res.json({
                  status: 200,
                  message: "Success",
                  data: sliderListAdmin
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

   GET: async (req, res) => {
      try {
         const { limit, offset } = req.query

         if (limit && offset) {
            const sliderList = await model.sliderList(limit, offset)

            if (sliderList) {
               return res.json({
                  status: 200,
                  message: "Success",
                  data: sliderList
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

   POST: async (req, res) => {
      try {
         const uploadPhoto = req.file;
         const {
            slider_title,
            slider_link
         } = req.body

         const slider_img_name = uploadPhoto.filename
         const slider_img_url = `${process.env.BACKEND_URL}/${uploadPhoto.filename}`

         const addSlider = await model.addSlider(
            slider_title,
            slider_link,
            slider_img_url,
            slider_img_name
         )

         if (addSlider) {
            return res.json({
               status: 200,
               message: "Success",
               data: addSlider
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

   PUT: async (req, res) => {
      try {
         const uploadPhoto = req.file;
         const {
            id,
            slider_title,
            slider_link,
         } = req.body

         const foundSlider = await model.sliderById(id)
         let slider_img_name = ''
         let slider_img_url = ''

         if (uploadPhoto) {
            const deleteOldImg = new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images', `${foundSlider?.slider_image_name}`))
            deleteOldImg.delete()
            slider_img_name = uploadPhoto.filename
            slider_img_url = `${process.env.BACKEND_URL}/${uploadPhoto.filename}`
         } else {
            slider_img_name = foundSlider?.slider_image_name
            slider_img_url = foundSlider?.slider_image_url
         }

         const updateSlider = await model.updateSlider(
            id,
            slider_title,
            slider_link,
            slider_img_url,
            slider_img_name
         )

         if (updateSlider) {
            return res.json({
               status: 200,
               message: "Success",
               data: updateSlider
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

   DELETE: async (req, res) => {
      try {
         const { id } = req.body

         console.log(id);

         if (id) {
            const foundSlider = await model.sliderById(id)

            if (foundSlider?.slider_image_name) {
               const deleteOldImg = new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images', `${foundSlider?.slider_image_name}`))
               deleteOldImg.delete()
            }

            const deleteSlider = await model.deleteSlider(id)

            if (deleteSlider) {
               return res.json({
                  status: 200,
                  message: "Success",
                  data: deleteSlider
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