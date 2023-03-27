FROM tomcat:9.0
COPY . /usr/local/tomcat/webapps/

RUN ["/bin/bash", "-c", "javac -cp /usr/local/tomcat/lib/servlet-api.jar -d /usr/local/tomcat/webapps/ip-lab/WEB-INF/classes/ /usr/local/tomcat/webapps/ip-lab/WEB-INF/src/*.java"]

EXPOSE 8080
CMD ["catalina.sh", "run"]