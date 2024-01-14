# Build Stage
FROM node:18-alpine as builder

WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

# Bundle static assets with nginx
FROM nginx:stable-alpine as production

COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
