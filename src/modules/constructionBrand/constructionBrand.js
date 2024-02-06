const model = require('./model')
const FS = require('../../lib/fs/fs');
const path = require('path');

module.exports = {
   ADD_MAKE_FILE: async (req, res) => {
      try {
         const data = new FS(path.resolve(__dirname, '.', `data.json`))
         const file = JSON.parse(data.read())

         for (const item of file) {
            await model.addMark(item?.construction_make_name)
         }

         return res.json({
            status: 200,
            message: "Success"
         })

      } catch (error) {
         console.log(error)
         res.json({
            status: 500,
            message: "Internal Server Error",
         })
      }
   },

   GET_MARKS: async (_, res) => {
      try {
         const marksList = await model.marksList()

         if (marksList) {
            return res.json({
               status: 200,
               message: "Success",
               data: marksList
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

   GET_MODEL: async (req, res) => {
      try {
         const { mark_id } = req.query

         if (mark_id) {
            const modelList = await model.modelList(mark_id)

            if (modelList) {
               return res.json({
                  status: 200,
                  message: "Success",
                  data: modelList
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

   POST_MARK: async (req, res) => {
      try {
         const { mark_name } = req.body

         if (mark_name) {
            const addMark = await model.addMark(mark_name)

            if (addMark) {
               return res.json({
                  status: 200,
                  message: "Success",
                  data: addMark
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
   },

   POST_MODEL: async (req, res) => {
      try {
         const { mark_id, model_name } = req.body
         const foundMark = await model.foundMark(mark_id)

         if (foundMark) {
            const addModel = await model.addModel(mark_id, model_name)

            if (addModel) {
               return res.json({
                  status: 200,
                  message: "Success",
                  data: addModel
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
               message: "Not found mark"
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

   PUT_MARK: async (req, res) => {
      try {
         const { mark_id, mark_name } = req.body
         const foundMark = await model.foundMark(mark_id)

         if (foundMark) {
            const updateMark = await model.updateMark(mark_id, mark_name)

            if (updateMark) {
               return res.json({
                  status: 200,
                  message: "Success",
                  data: updateMark
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

   PUT_MODEL: async (req, res) => {
      try {
         const { model_id, mark_id, model_name } = req.body
         const foundMark = await model.foundMark(mark_id)
         const foundModel = await model.foundModel(model_id)

         if (foundMark && foundModel) {
            const updateModel = await model.updateModel(model_id, mark_id, model_name)

            if (updateModel) {
               return res.json({
                  status: 200,
                  message: "Success",
                  data: updateModel
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

   DELETE_MARK: async (req, res) => {
      try {
         const { mark_id } = req.body
         const deleteMark = await model.deleteMark(mark_id)

         if (deleteMark) {
            return res.json({
               status: 200,
               message: "Success",
               data: deleteMark
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

   DELETE_MODEL: async (req, res) => {
      try {
         const { model_id } = req.body
         const deleteModel = await model.deleteModel(model_id)

         if (deleteModel) {
            return res.json({
               status: 200,
               message: "Success",
               data: deleteModel
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

}