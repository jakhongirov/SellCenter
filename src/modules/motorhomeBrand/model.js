const { fetch, fetchALL } = require("../../lib/postgres");

const MARK_LIST = `
   SELECT
      *
   FROM
      motor_home_makes
   ORDER BY
      motor_home_make_name;
`;

const MODEL_LIST = `
   SELECT
      motor_home_model_id,
      motor_home_model_name
   FROM
      motor_home_models a
   INNER JOIN
      motor_home_makes b
   ON
      a.motor_home_make_id = b.motor_home_make_id
   WHERE
      motor_home_make_name = $1
   ORDER BY
      motor_home_model_name;
`;

const ADD_MARK = `
   INSERT INTO
      motor_home_makes (
         motor_home_make_name
      ) VALUES (
         $1
      )
   RETURNING *;
`;

const ADD_MODEL = `
   INSERT INTO
      motor_home_models (
         motor_home_make_id,
         motor_home_model_name
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
      motor_home_makes
   WHERE
      motor_home_make_id = $1;
`;

const UPDATE_MARK = `
   UPDATE
      motor_home_makes
   SET
      motor_home_make_name = $2
   WHERE
      motor_home_make_id = $1
   RETURNING *;
`;

const FOUND_MODEL = `
   SELECT
      *
   FROM
      motor_home_models
   WHERE
      motor_home_model_id = $1;
`;

const UPDATE_MODEL = `
   UPDATE
      motor_home_models
   SET
      motor_home_make_id = $2,
      motor_home_model_name = $3
   WHERE
      motor_home_model_id = $1
   RETURNING *;
`;

const DELETE_MARK = `
   DELETE FROM
      motor_home_makes
   WHERE
      motor_home_make_id = $1
   RETURNING *;
`;

const DELETE_MODEL = `
   DELETE FROM
      motor_home_models
   WHERE
      motor_home_model_id = $1
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