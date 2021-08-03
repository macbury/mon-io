FROM ruby:2.7.1-alpine

RUN gem install bundler:2.1.4

RUN apk add --no-cache --update build-base \
    postgresql-dev \
    tzdata \
    postgresql-client \
    imagemagick \
    wkhtmltopdf \
    xvfb-run \
    tesseract-ocr \
    git \
    && rm -f /var/cache/apk/*

STOPSIGNAL 9
