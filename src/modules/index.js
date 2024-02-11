const express = require("express")
const router = express.Router()

//Middlawares
const { AUTH } = require('../middleware/auth')
const FileUpload = require('../middleware/multer')

// Admin file
const admin = require('./admin/admin')

// Users files
const users = require('./users/users')
const userAds = require('./userAd/userAd')
const forget = require('./forget/forget')

// Companies file
const companies = require('./companies/companies')

// ADS files
const adsCard = require('./adsCard/adsCard')

// Sliders file
const sliders = require('./slider/slider')

// News file
const news = require('./news/news')

// PRICE LIST file
const priceList = require('./priceList/priceList')

//Cars files
const carBrand = require('./carBrand/carBrand')
const cars = require('./cars/cars')

// Motorcycles files
const motorcycleBrand = require('./motorcycleBrand/motorcycleBrand')
const motorcycle = require('./motorcycle/motorcycle')

// Motor home files
const motorhomeBrand = require('./motorhomeBrand/motorhomeBrand')
const motorhomes = require('./motorhome/motorhome')

// Truck files
const truckBrand = require('./truckBrand/truckBrand')
const trucks = require('./truck/truck')

// Trailer files
const trailerBrand = require('./trailerBrand/trailerBrand')
const trailers = require('./trailers/trailers')

// Van files
const vanBrand = require('./vanBrand/vanBrand')
const vans = require('./vans/vans')

// Semi trailer truck files
const semitruckBrand = require('./semitruckBrand/semitruckBrand')
const semitruck = require('./semitruck/semitruck')

// Semi trailer files
const semitrailerBrand = require('./semitrailerBrand/semitrailerBrand')
const semitrailers = require('./semitrailers/semitrailers')

// Coache files
const coacheBrand = require('./coacheBrand/coacheBrand')
const coaches = require('./coaches/coaches')

// Agricultural vehicle files
const agriculturalBrand = require('./agriculturalBrand/agriculturalBrand')
const agriculturals = require('./agricultural/agricultural')

// Construction machine files
const constructionBrand = require('./constructionBrand/constructionBrand')
const constructions = require('./constructions/constructions')

// Forklift trucks files
const forkliftBrand = require('./forkliftBrand/forkliftBrand')
const forklifts = require('./forklifts/forklifts')

router
   // Amin
   .get('/admin/list', admin.GET_ADMIN)
   .post('/admin/register', admin.REGISTER_ADMIN)
   .post('/admin/login', admin.LOGIN_ADMIN)
   .put('/admin/edit', admin.EDIT_ADMIN)
   .delete('/admin/delete', admin.DELETE_ADMIN)

   // Users
   .get('/users/list', users.GET_USERS_LIST)
   .get('/users', users.GET)
   .post('/user/register', users.REGISTER_USER)
   .post('/user/login', users.LOGIN)
   .put('/user/edit/mail', users.EDIT_USER_EMAIL)
   .put('/user/edit/name', users.EDIT_USER_NAME)
   .put('/user/edit/address', users.EDIT_USER_ADDRESS)
   .put('/user/edit/phone', users.EDIT_USER_PHONE_NUMBER)
   .put('/user/edit/balance', users.EDIT_USER_BALANCE)
   .put('/user/edit/photo', FileUpload.single("photo"), users.EDIT_PROFILE_IMAGE)
   .delete('/user/delete/:id', users.DELETE_USER)

   // User ads
   .get('/user/cars/:id', userAds.GET_CARS)
   .get('/user/motorcycles/:id', userAds.GET_MOTORCYCLES)
   .get('/user/motorhomes/:id', userAds.GET_MOTOR_HOMES)
   .get('/user/trucks/:id', userAds.GET_TRUCKS)
   .get('/user/trailers/:id', userAds.GET_TRAILERS)
   .get('/user/vans/:id', userAds.GET_VANS)
   .get('/user/semitrucks/:id', userAds.GET_SEMI_TRUCKS)
   .get('/user/semitrailers/:id', userAds.GET_SEMI_TRAILERS)
   .get('/user/coaches/:id', userAds.GET_COACHES)
   .get('/user/agriculturals/:id', userAds.GET_VEHICLES)
   .get('/user/constructions/:id', userAds.GET_CONSTRUCTIONS)
   .get('/user/forklifts/:id', userAds.GET_FORKLIFTS)

   // Forget
   .post('/forget/email', forget.EMIAL)
   .post('/forget/code', forget.CHECK_CODE)
   .post('/forget/reset/password', forget.CHANGE_PASSWORD)

   // Companies
   .get('/companies/admin/list', companies.GET_ADMIN)
   .get('/company/:id', companies.GET_USER_COMPANY)
   .get('/company/user/:user_id', companies.GET_BY_USER)
   .post('/company/add', companies.POST_COMPANY)
   .put('/company/edit', companies.PUT_COMPANY)
   .put('/company/edit/photo', FileUpload.single("photo"), companies.EDIT_PROFILE_IMAGE)
   .delete('/company/delete/:id', companies.DELETE_COMPANY)

   // ADS
   .get('/ads/list', adsCard.GET_ADS_LIST)
   .get('/ads/card', adsCard.GET_ADS)
   .get('/ads/:id', adsCard.GET_ADS_ID)
   .post('/ads/add', FileUpload.single("photo"), adsCard.POST_ADS)
   .put('/ads/update', FileUpload.single("photo"), adsCard.PUT_ADS)
   .put('/ads/update/status', adsCard.PUT_STATUS)
   .delete('/ads/delete', adsCard.DELETE_ADS)

   // Sliders
   .get('/slider/admin/list', sliders.GET_ADMIN)
   .get('/slider/list', sliders.GET)
   .post('/slider/add', FileUpload.single("photo"), sliders.POST)
   .put('/slider/update', FileUpload.single("photo"), sliders.PUT)
   .put('/slider/update/status', sliders.PUT_STATUS)
   .delete('/slider/delete', sliders.DELETE)

   // NEWS
   .get('/news/admin/list', news.GET_ADMIN)
   .get('/news/list', news.GET)
   .get('/news/:id', news.GET_ID)
   .post('/news/add', FileUpload.single("photo"), news.POST)
   .put('/news/update', FileUpload.single("photo"), news.PUT)
   .put('/news/update/status', news.PUT_STATUS)
   .delete('/news/delete', news.DELETE)

   // PRICE LIST
   .get('/price/admin/list', priceList.GET_ADMIN)
   .get('/price/list', priceList.GET)
   .post('/pay', priceList.PAYMENT)
   .post('/price/list/add', priceList.ADD_PRICE)
   .put('/price/list/update', priceList.UPDATE_PRICE)
   .put('/price/list/update/status', priceList.UPDATE_PRICE_STATUS)
   .delete('/price/list/delete', priceList.DELETE_PRICE)

   // Car makrs 
   .get('/car/marks', carBrand.GET_MARKS)
   .get('/car/mark/file/add', carBrand.ADD_MAKE_FILE)
   .post('/car/add/mark', carBrand.POST_MARK)
   .put('/car/update/mark', carBrand.PUT_MARK)
   .delete('/car/delete/mark', carBrand.DELETE_MARK)

   // Car model
   .get('/car/model', carBrand.GET_MODEL)
   .get('/car/model/file/add', carBrand.ADD_MODEL_FILE)
   .post('/car/add/model', carBrand.POST_MODEL)
   .put('/car/update/model', carBrand.PUT_MODEL)
   .delete('/car/delete/model', carBrand.DELETE_MODEL)

   // Cars
   .get('/cars/admin/list', cars.GET_ADMIN)
   .post('/cars/list', cars.GET_CARS)
   .post('/cars/count', cars.GET_CARS_COUNT)
   .get('/car/:id', cars.GET_CAR_ID)
   .post('/car/add', FileUpload.array("photos"), cars.POST_BASIC_DATA)
   .put('/car/add/engine', cars.PUT_ENGINE)
   .put('/car/add/interior', cars.PUT_INTERIOR)
   .put('/car/update', FileUpload.array("photos"), cars.UPDATE_CAR)
   .put('/car/update/status', cars.UPDATE_STATUS)
   .delete('/car/delete', cars.DELETE_CAR)

   // Motorcycle marks
   .get('/motorcycle/marks', motorcycleBrand.GET_MARKS)
   .get('/motorcycle/mark/file/add', motorcycleBrand.ADD_MAKE_FILE)
   .post('/motorcycle/add/mark', motorcycleBrand.POST_MARK)
   .put('/motorcycle/update/mark', motorcycleBrand.PUT_MARK)
   .delete('/motorcycle/delete/mark', motorcycleBrand.DELETE_MARK)

   // Motorcycle model
   .get('/motorcycle/model', motorcycleBrand.GET_MODEL)
   .post('/motorcycle/add/model', motorcycleBrand.POST_MODEL)
   .put('/motorcycle/update/model', motorcycleBrand.PUT_MODEL)
   .delete('/motorcycle/delete/model', motorcycleBrand.DELETE_MODEL)

   // Motorcycle
   .get('/motorcycles/admin/list', motorcycle.GET_ADMIN)
   .post('/motorcycles/list', motorcycle.GET_MOTORCYCLE)
   .post('/motorcycles/count', motorcycle.GET_MOTORCYCLE_COUNT)
   .get('/motorcycles/:id', motorcycle.GET_MOTORCYCLE_ID)
   .post('/motorcycles/add', FileUpload.array("photos"), motorcycle.POST_MOTORCYCLE)
   .put('/motorcycles/update', FileUpload.array("photos"), motorcycle.PUT_MOTORCYCLE)
   .put('/motorcycles/update/status', motorcycle.UPDATE_STATUS)
   .delete('/motorcycles/delete', motorcycle.DELETE_MOTORCYCLE)

   // Motor home marks
   .get('/motorhome/marks', motorhomeBrand.GET_MARKS)
   .get('/motorhome/mark/file/add', motorhomeBrand.ADD_MAKE_FILE)
   .post('/motorhome/add/mark', motorhomeBrand.POST_MARK)
   .put('/motorhome/update/mark', motorhomeBrand.PUT_MARK)
   .delete('/motorhome/delete/mark', motorhomeBrand.DELETE_MARK)

   // Motor home model
   .get('/motorhome/model', motorhomeBrand.GET_MODEL)
   .post('/motorhome/add/model', motorhomeBrand.POST_MODEL)
   .put('/motorhome/update/model', motorhomeBrand.PUT_MODEL)
   .delete('/motorhome/delete/model', motorhomeBrand.DELETE_MODEL)

   // Motor homes
   .get('/motorhomes/admin/list', motorhomes.GET_MOTOR_HOME)
   .post('/motorhomes/list', motorhomes.GET_MOTOR_HOME)
   .post('/motorhomes/count', motorhomes.GET_COUNT_MOTOR_HOME)
   .get('/motorhomes/:id', motorhomes.GET_MOTORHOME_ID)
   .post('/motorhomes/add', FileUpload.array("photos"), motorhomes.POST_MOTOR_HOME)
   .put('/motorhomes/update', FileUpload.array("photos"), motorhomes.PUT_MOTOR_HOME)
   .put('/motorhomes/update/status', motorhomes.UPDATE_STATUS)
   .delete('/motorhomes/delete', motorhomes.DELETE_MOTOR_HOME)

   // Truck makrs 
   .get('/truck/marks', truckBrand.GET_MARKS)
   .get('/truck/mark/file/add', truckBrand.ADD_MAKE_FILE)
   .post('/truck/add/mark', truckBrand.POST_MARK)
   .put('/truck/update/mark', truckBrand.PUT_MARK)
   .delete('/truck/delete/mark', truckBrand.DELETE_MARK)

   // Truck model
   .get('/truck/model', truckBrand.GET_MODEL)
   .post('/truck/add/model', truckBrand.POST_MODEL)
   .put('/truck/update/model', truckBrand.PUT_MODEL)
   .delete('/truck/delete/model', truckBrand.DELETE_MODEL)

   // Trcuks
   .get('/trucks/admin/list', trucks.GET_ADMIN)
   .post('/trucks/list', trucks.GET_TRUCK_LIST)
   .post('/trucks/count', trucks.GET_TRUCK_COUNT)
   .get('/trucks/:id', trucks.GET_TRUCK_ID)
   .post('/trucks/add', FileUpload.array("photos"), trucks.POST_TRUCK)
   .put('/trucks/update', FileUpload.array("photos"), trucks.PUT_TRUCK)
   .put('/trucks/update/status', trucks.UPDATE_STATUS)
   .delete('/trucks/delete', trucks.DELETE_TRUCK)

   // Trailer makrs 
   .get('/trailer/marks', trailerBrand.GET_MARKS)
   .get('/trailer/mark/file/add', trailerBrand.ADD_MAKE_FILE)
   .post('/trailer/add/mark', trailerBrand.POST_MARK)
   .put('/trailer/update/mark', trailerBrand.PUT_MARK)
   .delete('/trailer/delete/mark', trailerBrand.DELETE_MARK)

   // Trailer model
   .get('/trailer/model', trailerBrand.GET_MODEL)
   .post('/trailer/add/model', trailerBrand.POST_MODEL)
   .put('/trailer/update/model', trailerBrand.PUT_MODEL)
   .delete('/trailer/delete/model', trailerBrand.DELETE_MODEL)

   // Trailers
   .get('/trailers/admin/list', trailers.GET_ADMIN)
   .post('/trailers/list', trailers.GET_TRAILER_LIST)
   .post('/trailers/count', trailers.GET_TRAILER_COUNT)
   .get('/trailers/:id', trailers.GET_TRAILER_BY_ID)
   .post('/trailers/add', FileUpload.array("photos"), trailers.POST_TRAILER)
   .put('/trailers/update', FileUpload.array("photos"), trailers.PUT_TRAILER)
   .put('/trailers/update/status', trailers.UPDATE_STATUS)
   .delete('/trailers/delete', trailers.DELETE_TRAILER)

   // Van makrs 
   .get('/van/marks', vanBrand.GET_MARKS)
   .get('/van/mark/file/add', vanBrand.ADD_MAKE_FILE)
   .post('/van/add/mark', vanBrand.POST_MARK)
   .put('/van/update/mark', vanBrand.PUT_MARK)
   .delete('/van/delete/mark', vanBrand.DELETE_MARK)

   // Van model
   .get('/van/model', vanBrand.GET_MODEL)
   .post('/van/add/model', vanBrand.POST_MODEL)
   .put('/van/update/model', vanBrand.PUT_MODEL)
   .delete('/van/delete/model', vanBrand.DELETE_MODEL)

   // Vans
   .get('/vans/admin/list', vans.GET_ADMIN)
   .post('/vans/list', vans.GET_VAN_LIST)
   .post('/vans/count', vans.GET_VAN_COUNT)
   .get('/vans/:id', vans.GET_VAN_ID)
   .post('/vans/add', FileUpload.array("photos"), vans.POST_VAN)
   .put('/vans/update', FileUpload.array("photos"), vans.PUT_VAN)
   .put('/vans/update/status', vans.UPDATE_STATUS)
   .delete('/vans/delete', vans.DELETE_VAN)

   // Semi truck makrs 
   .get('/semitruck/marks', semitruckBrand.GET_MARKS)
   .get('/semitruck/mark/file/add', semitruckBrand.ADD_MAKE_FILE)
   .post('/semitruck/add/mark', semitruckBrand.POST_MARK)
   .put('/semitruck/update/mark', semitruckBrand.PUT_MARK)
   .delete('/semitruck/delete/mark', semitruckBrand.DELETE_MARK)

   // Semi truck model
   .get('/semitruck/model', semitruckBrand.GET_MODEL)
   .post('/semitruck/add/model', semitruckBrand.POST_MODEL)
   .put('/semitruck/update/model', semitruckBrand.PUT_MODEL)
   .delete('/semitruck/delete/model', semitruckBrand.DELETE_MODEL)

   // Semi truck
   .get('/semitrucks/admin/list', semitruck.GET_SEMI_TRUCK_LIST)
   .post('/semitrucks/list', semitruck.GET_SEMI_TRUCK_LIST)
   .post('/semitrucks/count', semitruck.GET_SEMI_TRUCK_COUNT)
   .get('/semitruck/:id', semitruck.GET_SEMI_TRUCK_ID)
   .post('/semitruck/add', FileUpload.array("photos"), semitruck.POST_SEMI_TRUCK)
   .put('/semitruck/update', FileUpload.array("photos"), semitruck.PUT_SEMI_TRUCK)
   .put('/semitruck/update/status', semitruck.UPDATE_STATUS)
   .delete('/semitruck/delete', semitruck.DELETE_SEMI_TRUCK)

   // Semi trailer makrs 
   .get('/semitrailer/marks', semitrailerBrand.GET_MARKS)
   .get('/semitrailer/mark/file/add', semitrailerBrand.ADD_MAKE_FILE)
   .post('/semitrailer/add/mark', semitrailerBrand.POST_MARK)
   .put('/semitrailer/update/mark', semitrailerBrand.PUT_MARK)
   .delete('/semitrailer/delete/mark', semitrailerBrand.DELETE_MARK)

   // Semi trailer model
   .get('/semitrailer/model', semitrailerBrand.GET_MODEL)
   .post('/semitrailer/add/model', semitrailerBrand.POST_MODEL)
   .put('/semitrailer/update/model', semitrailerBrand.PUT_MODEL)
   .delete('/semitrailer/delete/model', semitrailerBrand.DELETE_MODEL)

   // Semi trailer
   .get('/semitrailers/admin/list', semitrailers.GET_ADMIN)
   .post('/semitrailers/list', semitrailers.GET_TRAILER_LIST)
   .post('/semitrailers/count', semitrailers.GET_TRAILER_COUNT)
   .get('/semitrailer/:id', semitrailers.GET_TRAILER_BY_ID)
   .post('/semitrailer/add', FileUpload.array("photos"), semitrailers.POST_TRAILER)
   .put('/semitrailer/update', FileUpload.array("photos"), semitrailers.PUT_TRAILER)
   .put('/semitrailer/update/status', semitrailers.UPDATE_STATUS)
   .delete('/semitrailer/delete', semitrailers.DELETE_TRAILER)

   // Coache makrs 
   .get('/coache/marks', coacheBrand.GET_MARKS)
   .get('/coache/mark/file/add', coacheBrand.ADD_MAKE_FILE)
   .post('/coache/add/mark', coacheBrand.POST_MARK)
   .put('/coache/update/mark', coacheBrand.PUT_MARK)
   .delete('/coache/delete/mark', coacheBrand.DELETE_MARK)

   // Coache model
   .get('/coache/model', coacheBrand.GET_MODEL)
   .post('/coache/add/model', coacheBrand.POST_MODEL)
   .put('/coache/update/model', coacheBrand.PUT_MODEL)
   .delete('/coache/delete/model', coacheBrand.DELETE_MODEL)

   // Coache
   .get('/coaches/admin/list', coaches.GET_ADMIN)
   .post('/coaches/list', coaches.GET_COACHES_LIST)
   .post('/coaches/count', coaches.GET_COACHES_COUNT)
   .get('/coaches/:id', coaches.GET_COACHE_ID)
   .post('/coaches/add', FileUpload.array("photos"), coaches.POST_COACHE)
   .put('/coaches/update', FileUpload.array("photos"), coaches.PUT_COACHE)
   .put('/coaches/update/status', coaches.UPDATE_STATUS)
   .delete('/coaches/delete', coaches.DELETE_COACHE)

   // Agricultural makrs 
   .get('/agricultural/marks', agriculturalBrand.GET_MARKS)
   .get('/agricultural/mark/file/add', agriculturalBrand.ADD_FILE)
   .post('/agricultural/add/mark', agriculturalBrand.POST_MARK)
   .put('/agricultural/update/mark', agriculturalBrand.PUT_MARK)
   .delete('/agricultural/delete/mark', agriculturalBrand.DELETE_MARK)

   // Agricultural model
   .get('/agricultural/model', agriculturalBrand.GET_MODEL)
   .post('/agricultural/add/model', agriculturalBrand.POST_MODEL)
   .put('/agricultural/update/model', agriculturalBrand.PUT_MODEL)
   .delete('/agricultural/delete/model', agriculturalBrand.DELETE_MODEL)

   // Agricultural
   .get('/agriculturals/admin/list', agriculturals.GET_ADMIN)
   .post('/agriculturals/list', agriculturals.GET_VEHICLE_LIST)
   .post('/agriculturals/count', agriculturals.GET_VEHICLE_COUNT)
   .get('/agriculturals/:id', agriculturals.GET_VEHICLE_ID)
   .post('/agriculturals/add', FileUpload.array("photos"), agriculturals.POST_VEHICLE)
   .put('/agriculturals/update', FileUpload.array("photos"), agriculturals.PUT_VEHICLE)
   .put('/agriculturals/update/status', agriculturals.UPDATE_STATUS)
   .delete('/agriculturals/delete', agriculturals.DELETE_VEHICLE)

   // Construction makrs 
   .get('/construction/marks', constructionBrand.GET_MARKS)
   .get('/construction/mark/file/add', constructionBrand.ADD_MAKE_FILE)
   .post('/construction/add/mark', constructionBrand.POST_MARK)
   .put('/construction/update/mark', constructionBrand.PUT_MARK)
   .delete('/construction/delete/mark', constructionBrand.DELETE_MARK)

   // Construction model
   .get('/construction/model', constructionBrand.GET_MODEL)
   .post('/construction/add/model', constructionBrand.POST_MODEL)
   .put('/construction/update/model', constructionBrand.PUT_MODEL)
   .delete('/construction/delete/model', constructionBrand.DELETE_MODEL)

   // Construction
   .get('/constructions/admin/list', constructions.GET_ADMIN)
   .post('/constructions/list', constructions.GET_CONSTRUCTION_LIST)
   .post('/constructions/count', constructions.GET_CONSTRUCTION_COUNT)
   .get('/constructions/:id', constructions.GET_CONSTRUCTION_ID)
   .post('/constructions/add', FileUpload.array("photos"), constructions.POST_CONSTRUCTION)
   .put('/constructions/update', FileUpload.array("photos"), constructions.PUT_CONSTRUCTION)
   .put('/constructions/update/status', constructions.UPDATE_STATUS)
   .delete('/constructions/delete', constructions.DELETE_CONSTRUCTION)

   // Forklift makrs 
   .get('/forklift/marks', forkliftBrand.GET_MARKS)
   .get('/forklift/mark/file/add', forkliftBrand.ADD_MAKE_FILE)
   .post('/forklift/add/mark', forkliftBrand.POST_MARK)
   .put('/forklift/update/mark', forkliftBrand.PUT_MARK)
   .delete('/forklift/delete/mark', forkliftBrand.DELETE_MARK)

   // Forklift model
   .get('/forklift/model', forkliftBrand.GET_MODEL)
   .post('/forklift/add/model', forkliftBrand.POST_MODEL)
   .put('/forklift/update/model', forkliftBrand.PUT_MODEL)
   .delete('/forklift/delete/model', forkliftBrand.DELETE_MODEL)

   // Forklift
   .get('/forklifts/admin/list', forklifts.GET_ADMIN)
   .post('/forklifts/list', forklifts.GET_FORKLIFT_LIST)
   .post('/forklifts/count', forklifts.GET_FORKLIFT_COUNT)
   .get('/forklifts/:id', forklifts.GET_FORKLIFT_ID)
   .post('/forklifts/add', FileUpload.array("photos"), forklifts.POST_FORKLIFT)
   .put('/forklifts/update', FileUpload.array("photos"), forklifts.PUT_FORKLIFT)
   .put('/forklifts/update/status', forklifts.UPDATE_STATUS)
   .delete('/forklifts/delete', forklifts.DELETE_FORKLIFT)

module.exports = router   