sleep 30s
echo 'INIT DATABASE'
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "${SA_PASSWORD}" -d master -i init.sql
