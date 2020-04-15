Bienvenido al Aplicativo de Smart Payment TLV Admin
==================================================

Datos Operativa, Datos de configuración, Obtención de Información de tramas para detectar errores, Obtención de información de actividad todo referente a los TPV generados con la API PN2020 
de samrtydreams.com, toda esta información será procesada y se realizaran paneles de control para su análisis y control de los TPV (Este sistema deberá de manejar diferentes roles de seguridad 
para poder segmentar los niveles de visualización de la información y será posible genera diferentes instancias con diferentes bases de datos para los diversos clientes que así lo requieran 
“SmartBT, Posadas, Cinemex, Cinepolis, etc”)


Estructura
-----------

Este App includes:

* README.md      - Este Archivo el cual describe el contexto general del aplicativo
* appspec.yml    - Archivo utilizado por AWS CodeDeploy para realizar Liberación continua.
* buildspec.yml  - Archivo utilizado por AWS AWS CodeBuild para construir la aplicacion web en una instancia AWS.
* pom.xml        - Archivo de Maven para realizar actividades de compilación, instalacion, despliegue
* src/main       - Este directorio contiene todas las clases java y en este caso se esta utilizando el framework Spring
* src/static     - Este directorio contiene los recursos estáticos (Js, Imagenetes, css, etc.) 
* src/templates  - Este directorio contiene todas las vistas las cuales se generan usando tymelaf como framework para generar vistas
* src/test       - Este directorio contendrás las pruebas unitarias para garantizar que los componentes y vistas construidas esté funcionando correctamente
* scripts/       - Este directorio contiene los scripts utilizados por AWS CodeDeploy se instala y despliega una Aplicación en AWS.
  CloudFormation to deploy your infrastructure
* template-configuration.json - this file contains the project ARN with placeholders used for tagging resources with the project ID


Inicio
---------------


1. Para trabajar de manera local
		$ mvn clean spring-boot:run   Probar de manera Local utilizando SpringBoot
		Abri http://localhost:8080/ 

3. Para probar el compilado y empaquetado.
		
        $ mvn -f pom.xml compile      Compilar
        $ mvn -f pom.xml package      Empaquetar en war



