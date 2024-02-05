const model = require('./model')
const JWT = require('../../lib/jwt')
const bcryptjs = require('bcryptjs')
const FS = require('../../lib/fs/fs');
const path = require('path');

module.exports = {
   GET_USERS_LIST: async (req, res) => {
      try {
         const { limit, offset } = req.query

         if (limit && offset) {
            const usersList = await model.usersList(limit, offset)

            if (usersList) {
               return res.json({
                  status: 200,
                  message: "Success",
                  data: usersList
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
         const { id } = req.query
         
         console.log(id, typeof id)

         if (id) {
            const user = await model.foundUserById(id)

            if (user) {
               const carCount = await model.userCarCount(user?.user_id)
               const motorcycleCount = await model.userMotorcycleCount(user?.user_id)
               const motorhomeCount = await model.userMotorhomeCount(user?.user_id)
               const truckCount = await model.userTruckCount(user?.user_id)
               const trailerCount = await model.userTrailerCount(user?.user_id)
               const vanCount = await model.userVanCount(user?.user_id)
               const semiTruckCount = await model.userSemiTruckCount(user?.user_id)
               const semiTrailerCount = await model.userSemiTrailerCount(user?.user_id)
               const coacheCount = await model.userCoacheCount(user?.user_id)
               const agriculturalVehiclesCount = await model.userAgriculturalCount(user?.user_id)
               const constructionMachineCount = await model.userConstructionCount(user?.user_id)
               const forkliftTrucksCount = await model.userForkliftTrucksCount(user?.user_id)

               return res.json({
                  status: 200,
                  message: "Success",
                  data: user,
                  count: {
                     cars_count: carCount?.count,
                     motorcycle_count: motorcycleCount?.count,
                     motorhome_count: motorhomeCount?.count,
                     truck_count: truckCount?.count,
                     trailer_count: trailerCount?.count,
                     van_count: vanCount?.count,
                     semi_trailer_truck_count: semiTruckCount?.count,
                     semi_trailer_count: semiTrailerCount?.count,
                     coache_count: coacheCount?.count,
                     agricultural_vehicle_count: agriculturalVehiclesCount?.count,
                     construction_machine_count: constructionMachineCount?.count,
                     forklift_truck_count: forkliftTrucksCount?.count,
                  }
               })

            }

            return res.json({
               status: 404,
               message: "Not found"
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

   REGISTER_USER: async (req, res) => {
      try {
         const { user_email, user_password, user_company } = req.body
         const checkUser = await model.checkUser(user_email)

         if (!checkUser) {
            const pass_hash = await bcryptjs.hash(user_password, 10)
            const registerUser = await model.registerUser(user_email, pass_hash, user_company)

            if (registerUser) {
               const token = await new JWT({ id: registerUser.user_id }).sign()

               return res.json({
                  status: 200,
                  message: "Success",
                  data: registerUser,
                  token: token
               })
            }

         } else {
            return res.json({
               status: 302,
               message: "Found"
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

   LOGIN: async (req, res) => {
      try {
         const { user_email, user_password } = req.body
         const foundUser = await model.foundUser(user_email)

         if (foundUser) {
            const validPass = await bcryptjs.compare(user_password, foundUser.user_password)

            if (validPass) {
               const token = await new JWT({ id: foundUser.user_id }).sign()
               const carCount = await model.userCarCount(foundUser.user_id)
               const motorcycleCount = await model.userMotorcycleCount(foundUser.user_id)
               const motorhomeCount = await model.userMotorhomeCount(foundUser.user_id)
               const truckCount = await model.userTruckCount(foundUser.user_id)
               const trailerCount = await model.userTrailerCount(foundUser.user_id)
               const vanCount = await model.userVanCount(foundUser.user_id)
               const semiTruckCount = await model.userSemiTruckCount(foundUser.user_id)
               const semiTrailerCount = await model.userSemiTrailerCount(foundUser.user_id)
               const coacheCount = await model.userCoacheCount(foundUser.user_id)
               const agriculturalVehiclesCount = await model.userAgriculturalCount(foundUser.user_id)
               const constructionMachineCount = await model.userConstructionCount(foundUser.user_id)
               const forkliftTrucksCount = await model.userForkliftTrucksCount(foundUser.user_id)

               return res.json({
                  status: 200,
                  message: "Success",
                  data: foundUser,
                  token: token,
                  count: {
                     cars_count: carCount?.count,
                     motorcycle_count: motorcycleCount?.count,
                     motorhome_count: motorhomeCount?.count,
                     truck_count: truckCount?.count,
                     trailer_count: trailerCount?.count,
                     van_count: vanCount?.count,
                     semi_trailer_truck_count: semiTruckCount?.count,
                     semi_trailer_count: semiTrailerCount?.count,
                     coache_count: coacheCount?.count,
                     agricultural_vehicle_count: agriculturalVehiclesCount?.count,
                     construction_machine_count: constructionMachineCount?.count,
                     forklift_truck_count: forkliftTrucksCount?.count,
                  }
               })
            } else {
               return res.json({
                  status: 401,
                  message: "Unauthorized"
               })
            }
         } else {
            return res.json({
               status: 404,
               message: "Not Found"
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

   EDIT_USER_EMAIL: async (req, res) => {
      try {
         const { user_id, user_email, user_new_password } = req.body
         const foundUser = await model.foundUserById(user_id)

         if (foundUser) {
            const pass_hash = await bcryptjs.hash(user_new_password, 10)
            const updateUser = await model.updateUserEmail(user_id, user_email, pass_hash)

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
   },

   EDIT_USER_NAME: async (req, res) => {
      try {
         const { user_id, gender, first_name, last_name } = req.body
         const foundUser = await model.foundUserById(user_id)

         if (foundUser) {
            const editUserName = await model.editUserName(user_id, gender, first_name, last_name)

            if (editUserName) {
               return res.json({
                  status: 200,
                  message: 'Success',
                  data: editUserName
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

   EDIT_USER_ADDRESS: async (req, res) => {
      try {
         const { user_id, street, near, zip, country, city } = req.body
         const foundUser = await model.foundUserById(user_id)

         if (foundUser) {
            const editUserAddress = await model.editUserAddress(user_id, street, near, zip, country, city)

            if (editUserAddress) {
               return res.json({
                  status: 200,
                  message: 'Success',
                  data: editUserAddress
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

   EDIT_USER_PHONE_NUMBER: async (req, res) => {
      try {
         const { user_id, country_code, prefix, phone_number } = req.body
         const foundUser = await model.foundUserById(user_id)

         if (foundUser) {
            const editUserPhone = await model.editUserPhone(user_id, country_code, prefix, phone_number)

            if (editUserPhone) {
               return res.json({
                  status: 200,
                  message: 'Success',
                  data: editUserPhone
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

   EDIT_USER_BALANCE: async (req, res) => {
      try {
         const { id, balance } = req.body
         const foundUserById = await model.foundUserById(id)

         if (foundUserById) {
            const editBalance = await model.editBalance(id, balance)

            if (editBalance) {
               return res.json({
                  status: 200,
                  message: "Success",
                  data: editBalance
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
               message: "User not found"
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

   EDIT_PROFILE_IMAGE: async (req, res) => {
      try {
         const uploadPhoto = req.file;
         const { id } = req.body

         const foundUserById = await model.foundUserById(id)
         let user_img_name = ''
         let user_img_url = ''

         if (foundUserById?.user_image_url && foundUserById?.user_image_name) {
            const deleteOldImg = new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images', `${foundUserById?.user_image_name}`))
            deleteOldImg.delete()
            user_img_name = uploadPhoto.filename
            user_img_url = `${process.env.BACKEND_URL}/${uploadPhoto.filename}`
         } else {
            user_img_name = uploadPhoto.filename
            user_img_url = `${process.env.BACKEND_URL}/${uploadPhoto.filename}`
         }

         const editPhoto = await model.editPhoto(id, user_img_url, user_img_name)

         if (editPhoto) {
            return res.json({
               status: 200,
               message: "Success",
               data: editPhoto
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

   DELETE_USER: async (req, res) => {
      try {
         const { id } = req.params
         const foundUserById = await model.foundUserById(id)

         if (foundUserById) {
            if (foundUserById?.user_image_name) {
               const deleteOldImg = new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images', `${foundUserById?.user_image_name}`))
               deleteOldImg.delete()
            }

            const deleteUser = await model.deleteUser(id)

            if (deleteUser) {
               return res.json({
                  status: 200,
                  message: "Success"
               })
            } else {
               return res.json({
                  status: 400,
                  message: 'Bad request'
               })
            }
         } else {
            return res.json({
               status: 404,
               message: 'Not found'
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