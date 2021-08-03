RSpec.shared_context 'asyncReactor', shared_context: :metadata do
  include_context Async::RSpec::Reactor
  # include_context Async::RSpec::Leaks
end