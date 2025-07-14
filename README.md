## 🏆 Campeonato de Fulbito - Sistema de Gestión

Sistema web para la gestión completa de un campeonato de fulbito, incluyendo registro de equipos, jugadores, calendario de partidos y tabla de posiciones, con autenticación por JWT.

---

### 🔗 Enlaces en Producción

* 🌐 **Frontend (React + Vite + Vercel)**
  👉 [https://campeonato-fulbito-pi.vercel.app](https://campeonato-fulbito-pi.vercel.app)

* 🔐 **Backend (Django + DRF + Railway)**
  👉 [https://campeonato-fulbito-production.up.railway.app/admin/](https://campeonato-fulbito-production.up.railway.app/admin/)

---

### 💻 Funcionalidades Principales

* Inicio de sesión seguro con JWT
* Registro de equipos y jugadores (solo usuarios autenticados)
* Visualización pública de:

  * 🗕️ Calendario de partidos por etapa
  * 📊 Tabla de posiciones por torneo
* Registro y visualización de eventos en partidos
* Panel de administración completo en Django Admin

---

### 🧪 Usuarios de prueba

Puedes ingresar al panel de administración con:

```bash
Usuario: admin
Contraseña: ******** (protegido)
```

> ⚠️ Se recomienda cambiar la contraseña en producción o usar usuarios personalizados.

---

### 🛠️ Tecnologías Usadas

* **Frontend**: React + Vite + Tailwind + React Router + React Query
* **Backend**: Django 5 + Django REST Framework + Simple JWT
* **Base de datos**: PostgreSQL en Railway
* **Deploy**:

  * Frontend: Vercel
  * Backend: Railway

---

### 📂 Estructura del proyecto

```
campeonato_fulbito/
├── backend/           # Django + DRF
│   └── campeonato/    # App principal
│   └── fulbito/       # Configuración del proyecto
├── frontend/          # React + Vite
    └── src/
        └── pages/     # Pantallas principales (Login, Equipos, etc.)
        └── context/   # Contexto de autenticación
```

---

### 🚀 Instrucciones de despliegue (resumen)

#### Frontend (Vercel)

* Proyecto conectado a GitHub
* Variables de entorno no necesarias
* Se hace build automáticamente con cada push a `main`

#### Backend (Railway)

* Variables de entorno necesarias:

  ```env
  DJANGO_SECRET_KEY=tu_clave_secreta
  ALLOWED_HOSTS=campeonato-fulbito-production.up.railway.app
  ```
* Comandos:

  ```bash
  railway run python manage.py migrate
  railway run python manage.py createsuperuser
  ```

---

### 👨‍💼 Autor

* Joao de la Cruz
  [github.com/De4master](https://github.com/De4master)
