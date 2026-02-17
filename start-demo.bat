# Helper script to run demo infrastructure
# Usage: ./start-demo.sh

echo "Starting CreativeOS Demo Infrastructure..."
docker-compose -f docker-compose-demo.yml up -d

echo "Infrastructure is running!"
echo "DB: localhost:5432 (admin/password/creativeos_demo)"
echo "Redis: localhost:6379"
