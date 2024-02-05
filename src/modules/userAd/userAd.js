const model = require('./model')

module.exports = {
   GET_CARS: async (req, res) => {
      try {
         const { limit, offset } = req.query
         const { id } = req.params

         if (id && limit && offset) {
            const foundUser = await model.foundUser(id)

            if (foundUser) {
               const carsList = await model.userAdsList(id, limit, offset, 'cars')

               return res.json({
                  status: 200,
                  message: "Success",
                  data: carsList
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

   GET_MOTORCYCLES: async (req, res) => {
      try {
         const { limit, offset } = req.query
         const { id } = req.params

         if (id && limit && offset) {
            const foundUser = await model.foundUser(id)

            if (foundUser) {
               const motorcycleList = await model.userAdsList(id, limit, offset, 'motorcycles')

               return res.json({
                  status: 200,
                  message: "Success",
                  data: motorcycleList
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

   GET_MOTOR_HOMES: async (req, res) => {
      try {
         const { limit, offset } = req.query
         const { id } = req.params

         if (id && limit && offset) {
            const foundUser = await model.foundUser(id)

            if (foundUser) {
               const motorhomeList = await model.userAdsList(id, limit, offset, "motor_homes")

               return res.json({
                  status: 200,
                  message: "Success",
                  data: motorhomeList
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

   GET_TRUCKS: async (req, res) => {
      try {
         const { limit, offset } = req.query
         const { id } = req.params

         if (id && limit && offset) {
            const foundUser = await model.foundUser(id)

            if (foundUser) {
               const trucksList = await model.userAdsList(id, limit, offset, "trucks")

               return res.json({
                  status: 200,
                  message: "Success",
                  data: trucksList
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

   GET_TRAILERS: async (req, res) => {
      try {
         const { limit, offset } = req.query
         const { id } = req.params

         if (id && limit && offset) {
            const foundUser = await model.foundUser(id)

            if (foundUser) {
               const trailersList = await model.userAdsList(id, limit, offset, "trailers")

               return res.json({
                  status: 200,
                  message: "Success",
                  data: trailersList
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

   GET_VANS: async (req, res) => {
      try {
         const { limit, offset } = req.query
         const { id } = req.params

         if (id && limit && offset) {
            const foundUser = await model.foundUser(id)

            if (foundUser) {
               const vansList = await model.userAdsList(id, limit, offset, "vans")

               return res.json({
                  status: 200,
                  message: "Success",
                  data: vansList
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

   GET_SEMI_TRUCKS: async (req, res) => {
      try {
         const { limit, offset } = req.query
         const { id } = req.params

         if (id && limit && offset) {
            const foundUser = await model.foundUser(id)

            if (foundUser) {
               const semitrucksList = await model.userAdsList(id, limit, offset, "semi_trailer_trucks")

               return res.json({
                  status: 200,
                  message: "Success",
                  data: semitrucksList
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

   GET_SEMI_TRAILERS: async (req, res) => {
      try {
         const { limit, offset } = req.query
         const { id } = req.params

         if (id && limit && offset) {
            const foundUser = await model.foundUser(id)

            if (foundUser) {
               const semitrailersList = await model.userAdsList(id, limit, offset, "semi_trailers")

               return res.json({
                  status: 200,
                  message: "Success",
                  data: semitrailersList
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

   GET_COACHES: async (req, res) => {
      try {
         const { limit, offset } = req.query
         const { id } = req.params

         if (id && limit && offset) {
            const foundUser = await model.foundUser(id)

            if (foundUser) {
               const coachesList = await model.userAdsList(id, limit, offset, "coaches")

               return res.json({
                  status: 200,
                  message: "Success",
                  data: coachesList
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

   GET_VEHICLES: async (req, res) => {
      try {
         const { limit, offset } = req.query
         const { id } = req.params

         if (id && limit && offset) {
            const foundUser = await model.foundUser(id)

            if (foundUser) {
               const vehiclesList = await model.userAdsList(id, limit, offset, "agricultural_vehicles")

               return res.json({
                  status: 200,
                  message: "Success",
                  data: vehiclesList
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

   GET_CONSTRUCTIONS: async (req, res) => {
      try {
         const { limit, offset } = req.query
         const { id } = req.params

         if (id && limit && offset) {
            const foundUser = await model.foundUser(id)

            if (foundUser) {
               const constructionsList = await model.userAdsList(id, limit, offset, "construction_machines")

               return res.json({
                  status: 200,
                  message: "Success",
                  data: constructionsList
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

   GET_FORKLIFTS: async (req, res) => {
      try {
         const { limit, offset } = req.query
         const { id } = req.params

         if (id && limit && offset) {
            const foundUser = await model.foundUser(id)

            if (foundUser) {
               const forkliftsList = await model.userAdsList(id, limit, offset, "forklift_trucks")

               return res.json({
                  status: 200,
                  message: "Success",
                  data: forkliftsList
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
}