require('dotenv').config();
const model = require('./model')
const FS = require('../../lib/fs/fs');
const path = require('path');

module.exports = {
   GET_ADMIN: async (req, res) => {
      try {
         const { limit, offset } = req.query

         if (limit && offset) {
            const newsList = await model.newsAdminList(limit, offset)

            if (newsList) {
               return res.json({
                  status: 200,
                  message: "Success",
                  data: newsList
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
         const { limit, offset, lang } = req.query

         if (limit && offset) {
            const newsList = await model.newsList(limit, offset, lang)

            if (newsList) {
               return res.json({
                  status: 200,
                  message: "Success",
                  data: newsList
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


   GET_ID: async (req, res) => {
      try {
         const { id } = req.params

         if (id) {
            const newsById = await model.newsById(id)

            if (newsById) {
               return res.json({
                  status: 200,
                  message: "Success",
                  data: newsById
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
            title,
            news_lang,
            news_desc
         } = req.body

         const news_img_name = uploadPhoto?.filename
         const news_img_url = `${process.env.BACKEND_URL}/${uploadPhoto?.filename}`

         const addNews = await model.addNews(
            title,
            news_lang,
            news_desc,
            news_img_url,
            news_img_name
         )

         if (addNews) {
            return res.json({
               status: 200,
               message: "Success",
               data: addNews
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
            title,
            news_lang,
            news_desc
         } = req.body
         const newsById = await model.newsById(id)
         let news_img_name = ''
         let news_img_url = ''

         if (uploadPhoto) {
            const deleteOldImg = new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images', `${newsById?.news_image_name}`))
            deleteOldImg.delete()
            news_img_name = uploadPhoto.filename
            news_img_url = `${process.env.BACKEND_URL}/${uploadPhoto.filename}`
         } else {
            news_img_name = newsById?.news_image_name
            news_img_url = newsById?.news_image_url
         }

         const updateNews = await model.updateNews(
            id,
            title,
            news_lang,
            news_desc,
            news_img_url,
            news_img_name
         )

         if (updateNews) {
            return res.json({
               status: 200,
               message: "Success",
               data: updateNews
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
         const newsById = await model.newsById(id)

         if (newsById) {
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

   DELETE: async (req, res) => {
      try {
         const { id } = req.body

         if (id) {
            const foundNews = await model.newsById(id)

            if (foundNews?.news_image_name) {
               const deleteOldImg = new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images', `${foundNews?.news_image_name}`))
               deleteOldImg.delete()
            }

            const deleteNews = await model.deleteNews(id)

            if (deleteNews) {
               return res.json({
                  status: 200,
                  message: "Success",
                  data: deleteNews
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