.PHONY: all up down clean rebuild logs ps

up:
	docker compose up -d --build

down:
	docker compose down

fclean:
	docker compose down -v --remove-orphans
	docker system prune -f

re: fclean up

logs:
	docker compose logs -f

ps:
	docker compose ps
