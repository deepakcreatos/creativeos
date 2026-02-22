
@echo off
echo Starting Infrastructure (Postgres & Redis)...
docker-compose -f docker-compose-demo.yml up -d

echo Waiting for Database to initialize...
timeout /t 5

echo Pushing Prisma Schema to Database...
cd services/client-dna-service
call npx prisma db push

echo Infrastructure Ready!
pause
