FROM openjdk:13-jdk-alpine
VOLUME /tmp
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]

# docker build --build-arg JAR_FILE=target/*.jar -t myorg/myapp .