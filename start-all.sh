#!/bin/bash

echo "🚀 Iniciando MercadoLibre Clone - Frontend y Backend"
echo "=================================================="

# Función para manejar la señal de interrupción
cleanup() {
    echo ""
    echo "🛑 Deteniendo servidores..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

# Configurar trap para manejar Ctrl+C
trap cleanup SIGINT

# Iniciar backend en segundo plano
echo "🔧 Iniciando Backend..."
cd backend

# Crear y activar entorno virtual si no existe
if [ ! -d "venv" ]; then
    python -m venv venv
fi

source venv/bin/activate
pip install -r requirements.txt

# Configurar base de datos
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "⚠️  Archivo .env creado. Configura tu base de datos PostgreSQL."
fi

python manage.py makemigrations
python manage.py migrate
python populate_data.py

# Iniciar servidor Django en segundo plano
python manage.py runserver &
BACKEND_PID=$!

cd ..

# Esperar hasta que el backend esté completamente listo
echo "⏳ Esperando a que el backend esté listo..."
BACKEND_URL="http://localhost:8000/api"
MAX_RETRIES=30
RETRY_COUNT=0

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    if curl -s -f "$BACKEND_URL" > /dev/null 2>&1; then
        echo "✅ Backend está listo!"
        break
    fi
    
    RETRY_COUNT=$((RETRY_COUNT + 1))
    echo "   Intento $RETRY_COUNT/$MAX_RETRIES - Esperando backend..."
    sleep 2
done

if [ $RETRY_COUNT -eq $MAX_RETRIES ]; then
    echo "❌ Error: El backend no respondió después de $MAX_RETRIES intentos"
    echo "   Verifica que PostgreSQL esté ejecutándose y la configuración sea correcta"
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

# Iniciar frontend en segundo plano
echo "🎨 Iniciando Frontend..."

if [ ! -d "node_modules" ]; then
    npm install
fi

if [ ! -f ".env.local" ]; then
    echo "VITE_API_URL=http://localhost:8000/api" > .env.local
fi

npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Servidores iniciados exitosamente!"
echo "🌐 Frontend: http://localhost:5173"
echo "🔧 Backend: http://localhost:8000"
echo "📊 Admin: http://localhost:8000/admin"
echo ""
echo "Presiona Ctrl+C para detener ambos servidores"

# Esperar indefinidamente
wait