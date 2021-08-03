# This error should be raised in Service classes.
# Main purpose for it is for catching it in GraphqlSchema and print it in errors field
class ServiceFailure < StandardError
end
