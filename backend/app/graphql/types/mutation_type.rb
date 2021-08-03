module Types
  class MutationType < Types::BaseObject
    field :create_receipt, mutation: Mutations::CreateReceipt, description: 'Create new receipt'
    field :update_receipt, mutation: Mutations::UpdateReceipt, description: 'Update existing receipt'
    field :destroy_receipt, mutation: Mutations::DestroyReceipt, description: 'Destroy receipt'

    field :create_import, mutation: Mutations::CreateImport, description: 'Create import from csv file'
    field :update_import, mutation: Mutations::UpdateImport, description: 'Update import, drop old transactions and create new transactions'
    field :destroy_import, mutation: Mutations::DestroyImport, description: 'Remove import with its transactions'

    field :create_category, mutation: Mutations::CreateCategory, description: 'Create non system category'
    field :update_category, mutation: Mutations::UpdateCategory, description: 'Update category settings'

    field :create_transaction, mutation: Mutations::CreateTransaction, description: 'Create transaction for current user'
    field :update_transaction, mutation: Mutations::UpdateTransaction, description: 'Update transaction for current user'
    field :destroy_transaction, mutation: Mutations::DestroyTransaction, description: 'Destroy transaction for current user'
    field :update_metadata_url, mutation: Mutations::UpdateMetadataUrl, description: 'Update transaction url metadata'

    field :create_recurrence, mutation: Mutations::CreateRecurrence, description: 'Create new recurrence from existing transaction'
    field :ignore_recurrence, mutation: Mutations::IgnoreRecurrence, description: 'Ignore one recurrence of event at date'
    field :update_recurrence, mutation: Mutations::UpdateRecurrence, description: 'Update existing recurrence'

    field :update_category_budget, mutation: Mutations::UpdateCategoryBudget, description: 'Plan how much will be spend for category'

    field :destroy_refresh_token, mutation: Mutations::DestroyRefreshToken, description: 'Delete an access token'
    field :create_long_living_token, mutation: Mutations::CreateLongLivingToken, description: 'Generate long living access token'
    field :refresh_access_token, mutation: Mutations::RefreshAccessToken, description: 'Generate access token from refresh token'
    field :sign_in, mutation: Mutations::SignIn, description: 'Sign in and get refresh token'
    field :quick_sign_in, mutation: Mutations::QuickSignIn, description: 'Quick Sign in with token'
    field :quick_login_token, mutation: Mutations::QuickLoginToken, description: 'Generates quick login token, that allows login as user using QR code'
    field :logout, mutation: Mutations::Logout, description: 'Destroy current session'
  end
end
