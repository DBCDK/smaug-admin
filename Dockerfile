ARG NODE_BASEIMAGE=docker-dbc.artifacts.dbccloud.dk/dbc-node:10
# ---- Base Node ----
FROM  $NODE_BASEIMAGE AS build
# set working directory
WORKDIR /home/node/app
# copy project file
COPY . .
COPY .babelrc .
COPY .editorconfig .

ENV CI=true

# install node packages
RUN npm set progress=false && \
  npm config set depth 0 && \
  npm install --only=production && \
  mkdir prod_build && \
  cp -R --preserve=links node_modules prod_build/node_modules && \
  npm install && \
  node --version

# build statics
RUN npm run build && \
  cp -R --preserve=links public prod_build/public && \
  cp -R --preserve=links src prod_build/src && \
  cp .editorconfig prod_build/ && \
  cp .babelrc prod_build/

# run test @see package.json
RUN npm run test && npm run lint

#
# ---- Release ----
FROM $NODE_BASEIMAGE AS release
ENV BABEL_CACHE_PATH=~/app/babel.cache.json
WORKDIR /home/node/app
COPY --chown=node:node --from=build /home/node/app/prod_build ./
EXPOSE 1234
USER node
CMD node src/server/index.js
