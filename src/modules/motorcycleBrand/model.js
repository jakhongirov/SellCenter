const { fetch, fetchALL } = require("../../lib/postgres");

const MARK_LIST = `
   SELECT
      *
   FROM
      motorcycle_makes
   ORDER BY
      motorcycle_make_name;
`;

const MODEL_LIST = `
   SELECT
      motorcycle_model_id,
      motorcycle_model_name
   FROM
      motorcycle_models a
   INNER JOIN
      motorcycle_makes b
   ON
      a.motorcycle_make_id = b.motorcycle_make_id
   WHERE
      motorcycle_make_name = $1
   ORDER BY
      motorcycle_model_name;
`;

const ADD_MARK = `
   INSERT INTO
      motorcycle_makes (
         motorcycle_make_name
      ) VALUES (
         $1
      )
   RETURNING *;
`;

const ADD_MODEL = `
   INSERT INTO
      motorcycle_models (
         motorcycle_make_id,
         motorcycle_model_name
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
      motorcycle_makes
   WHERE
      motorcycle_make_id = $1;
`;

const UPDATE_MARK = `
   UPDATE
      motorcycle_makes
   SET
      motorcycle_make_name = $2
   WHERE
      motorcycle_make_id = $1
   RETURNING *;
`;

const FOUND_MODEL = `
   SELECT
      *
   FROM
      motorcycle_models
   WHERE
      motorcycle_model_id = $1;
`;

const UPDATE_MODEL = `
   UPDATE
      motorcycle_models
   SET
      motorcycle_make_id = $2,
      motorcycle_model_name = $3
   WHERE
      motorcycle_model_id = $1
   RETURNING *;
`;

const DELETE_MARK = `
   DELETE FROM
      motorcycle_makes
   WHERE
      motorcycle_make_id = $1
   RETURNING *;
`;

const DELETE_MODEL = `
   DELETE FROM
      motorcycle_models
   WHERE
      motorcycle_model_id = $1
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