class AddDevFlipperFlags < ActiveRecord::Migration[6.0]
  def up
    Flipper.register(:slow_api)
    Flipper.disable(:slow_api)
    Flipper.register(:graphiql)
    Flipper.disable(:slow_api)
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
