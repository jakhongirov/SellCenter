const { fetch, fetchALL } = require("../../lib/postgres");

const MARK_LIST = `
   SELECT
      *
   FROM
      truck_makes
   ORDER BY
      truck_make_name;
`;

const MODEL_LIST = `
   SELECT
      truck_model_id,
      truck_model_name
   FROM
      truck_models a
   INNER JOIN
      truck_makes b
   ON
      a.truck_make_id = b.truck_make_id
   WHERE   
      truck_make_name = $1
   ORDER BY
      truck_model_name;
`;

const ADD_MARK = `
   INSERT INTO
      truck_makes (
         truck_make_name
      ) VALUES (
         $1
      )
   RETURNING *;
`;

const ADD_MODEL = `
   INSERT INTO
      truck_models (
         truck_make_id,
         truck_model_name
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
      truck_makes
   WHERE
      truck_make_id = $1;
`;

const UPDATE_MARK = `
   UPDATE
      truck_makes
   SET
      truck_make_name = $2
   WHERE
      truck_make_id = $1
   RETURNING *;
`;

const FOUND_MODEL = `
   SELECT
      *
   FROM
      truck_models
   WHERE
      truck_model_id = $1;
`;

const UPDATE_MODEL = `
   UPDATE
      truck_models
   SET
      truck_make_id = $2,
      truck_model_name = $3
   WHERE
      truck_model_id = $1
   RETURNING *;
`;

const DELETE_MARK = `
   DELETE FROM
      truck_makes
   WHERE
      truck_make_id = $1
   RETURNING *;
`;

const DELETE_MODEL = `
   DELETE FROM
      truck_models
   WHERE
      truck_model_id = $1
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