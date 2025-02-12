include .env
export $(shell sed 's/=.*//' .env)

updev:
	docker compose -f docker-compose.dev.yml up -d --build

dev:
	docker compose -f docker-compose.dev.yml up -d --build
	docker logs -f movies_backend

wdev:
	docker logs -f movies_backend

shdev:
	docker exec -it movies_backend sh

shsql:
	docker exec -it movies_mariadb mysql -u ${DB_USER} -p

stopdev:
	docker stop movies_backend movies_mariadb

downdev:
	docker compose -f docker-compose.dev.yml down

upprod:
	docker compose -f docker-compose.prod.yml up -d --build

prod:
	docker compose -f docker-compose.prod.yml up -d
	docker logs -f movies_backend

wprod:
	docker logs -f movies_backend

shprod:
	docker exec -it movies_backend sh

stopprod:
	docker stop movies_backend movies_mariadb

downprod:
	docker compose -f docker-compose.prod.yml down

buildprod:
	docker compose -f docker-compose.prod.yml build backend

net:
	docker network create movies_network

# Borrar absolutamente todo en Docker
superclean:
	@echo "🔥 Eliminando TODOS los contenedores, imágenes, volúmenes y caché de Docker..."
	@if [ -n "$$(docker ps -aq)" ]; then docker stop $$(docker ps -aq) && docker rm -f $$(docker ps -aq); fi
	@if [ -n "$$(docker images -q)" ]; then docker rmi -f $$(docker images -q); fi
	@if [ -n "$$(docker volume ls -q)" ]; then docker volume rm -f $$(docker volume ls -q); fi
	@docker network ls --format "{{.Name}}" | grep -vE "bridge|host|none" | xargs -r docker network rm || true
	docker system prune -a --volumes -f
	@echo "✅ Docker completamente limpio"