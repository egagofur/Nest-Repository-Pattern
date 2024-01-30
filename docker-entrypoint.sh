#!/bin/sh
set -e

# Wait for the DB to be up
if [ -n "$DB_HOSTNAME" ]; then
    /app/wait-for-it.sh -t 30 "$DB_HOSTNAME:${DB_PORT:-3306}"
fi

# Run the main container command
exec "$@"
