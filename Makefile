net:
	docker network ls | grep -w movies_network || docker network create movies_network

upback:
	cd movies-nest-11 && make updev

upfront:
	cd movies-ionic-angular-19 && make front

app: net upback upfront
	@echo "🚀 Todo levantado correctamente. Backend y Frontend en marcha."

downback:
	cd movies-nest-11 && docker compose -f docker-compose.dev.yml down

downfront:
	cd movies-ionic-angular-19 && docker compose -f docker-compose.front.yml down

down: downback downfront
	@echo "🛑 Todo apagado correctamente."

clean:
	docker system prune -f
	@echo "🧹 Docker limpio (sin volúmenes)."

superclean:
	docker system prune -a --volumes -f
	@echo "🔥 Docker completamente limpio (incluyendo volúmenes y caché)."
