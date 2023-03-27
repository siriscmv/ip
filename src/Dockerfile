FROM tomcat:9.0
COPY . /usr/local/tomcat/webapps/

RUN ["wget", "https://dev.mysql.com/get/Downloads/Connector-J/mysql-connector-j-8.0.32.tar.gz", "-P", "/lib/"]
RUN ["tar", "-xvzf", "/lib/mysql-connector-j-8.0.32.tar.gz", "-C", "/lib/"]
RUN ["mv", "/lib/mysql-connector-j-8.0.32/mysql-connector-j-8.0.32.jar", "/usr/local/tomcat/webapps/ip-lab/WEB-INF/lib/."]

RUN ["/bin/bash", "-c", "javac -cp /usr/local/tomcat/webapps/ip-lab/WEB-INF/lib/*:/usr/local/tomcat/lib/* -d /usr/local/tomcat/webapps/ip-lab/WEB-INF/classes/ /usr/local/tomcat/webapps/ip-lab/WEB-INF/src/*.java"]

EXPOSE 8080
CMD ["catalina.sh", "run"]