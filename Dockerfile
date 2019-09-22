FROM nginx
COPY build /var/www/html
COPY nginx/default /etc/nginx/sites-available/default
