const { fetch, fetchALL } = require("../../lib/postgres");

const MARK_LIST = `
   SELECT
      *
   FROM
      semi_trailer_truck_makes
   ORDER BY
      semi_trailer_truck_make_name;
`;

const MODEL_LIST = `
   SELECT
      semi_trailer_truck_model_id,
      semi_trailer_truck_model_name
   FROM
      semi_trailer_truck_models a
   INNER JOIN
      semi_trailer_truck_makes b
   ON
      a.semi_trailer_truck_make_id = b.semi_trailer_truck_make_id
   WHERE   
      semi_trailer_truck_make_name = $1
   ORDER BY
      semi_trailer_truck_model_name;
`;

const ADD_MARK = `
   INSERT INTO
      semi_trailer_truck_makes (
         semi_trailer_truck_make_name
      ) VALUES (
         $1
      )
   RETURNING *;
`;

const ADD_MODEL = `
   INSERT INTO
      semi_trailer_truck_models (
         semi_trailer_truck_make_id,
         semi_trailer_truck_model_name
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
      semi_trailer_truck_makes
   WHERE
      semi_trailer_truck_make_id = $1;
`;

const UPDATE_MARK = `
   UPDATE
      semi_trailer_truck_makes
   SET
      semi_trailer_truck_make_name = $2
   WHERE
      semi_trailer_truck_make_id = $1
   RETURNING *;
`;

const FOUND_MODEL = `
   SELECT
      *
   FROM
      semi_trailer_truck_models
   WHERE
      semi_trailer_truck_model_id = $1;
`;

const UPDATE_MODEL = `
   UPDATE
      semi_trailer_truck_models
   SET
      semi_trailer_truck_make_id = $2,
      semi_trailer_truck_model_name = $3
   WHERE
      semi_trailer_truck_model_id = $1
   RETURNING *;
`;

const DELETE_MARK = `
   DELETE FROM
      semi_trailer_truck_makes
   WHERE
      semi_trailer_truck_make_id = $1
   RETURNING *;
`;

const DELETE_MODEL = `
   DELETE FROM
      semi_trailer_truck_models
   WHERE
      semi_trailer_truck_model_id = $1
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