FROM php:8.2-apache

RUN a2enmod rewrite
RUN docker-php-ext-install mysqli pdo pdo_mysql

COPY . /var/www/html/

# Cấu hình Apache
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf
RUN sed -ri -e 's!/var/www/html!/var/www/html/public!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!AllowOverride None!AllowOverride All!g' /etc/apache2/apache2.conf

EXPOSE 80
