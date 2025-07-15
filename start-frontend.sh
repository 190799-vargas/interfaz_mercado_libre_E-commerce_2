#!/bin/bash

echo "🚀 Iniciando Frontend de MercadoLibre Clone..."

# Verificar si node_modules existe
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias de Node.js..."
    npm install
fi

# Verificar archivo de configuración
if [ ! -f ".env.local" ]; then
    echo "⚙️  Creando archivo de configuración..."
    echo "VITE_API_URL=http://localhost:8000/api" > .env.local
fi

echo "🌐 Iniciando servidor de desarrollo en http://localhost:5173"
echo "🔗 Asegúrate de que el backend esté ejecutándose en http://localhost:8000"
echo ""
echo "Para detener el servidor, presiona Ctrl+C"
echo ""

npm run dev