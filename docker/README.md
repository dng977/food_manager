docker build . -f Dockerfile-db -t mssql    
docker run -d -p 3333:1433 mssql
docker compose create --build
