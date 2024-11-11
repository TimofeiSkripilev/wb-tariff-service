#!/bin/sh

# Wait for postgres to be ready
echo "Waiting for postgres..."
while ! nc -z postgres 5432; do
  sleep 1
done
echo "PostgreSQL started"

# Run migrations
echo "Running migrations..."
npm run migrate

# Start the application
echo "Starting application..."
npm start