const { fetch, fetchALL } = require("../../lib/postgres");

const MARK_LIST = `
   SELECT
      *
   FROM
      construction_makes
   ORDER BY
      construction_make_name;
`;

const MODEL_LIST = `
   SELECT
      construction_model_id,
      construction_model_name
   FROM
      construction_models a
   INNER JOIN
      construction_makes b
   ON
      a.construction_make_id = b.construction_make_id
   WHERE
      construction_make_name = $1
   ORDER BY
      construction_model_name;
`;

const ADD_MARK = `
   INSERT INTO
      construction_makes (
         construction_make_name
      ) VALUES (
         $1
      )
   RETURNING *;
`;

const ADD_MODEL = `
   INSERT INTO
      construction_models (
         construction_make_id,
         construction_model_name
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
      construction_makes
   WHERE
      construction_make_id = $1;
`;

const UPDATE_MARK = `
   UPDATE
      construction_makes
   SET
      construction_make_name = $2
   WHERE
      construction_make_id = $1
   RETURNING *;
`;

const FOUND_MODEL = `
   SELECT
      *
   FROM
      construction_models
   WHERE
      construction_model_id = $1;
`;

const UPDATE_MODEL = `
   UPDATE
      construction_models
   SET
      construction_make_id = $2,
      construction_model_name = $3
   WHERE
      construction_model_id = $1
   RETURNING *;
`;

const DELETE_MARK = `
   DELETE FROM
      construction_makes
   WHERE
      construction_make_id = $1
   RETURNING *;
`;

const DELETE_MODEL = `
   DELETE FROM
      construction_models
   WHERE
      construction_model_id = $1
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