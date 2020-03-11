# Manejo de sesiones usando middleware

## Descripción

Existen 3 tipos de usuario, Admin, Usuario e Invitado. 
El Admin tiene acceso a users y dashboard. El usuario solo tiene acceso a dashboard y el Invitado solo al home. 

## Requerimientos

El sistema depende de que tengas [Knex.js](http://knexjs.org/) instalado de forma global.

```bash
npm i knex -g
```

## Instalación

1. Guarda el archivo .env.example como .env y modifica las variables para que coincidan con tu ambiente

```bash
cp .env.example .env
```

2. Instala los paquetes indicados en el `package.json`

```bash
npm install
```
