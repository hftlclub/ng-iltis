#!/bin/bash
cd "$(dirname "$0")"

git pull origin release
npm install
npm run ng -- build -prod --aot --no-vendor-chunk --extract-css
rm -fr /srv/www/iltis/html
mv dist /srv/www/iltis/html
