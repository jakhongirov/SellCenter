const { fetch, fetchALL } = require("../../lib/postgres");

const MARK_LIST = `
   SELECT
      *
   FROM
      agricultural_vehicle_makes
   ORDER BY
      agricultural_vehicle_make_name;
`;

const MODEL_LIST = `
   SELECT
      agricultural_vehicle_model_id,
      agricultural_vehicle_model_name
   FROM
      agricultural_vehicle_models a
   INNER JOIN
      agricultural_vehicle_makes b
   ON
      a.agricultural_vehicle_make_id = b.agricultural_vehicle_make_id
   WHERE
      agricultural_vehicle_make_name = $1
   ORDER BY
      agricultural_vehicle_model_name;
`;

const ADD_MARK = `
   INSERT INTO
      agricultural_vehicle_makes (
         agricultural_vehicle_make_name
      ) VALUES (
         $1
      )
   RETURNING *;
`;

const ADD_MODEL = `
   INSERT INTO
      agricultural_vehicle_models (
         agricultural_vehicle_make_id,
         agricultural_vehicle_model_name
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
      agricultural_vehicle_makes
   WHERE
      agricultural_vehicle_make_id = $1;
`;

const UPDATE_MARK = `
   UPDATE
      agricultural_vehicle_makes
   SET
      agricultural_vehicle_make_name = $2
   WHERE
      agricultural_vehicle_make_id = $1
   RETURNING *;
`;

const FOUND_MODEL = `
   SELECT
      *
   FROM
      agricultural_vehicle_models
   WHERE
      agricultural_vehicle_model_id = $1;
`;

const UPDATE_MODEL = `
   UPDATE
      agricultural_vehicle_models
   SET
      agricultural_vehicle_make_id = $2,
      agricultural_vehicle_model_name = $3
   WHERE
      agricultural_vehicle_model_id = $1
   RETURNING *;
`;

const DELETE_MARK = `
   DELETE FROM
      agricultural_vehicle_makes
   WHERE
      agricultural_vehicle_make_id = $1
   RETURNING *;
`;

const DELETE_MODEL = `
   DELETE FROM
      agricultural_vehicle_models
   WHERE
      agricultural_vehicle_model_id = $1
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