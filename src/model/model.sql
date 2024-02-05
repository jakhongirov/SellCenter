CREATE TABLE admins (
   admin_id bigserial PRiMARY KEY,
   admin_email text,
   admin_password text,
   admin_create_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
   user_id bigserial PRiMARY KEY,
   user_email text not null,
   user_password text not null,
   user_first_name text,
   user_last_name text,
   user_gender text,
   user_address_street text,
   user_address_nr text,
   user_address_zip text,
   user_address_city text,
   user_address_country text,
   user_country_code text,
   user_number_prefix int,
   user_phone_number int,
   user_balance int DEFAULT 0,
   user_company boolean DEFAULT false,
   user_image_url text,
   user_image_name text,
   user_create_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_companies (
   company_id bigserial PRiMARY KEY,
   company_name text not null,
   company_mail text not null,
   company_address_street text,
   company_address_nr text,
   company_address_zip text,
   company_address_city text,
   company_address_country text,
   company_address_radius int,
   company_country_code text,
   company_number_prefix int,
   company_phone_number int,
   company_image_url text,
   company_image_name text,
   user_id int not null REFERENCES users(user_id) ON DELETE CASCADE,
   company_create_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE car_makes(
   car_make_id bigserial PRiMARY KEY,
   car_make_name text not null
);

CREATE TABLE car_models(
   car_model_id bigserial PRiMARY KEY,
   car_model_name text not null,
   car_make_id int not null REFERENCES car_makes(car_make_id) ON DELETE CASCADE
);

CREATE TABLE cars (
   car_id bigserial PRiMARY KEY,
   car_make text,
   car_model text,
   car_description text,
   car_images_url text [],
   car_images_name text [],
   car_vide_link text,
   car_variant text,
   car_body text,
   car_number_seats text,
   car_number_door int,
   car_silding_door text,
   car_condition text,
   car_type text,
   car_payment_type text,
   car_price int,
   car_firt_date text,
   car_firt_date_year int,
   car_mileage int,
   car_hu_valid_until text,
   car_previous_owners int,
   car_full_service_history boolean DEFAULT false,
   car_roadworthy boolean DEFAULT false,
   car_country text,
   car_city_zipcode text,
   car_radius int,
   car_fuel_type text,
   car_power int,
   car_cubic_capacity int,
   car_transmission text,
   car_fuel_consumption int,
   car_emissions_sticker text,
   car_emission_class text,
   car_exterior_colour text,
   car_trailer_coupling text,
   car_parking_sensors text,
   car_cruise_control text,
   car_interior_colour text,
   car_interior_material text,
   car_airbags text,
   car_air_conditioning text,
   extras text [],
   others text [],
   car_vendor text,
   car_dealer_rating int DEFAULT 0,
   car_discount_offers boolean DEFAULT false,
   car_non_smoker boolean DEFAULT false,
   car_taxi boolean DEFAULT false,
   car_vat boolean DEFAULT false,
   car_warranty boolean DEFAULT false,
   car_environmental_bonus boolean DEFAULT false,
   car_damaged text,
   car_commercial text,
   car_programme text,
   user_id int REFERENCES users(user_id) ON DELETE CASCADE,
   user_phone text,
   user_email text,
   car_active boolean DEFAULT false,
   car_ad_create_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE motorcycle_makes(
   motorcycle_make_id bigserial PRiMARY KEY,
   motorcycle_make_name text not null
);

CREATE TABLE motorcycle_models(
   motorcycle_model_id bigserial PRiMARY KEY,
   motorcycle_model_name text not null,
   motorcycle_make_id int not null REFERENCES motorcycle_makes(motorcycle_make_id) ON DELETE CASCADE
);

CREATE TABLE motorcycles (
   motorcycle_id bigserial PRiMARY KEY,
   motorcycle_make text,
   motorcycle_model text,
   motorcycle_description text,
   motorcycle_condition text,
   motorcycle_images_url text [],
   motorcycle_images_name text [],
   motorcycle_vide_link text,
   motorcycle_type text,
   motorcycle_price int,
   motorcycle_firt_date text,
   motorcycle_firt_date_year int,
   motorcycle_mileage int,
   motorcycle_power int,
   motorcycle_country text,
   motorcycle_city_zipcode text,
   motorcycle_radius int,
   motorcycle_fuel_type text,
   motorcycle_driving_mode text,
   motorcycle_transmission text,
   motorcycle_cubic_capacity int,
   motorcycle_exterior_colour text,
   others text [],
   motorcycle_vat text,
   motorcycle_vendor text,
   motorcycle_discount_offers boolean DEFAULT false,
   motorcycle_history text,
   motorcycle_damaged text,
   motorcycle_number_owners int,
   motorcycle_approved_used_programme text,
   motorcycle_dealer_rating int DEFAULT 0,
   motorcycle_active boolean DEFAULT false,
   user_id int REFERENCES users(user_id) ON DELETE CASCADE,
   user_phone text,
   user_email text,
   motorcycle_ad_create_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE =home_makes(
   motor_home_make_id bigserial PRiMARY KEY,
   motor_home_make_name text not null
);

CREATE TABLE motor_home_models(
   motor_home_model_id bigserial PRiMARY KEY,
   motor_home_model_name text not null,
   motor_home_make_id int not null REFERENCES motor_home_makes(motor_home_make_id) ON DELETE CASCADE
);

CREATE TABLE motor_homes (
   motor_home_id bigserial PRiMARY KEY,
   motor_home_make text,
   motor_home_model text,
   motor_home_describtion text,
   motor_home_images_url text [],
   motor_home_images_name text [],
   motor_home_video_link text,
   motor_home_condition text,
   motor_home_type text,
   motor_home_price int,
   motor_home_firt_date text,
   motor_home_firt_date_year int,
   motor_home_construction_year int,
   motor_home_kilometre int,
   motor_home_power int,
   motor_home_country text,
   motor_home_city_zipcode text,
   motor_home_city_radius int,
   motor_home_fuel_type text,
   motor_home_transmission text,
   motor_home_emission_class text,
   motor_home_emissions_sticker text,
   motor_home_features text [],
   motor_home_length int,
   motor_home_gvw int,
   motor_home_number_of_bunks int,
   motor_home_axles int,
   motor_home_trailer_coupling text,
   motor_home_cruise_control text,
   motor_home_radio text,
   motor_home_parking_sensors text,
   motor_home_air_conditioning text,
   motor_home_interior_features text [],
   motor_home_exterior_colour text,
   motor_home_vat text,
   motor_home_damaged text,
   motor_home_numbrt_of_owner int,
   motor_home_damage_by_hail boolean DEFAULT false,
   motor_home_full_service_history boolean DEFAULT false,
   motor_home_new_hu boolean DEFAULT false,
   motor_home_renting_possible boolean DEFAULT false,
   motor_home_warranty boolean DEFAULT false,
   motor_home_discount_offers boolean DEFAULT false,
   motor_home_vendor text,
   motor_home_dealer_rating int DEFAULT 0,
   user_id int REFERENCES users(user_id) ON DELETE CASCADE,
   user_phone text,
   user_email text,
   motor_home_active boolean DEFAULT false,
   motor_home_ad_create_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE truck_makes(
   truck_make_id bigserial PRiMARY KEY,
   truck_make_name text not null
);

CREATE TABLE truck_models(
   truck_model_id bigserial PRiMARY KEY,
   truck_model_name text not null,
   truck_make_id int not null REFERENCES truck_makes(truck_make_id) ON DELETE CASCADE
);

CREATE TABLE trucks (
   truck_id bigserial PRiMARY KEY,
   truck_make text,
   truck_model text,
   truck_describtion text,
   truck_images_url text [],
   truck_images_name text [],
   truck_video_link text,
   truck_condition text,
   truck_category text,
   truck_firt_date text,
   truck_firt_date_year int,
   truck_kilometre int,
   truck_price int,
   truck_price_type text,
   truck_vat text,
   truck_power int,
   truck_country text,
   truck_city_zipcode text,
   truck_radius int,
   truck_fuel_type text,
   truck_transmission text,
   truck_emission_class text,
   truck_emissions_sticker text,
   truck_features text [],
   truck_air_conditioning text,
   truck_axles int,
   truck_wheel_formula text,
   truck_gvw int,
   truck_hydraulic_installation text,
   truck_trailer_coupling_fix boolean DEFAULT false,
   truck_cruise_control text,
   truck_driving_cab text,
   truck_interior_features text [],
   truck_exterior_colour text,
   truck_damaged text,
   truck_full_service_history boolean DEFAULT false,
   truck_municipal boolean DEFAULT false,
   truck_new_hu boolean DEFAULT false,
   truck_renting_possible boolean DEFAULT false,
   truck_discount_offers boolean DEFAULT false,
   truck_vendor text,
   truck_dealer_rating int DEFAULT 0,
   user_id int REFERENCES users(user_id) ON DELETE CASCADE,
   user_phone text,
   user_email text,
   truck_active boolean DEFAULT false,
   truck_ad_create_at timestamptz DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE trailer_makes(
   trailer_make_id bigserial PRiMARY KEY,
   trailer_make_name text not null
);

CREATE TABLE trailer_models(
   trailer_model_id bigserial PRiMARY KEY,
   trailer_model_name text not null,
   trailer_make_id int not null REFERENCES trailer_makes(trailer_make_id) ON DELETE CASCADE
);

CREATE TABLE trailers (
   trailer_id bigserial PRiMARY KEY,
   trailer_make text,
   trailer_model text,
   trailer_describtion text,
   trailer_images_url text [],
   trailer_images_name text [],
   trailer_video_link text,
   trailer_condition text,
   trailer_category text,
   trailer_firt_date text,
   trailer_firt_date_year int,
   trailer_price int,
   trailer_price_type text,
   trailer_vat text,
   trailer_country text,
   trailer_city_zipcode text,
   trailer_radius int,
   trailer_features text [],
   trailer_axles int,
   trailer_gvw int,
   trailer_load_capacity int,
   trailer_security text [],
   trailer_new_hu boolean DEFAULT false,
   trailer_renting_possible boolean DEFAULT false,
   trailer_discount_offers boolean DEFAULT false,
   trailer_vendor text,
   trailer_dealer_rating int DEFAULT 0,
   user_id int REFERENCES users(user_id) ON DELETE CASCADE,
   user_phone text,
   user_email text,
   trailer_active boolean DEFAULT false,
   trailer_ad_create_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE van_makes(
   van_make_id bigserial PRiMARY KEY,
   van_make_name text not null
);

CREATE TABLE van_models(
   van_model_id bigserial PRiMARY KEY,
   van_model_name text not null,
   van_make_id int not null REFERENCES van_makes(van_make_id) ON DELETE CASCADE
);

CREATE TABLE vans (
   van_id bigserial PRiMARY KEY,
   van_make text,
   van_model text,
   van_describtion text,
   van_images_url text [],
   van_images_name text [],
   van_video_link text,
   van_condition text,
   van_category text,
   van_firt_date text,
   van_firt_date_year int,
   van_kilometre int,
   van_price int,
   van_price_type text,
   van_vat text,
   van_power int,
   van_country text,
   van_city_zipcode text,
   van_radius int,
   van_fuel_type text,
   van_transmission text,
   van_emission_class text,
   van_emissions_sticker text,
   van_features text [],
   van_air_conditioning text,
   van_gvw int,
   van_parking_sensors text,
   van_sliding_door text,
   van_driving_cab text,
   van_number_of_seats int,
   van_cruise_control text,
   van_trailer_coupling_fix boolean DEFAULT false,
   van_interior_features text [],
   van_exterior_colour text,
   van_damaged text,
   van_approved_used_programme text,
   van_full_service_history boolean DEFAULT false,
   van_municipal boolean DEFAULT false,
   van_new_hu boolean DEFAULT false,
   van_renting_possible boolean DEFAULT false,
   van_discount_offers boolean DEFAULT false,
   van_vendor text,
   van_dealer_rating int DEFAULT 0,
   user_id int REFERENCES users(user_id) ON DELETE CASCADE,
   user_phone text,
   user_email text,
   van_active boolean DEFAULT false,
   van_ad_create_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE semi_trailer_truck_makes(
   semi_trailer_truck_make_id bigserial PRiMARY KEY,
   semi_trailer_truck_make_name text not null
);

CREATE TABLE semi_trailer_truck_models(
   semi_trailer_truck_model_id bigserial PRiMARY KEY,
   semi_trailer_truck_model_name text not null,
   semi_trailer_truck_make_id int not null REFERENCES semi_trailer_truck_makes(semi_trailer_truck_make_id) ON DELETE CASCADE
);

CREATE TABLE semi_trailer_trucks (
   truck_id bigserial PRiMARY KEY,
   truck_make text,
   truck_model text,
   truck_describtion text,
   truck_images_url text [],
   truck_images_name text [],
   truck_video_link text,
   truck_condition text,
   truck_category text,
   truck_firt_date text,
   truck_firt_date_year int,
   truck_kilometre int,
   truck_price int,
   truck_price_type text,
   truck_vat text,
   truck_power int,
   truck_country text,
   truck_city_zipcode text,
   truck_radius int,
   truck_fuel_type text,
   truck_transmission text,
   truck_emission_class text,
   truck_emissions_sticker text,
   truck_features text [],
   truck_air_conditioning text,
   truck_axles int,
   truck_wheel_formula text,
   truck_gvw int,
   truck_cruise_control text,
   truck_hydraulic_installation text,
   truck_driving_cab text,
   truck_interior_features text [],
   truck_exterior_colour text,
   truck_damaged text,
   truck_full_service_history boolean DEFAULT false,
   truck_new_hu boolean DEFAULT false,
   truck_renting_possible boolean DEFAULT false,
   truck_discount_offers boolean DEFAULT false,
   truck_vendor text,
   truck_dealer_rating int DEFAULT 0,
   user_id int REFERENCES users(user_id) ON DELETE CASCADE,
   user_phone text,
   user_email text,
   truck_active boolean DEFAULT false,
   truck_ad_create_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE semi_trailer_makes(
   semi_trailer_make_id bigserial PRiMARY KEY,
   semi_trailer_make_name text not null
);

CREATE TABLE semi_trailer_models(
   semi_trailer_model_id bigserial PRiMARY KEY,
   semi_trailer_model_name text not null,
   semi_trailer_make_id int not null REFERENCES semi_trailer_makes(semi_trailer_make_id) ON DELETE CASCADE
);

CREATE TABLE semi_trailers (
   trailer_id bigserial PRiMARY KEY,
   trailer_make text,
   trailer_model text,
   trailer_describtion text,
   trailer_images_url text [],
   trailer_images_name text [],
   trailer_video_link text,
   trailer_condition text,
   trailer_category text,
   trailer_firt_date text,
   trailer_firt_date_year int,
   trailer_price int,
   trailer_price_type text,
   trailer_vat text,
   trailer_country text,
   trailer_city_zipcode text,
   trailer_radius int,
   trailer_features text [],
   trailer_axles int,
   trailer_gvw int,
   trailer_load_capacity int,
   trailer_security text [],
   trailer_new_hu boolean DEFAULT false,
   trailer_renting_possible boolean DEFAULT false,
   trailer_discount_offers boolean DEFAULT false,
   trailer_vendor text,
   trailer_dealer_rating int DEFAULT 0,
   user_id int REFERENCES users(user_id) ON DELETE CASCADE,
   user_phone text,
   user_email text,
   trailer_active boolean DEFAULT false,
   trailer_ad_create_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE coache_makes(
   coache_make_id bigserial PRiMARY KEY,
   coache_make_name text not null
);

CREATE TABLE coache_models(
   coache_model_id bigserial PRiMARY KEY,
   coache_model_name text not null,
   coache_make_id int not null REFERENCES coache_makes(coache_make_id) ON DELETE CASCADE
);

CREATE TABLE coaches (
   coache_id bigserial PRiMARY KEY,
   coache_make text,
   coache_model text,
   coache_describtion text,
   coache_images_url text [],
   coache_images_name text [],
   coache_video_link text,
   coache_condition text,
   coache_category text,
   coache_firt_date text,
   coache_firt_date_year int,
   coache_kilometre int,
   coache_price int,
   coache_price_type text,
   coache_vat text,
   coache_power int,
   coache_country text,
   coache_city_zipcode text,
   coache_radius int,
   coache_fuel_type text,
   coache_transmission text,
   coache_emission_class text,
   coache_emissions_sticker text,
   coache_features text [],
   coache_air_conditioning text,
   coache_number_of_seats int,
   coache_cruise_control text,
   coache_trailer_coupling_fix boolean DEFAULT false,
   coache_interior_features text [],
   coache_exterior_colour text,
   coache_damaged text,
   coache_full_service_history boolean DEFAULT false,
   coache_new_hu boolean DEFAULT false,
   coache_renting_possible boolean DEFAULT false,
   coache_discount_offers boolean DEFAULT false,
   coache_vendor text,
   coache_dealer_rating int DEFAULT 0,
   user_id int REFERENCES users(user_id) ON DELETE CASCADE,
   user_phone text,
   user_email text,
   coache_active boolean DEFAULT false,
   coache_ad_create_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE agricultural_vehicle_makes(
   agricultural_vehicle_make_id bigserial PRiMARY KEY,
   agricultural_vehicle_make_name text not null
);

CREATE TABLE agricultural_vehicle_models(
   agricultural_vehicle_model_id bigserial PRiMARY KEY,
   agricultural_vehicle_model_name text not null,
   agricultural_vehicle_make_id int not null REFERENCES agricultural_vehicle_makes(agricultural_vehicle_make_id) ON DELETE CASCADE
);

CREATE TABLE agricultural_vehicles(
   vehicle_id bigserial PRiMARY KEY,
   vehicle_make text,
   vehicle_model text,
   vehicle_describtion text,
   vehicle_images_url text [],
   vehicle_images_name text [],
   vehicle_video_link text,
   vehicle_condition text,
   vehicle_category text,
   vehicle_price int,
   vehicle_price_type text,
   vehicle_vat text,
   vehicle_power int,
   vehicle_firt_date text,
   vehicle_construction_year int,
   vehicle_operating_hours int,
   vehicle_country text,
   vehicle_city_zipcode text,
   vehicle_radius int,
   vehicle_features text [],
   vehicle_air_conditioning text,
   vehicle_interior_features text [],
   vehicle_emissions_sticker text,
   vehicle_security text [],
   vehicle_municipal boolean DEFAULT false,
   vehicle_new_hu boolean DEFAULT false,
   vehicle_renting_possible boolean DEFAULT false,
   vehicle_discount_offers boolean DEFAULT false,
   vehicle_vendor text,
   vehicle_dealer_rating int DEFAULT 0,
   user_id int REFERENCES users(user_id) ON DELETE CASCADE,
   user_phone text,
   user_email text,
   vehicle_active boolean DEFAULT false,
   vehicle_ad_create_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE construction_makes(
   construction_make_id bigserial PRiMARY KEY,
   construction_make_name text not null
);

CREATE TABLE construction_models(
   construction_model_id bigserial PRiMARY KEY,
   construction_model_name text not null,
   construction_make_id int not null REFERENCES construction_makes(construction_make_id) ON DELETE CASCADE
);

CREATE TABLE construction_machines (
   machine_id bigserial PRiMARY KEY,
   machine_make text,
   machine_model text,
   machine_describtion text,
   machine_images_url text [],
   machine_images_name text [],
   machine_video_link text,
   machine_condition text,
   machine_category text,
   machine_price int,
   machine_price_type text,
   machine_vat text,
   machine_firt_date text,
   machine_construction_year int,
   machine_operating_hours int,
   machine_country text,
   machine_city_zipcode text,
   machine_radius int,
   machine_features text [],
   machine_emissions_sticker text,
   machine_safety text [],
   machine_renting_possible boolean DEFAULT false,
   machine_road_licence boolean DEFAULT false,
   machine_discount_offers boolean DEFAULT false,
   machine_vendor text,
   machine_dealer_rating int DEFAULT 0,
   user_id int REFERENCES users(user_id) ON DELETE CASCADE,
   user_phone text,
   user_email text,
   machine_active boolean DEFAULT false,
   machine_ad_create_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE forklift_makes(
   forklift_make_id bigserial PRiMARY KEY,
   forklift_make_name text not null
);

CREATE TABLE forklift_models(
   forklift_model_id bigserial PRiMARY KEY,
   forklift_model_name text not null,
   forklift_make_id int not null REFERENCES forklift_makes(forklift_make_id) ON DELETE CASCADE
);

CREATE TABLE forklift_trucks (
   forklift_id bigserial PRiMARY KEY,
   forklift_make text,
   forklift_model text,
   forklift_describtion text,
   forklift_images_url text [],
   forklift_images_name text [],
   forklift_video_link text,
   forklift_condition text,
   forklift_category text,
   forklift_price int,
   forklift_price_type text,
   forklift_vat text,
   forklift_firt_date text,
   forklift_construction_year int,
   forklift_operating_hours int,
   forklift_country text,
   forklift_city_zipcode text,
   forklift_radius int,
   forklift_fuel_type text,
   forklift_transmission text,
   forklift_features text [],
   forklift_lifting_capacity int,
   forklift_lifting_height int,
   forklift_height int,
   forklift_security text [],
   forklift_renting_possible boolean DEFAULT false,
   forklift_discount_offers boolean DEFAULT false,
   forklift_vendor text,
   forklift_dealer_rating int DEFAULT 0,
   user_id int REFERENCES users(user_id) ON DELETE CASCADE,
   user_phone text,
   user_email text,
   forklift_active boolean DEFAULT false,
   forklift_ad_create_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ads_cards (
   card_id bigserial PRiMARY KEY,
   card_title text not null,
   card_text text not null,
   card_image_url text,
   card_image_name text,
   card_link text,
   card_active boolean DEFAULT true,
   card_create_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sliders (
   slider_id bigserial PRiMARY KEY,
   slider_title text,
   slider_image_url text,
   slider_image_name text,
   slider_link text,
   slider_active boolean DEFAULT true,
   slider_create_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE news (
   news_id bigserial PRiMARY KEY,
   news_title text not null,
   news_lang text not null,
   news_desc text not null,
   news_image_url text,
   news_image_name text,
   news_active boolean DEFAULT true,
   news_create_at timestamptz DEFAULT CURRENT_TIMESTAMP
);