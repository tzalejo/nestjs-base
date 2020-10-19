# NestJS API
API escripto en Nest.js

## Instalar postgres
```bash
# @nestjs/typeorm -> las importanciones de los paquetes
# typorm -> gestor paquetes
# pg -> drivers para postgres
npm i --save @nestjs/typeorm typeorm pg
# configuramos el debugg
creamos el archivo con la configuracion .vscode/launch.json
# instalamos dependencia de desarrolla para:
Para variables de entorno (Uso solo en desarrollo).
npm i -D dotenv @types/dotenv
# modulos:
nest g module config
# Conexion db con docker
# definir las variable de .env
docker-compose up -d
# Correr migraciones(verificar las credenciales con orm.config.json)
npm run migration:run 
# instalamos ts-node
npm i -g ts-node
# instalamos ts-mapper para convertir un objeto de un tipo a otro tipo
npm i ts-mapper
# 
npm i class-validator

# para auth
npm i @nestjs/passport @nestjs/jwt passport-jwt bcryptjs jsonwebtoken passport class-transformer
# para ayuda desarrollo a typescript
npm i -D @types/bcryptjs @types/passport @types/passport-jwt
```

## Debugger
```bash
# Crear un carpeta : .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Nest Framework",
      "runtimeArgs": ["--nolazy", "-r", "ts-node/register"],
      "args": ["${workspaceFolder}/src/main.ts"],
      "autoAttachChildProcesses": true
    }
  ]
}
# y luego con f5 podemos usar el debugger
```