build:
	docker build -t thought-bot-oss .

push:
	docker tag thought-bot-oss ${CONTAINER_REGISTRY}/thought-bot-oss:production
	docker push ${CONTAINER_REGISTRY}/thought-bot-oss:production

run:
	docker run -it -p 3978:3978 --rm -e NODE_ENV='dev' -e LOG_LEVEL='debug' thought-bot-oss 
