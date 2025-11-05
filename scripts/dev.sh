#!/bin/bash
export PATH="$PATH:/c/Windows/System32"
npx concurrently -c "#93c5fd,#c4b5fd,#fdba74" "php artisan serve --no-reload" "php artisan queue:listen --tries=1" "npm run dev" --names='server,queue,vite'
