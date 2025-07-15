#!/bin/bash

echo "🚀 CONFIGURACIÓN RÁPIDA - CLON MERCADOLIBRE"
echo "=========================================="

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para imprimir con colores
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Verificar requisitos
echo "🔍 Verificando requisitos..."

# Verificar Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    print_status "Node.js encontrado: $NODE_VERSION"
else
    print_error "Node.js no encontrado. Instala desde https://nodejs.org/"
    exit 1
fi

# Verificar Python
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version)
    print_status "Python encontrado: $PYTHON_VERSION"
    PYTHON_CMD="python3"
elif command -v python &> /dev/null; then
    PYTHON_VERSION=$(python --version)
    print_status "Python encontrado: $PYTHON_VERSION"
    PYTHON_CMD="python"
else
    print_error "Python no encontrado. Instala desde https://python.org/"
    exit 1
fi

# Verificar PostgreSQL
if command -v psql &> /dev/null; then
    print_status "PostgreSQL encontrado"
else
    print_warning "PostgreSQL no encontrado en PATH. Asegúrate de que esté instalado."
fi

echo ""
echo "🗄️  CONFIGURANDO BASE DE DATOS..."

# Solicitar credenciales de base de datos
read -p "Nombre de la base de datos [mercadolibre_db]: " DB_NAME
DB_NAME=${DB_NAME:-mercadolibre_db}

read -p "Usuario de PostgreSQL [mercadolibre_user]: " DB_USER
DB_USER=${DB_USER:-mercadolibre_user}

read -s -p "Contraseña para $DB_USER: " DB_PASSWORD
echo ""

read -p "Host de la base de datos [localhost]: " DB_HOST
DB_HOST=${DB_HOST:-localhost}

read -p "Puerto de PostgreSQL [5432]: " DB_PORT
DB_PORT=${DB_PORT:-5432}

echo ""
echo "🐍 CONFIGURANDO BACKEND..."

# Navegar a backend
cd backend

# Crear entorno virtual si no existe
if [ ! -d "venv" ]; then
    print_info "Creando entorno virtual..."
    $PYTHON_CMD -m venv venv
    print_status "Entorno virtual creado"
fi

# Activar entorno virtual
print_info "Activando entorno virtual..."
source venv/bin/activate

# Actualizar pip
pip install --upgrade pip

# Instalar dependencias
print_info "Instalando dependencias de Python..."
pip install -r requirements.txt
print_status "Dependencias instaladas"

# Crear archivo .env
print_info "Configurando variables de entorno..."
cat > .env << EOF
SECRET_KEY=django-insecure-$(openssl rand -base64 32)
DEBUG=True
DB_NAME=$DB_NAME
DB_USER=$DB_USER
DB_PASSWORD=$DB_PASSWORD
DB_HOST=$DB_HOST
DB_PORT=$DB_PORT
EOF
print_status "Archivo .env creado"

# Ejecutar migraciones
print_info "Ejecutando migraciones..."
$PYTHON_CMD manage.py makemigrations
$PYTHON_CMD manage.py migrate
print_status "Migraciones completadas"

# Poblar base de datos
print_info "Poblando base de datos con datos de ejemplo..."
$PYTHON_CMD populate_data.py
print_status "Datos de ejemplo cargados"

# Preguntar si crear superusuario
echo ""
read -p "¿Deseas crear un superusuario para el admin? (y/n): " CREATE_SUPERUSER
if [[ $CREATE_SUPERUSER =~ ^[Yy]$ ]]; then
    $PYTHON_CMD manage.py createsuperuser
fi

cd ..

echo ""
echo "⚛️  CONFIGURANDO FRONTEND..."

# Instalar dependencias de Node.js
print_info "Instalando dependencias de Node.js..."
npm install
print_status "Dependencias de Node.js instaladas"

# Crear archivo .env.local
print_info "Configurando variables de entorno del frontend..."
echo "VITE_API_URL=http://localhost:8000/api" > .env.local
print_status "Configuración del frontend completada"

echo ""
echo "🎉 ¡CONFIGURACIÓN COMPLETADA!"
echo "=========================="
print_status "Backend configurado en: backend/"
print_status "Frontend configurado en: ./"
print_status "Base de datos: $DB_NAME"

echo ""
echo "🚀 PARA INICIAR EL PROYECTO:"
echo ""
echo "Opción 1 - Automático:"
echo "  ./start-all.sh"
echo ""
echo "Opción 2 - Manual:"
echo "  Terminal 1: ./start-backend.sh"
echo "  Terminal 2: ./start-frontend.sh"
echo ""
echo "URLs importantes:"
echo "  Frontend: http://localhost:5173"
echo "  Backend:  http://localhost:8000"
echo "  Admin:    http://localhost:8000/admin"
echo ""

# Preguntar si iniciar ahora
read -p "¿Deseas iniciar el proyecto ahora? (y/n): " START_NOW
if [[ $START_NOW =~ ^[Yy]$ ]]; then
    print_info "Iniciando proyecto..."
    ./start-all.sh
fi