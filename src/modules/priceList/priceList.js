require('dotenv').config();
const model = require('./model')
const paypal = require('paypal-rest-sdk');

paypal.configure({
   mode: 'sandbox', // 'sandbox' or 'live'
   client_id: process.env.CLIENT_ID,
   client_secret: process.env.CLIENT_SECRET,
});

module.exports = {
   GET_ADMIN: async (req, res) => {
      try {
         const { limit, offset } = req.query

         if (limit && offset) {
            const priceListAdmin = await model.priceListAdmin(limit, offset)

            if (priceListAdmin) {
               return res.json({
                  status: 200,
                  message: "Success",
                  data: priceListAdmin
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

         if (limit && offset && lang) {
            const priceList = await model.priceList(limit, offset, lang)

            if (priceList) {
               return res.json({
                  status: 200,
                  message: "Success",
                  data: priceList
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

   PAYMENT: async (req, res) => {
      try {
         const { item } = req.body

         const createPaymentJson = {
            intent: 'sale',
            payer: {
               payment_method: 'paypal',
            },
            transactions: [
               {
                  amount: {
                     total: item.price_item_price,
                     currency: 'USD',
                  },
               },
            ],
            redirect_urls: {
               return_url: 'https://sell-center-slash.netlify.app/success-pay',
               cancel_url: 'https://sell-center-slash.netlify.app/failed-pay',
            },
         };

         paypal.payment.create(createPaymentJson, function (error, payment) {
            if (error) {
               throw error;
            } else {
               for (let i = 0; i < payment.links.length; i++) {
                  if (payment.links[i].rel === 'approval_url') {
                     res.json({ url: payment.links[i].href });
                  }
               }
            }
         });

      } catch (error) {
         console.log(error)
         res.json({
            status: 500,
            message: "Internal Server Error",
         })
      }
   },

   ADD_PRICE: async (req, res) => {
      try {
         const { title, desc, price, lang, image_count } = req.body

         const addPriceItem = await model.addPriceItem(title, desc, price, lang, image_count)

         if (addPriceItem) {
            return res.json({
               status: 200,
               message: "Success",
               data: addPriceItem
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

   UPDATE_PRICE: async (req, res) => {
      try {
         const { id, title, desc, price, lang, image_count } = req.body

         const updatePriceItem = await model.updatePriceItem(id, title, desc, price, lang, image_count)

         if (updatePriceItem) {
            return res.json({
               status: 200,
               message: "Success",
               data: updatePriceItem
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

   UPDATE_PRICE_STATUS: async (req, res) => {
      try {
         const { id, status } = req.body

         if (id) {
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

   DELETE_PRICE: async (req, res) => {
      try {
         const { id } = req.body

         if (id) {
            const deletePrice = await model.deletePrice(id)

            if (deletePrice) {
               return res.json({
                  status: 200,
                  message: "Success",
                  data: deletePrice
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