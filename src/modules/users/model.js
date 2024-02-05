const { fetch, fetchALL } = require("../../lib/postgres");

const CHECK_USER = `
   SELECT
      *
   FROM
      users
   WHERE
      user_email = $1;
`;

const USER_CAR_COUNT = `   
   SELECT
      count(car_id)
   FROM
      cars
   WHERE
      user_id = $1;
`;

const USER_MOTORCYCLE_COUNT = `   
   SELECT
      count(motorcycle_id)
   FROM
      motorcycles
   WHERE
      user_id = $1;
`;

const USER_MOTORHOME_COUNT = `   
   SELECT
      count(motor_home_id)
   FROM
      motor_homes
   WHERE
      user_id = $1;
`;

const USER_TRUCK_COUNT = `   
   SELECT
      count(truck_id)
   FROM
      trucks
   WHERE
      user_id = $1;
`;

const USER_TRAILER_COUNT = `   
   SELECT
      count(trailer_id)
   FROM
      trailers
   WHERE
      user_id = $1;
`;

const USER_VAN_COUNT = `   
   SELECT
      count(van_id)
   FROM
      vans
   WHERE
      user_id = $1;
`;

const USER_SEMI_TRUCK_COUNT = `   
   SELECT
      count(truck_id)
   FROM
      semi_trailer_trucks
   WHERE
      user_id = $1;
`;

const USER_SEMI_TRAILER_COUNT = `   
   SELECT
      count(trailer_id)
   FROM
      semi_trailers
   WHERE
      user_id = $1;
`;

const USER_COACHE_COUNT = `   
   SELECT
      count(coache_id)
   FROM
      coaches
   WHERE
      user_id = $1;
`;

const USER_AGRICULTURAL_COUNT = `   
   SELECT
      count(vehicle_id)
   FROM
      agricultural_vehicles
   WHERE
      user_id = $1;
`;

const USER_CONSTRUCTION_COUNT = `   
   SELECT
      count(machine_id)
   FROM
      construction_machines
   WHERE
      user_id = $1;
`;

const USER_FORKLIFT_COUNT = `   
   SELECT
      count(forklift_id)
   FROM
      forklift_trucks
   WHERE
      user_id = $1;
`;

const USER_REGISTER = `
   INSERT INTO
      users(
         user_email,
         user_password,
         user_company
      )
      VALUES (
         $1,
         $2,
         $3
      ) RETURNING *;
`;

const FOUND_USER = `
   SELECT
      *
   FROM
      users
   WHERE
      user_email = $1;
`;

const FOUND_USER_BY_ID = `
   SELECT
      *
   FROM
      users
   WHERE
      user_id = $1;
`;

const DELETE_USER = `
   DELETE FROM
      users
   WHERE
      user_id = $1
   RETURNING *;
`;

const EDIT_USER_EMAIL = `
   UPDATE
      users
   SET
      user_email = $2,
      user_password = $3
   WHERE
      user_id = $1
   RETURNING *;
`;

const EDIT_USER_NAME = `
   UPDATE
      users
   SET
      user_gender = $2,
      user_first_name = $3,
      user_last_name = $4
   WHERE
      user_id = $1
   RETURNING *;
`;

const EDIT_USER_ADDRESS = `
   UPDATE
      users
   SET
      user_address_street = $2,
      user_address_nr = $3,
      user_address_zip = $4,
      user_address_country = $5,
      user_address_city = $6
   WHERE
      user_id = $1
   RETURNING *;
`;

const EDIT_USER_PHONE = `
   UPDATE
      users
   SET
      user_country_code = $2,
      user_number_prefix = $3,
      user_phone_number = $4
   WHERE
      user_id = $1
   RETURNING *;
`;
const EDIT_PHOTO = `
   UPDATE
      users
   SET
      user_image_url = $2,
      user_image_name = $3
   WHERE
      user_id = $1
   RETURNING *;
`;

const EDIT_BALANCE = `
   UPDATE
      users
   SET
      user_balance = user_balance + $2
   WHERE
      user_id = $1
   RETURNING *;
`;

const checkUser = (user_email) => fetch(CHECK_USER, user_email)
const registerUser = (user_email, pass_hash, user_company) => fetch(USER_REGISTER, user_email, pass_hash, user_company)
const foundUser = (user_email) => fetch(FOUND_USER, user_email)
const foundUserById = (user_id) => fetch(FOUND_USER_BY_ID, user_id)
const deleteUser = (user_id) => fetch(DELETE_USER, user_id)
const updateUserEmail = (user_id, user_email, pass_hash) => fetch(EDIT_USER_EMAIL, user_id, user_email, pass_hash)
const editUserName = (user_id, gender, first_name, last_name) => fetch(EDIT_USER_NAME, user_id, gender, first_name, last_name)
const editUserAddress = (user_id, street, near, zip, country, city) => fetch(EDIT_USER_ADDRESS, user_id, street, near, zip, country, city)
const editUserPhone = (user_id, country_code, prefix, phone_number) => fetch(EDIT_USER_PHONE, user_id, country_code, prefix, phone_number)
const editBalance = (id, balance) => fetch(EDIT_BALANCE, id, balance)
const usersList = (limit, offset) => {
   const USER_LIST = `
      SELECT
         *
      FROM
         users
      ORDER BY
         user_id
      LIMIT ${limit}
      OFFSET ${offset};
   `;

   return fetchALL(USER_LIST)
}
const editPhoto = (id, user_img_url, user_img_name) => fetch(EDIT_PHOTO, id, user_img_url, user_img_name)
const userCarCount = (user_id) => fetch(USER_CAR_COUNT, user_id)
const userMotorcycleCount = (user_id) => fetch(USER_MOTORCYCLE_COUNT, user_id)
const userMotorhomeCount = (user_id) => fetch(USER_MOTORHOME_COUNT, user_id)
const userTruckCount = (user_id) => fetch(USER_TRUCK_COUNT, user_id)
const userTrailerCount = (user_id) => fetch(USER_TRAILER_COUNT, user_id)
const userVanCount = (user_id) => fetch(USER_VAN_COUNT, user_id)
const userSemiTruckCount = (user_id) => fetch(USER_SEMI_TRUCK_COUNT, user_id)
const userSemiTrailerCount = (user_id) => fetch(USER_SEMI_TRAILER_COUNT, user_id)
const userCoacheCount = (user_id) => fetch(USER_COACHE_COUNT, user_id)
const userAgriculturalCount = (user_id) => fetch(USER_AGRICULTURAL_COUNT, user_id)
const userConstructionCount = (user_id) => fetch(USER_CONSTRUCTION_COUNT, user_id)
const userForkliftTrucksCount = (user_id) => fetch(USER_FORKLIFT_COUNT, user_id)

module.exports = {
   checkUser,
   registerUser,
   foundUser,
   foundUserById,
   deleteUser,
   updateUserEmail,
   editUserName,
   editUserAddress,
   editUserPhone,
   editBalance,
   usersList,
   editPhoto,
   userCarCount,
   userMotorcycleCount,
   userMotorhomeCount,
   userTruckCount,
   userTrailerCount,
   userVanCount,
   userSemiTruckCount,
   userSemiTrailerCount,
   userCoacheCount,
   userAgriculturalCount,
   userConstructionCount,
   userForkliftTrucksCount
}