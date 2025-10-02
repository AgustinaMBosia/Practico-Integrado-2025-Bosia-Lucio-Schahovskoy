-- UNIDAD 1 -------------------------------------------------------------------------------------
/*
A. Introducción a los SGBD y Configuración Inicial de MySQL

1. Definición y Rol de un SGBD:
	○ ¿Qué es un Sistema de Gestión de Bases de Datos (SGBD) y cuál es su función
	principal en un sistema informático?
El Sistema de Gestión de Bases de Datos (SGBD) consiste en una colección de datos interrelacionados
y un conjunto de programas para acceder a dichos datos. 
El objetivo principal de la SGBD es proporcionar una manera de almacenar y recuperar datos de manera eficiente y 
conveniente.


	○ Mencionar al menos 3 ventajas de utilizar un SGBD en lugar de almacenar datos en
	archivos planos.
Algunos inconvenientes de los sistemas de archivos que se solucionan con las SGBD son: 
- Redundancia e inconsistencia de datos: 
Duplicación de datos en diversos formatos de archivos.
- Dificultad en el acceso de datos:
Programa nuevo para cada tarea
- Aislamiento de Datos:
Diversos archivos con diferentes formatos

2. Selección de un SGBD:
	○ Enumere y describa brevemente al menos 5 criterios clave a considerar al
	seleccionar un SGBD para un proyecto.
a) Modelo de datos soportado:
El SGBD debe ser compatible con el modelo de datos que necesita el proyecto (relacional, orientado a documentos, 
grafos, clave-valor, etc.). Por ejemplo, un sistema de e-commerce suele preferir un relacional, mientras que un sistema
de redes sociales puede requerir una base de datos de grafos.

b) Rendimiento y escalabilidad:
Es fundamental evaluar la capacidad del SGBD para manejar grandes volúmenes de datos, muchas transacciones simultáneas 
y la posibilidad de escalar (vertical u horizontalmente) a medida que el sistema crece.

c) Soporte a transacciones y confiabilidad (ACID):
Dependiendo del proyecto, puede ser necesario que el SGBD garantice integridad y consistencia de los datos mediante 
propiedades ACID (Atomicidad, Consistencia, Aislamiento y Durabilidad), especialmente en aplicaciones críticas como bancarias.

d) Seguridad y control de acceso
El sistema debe ofrecer mecanismos robustos de autenticación, autorización, encriptación y auditoría, para proteger la 
información sensible frente a accesos no autorizados.

e) Costo y licenciamiento
Es importante considerar si se opta por un SGBD comercial (ej. Oracle, SQL Server) con costos de licencia y soporte, o por
uno open-source (ej. MySQL, PostgreSQL) que puede reducir gastos pero requerir más gestión interna.
    
3. Requisitos del Sistema:
	○ Investigar los requisitos mínimos de hardware (RAM, CPU, espacio en disco) y
	software (Sistema Operativo) para instalar MySQL Server en un entorno de
	desarrollo.
Para un entorno de desarrollo, los requisitos mínimos para MySQL Server incluyen al menos 1 GB de RAM, una CPU de 3 GHz (o
equivalente) y 1 GB de espacio en disco. Como sistema operativo, son compatibles Windows (NT, 2000, XP, 2003) o Linux. 
Para un rendimiento óptimo, se recomienda RAM de 4 GB o más. 
    
    
4. Instalación de MySQL:
	○ Instalar MySQL Community Server en su equipo.
	○ Configurar usuario root y su contraseña.
	○ Acceder a la línea de comandos de MySQL (mysql client) utilizando el siguiente
	comando: mysql -u root -p
	○ Desde la línea de comandos, verificar la versión de MySQL usando:
	SELECT VERSION();
Hecho, versión verificada 9.3.0

5. Acceso y Configuración Inicial:
	○ Instalar MySQL Workbench y crear una nueva conexión a la instancia local de
	MySQL utilizando el usuario root y la contraseña establecida.
	○ Explique brevemente qué es y para qué sirve MySQL Workbench.
MySQL Workbench es una herramienta visual y un entorno integrado de desarrollo diseñado
para trabajar con bases de datos MySQL.
Funciones Clave de MySQL Workbench:
- Diseño y modelado de bases de datos
- Desarrollo de consultas SQL:
- Administración de usuarios y privilegios
- Migración de datos
- Monitoreo y optimización del rendimiento
- Generación de informes visuales
- Automatización de tareas

	○ En MySQL Workbench, "Server Status", identificar la versión de MySQL instalada.
Verificada la versión 9.3.0 (MySQL Community Server - GPL)

B. Seguridad en MySQL y Bases de Datos del Sistema/Usuario
1. Seguridad en Bases de Datos:
	○ Justificar por qué es importante implementar medidas de seguridad en un SGBD.
	Mencionar al menos 3 riesgos de seguridad comunes en bases de datos.
La seguridad de la base de datos garantiza la integridad, confidencialidad y disponibilidad de la información, aspectos 
vitales para la confiabilidad y el éxito de cualquier empresa
Hay medidas de seguridad en un SGBD para proteger datos sensibles contra el acceso no autorizado, el robo, la corrupción 
y los ciberataques

	○ Explicar el concepto de "privilegios" en MySQL.
En MySQL, los privilegios son permisos que controlan qué operaciones puede realizar un usuario en un servidor de base de datos,
como consultar, insertar, actualizar, o eliminar datos.
	○ ¿Por qué es una buena práctica asignar el mínimo privilegio necesario a los
	usuarios?
Al restringir el acceso innecesario, el principio de privilegio mínimo (también llamado principio de privilegio mínimo) 
ayuda a reducir el riesgo en una organización.

2. Bases de Datos del Sistema vs. Bases de Datos de Usuario:
	○ ¿Qué son las bases de datos del sistema en MySQL? ¿Cuál es su propósito
	principal? Nombrar algunas de las bases de datos del sistema.
La mysqlbase de datos es la base de datos del sistema. Contiene tablas que almacenan la información que el servidor 
MySQL necesita durante su ejecución.
Sirven para: 
- Administrar la seguridad: gestión de usuarios, contraseñas y permisos.
- Almacenar metadatos: información sobre las bases de datos, tablas, vistas, triggers, eventos y procedimientos almacenados.
- Dar soporte a características internas: como la replicación, el rendimiento y el monitoreo.
- Facilitar la administración: permiten al DBA (Administrador de Base de Datos) consultar información sobre el estado del 
servidor y sus objetos.
Algunas bases de datos del sistema en MySQL:
- mysql: Contiene tablas con usuarios, contraseñas, privilegios, configuraciones de seguridad y demás metadatos básicos.
- information_schema: Base de datos de solo lectura que guarda metadatos de todas las demás bases: tablas, columnas, vistas, restricciones, etc.
- performance_schema: Diseñada para recolectar métricas de rendimiento y eventos de ejecución en el servidor.

	○ Definir qué son las bases de datos de usuario.
Una base de datos de usuario es un sistema organizado, generalmente electrónico, que almacena información específica sobre 
los usuarios de una aplicación o sistema, incluyendo sus datos personales, preferencias y actividades.

3. Gestión de Usuarios y Privilegios:
	○ Conectarse a MySQL utilizando algún cliente (mysql client, Workbench como root.)
	○ Crear un nuevo usuario llamado admin_db con una contraseña.*/
CREATE USER 'admindb'@'localhost' IDENTIFIED BY '123';
	/*
	○ Asignar al usuario creado privilegios para crear, modificar y eliminar bases de datos
	(CREATE, ALTER, DROP on *.*). */
GRANT CREATE, ALTER, DROP ON *.* TO 'admindb'@'localhost';
FLUSH PRIVILEGES; 
    /*
	○ Crear otro usuario llamado app_user con una contraseña. Inicialmente, no asignar
	ningún privilegio a este usuario.*/
CREATE USER 'app_user'@'localhost' IDENTIFIED BY 'otra_contraseña_segura';
FLUSH PRIVILEGES;
/*	○ Intentar acceder a MySQL Workbench con el usuario app_user y verificar:
	○ ¿Qué bases de datos puede ver?
Sólo puede ver las bases de datos del sistema MySQL
    ○ ¿Puede crear una nueva base de datos? Explicar.
No puede crear una base de datos nueva, ya que no tiene priviligios de create
	○ Conectarse nuevamente como root.
	○ Otorgar al usuario app_user privilegios para seleccionar, insertar, actualizar y
	eliminar datos (SELECT, INSERT, UPDATE, DELETE) en cualquier tabla de una
	base de datos específica (ej: mi_db)*/
GRANT SELECT, INSERT, UPDATE, DELETE ON pedidos.* TO 'app_user'@'localhost';
/*	○ Si mi_db no existe, ¿el comando anterior da error?
Sí, pero por eso utilice el acceso para la BD usada en los puntos anteriores
	○ Intente nuevamente acceder a MySQL Workbench con el usuario app_user.
	○ ¿Puede este usuario crear la base de datos mi_db? ¿Por qué sí o por qué no?
puede ver la base a la que le dí acceso, pero no puede crear ninguna otra BD ya que no le dí create privileges
4. Exploración de Bases de Datos del Sistema:
	○ Conectarse a MySQL Workbench como root.
	○ Explorar las bases de datos mysql, information_schema y performance_schema.
	○ En la base de datos mysql, buscar la tabla user. ¿Qué información contiene esta
	tabla?
La tabla mysql.user tiene a todos los usuarios creados en MySQL, con su debida información de privilegios
	○ En la base de datos information_schema, explorar la tabla SCHEMATA. ¿Qué 
    información proporciona sobre las bases de datos existentes en su sistema MySQL?
Contiene la información inicial de la naturaleza de datos guardada encada BD, como los CHARACTER_SET y COLLATION_NAME
	○ En la base de datos performance_schema, explorar algunas tablas threads y
events_statements_summary_by_digest. ¿Qué tipo de información se almacena en
estas tablas?
En MySQL, la base de datos performance_schema sirve para monitorear y analizar el rendimiento interno del servidor.
Entre sus muchas tablas, threads y events_statements_summary_by_digest son muy usadas para diagnosticar problemas de rendimiento

C. Monitorización y Mantenimiento de MySQL

1. Monitorización:
	○ ¿Por qué es fundamental monitorizar el rendimiento y el estado de un servidor
	MySQL? Mencionar al menos 3 métricas importantes que deberían ser
	monitoreadas.
Es fundamental monitorizar el rendimiento y el estado de un servidor MySQL porque permite detectar cuellos de botella antes de que impacten
en los usuarios y ayuda a optimizar consultas y configuraciones para mejorar la eficiencia.
Métricas:
 1- Uso de consultas y su rendimiento
 2- Consumo de recursos del servidor
 3- Bloqueos y concurrencia

	○ ¿Qué herramientas o comandos nativos de MySQL se pueden utilizar para obtener
	información sobre el estado del servidor?
Los principales comandos nativos son:
SHOW STATUS - muestra contadores globales de actividad del servidor
SHOW VARIABLES - lista de parámetros de configuración actuales del servidor
SHOW PROCESSLIST - muestra las conexiones activas y qué consulta está ejecutando cada hilo
SHOW ENGINE INNODB STATUS - información detallada de InnoDB: bloqueos, transacciones activas, buffers, etc.
EXPLAIN - Permiten analizar el plan de ejecución de una consulta SQL

2. Mantenimiento:
	○ Explicar la importancia de los backups regulares en un entorno de base de datos.
	¿Qué estrategias de backup existen?
Los backups regulares son esenciales porque aseguran la recuperación de la base de datos ante fallos de hardware, errores humanos, corrupción de datos
o ataques, garantizando la continuidad del negocio y el cumplimiento normativo. Sin respaldos, cualquier pérdida puede ser irreversible.
Existen distintas estrategias de backup: completos (copia total de la BD), incrementales (solo cambios desde el último backup), diferenciales 
(cambios desde el último completo), lógicos (mysqldump) y físicos (archivos de datos). También pueden ser en frío (BD apagada) o en caliente (BD activa).
Lo ideal es combinar varias según el tamaño y criticidad de la base.
	○ ¿Qué es la optimización de bases de datos y por qué es importante para el
	rendimiento? Mencionar 2 técnicas de optimización.
La optimización de bases de datos consiste en aplicar técnicas y ajustes para que las consultas, transacciones y operaciones se ejecuten de manera más 
rápida y eficiente, reduciendo el uso de recursos como CPU, memoria y disco. Es importante porque mejora el rendimiento del sistema, evita cuellos de 
botella y garantiza una mejor experiencia para los usuarios.
Dos técnicas comunes de optimización son:
- Uso adecuado de índices
- Normalización y desnormalización controlada

1. Monitorización Básica:
	○ Conectarse a la línea de comandos de MySQL como root.
	○ Ejecutar el comando SHOW PROCESSLIST;. ¿Qué información muestra y cuál es su
	utilidad?
Mustra todas las conexiones que tiene el servidor, sus estados y usuarios. Sirve para manejar la concurrencia
	○ Ejecutar SHOW STATUS LIKE 'Threads_connected%';. ¿Qué representa este valor?
Representa cuantas conexiones tiene base de datos 
	○ Ejecutar SHOW GLOBAL STATUS LIKE 'Com_select%';. ¿Qué muestra este
	comando?
Muestra el contador de cuántas veces se ha ejecutado la instrucción SELECT en el servidor MySQL desde que fue iniciado.
	○ En MySQL Workbench, "Server Status", observar la información en tiempo real.
	Identificar algunos de los parámetros visualizados en la línea de comandos.
En la linea de comandos se puede visualizar parámetros como “connections”: la cantidad de conexiones a ese servidor; “traffic”: que representa el trafico en ese servidor, así como “CPU/Load” que es la cantidad de CPU q está ocupando el server.

    
2. Mantenimiento: Backup y Restauración (Simulado):
	○ Crear una nueva base de datos llamada db_backup_test..
    */CREATE DATABASE db_backup_test;
    CREATE TABLE db_backup_test.productos (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nombre VARCHAR(100),
	precio DECIMAL(10, 2)
	);
	INSERT INTO db_backup_test.productos (nombre, precio) VALUES ('Laptop',
	1200.00), ('Teclado', 75.50);
    /*
	○ Crear una tabla dentro de db_backup_test con algunos datos de prueba.
	○ Desde la línea de comandos realizar un backup de la base de datos db_backup_test
	utilizando mysqldump.*/
	-- mysqldump -u root -p db_backup_test > db_backup_test_backup.sql
    /*
	○ Simula situación de "desastre": eliminar la base de datos db_backup_test.
    */
	DROP DATABASE db_backup_test;
    /*
	○ Restaurar la base de datos desde el archivo de backup utilizando el siguiente
	comando: 
	-- mysql -u root -p < db_backup_test_backup.sql
	○ Verificar que la base de datos db_backup_test ha sido restaurada correctamente.
La base de datos fue restaurada exitosamente siguiendo esta línea de comandos y agregando un create database if not exists en el archivo db_backup_test_backup.sql

3. Mantenimiento: Optimización (Conceptual):
	○ Investigar el comando OPTIMIZE TABLE en MySQL. ¿Para qué se utiliza y en qué
	situaciones sería beneficioso?
El comando OPTIMIZE TABLE en MySQL se utiliza para reorganizar y desfragmentar el almacenamiento de una tabla, mejorando el rendimiento en ciertas situaciones.
Puede recuperar espacio no utilizado, reorganiza los datos y actualiza estadísticas. En InnoDB recrea la tabla y reconstruye índices.
	○ ¿Por qué es importante el uso de índices en la optimización de consultas? Explicar
	brevemente.
Los índices en MySQL (y en cualquier motor de bases de datos) son estructuras de datos adicionales que permiten acceder más rápido a los registros, sin tener que recorrer toda la tabla fila por fila.


D. Pruebas y Ajustes, Arquitectura Cliente-Servidor y Conexión de Aplicaciones
Objetivos:
● Comprender la importancia de las pruebas y ajustes en bases de datos.
● Entender la arquitectura cliente-servidor en el contexto de bases de datos.
● Conectar una aplicación simple a una base de datos MySQL local.
● Discutir los desafíos y consideraciones de conexión a bases de datos en la nube.
	1. Pruebas y Ajustes:
		○ ¿Por qué son importantes las fases de pruebas y ajustes en el ciclo de vida de una
		base de datos?
        Las fases de pruebas y ajustes son importantes porque permiten entregar una base de datos estable, confiable, rápida y segura, evitando fallas costosas o pérdida de datos en producción.
        
        ○ Mencionar al menos 3 tipos de pruebas que se pueden realizar en una base de
		datos.
        - Pruebas de funcionalidad
        Verifican que las consultas, procedimientos, triggers y reglas de negocio funcionen como se espera.
        - Pruebas de rendimiento
        Evalúan la rapidez y eficiencia de consultas e inserciones bajo diferentes cargas de trabajo.
        - Pruebas de seguridad
        Validan que los usuarios solo tengan los permisos necesarios y que los datos sensibles estén protegidos.
        
	2. Arquitectura Cliente-Servidor:
		○ Explicar el concepto de arquitectura Cliente-Servidor en el contexto de los SGBD.
		Identificar el "cliente" y el "servidor" en esta arquitectura.
        En un SGBD bajo arquitectura cliente-servidor:
        Servidor = motor de base de datos que gestiona y responde.
        Cliente = aplicación o interfaz que envía solicitudes y muestra los resultados.
        
		○ ¿Cuáles son las ventajas de una arquitectura cliente-servidor para las bases de
		datos?
        El modelo cliente-servidor centraliza la gestión de datos, mejora la seguridad y rendimiento, y facilita la escalabilidad y el mantenimiento de la base de datos.
	
    3. Conexión a Bases de Datos:
		○ ¿Qué es una cadena de conexión (connection string) y qué información suele
		contener para conectarse a una base de datos MySQL?
        Una cadena de conexión (o connection string) es un conjunto de parámetros que una aplicación utiliza para conectarse a una base de datos. Funciona como una “dirección” que le indica al cliente cómo y dónde acceder al servidor de base de datos.
        
		○ ¿Cuáles son las principales diferencias y consideraciones al conectar una aplicación
		a una base de datos MySQL local versus una base de datos MySQL en la nube (ej:
		Amazon RDS, Google Cloud SQL)?
        Local:
			Host: localhost o 127.0.0.1.
            Baja latencia y acceso rápido.
            Seguridad controlada internamente.
            Mantenimiento y escalabilidad limitados por el hardware.
            Costos fijos (hardware y administración).
		Nube (Amazon RDS, Cloud SQL):
			Host: endpoint público o privado.
			Mayor latencia, depende de Internet.
            Seguridad: firewalls, SSL y gestión de credenciales.
            Escalable y con mantenimiento gestionado por el proveedor.
            Pago por uso según instancia, almacenamiento y tráfico.

	1. Simulación de Pruebas de Rendimiento:
		○ Suponiendo una tabla con millones de registros. ¿Cómo se podría simular una
		"prueba de rendimiento" para evaluar la velocidad de una consulta SELECT
		compleja? ¿Qué métricas interesan?
        Preparar la prueba:
			Usar datos reales o generar datos sintéticos.
            Ejecutar en un entorno similar a producción.
		Ejecutar la consulta:
			Correr la consulta varias veces para promediar resultados.
            Usar EXPLAIN para ver si se usan índices y el plan de ejecución.
		Métricas importantes:
			Tiempo de respuesta total.
            Uso de CPU y memoria.
            Lecturas de disco (I/O).
            Filas examinadas vs. filas devueltas.
            Aprovechamiento de índices.

		○ ¿Qué ajustes podría considerar para mejorar el rendimiento de esa consulta?
		Ajustes posibles:
			Crear/optimizar índices.
            Reescribir consultas complejas.
            Considerar particionamiento o vistas materializadas.
            
	2. Conexión de Aplicación a MySQL Local
		○ Crear una Base de Datos y Tabla de Prueba:
			■ Crear una nueva base de datos llamada mi_db.
			■ Cree una tabla llamada usuarios con los siguientes campos
			id (PRIMARY KEY, AUTO_INCREMENT),
			nombre (VARCHAR),
			email (VARCHAR único).

			CREATE DATABASE mi_app_db;
			USE mi_app_db;
			CREATE TABLE usuarios (
			id INT PRIMARY KEY AUTO_INCREMENT,
			nombre VARCHAR(100) NOT NULL,
			email VARCHAR(100) UNIQUE NOT NULL
			);
		○ Escribir un Script de Conexión:
			■ Escriba un script que realice las siguientes operaciones:
			1. Conectarse a la base de datos mi_db utilizando el usuario app_user
			o root.
			2. Insertar al menos 2 registros en la tabla usuarios.
			3. Consultar todos los registros de la tabla usuarios y mostrarlos por
			consola.
			4. Cerrar la conexión a la base de datos.
            -------------------
		import mysql.connector
		# 1. Conectar a la base de datos
		conn = mysql.connector.connect(
			host="localhost",
			user="root",          # o "app_user" si lo configuraste
			password="tu_password",
			database="mi_app_db"
		)
		cursor = conn.cursor()
        
		# 2. Insertar al menos 2 registros
		usuarios = [
			("Agustina Bosia", "agustina@mail.com"),
			("Maria Perez", "maria@mail.com")
		]
		insert_query = "INSERT INTO usuarios (nombre, email) VALUES (%s, %s)"
		cursor.executemany(insert_query, usuarios)
		conn.commit()  # confirmar cambios
        
		# 3. Consultar todos los registros y mostrarlos
		cursor.execute("SELECT * FROM usuarios")
		for fila in cursor.fetchall():
			print(fila)

		# 4. Cerrar la conexión
		cursor.close()
		conn.close()
			------------------------
            
	3. Conexión a la Nube (Investigación y Debate):
		○ Investigar al menos un servicio de base de datos MySQL gestionado en la nube (ej:
		Amazon RDS for MySQL, Google Cloud SQL for MySQL, Azure Database for
		MySQL).
        Tome el ejemplo de Google Cloud SQL for MySQL:
        Google Cloud SQL for MySQL es un servicio de base de datos relacional completamente administrado que te permite usar MySQL 
        en la infraestructura de Google Cloud Platform (GCP). Ofrece la potencia y las funcionalidades de MySQL sin la complejidad de
        tener que configurar, mantener y administrar la base de datos tú mismo, liberándote para centrarte en tus datos. 
        
		○ Enumerar al menos 3 ventajas y 2 desventajas de utilizar una base de datos en la
		nube en comparación con una base de datos local.
        Bases de Datos en la Nube:
		Ventajas
		- Escalabilidad y flexibilidad: Permiten aumentar o disminuir los recursos rápidamente según las necesidades del negocio, pagando solo por lo que se usa. 
		- Menores costos iniciales: Se elimina la necesidad de una inversión inicial significativa en hardware e infraestructura, ya que se basa en un modelo de pago por uso. 
		- Mantenimiento reducido: El proveedor de la nube se encarga del mantenimiento, las actualizaciones de software y los parches de seguridad. 
		Desventajas
		- Dependencia del proveedor: La organización depende del proveedor de la nube para la seguridad y la disponibilidad de los datos. 
		- Posibles problemas de seguridad: Aunque los proveedores invierten en seguridad, existe un riesgo inherente al compartir infraestructura y ceder control. 
				
		○ ¿Qué consideraciones de seguridad adicionales se deben tener en cuenta al
		conectar una aplicación a una base de datos en la nube?
        Al conectar una aplicación a una base de datos en la nube, es crucial implementar el cifrado de datos en tránsito y en reposo, así como controles de acceso robustos 
        mediante autenticación multifactor y permisos granulares. Se deben proteger las comunicaciones de red con firewalls y redes privadas virtuales (VPN), segmentar la red 
        y utilizar soluciones de seguridad nativas en la nube para una protección integral y detección temprana de amenazas. 
        

*/

/*
UNIDAD 2
Unidad 2: Administración y gestión de bases de datos.
Creación y configuración de Base de datos. Gestión de Usuarios y permisos. Monitorización de
rendimiento. Mantenimiento de Base de Datos. Auditoría y registro de eventos. Seguridad en base de
datos. Backup. Restauración. Estrategias. Estrategias de Respaldo y Restauración. Plan de respaldo.
Pruebas de restauración. Registro de respaldo. Plan de recuperación ante incidentes. Medios de
almacenamiento. Redundancia. Redundancia de datos. Redundancia de hardware. Estrategias de
caché en bases de datos. Caché de datos. Caché de consulta.
Trabajo Práctico 2: Administración y gestión de bases de datos
A. Creación, Configuración y Gestión de Usuarios y Permisos
Objetivos:
● Crear y configurar bases de datos en MySQL.
● Administrar usuarios y asignar/revocar privilegios.
● Comprender el modelo de seguridad basado en privilegios de MySQL.
    
	1. Creación y Configuración de Bases de Datos:
		○ ¿Cuál es la diferencia entre una "base de datos" y un "esquema" en MySQL?
		○ Mencione y explique brevemente al menos tres parámetros de configuración
		importantes que se pueden ajustar en el archivo my.cnf (o my.ini) de MySQL para
		influir en el rendimiento o comportamiento del servidor.
	2. Gestión de Usuarios y Permisos:
		○ Describir la diferencia entre los privilegios GRANT ALL PRIVILEGES y GRANT
		SELECT, INSERT, UPDATE, DELETE sobre una base de datos específica. ¿Cuándo
		usaría cada uno?
	1. Creación y Configuración Básica:
		○ Conectarse al servidor MySQL local como root.
		○ Crear una base de datos llamada tp_db.
		○ CREATE DATABASE tp_aplicadas_db;
		○ Dentro de tp_db, crear una tabla llamada productos con las siguientes columnas:
			■ id_producto (INT, PRIMARY KEY, AUTO_INCREMENT)
			■ nombre (VARCHAR(100), NOT NULL)
			■ precio (DECIMAL(10, 2), NOT NULL)
			■ stock (INT, DEFAULT 0)
		○ USE tp_aplicadas_db;
		○ CREATE TABLE productos (
		○ id_producto INT PRIMARY KEY AUTO_INCREMENT,
		○ nombre VARCHAR(100) NOT NULL,
		○ precio DECIMAL(10, 2) NOT NULL,
		○ stock INT DEFAULT 0
		○ );
		○ Inserta 3 registros de ejemplo en la tabla productos.
		○ INSERT INTO productos (nombre, precio, stock) VALUES
		○ ('Laptop Gamer', 1500.00, 10),
		○ ('Mouse Inalámbrico', 25.99, 50),
		○ ('Teclado Mecánico', 89.99, 20);
		○
		○ Gestión de Usuarios y Permisos:
		○ Crear un nuevo usuario llamado dev_user que solo pueda conectarse desde
		localhost.
		○ CREATE USER 'dev_user'@'localhost' IDENTIFIED BY 'DevPass123!';
		○ Asignar a dev_user los privilegios SELECT, INSERT, UPDATE, DELETE sobre la
		base de datos tp_db.
		○ GRANT SELECT, INSERT, UPDATE, DELETE ON tp_db.* TO 'dev_user'@'localhost';
		○ FLUSH PRIVILEGES;
		○ Crear otro usuario llamado report_user que también sólo pueda conectarse desde
		localhost.
		○ CREATE USER 'report_user'@'localhost' IDENTIFIED BY 'ReportPass!';
		○ Asignar a report_user únicamente el privilegio SELECT sobre la tabla productos
		dentro de tp_db.
		○ Prueba de Permisos:
		■ Intentar conectarse a MySQL como dev_user.
		■ INSERTAR un nuevo producto.
		■ ELIMINAR un producto.
		■ CREAR una nueva tabla en tp_db. Documentar resultados.
		■ Intente conectarse a MySQL como report_user.
		■ SELECCIONAR datos de tp_db.productos.
		■ INSERTAR un nuevo producto en tp_db.productos.
		■ SELECCIONAR datos de otra tabla (si existe) en tp_db o de una base de
		datos del sistema como mysql.user. Documentar sus resultados.
        
B. Monitorización de Rendimiento y Mantenimiento de Base de Datos
Objetivos:
● Identificar métricas clave de rendimiento en MySQL.
● Utilizar comandos y herramientas para monitorizar el estado del servidor.
● Realizar tareas básicas de mantenimiento para optimizar el rendimiento.

	1. Monitorización de Rendimiento:
		○ Mencionar al menos 4 métricas de rendimiento importantes que un administrador de
		bases de datos debería monitorizar en MySQL y explique brevemente por qué son
		relevantes.
		○ ¿Qué es el EXPLAIN de una consulta SQL y cómo ayuda a la optimización del
		rendimiento?
	2. Mantenimiento de Base de Datos:
		○ ¿Por qué es importante realizar tareas de mantenimiento regular en una base de
		datos?
		○ Explicar la diferencia entre OPTIMIZE TABLE y ANALYZE TABLE en MySQL.
		¿Cuándo se aplica cada uno de los comandos?
	1. Monitorización Básica:
		○ Conectarse a la línea de comandos de MySQL como root.
		○ Ejecutar SHOW PROCESSLIST;. Verificar información y cómo podría usarla para
		identificar problemas.
		○ Ejecutar los SHOW STATUS LIKE 'Threads_connected'; y SHOW STATUS LIKE
		'Questions';. Explique qué representan estos valores.
		○ Ejecutar SHOW GLOBAL STATUS LIKE 'Innodb_buffer_pool_reads'; y SHOW
		GLOBAL STATUS LIKE 'Innodb_buffer_pool_read_requests';. ¿Qué indican estos
		dos valores sobre el uso del buffer pool de InnoDB?
		○ En MySQL Workbench, explorar la sección "Performance Dashboard" o "Server
		Status". Identifique al menos 3 métricas que considere útiles para la monitorización
		en tiempo real.
	2. Análisis y Optimización de Consultas:
		○ En tp_db.productos, insertar registros de prueba (10,000 a 50,000) con datos
		aleatorios para nombre, precio y stock.
		○ Ejecutar la siguiente consulta y observe su tiempo de ejecución:
		○ SELECT * FROM productos WHERE nombre LIKE 'Producto%';
		○ Ejecutar EXPLAIN para la misma consulta:
		○ EXPLAIN SELECT * FROM productos WHERE nombre LIKE 'Producto%';
		○ Analizar la salida de EXPLAIN. Verificar información de cómo MySQL ejecuta la
		consulta.
		○ Crear un índice en la columna nombre:
		○ CREATE INDEX idx_nombre ON productos (nombre);
		○ Ejecutar la consulta
		○ SELECT * FROM productos WHERE nombre LIKE 'Producto%';
		○ Ejecutar EXPLAIN para la misma consulta.
		○ Comparar los tiempos de ejecución y la salida de EXPLAIN antes y después de crear
		el índice. ¿Qué diferencias se observan y por qué?
	3. Mantenimiento de Tablas:
		○ Ejecutar OPTIMIZE TABLE productos; en tp_db. ¿Qué mensaje obtiene y cuándo es
		útil este comando?.
		○ Ejecutar ANALYZE TABLE productos;. ¿Cuál es el propósito de este comando?

*/