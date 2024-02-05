const { fetch, fetchALL } = require("../../lib/postgres");

const MARK_LIST = `
   SELECT
      *
   FROM
      car_makes
   ORDER BY
      car_make_name;
`;

const MODEL_LIST = `
   SELECT
     *
   FROM
      car_models a
   INNER JOIN
      car_makes b
   ON
      a.car_make_id = b.car_make_id
   WHERE
      car_make_name = $1
   ORDER BY
      car_model_name;
`;

const ADD_MARK = `
   INSERT INTO
      car_makes (
         car_make_name
      ) VALUES (
         $1
      )
   RETURNING *;
`;

const ADD_MODEL = `
   INSERT INTO
      car_models (
         car_make_id,
         car_model_name
      ) VALUES (
         $1,
         $2
      )
   RETURNING *;
`;

const FOUND_MARK = `
   SELECT
      *
   FROM
      car_makes
   WHERE
      car_make_id = $1;
`;

const UPDATE_MARK = `
   UPDATE
      car_makes
   SET
      car_make_name = $2
   WHERE
      car_make_id = $1
   RETURNING *;
`;

const FOUND_MODEL = `
   SELECT
      *
   FROM
      car_models
   WHERE
      car_model_id = $1;
`;

const UPDATE_MODEL = `
   UPDATE
      car_models
   SET
      car_make_id = $2,
      car_model_name = $3
   WHERE
      car_model_id = $1
   RETURNING *;
`;

const DELETE_MARK = `
   DELETE FROM
      car_makes
   WHERE
      car_make_id = $1
   RETURNING *;
`;

const DELETE_MODEL = `
   DELETE FROM
      car_models
   WHERE
      car_model_id = $1
   RETURNING *;
`;

const marksList = () => fetchALL(MARK_LIST)
const modelList = (mark_id) => fetchALL(MODEL_LIST, mark_id)
const addMark = (mark_name) => fetch(ADD_MARK, mark_name)
const foundMark = (mark_id) => fetch(FOUND_MARK, mark_id)
const addModel = (mark_id, model_name) => fetch(ADD_MODEL, mark_id, model_name)
const updateMark = (mark_id, mark_name) => fetch(UPDATE_MARK, mark_id, mark_name)
const foundModel = (model_id) => fetch(FOUND_MODEL, model_id)
const updateModel = (model_id, mark_id, model_name) => fetch(UPDATE_MODEL, model_id, mark_id, model_name)
const deleteMark = (mark_id) => fetch(DELETE_MARK, mark_id)
const deleteModel = (model_id) => fetch(DELETE_MODEL, model_id)

module.exports = {
   marksList,
   modelList,
   addMark,
   addModel,
   foundMark,
   updateMark,
   foundModel,
   updateModel,
   deleteMark,
   deleteModel
}