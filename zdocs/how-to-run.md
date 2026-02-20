php artisan serve --host=0.0.0.0 --port=6060
php artisan storage:link
php artisan schedule:work

### pm2
sudo npm install -g pm2
pm2 start --name gold-api "php artisan serve --host 0.0.0.0 --port 6060"
pm2 start --name gold-worker "php artisan schedule:work"