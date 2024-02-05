const { fetch, fetchALL } = require("../../lib/postgres");

const MARK_LIST = `
   SELECT
      *
   FROM
      trailer_makes
   ORDER BY
      trailer_make_name;
`;

const MODEL_LIST = `
   SELECT
      trailer_model_id,
      trailer_model_name
   FROM
      trailer_models a
   INNER JOIN
      trailer_makes b
   ON
      a.trailer_make_id = b.trailer_make_id
   WHERE   
      trailer_make_name = $1
   ORDER BY
      trailer_model_name;
`;

const ADD_MARK = `
   INSERT INTO
      trailer_makes (
         trailer_make_name
      ) VALUES (
         $1
      )
   RETURNING *;
`;

const ADD_MODEL = `
   INSERT INTO
      trailer_models (
         trailer_make_id,
         trailer_model_name
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
      trailer_makes
   WHERE
      trailer_make_id = $1;
`;

const UPDATE_MARK = `
   UPDATE
      trailer_makes
   SET
      trailer_make_name = $2
   WHERE
      trailer_make_id = $1
   RETURNING *;
`;

const FOUND_MODEL = `
   SELECT
      *
   FROM
      trailer_models
   WHERE
      trailer_model_id = $1;
`;

const UPDATE_MODEL = `
   UPDATE
      trailer_models
   SET
      trailer_make_id = $2,
      trailer_model_name = $3
   WHERE
      trailer_model_id = $1
   RETURNING *;
`;

const DELETE_MARK = `
   DELETE FROM
      trailer_makes
   WHERE
      trailer_make_id = $1
   RETURNING *;
`;

const DELETE_MODEL = `
   DELETE FROM
      trailer_models
   WHERE
      trailer_model_id = $1
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