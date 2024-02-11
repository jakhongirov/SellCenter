const model = require('./model')
const bcryptjs = require('bcryptjs')
const nodeMailer = require('../../lib/nodemailer')

module.exports = {
   EMIAL: async (req, res) => {
      try {
         const { email } = req.body
         const foundUser = await model.foundUser(email)
         let code = '';

         const makeCode = (length) => {
            let characters = '0123456789';
            let charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
               code += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
         }

         if (foundUser) {
            makeCode(5)
            const addCode = await model.addCode(code, email)
            nodeMailer(email, code)

            setTimeout(async () => {
               const disactive = await model.updeteActive(addCode.id)
               console.log(disactive);
            }, 120000);


            if (addCode) {
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

   CHECK_CODE: async (req, res) => {
      try {
         const { email, code } = req.body
         const foundCode = await model.foundCode(email, code)

         if (foundCode) {
            if (foundCode?.code_active) {
               return res.json({
                  status: 200,
                  message: "Success"
               })
            } else {
               return res.json({
                  status: 400,
                  message: "Code is not active"
               })
            }
         } else {
            return res.json({
               status: 401,
               message: "Code is incorrect"
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

   CHANGE_PASSWORD: async (req, res) => {
      try {
         const { email, new_password } = req.body
         const foundUser = await model.foundUser(email)

         if (foundUser) {
            const pass_hash = await bcryptjs.hash(new_password, 10)
            const updateUser = await model.updateUserPassword(email, pass_hash)

            if (updateUser) {
               return res.json({
                  status: 200,
                  message: 'Success',
                  data: updateUser
               })
            } else {
               return res.json({
                  status: 400,
                  message: "Bad request"
               })
            }
         }
         else {
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