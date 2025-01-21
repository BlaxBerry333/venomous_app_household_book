DOCKER_COMPOSE_FILE_PATH_DEV = docker-compose.dev.yml
PROJECT_NAME = venomous_apps_household_book
IMAGE_NAME_SUFFIX_SSR = ssr
IMAGE_NAME_SUFFIX_DB = db

.PHONY: setup


# setup all containers
setup:
	@docker compose \
		-f ${DOCKER_COMPOSE_FILE_PATH_DEV} \
		-p ${PROJECT_NAME} \
		up -d \
