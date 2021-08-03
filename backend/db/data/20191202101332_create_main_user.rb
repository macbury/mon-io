class CreateMainUser < ActiveRecord::Migration[6.0]
  def up
    User.create!(
      username: 'monio',
      password: 'moniopass'
    )
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
