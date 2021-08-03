FROM mon.io:base

ENV RAILS_ENV production
ENV NODE_ENV production
ENV RAILS_SERVE_STATIC_FILES true
ENV RACK_TIMEOUT_SERVICE_TIMEOUT 120

RUN mkdir -p /app
WORKDIR /app

COPY Gemfile /app
COPY Gemfile.lock /app

RUN bundle config --global frozen 1 \
    && bundle install --path=vendor/bundle --without development test \
    && rm -rf vendor/bundle/ruby/2.7.0/cache/*.gem \
    && find vendor/bundle/ruby/2.7.0/gems/ -name "*.c" -delete \
    && find vendor/bundle/ruby/2.7.0/gems/ -name "*.o" -delete

COPY . /app

RUN mkdir -p tmp/pids
RUN mkdir -p tmp/cache

STOPSIGNAL 9

EXPOSE 3000

CMD ["/app/bin/server"]
