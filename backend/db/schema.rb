# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_12_19_123636) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_trgm"
  enable_extension "pgcrypto"
  enable_extension "plpgsql"
  enable_extension "uuid-ossp"

  create_table "arask_jobs", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "job"
    t.datetime "execute_at"
    t.string "interval"
    t.index ["execute_at"], name: "index_arask_jobs_on_execute_at"
  end

  create_table "budget_periods", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.date "date"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.uuid "user_id"
    t.index ["user_id"], name: "index_budget_periods_on_user_id"
  end

  create_table "categories", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "color"
    t.string "icon"
    t.integer "kind", default: 0
    t.boolean "shared", default: false
    t.uuid "user_id"
    t.string "currency"
    t.boolean "archived", default: false
    t.index ["user_id"], name: "index_categories_on_user_id"
  end

  create_table "category_budgets", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.integer "planned_cents", default: 0, null: false
    t.string "planned_currency", default: "PLN", null: false
    t.uuid "category_id"
    t.uuid "budget_period_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "kind", default: 0
    t.index ["budget_period_id"], name: "index_category_budgets_on_budget_period_id"
    t.index ["category_id"], name: "index_category_budgets_on_category_id"
    t.index ["kind"], name: "index_category_budgets_on_kind"
  end

  create_table "category_location_suggestions", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "category_id"
    t.string "location_id"
    t.float "rank", default: 0.0
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["category_id"], name: "index_category_location_suggestions_on_category_id"
    t.index ["location_id"], name: "index_category_location_suggestions_on_location_id"
  end

  create_table "data_migrations", primary_key: "version", id: :string, force: :cascade do |t|
  end

  create_table "exchange_rates", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.date "date", null: false
    t.string "base", null: false
    t.string "currency", null: false
    t.decimal "value", null: false
    t.index ["currency"], name: "index_exchange_rates_on_currency"
    t.index ["date"], name: "index_exchange_rates_on_date"
  end

  create_table "flipper_features", force: :cascade do |t|
    t.string "key", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["key"], name: "index_flipper_features_on_key", unique: true
  end

  create_table "flipper_gates", force: :cascade do |t|
    t.string "feature_key", null: false
    t.string "key", null: false
    t.string "value"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["feature_key", "key", "value"], name: "index_flipper_gates_on_feature_key_and_key_and_value", unique: true
  end

  create_table "imports", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.jsonb "file_data"
    t.string "signature"
    t.string "name"
    t.integer "from_line", default: 0
    t.integer "to_line", default: 0
    t.string "delimiter"
    t.string "encoding", default: "UTF-8"
    t.uuid "user_id", null: false
    t.uuid "category_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "processed", default: false
    t.integer "notes_column"
    t.integer "amount_column"
    t.integer "date_column"
    t.jsonb "transactions_mappings", default: {}
    t.index ["category_id"], name: "index_imports_on_category_id"
    t.index ["user_id"], name: "index_imports_on_user_id"
  end

  create_table "links", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "url"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "locations", id: :string, force: :cascade do |t|
    t.string "name"
    t.string "full_address"
    t.string "category"
    t.string "city"
    t.string "postcode"
    t.string "country"
    t.string "suburb"
    t.decimal "lat", precision: 10, scale: 6
    t.decimal "lng", precision: 10, scale: 6
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.jsonb "map_data"
  end

  create_table "receipts", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "category_id"
    t.jsonb "file_data"
    t.uuid "user_id"
    t.decimal "lat", precision: 10, scale: 6
    t.decimal "lng", precision: 10, scale: 6
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "location_id"
    t.uuid "transaction_id"
    t.string "signature"
    t.index ["category_id"], name: "index_receipts_on_category_id"
    t.index ["location_id"], name: "index_receipts_on_location_id"
    t.index ["transaction_id"], name: "index_receipts_on_transaction_id"
    t.index ["user_id"], name: "index_receipts_on_user_id"
  end

  create_table "refresh_tokens", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "user_id"
    t.string "jwt_hmac_secret_base"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "name"
    t.string "ip"
    t.datetime "expire_at"
    t.string "kind", default: "normal"
    t.index ["user_id"], name: "index_refresh_tokens_on_user_id"
  end

  create_table "series", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "recurrence", default: "none"
    t.date "start_at"
    t.date "end_at"
    t.uuid "parent_id"
    t.index ["user_id"], name: "index_series_on_user_id"
  end

  create_table "series_entries", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "series_id", null: false
    t.uuid "operation_id"
    t.date "occured_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["series_id"], name: "index_series_entries_on_series_id"
  end

  create_table "transactions", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "author_id"
    t.uuid "category_id"
    t.decimal "lat", precision: 10, scale: 6
    t.decimal "lng", precision: 10, scale: 6
    t.bigint "amount_cents", default: 0, null: false
    t.string "amount_currency", default: "PLN", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "location_id"
    t.datetime "date"
    t.text "notes", default: ""
    t.uuid "blueprint_id"
    t.integer "kind"
    t.uuid "import_id"
    t.uuid "link_id"
    t.index ["author_id"], name: "index_transactions_on_author_id"
    t.index ["blueprint_id"], name: "index_transactions_on_blueprint_id"
    t.index ["category_id"], name: "index_transactions_on_category_id"
    t.index ["import_id"], name: "index_transactions_on_import_id"
    t.index ["lat", "lng"], name: "index_transactions_on_lat_and_lng"
    t.index ["location_id"], name: "index_transactions_on_location_id"
  end

  create_table "users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "username", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.integer "failed_attempts", default: 0, null: false
    t.string "unlock_token"
    t.datetime "locked_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["unlock_token"], name: "index_users_on_unlock_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "imports", "categories"
  add_foreign_key "imports", "users"
  add_foreign_key "series_entries", "series"
end
