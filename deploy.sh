echo "copy node_modules to ./node_layer/nodejs/node_modules"

mkdir -p layers/node_modules/nodejs
cp -r ./node_modules ./layers/node_modules/nodejs/node_modules

sls deploy -v

echo "remove layers"
rm -r ./layers