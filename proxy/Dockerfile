FROM nginx:1.23.3-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 60
CMD ["nginx", "-g", "daemon off;"]