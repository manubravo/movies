# Start the frontend with real-time logs (without blocking the terminal)
front:
	docker compose -f docker-compose.front.yml up -d --build
	docker logs -f movies_frontend

# Start the frontend container again in detached mode
upfront:
	docker compose -f docker-compose.front.yml up -d --no-deps frontend

# Show logs without restarting the container
wfront:
	docker logs -f movies_frontend

# Open a shell inside the frontend container
shfront:
	docker exec -it movies_frontend sh

# Stop the frontend without removing the container
stopfront:
	docker stop movies_frontend

# Stop and remove the frontend container
downfront:
	docker compose -f docker-compose.front.yml down

# Rebuild the frontend without starting the container
buildfront:
	docker compose -f docker-compose.front.yml build frontend

# Clean up everything related to the frontend in Docker
clean:
	docker compose -f docker-compose.front.yml down --volumes --remove-orphans
	docker rmi movies_frontend || true