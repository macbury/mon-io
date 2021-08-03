Arask.setup do |arask|
  arask.create task: 'money:refresh_rates', cron: '0 0 * * *'
  arask.create task: 'refresh_token:expire', cron: '2 0 * * *'
  arask.create task: 'learn:locations', cron: '2 0 * * *'
end
