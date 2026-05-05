# portfolio-frontend

Frontend del portfolio personal. Consume la [portfolio-api](https://github.com/LautyDos/portfolio-api).

## Stack

- **Next.js 15** — App Router
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **Feature-Sliced Design (FSD)**

## Arquitectura

El proyecto sigue [Feature-Sliced Design](https://feature-sliced.design/). Las capas solo importan de las inferiores:

```
app/       ← providers y entry point
pages/     ← composición de widgets por vista
widgets/   ← bloques de UI autónomos
features/  ← acciones del usuario
entities/  ← modelos del dominio
shared/    ← utilidades, http client, componentes base
```

## Vistas

| Vista | Ruta | Descripción |
|---|---|---|
| Portfolio público | `/:userId` | Proyectos, experiencia y tecnologías del usuario |
| Login | `/login` | Autenticación con JWT |
| Dashboard | `/dashboard` | Panel de administración |

## Primeros pasos

```bash
npm install
npm run dev
```

Configurar las variables de entorno:

```bash
cp .env.example .env.local
```

| Variable | Descripción |
|---|---|
| `NEXT_PUBLIC_API_URL` | URL base de la portfolio-api |
