const { fetch, fetchALL } = require("../../lib/postgres");

const FOUND_SLIDER = `
   SELECT
      *
   FROM
      sliders
   WHERE
      slider_id = $1;
`;

const UPDATE_SLIDER = `
   UPDATE
      sliders
   SET
      slider_title = $2,
      slider_link = $3,
      slider_image_url = $4,
      slider_image_name = $5
   WHERE
      slider_id = $1
   RETURNING *;
`;

const UPDATE_STATUS = `
   UPDATE
      sliders
   SET
      slider_active = $2
   WHERE
      slider_id = $1
   RETURNING *;
`;

const DELETE_SLIDER = `
   DELETE FROM
      sliders
   WHERE
      slider_id = $1
   RETURNING *;
`;

const ADD_SLIDER = `
   INSERT INTO
      sliders (
         slider_title,
         slider_link,
         slider_image_url,
         slider_image_name
      ) VALUES (
         $1,
         $2,
         $3,
         $4
      )
   RETURNING *;
`;

const sliderListAdmin = (limit, offset) => {
   const LIST = `
      SELECT
         *
      FROM
         sliders
      LIMIT ${limit}
      OFFSET ${offset};
   `;

   return fetchALL(LIST)
}
const sliderList = (limit, offset) => {
   const LIST = `
      SELECT
         *
      FROM
         sliders
      WHERE
         slider_active = true
      LIMIT ${limit}
      OFFSET ${offset};
   `;

   return fetchALL(LIST)
}
const addSlider = (
   slider_title,
   slider_link,
   slider_img_url,
   slider_img_name
) => fetch(
   ADD_SLIDER,
   slider_title,
   slider_link,
   slider_img_url,
   slider_img_name
)
const updateSlider = (
   id,
   slider_title,
   slider_link,
   slider_img_url,
   slider_img_name
) => fetch(
   UPDATE_SLIDER,
   id,
   slider_title,
   slider_link,
   slider_img_url,
   slider_img_name
)
const updateStatus = (id, status) => fetch(UPDATE_STATUS, id, status)
const deleteSlider = (id) => fetch(DELETE_SLIDER, id)
const sliderById = (id) => fetch(FOUND_SLIDER, id)

module.exports = {
   sliderListAdmin,
   sliderList,
   addSlider,
   updateSlider,
   updateStatus,
   deleteSlider,
   sliderById
}