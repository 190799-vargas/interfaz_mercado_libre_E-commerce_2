#!/bin/bash

echo "🚀 Iniciando Backend de MercadoLibre Clone..."

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para verificar si PostgreSQL está ejecutándose
check_postgresql() {
    if command -v pg_isready &> /dev/null; then
        if pg_isready -q; then
            echo -e "${GREEN}✅ PostgreSQL está ejecutándose${NC}"
            return 0
        else
            echo -e "${RED}❌ PostgreSQL no está ejecutándose${NC}"
            return 1
        fi
    else
        echo -e "${YELLOW}⚠️  No se puede verificar el estado de PostgreSQL${NC}"
        return 1
    fi
}

# Navegar al directorio backend
cd backend

# Verificar PostgreSQL
echo "🔍 Verificando PostgreSQL..."
if ! check_postgresql; then
    echo -e "${YELLOW}📋 Para iniciar PostgreSQL:${NC}"
    echo "  - Linux: sudo service postgresql start"
    echo "  - macOS: brew services start postgresql"
    echo "  - Windows: net start postgresql-x64-XX"
    echo ""
    read -p "¿PostgreSQL está ejecutándose? (y/n): " postgres_running
    if [[ ! $postgres_running =~ ^[Yy]$ ]]; then
        echo -e "${RED}❌ PostgreSQL debe estar ejecutándose para continuar${NC}"
        exit 1
    fi
fi

# Verificar si existe el entorno virtual
if [ ! -d "venv" ]; then
    echo "📦 Creando entorno virtual..."
    if command -v python3 &> /dev/null; then
        python3 -m venv venv
    elif command -v python &> /dev/null; then
        python -m venv venv
    else
        echo -e "${RED}❌ Python no encontrado${NC}"
        exit 1
    fi
fi

# Activar entorno virtual
echo "🔧 Activando entorno virtual..."
source venv/bin/activate

# Verificar que el entorno virtual esté activo
if [[ "$VIRTUAL_ENV" == "" ]]; then
    echo -e "${RED}❌ Error al activar el entorno virtual${NC}"
    exit 1
fi

# Instalar dependencias
echo "📚 Instalando dependencias..."
pip install --upgrade pip
if ! pip install -r requirements.txt; then
    echo -e "${RED}❌ Error al instalar dependencias${NC}"
    exit 1
fi

# Verificar configuración de base de datos
echo "🗄️  Verificando configuración de base de datos..."
if [ ! -f ".env" ]; then
    echo "⚠️  Archivo .env no encontrado. Copiando desde .env.example..."
    cp .env.example .env
    echo -e "${YELLOW}✏️  Archivo .env creado con credenciales por defecto${NC}"
fi

# Verificar conexión a la base de datos
echo "🔗 Verificando conexión a la base de datos..."
python -c "
import os
import django
from django.core.management import execute_from_command_line
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mercadolibre_backend.settings')
django.setup()
from django.db import connection
try:
    connection.ensure_connection()
    print('✅ Conexión a la base de datos exitosa')
except Exception as e:
    print(f'❌ Error de conexión a la base de datos: {e}')
    exit(1)
"

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ No se puede conectar a la base de datos${NC}"
    echo -e "${YELLOW}📋 Verifica que:${NC}"
    echo "  1. PostgreSQL esté ejecutándose"
    echo "  2. La base de datos 'mercadolibre_db' exista"
    echo "  3. El usuario 'mercadolibre_user' tenga permisos"
    echo "  4. Las credenciales en .env sean correctas"
    exit 1
fi

# Ejecutar migraciones
echo "🔄 Ejecutando migraciones..."
if ! python manage.py makemigrations; then
    echo -e "${RED}❌ Error al crear migraciones${NC}"
    exit 1
fi

if ! python manage.py migrate; then
    echo -e "${RED}❌ Error al aplicar migraciones${NC}"
    exit 1
fi

# Poblar base de datos con datos de ejemplo
echo "🌱 Poblando base de datos con datos de ejemplo..."
if ! python populate_data.py; then
    echo -e "${YELLOW}⚠️  Error al poblar datos de ejemplo (continuando...)${NC}"
fi

# Iniciar servidor
echo -e "${GREEN}🌐 Iniciando servidor Django en http://localhost:8000${NC}"
echo "📊 Panel de administración disponible en http://localhost:8000/admin"
echo "🔗 API disponible en http://localhost:8000/api"
echo ""
echo "Para detener el servidor, presiona Ctrl+C"
echo ""
