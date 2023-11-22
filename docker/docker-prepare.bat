cd ../fm-server/target
mkdir dependency
cd dependency 
jar -xf ..\*.jar 
cd ../../../docker 
docker-compose up -d --build