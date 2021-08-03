# mon.io

Cross platform budget managment app. Support for android(via react native) and web version(react native web)

## Running backend

```
cd backend/
bundle install
cp .env.example .env
docker-compose up
bin/rails db:create db:migrate db:seed
bin/guard
```

You can access only in development graphql console: http://localhost:3000/api/explorer

## Running Frontend
```
cd frontend/
cp .env.example .env
set DEBUG=*
export DEBUG=*
yarn
yarn run:web
```

Visit http://localhost:9292/. Username __monio__ and password is __moniopass__

# References
* https://www.iconfinder.com/icons/1034368/coin_finance_money_wallet_icon
* https://github.com/jaydenseric/apollo-upload-client
* https://github.com/paulo991/Airbnb_clone/blob/e3b5b41b1a992dd98652ca32e230f562be83f11c/packages/web/src/modules/shared/DropzoneField.tsx#L3
* https://github.com/Flipkart/recyclerlistview
* https://github.com/ruby-opencv/ruby-opencv/issues/95

# Image magick is not converting images to pdf:
https://stackoverflow.com/questions/52861946/imagemagick-not-authorized-to-convert-pdf-to-an-image

# Geolocation in firefox is not working on mac os x:
https://ruk.ca/content/geolocation-error-user-denied-geolocation-prompt
# Drag email from outlook is not working
https://github.com/tonyfederer/OutlookFileDrag

https://www.framer.com/
