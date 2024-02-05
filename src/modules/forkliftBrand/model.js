const { fetch, fetchALL } = require("../../lib/postgres");

const MARK_LIST = `
   SELECT
      *
   FROM
      forklift_makes
   ORDER BY
      forklift_make_name;
`;

const MODEL_LIST = `
   SELECT
      forklift_model_id,
      forklift_model_name
   FROM
      forklift_models a
   INNER JOIN
      forklift_makes b
   ON
      a.forklift_make_id = b.forklift_make_id
   WHERE
      forklift_make_name = $1
   ORDER BY
      forklift_model_name;
`;

const ADD_MARK = `
   INSERT INTO
      forklift_makes (
         forklift_make_name
      ) VALUES (
         $1
      )
   RETURNING *;
`;

const ADD_MODEL = `
   INSERT INTO
      forklift_models (
         forklift_make_id,
         forklift_model_name
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
      forklift_makes
   WHERE
      forklift_make_id = $1;
`;

const UPDATE_MARK = `
   UPDATE
      forklift_makes
   SET
      forklift_make_name = $2
   WHERE
      forklift_make_id = $1
   RETURNING *;
`;

const FOUND_MODEL = `
   SELECT
      *
   FROM
      forklift_models
   WHERE
      forklift_model_id = $1;
`;

const UPDATE_MODEL = `
   UPDATE
      forklift_models
   SET
      forklift_make_id = $2,
      forklift_model_name = $3
   WHERE
      forklift_model_id = $1
   RETURNING *;
`;

const DELETE_MARK = `
   DELETE FROM
      forklift_makes
   WHERE
      forklift_make_id = $1
   RETURNING *;
`;

const DELETE_MODEL = `
   DELETE FROM
      forklift_models
   WHERE
      forklift_model_id = $1
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