#!/bin/sh

set -e

host="$1"
shift
cmd="$@"
>&2 echo "MSSQL is unavailable - sleeping"
sleep 15s

>&2 echo "MSSQL is up - executing command"
exec $cmd