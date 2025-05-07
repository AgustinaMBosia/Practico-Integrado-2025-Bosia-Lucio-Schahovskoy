/backend
  /handlers    → Recibe request y devuelve response
  /models      → Define estructuras que representan tablas
  /services    → Lógica de negocio (consultas, reglas)
  /routes      → Asocia rutas HTTP a handlers
  /middlewares → Cosas que se ejecutan antes de entrar a los handlers (ej: validar token)
  /config      → Configuraciones como conexión a DB
main.go        → El archivo principal que arranca todo
