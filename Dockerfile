# ===============================
# Dockerfile Laravel + Apache + MySQL + Vite
# ===============================

FROM php:8.2-apache

# --- 1. Install system dependencies ---
RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y \
    git \
    curl \
    zip \
    unzip \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    libxml2-dev \
    libzip-dev \
    libicu-dev \
    pkg-config \
    g++ \
    zlib1g-dev \
    libgd-dev \
    build-essential \
    libonig-dev \
    default-mysql-client && \
    docker-php-source extract && \
    rm -rf /var/lib/apt/lists/*

# --- 2. Install PHP extensions ---
RUN docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath zip
RUN docker-php-ext-configure gd --with-freetype --with-jpeg
RUN docker-php-ext-install gd
RUN docker-php-ext-configure intl
RUN docker-php-ext-install intl
RUN docker-php-source delete

# --- 3. Install Node.js 20 (Vite) ---
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

# --- 4. Enable mod_rewrite Apache ---
RUN a2enmod rewrite

# --- 5. Fix Apache ServerName warning ---
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# --- 6. Set Apache Document Root ke folder Laravel public ---
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' \
    /etc/apache2/apache2.conf \
    /etc/apache2/conf-available/*.conf

# --- 7. Configure Apache untuk Railway ---
RUN echo '<VirtualHost *:${PORT}>' > /etc/apache2/sites-available/000-default.conf && \
    echo '  DocumentRoot ${APACHE_DOCUMENT_ROOT}' >> /etc/apache2/sites-available/000-default.conf && \
    echo '  <Directory ${APACHE_DOCUMENT_ROOT}>' >> /etc/apache2/sites-available/000-default.conf && \
    echo '      AllowOverride All' >> /etc/apache2/sites-available/000-default.conf && \
    echo '      Require all granted' >> /etc/apache2/sites-available/000-default.conf && \
    echo '  </Directory>' >> /etc/apache2/sites-available/000-default.conf && \
    echo '</VirtualHost>' >> /etc/apache2/sites-available/000-default.conf

# --- 8. Copy Composer dari image resmi ---
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# --- 9. Working directory ---
WORKDIR /var/www/html

# --- 10. Copy project files ---
COPY . .

# --- 11. Install dependensi Laravel ---
RUN composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist

# --- 12. Install dependensi Node.js ---
RUN npm install --legacy-peer-deps

# --- 13. Build Vite assets ---
RUN npm run build

# --- 14. Fix Vite manifest path ---
RUN if [ -f public/build/.vite/manifest.json ]; then \
      cp public/build/.vite/manifest.json public/build/manifest.json; \
    fi

# --- 15. Create directories & permissions ---
RUN mkdir -p \
        /var/www/html/storage/logs \
        /var/www/html/storage/framework/sessions \
        /var/www/html/storage/framework/views \
        /var/www/html/storage/framework/cache \
        /var/www/html/bootstrap/cache \
        /var/www/html/public/assets-foto/price_list && \
    chown -R www-data:www-data \
        /var/www/html/storage \
        /var/www/html/bootstrap/cache \
        /var/www/html/public/assets-foto && \
    chmod -R 775 \
        /var/www/html/storage \
        /var/www/html/bootstrap/cache \
        /var/www/html/public/assets-foto

# --- 16. Expose port ---
EXPOSE $PORT

# --- 17. Custom Apache start script ---
COPY <<EOF /usr/local/bin/start-apache.sh
#!/bin/bash
set -e

echo "Configuring Apache for Railway..."

export PORT=\${PORT:-8080}
sed -i "s/Listen 80/Listen \$PORT/g" /etc/apache2/ports.conf
sed -i "s/<VirtualHost \*:80>/<VirtualHost *:\$PORT>/g" /etc/apache2/sites-available/000-default.conf

echo "Setting up Laravel..."

# Setup .env jika belum ada
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env.example .env || true
fi

# Permission .env
chown www-data:www-data .env
chmod 664 .env

# Storage directories
mkdir -p storage/logs storage/framework/sessions storage/framework/views storage/framework/cache
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

# Create laravel.log
touch storage/logs/laravel.log
chown www-data:www-data storage/logs/laravel.log
chmod 664 storage/logs/laravel.log

# --- Database auto-config (MYSQL_URL / DATABASE_URL) ---
if [ ! -z "\$MYSQL_URL" ]; then
    echo "Configuring MySQL from MYSQL_URL..."
    DB_FULL=\$(echo \$MYSQL_URL | sed 's/.*:\/\///')
    DB_USER=\$(echo \$DB_FULL | cut -d: -f1)
    DB_PASS=\$(echo \$DB_FULL | cut -d: -f2 | cut -d@ -f1)
    DB_HOST=\$(echo \$DB_FULL | cut -d@ -f2 | cut -d: -f1)
    DB_PORT=\$(echo \$DB_FULL | cut -d: -f3 | cut -d\/ -f1)
    DB_NAME=\$(echo \$DB_FULL | cut -d\/ -f2)

    sed -i "s/DB_CONNECTION=.*/DB_CONNECTION=mysql/" .env
    sed -i "s/DB_HOST=.*/DB_HOST=\$DB_HOST/" .env
    sed -i "s/DB_PORT=.*/DB_PORT=\$DB_PORT/" .env
    sed -i "s/DB_DATABASE=.*/DB_DATABASE=\$DB_NAME/" .env
    sed -i "s/DB_USERNAME=.*/DB_USERNAME=\$DB_USER/" .env
    sed -i "s/DB_PASSWORD=.*/DB_PASSWORD=\$DB_PASS/" .env
elif [ ! -z "\$DATABASE_URL" ]; then
    echo "Configuring MySQL from DATABASE_URL..."

    DB_FULL=\$(echo \$DATABASE_URL | sed 's/.*:\/\///')
    DB_USER=\$(echo \$DB_FULL | cut -d: -f1)
    DB_PASS=\$(echo \$DB_FULL | cut -d: -f2 | cut -d@ -f1)
    DB_HOST=\$(echo \$DB_FULL | cut -d@ -f2 | cut -d: -f1)
    DB_PORT=\$(echo \$DB_FULL | cut -d: -f3 | cut -d\/ -f1)
    DB_NAME=\$(echo \$DB_FULL | cut -d\/ -f2)

    sed -i "s/DB_CONNECTION=.*/DB_CONNECTION=mysql/" .env
    sed -i "s/DB_HOST=.*/DB_HOST=\$DB_HOST/" .env
    sed -i "s/DB_PORT=.*/DB_PORT=\$DB_PORT/" .env
    sed -i "s/DB_DATABASE=.*/DB_DATABASE=\$DB_NAME/" .env
    sed -i "s/DB_USERNAME=.*/DB_USERNAME=\$DB_USER/" .env
    sed -i "s/DB_PASSWORD=.*/DB_PASSWORD=\$DB_PASS/" .env
fi

# Other ENV
if [ ! -z "\$APP_URL" ]; then
    sed -i "s|APP_URL=.*|APP_URL=\$APP_URL|" .env
fi

php artisan key:generate --no-interaction --force || true

# Clear caches
php artisan config:clear --no-interaction || true
php artisan route:clear --no-interaction || true
php artisan view:clear --no-interaction || true
php artisan cache:clear --no-interaction || true

# Wait DB ready
echo "Waiting for database..."
for i in {1..30}; do
    if php artisan migrate:status > /dev/null 2>&1; then
        echo "Database ready!"
        break
    fi
    echo "Waiting... (\$i/30)"
    sleep 2
done

# Migrate
php artisan migrate --force --no-interaction || echo "Migration failed, continuing..."
php artisan db:seed --force --no-interaction || echo "Seeder failed, continuing..."
# Storage symlink
php artisan storage:link --no-interaction || true

# Fix permissions
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

echo "Starting Apache on port \$PORT..."
exec apache2-foreground
EOF

RUN chmod +x /usr/local/bin/start-apache.sh

# --- 18. Start container ---
CMD ["/usr/local/bin/start-apache.sh"]
