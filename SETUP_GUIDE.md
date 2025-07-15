# 🛠️ Guía Completa de Configuración - Clon MercadoLibre

## 📋 Requisitos Previos

Antes de comenzar, necesitas tener instalado:

### 1. Node.js (para el Frontend)
```bash
# Verificar si Node.js está instalado
node --version
npm --version

# Si no está instalado, descarga desde: https://nodejs.org/
# Recomendado: versión LTS (18.x o superior)
```

### 2. Python (para el Backend)
```bash
# Verificar si Python está instalado
python --version
# o
python3 --version

# Debe ser Python 3.8 o superior
# Si no está instalado, descarga desde: https://python.org/
```

### 3. PostgreSQL (Base de Datos)
```bash
# En Ubuntu/Debian:
sudo apt update
sudo apt install postgresql postgresql-contrib

# En macOS con Homebrew:
brew install postgresql

# En Windows:
# Descargar desde: https://www.postgresql.org/download/windows/
```

---

## 🗄️ PASO 1: Configurar PostgreSQL

### 1.1 Iniciar PostgreSQL
```bash
# En Linux:
sudo service postgresql start

# En macOS:
brew services start postgresql

# En Windows:
# PostgreSQL se inicia automáticamente como servicio
```

### 1.2 Crear Base de Datos y Usuario
```bash
# Conectarse a PostgreSQL
sudo -u postgres psql
# o simplemente:
psql -U postgres

# Dentro de PostgreSQL, ejecutar:
CREATE DATABASE mercadolibre_db;
CREATE USER mercadolibre_user WITH PASSWORD 'mi_password_seguro';
GRANT ALL PRIVILEGES ON DATABASE mercadolibre_db TO mercadolibre_user;

# Salir de PostgreSQL
\q
```

---

## 🐍 PASO 2: Configurar el Backend (Django)

### 2.1 Crear Directorio del Proyecto
```bash
# Crear directorio principal
mkdir mercadolibre-clone
cd mercadolibre-clone

# El directorio backend ya existe en tu proyecto
# Si no existiera, lo crearías así:
# mkdir backend
```

### 2.2 Configurar Entorno Virtual de Python
```bash
# Navegar al directorio backend
cd backend

# Crear entorno virtual
python -m venv venv
# o en algunos sistemas:
python3 -m venv venv

# Activar entorno virtual
# En Windows:
venv\Scripts\activate
# En macOS/Linux:
source venv/bin/activate

# Verificar que el entorno esté activo (debe aparecer (venv) en el prompt)
```

### 2.3 Instalar Dependencias de Python
```bash
# Asegúrate de estar en el directorio backend con el entorno virtual activo
pip install --upgrade pip
pip install -r requirements.txt

# Si hay errores, instalar dependencias una por una:
pip install Django==4.2.7
pip install djangorestframework==3.14.0
pip install django-cors-headers==4.3.1
pip install psycopg2-binary==2.9.7
pip install Pillow==10.0.1
pip install django-filter==23.3
pip install python-decouple==3.8
pip install djangorestframework-simplejwt==5.3.0
```

### 2.4 Configurar Variables de Entorno
```bash
# Copiar archivo de configuración
cp .env.example .env

# Editar .env con tus datos (usar nano, vim, o tu editor favorito)
nano .env
```

Contenido del archivo `.env`:
```env
SECRET_KEY=django-insecure-tu-clave-secreta-muy-larga-y-segura
DEBUG=True
DB_NAME=mercadolibre_db
DB_USER=mercadolibre_user
DB_PASSWORD=mi_password_seguro
DB_HOST=localhost
DB_PORT=5432
```

### 2.5 Configurar Base de Datos
```bash
# Crear migraciones
python manage.py makemigrations

# Aplicar migraciones
python manage.py migrate

# Crear superusuario para el admin (opcional pero recomendado)
python manage.py createsuperuser
# Seguir las instrucciones para crear usuario admin
```

### 2.6 Poblar Base de Datos con Datos de Ejemplo
```bash
# Ejecutar script de población
python populate_data.py
```

### 2.7 Probar el Backend
```bash
# Iniciar servidor de desarrollo
python manage.py runserver

# Deberías ver algo como:
# Starting development server at http://127.0.0.1:8000/
# Quit the server with CONTROL-C.
```

Verificar que funciona:
- Abrir navegador en `http://localhost:8000/admin` (panel de administración)
- Probar API en `http://localhost:8000/api/categories/` (debe mostrar JSON)

---

## ⚛️ PASO 3: Configurar el Frontend (React)

### 3.1 Abrir Nueva Terminal
```bash
# Abrir nueva terminal/consola (mantener el backend ejecutándose)
# Navegar al directorio raíz del proyecto
cd /ruta/a/mercadolibre-clone
```

### 3.2 Instalar Dependencias de Node.js
```bash
# Verificar que package.json existe
ls -la package.json

# Instalar dependencias
npm install

# Si hay errores, limpiar caché y reinstalar:
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### 3.3 Configurar Variables de Entorno del Frontend
```bash
# Crear archivo de configuración
echo "VITE_API_URL=http://localhost:8000/api" > .env.local
```

### 3.4 Probar el Frontend
```bash
# Iniciar servidor de desarrollo
npm run dev

# Deberías ver algo como:
# Local:   http://localhost:5173/
# Network: use --host to expose
```

---

## 🚀 PASO 4: Ejecutar Ambos Servidores

### Opción A: Manualmente (Recomendado para desarrollo)

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate  # En Windows: venv\Scripts\activate
python manage.py runserver
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### Opción B: Con Scripts Automáticos
```bash
# Hacer ejecutables los scripts
chmod +x start-backend.sh
chmod +x start-frontend.sh
chmod +x start-all.sh

# Ejecutar todo automáticamente
./start-all.sh
```

---

## 🌐 PASO 5: Verificar que Todo Funciona

### 5.1 URLs a Verificar:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000/api
- **Admin Django**: http://localhost:8000/admin

### 5.2 Pruebas Básicas:
1. **Frontend**: Debe cargar la página principal con categorías
2. **API**: `http://localhost:8000/api/categories/` debe mostrar JSON
3. **Admin**: Debe permitir login con el superusuario creado

---

## 🔧 PASO 6: Solución de Problemas Comunes

### Error: "No module named 'django'"
```bash
# Verificar que el entorno virtual esté activo
source venv/bin/activate
pip install django
```

### Error: "database does not exist"
```bash
# Recrear base de datos
sudo -u postgres psql
DROP DATABASE IF EXISTS mercadolibre_db;
CREATE DATABASE mercadolibre_db;
GRANT ALL PRIVILEGES ON DATABASE mercadolibre_db TO mercadolibre_user;
\q

# Ejecutar migraciones nuevamente
python manage.py migrate
```

### Error: "Failed to fetch" en el frontend
```bash
# Verificar que el backend esté ejecutándose
curl http://localhost:8000/api/categories/

# Verificar configuración CORS en backend/mercadolibre_backend/settings.py
```

### Error: "Port 5173 is already in use"
```bash
# Matar proceso en el puerto
sudo lsof -ti:5173 | xargs kill -9
# o usar otro puerto
npm run dev -- --port 3000
```

---

## 📁 Estructura Final del Proyecto

```
mercadolibre-clone/
├── backend/                    # Backend Django
│   ├── venv/                  # Entorno virtual Python
│   ├── accounts/              # App usuarios
│   ├── categories/            # App categorías
│   ├── products/              # App productos
│   ├── orders/                # App órdenes
│   ├── mercadolibre_backend/  # Configuración Django
│   ├── .env                   # Variables de entorno
│   ├── manage.py              # Script Django
│   └── requirements.txt       # Dependencias Python
├── src/                       # Frontend React
│   ├── components/            # Componentes React
│   ├── hooks/                 # Custom hooks
│   ├── services/              # Servicios API
│   └── main.tsx              # Punto de entrada
├── node_modules/              # Dependencias Node.js
├── .env.local                 # Variables entorno frontend
├── package.json               # Configuración Node.js
├── start-backend.sh           # Script inicio backend
├── start-frontend.sh          # Script inicio frontend
├── start-all.sh              # Script inicio completo
└── README.md                 # Documentación
```

---

## ✅ Checklist Final

- [ ] PostgreSQL instalado y ejecutándose
- [ ] Python 3.8+ instalado
- [ ] Node.js 16+ instalado
- [ ] Base de datos creada
- [ ] Entorno virtual Python creado y activo
- [ ] Dependencias Python instaladas
- [ ] Archivo .env configurado
- [ ] Migraciones ejecutadas
- [ ] Datos de ejemplo cargados
- [ ] Backend ejecutándose en puerto 8000
- [ ] Dependencias Node.js instaladas
- [ ] Frontend ejecutándose en puerto 5173
- [ ] Ambos servidores comunicándose correctamente

¡Tu clon de MercadoLibre está listo para usar! 🎉