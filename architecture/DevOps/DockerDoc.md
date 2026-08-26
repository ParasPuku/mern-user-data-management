### 1. What do you mean by Docker? What it solve the problem?
### 2. What is the advantage and disadvantage of docker?
### 3. What's the difference between a Docker image and a container?
### 4. What's the difference between CMD and ENTRYPOINT?
### 5. What's the difference between COPY and ADD?
### 6. How do you reduce Docker image size? (multi-stage builds, alpine base images, .dockerignore)
### 7. What is a multi-stage build and why use one?
### 8. How does Docker layer caching work, and how do you optimize Dockerfile order for it?
### 9. What's the difference between docker run, docker start, and docker exec?
### 10. How do you persist data in Docker? (volumes vs bind mounts vs tmpfs)
### 11. What's the difference between a Docker volume and a bind mount?
### 12. How does Docker networking work? (bridge, host, none, custom networks)
### 13. How do containers on the same Docker network communicate with each other?
### 14. What is docker-compose used for, and how is it different from plain Docker commands?
### 15. How do you pass environment variables/secrets into a container securely?
### 16. What's the difference between EXPOSE in a Dockerfile and -p/--publish at runtime?
### 17. How do you debug a container that keeps crashing/restarting?
### 18. What is a Docker registry, and what's the difference between Docker Hub and a private registry (ECR/GCR/Harbor)?
### 19. How do you write a production-ready Dockerfile for a Node.js app? (non-root user, layer caching, small base image)
### 20. What's the difference between docker stop and docker kill?
### 21. Please explain this code line by line -
```js
FROM node:22-alpine3.19 AS builder
RUN apk update && apk upgrade --no-cache && apk add --no-cache python3-dev make alpine-sdk gcc g++ git build-base openssh openssl libssl3 libcrypto3 bash curl

ARG AZURE_PRIVATE_TOKEN_BASE64
RUN curl -s -H "Authorization: Basic $AZURE_PRIVATE_TOKEN_BASE64" "https://dev.azure.com/GoFynd/Infrastructure/_apis/git/repositories/kube-infrastructure/items?path=/pipeline/setup_key.sh&versionDescriptor.versionType=branch&versionDescriptor.version=master" 2>&1 | sh

WORKDIR /srv/pizzahut
COPY ./package.json .
# COPY ./package-lock.json .

COPY . .

WORKDIR /srv/pizzahut
RUN rm -rf ./node_modules \
    && npm install \
    && npm run build \
    && npm cache clean --force \
    && rm -rf .git


FROM node:22-alpine3.19
RUN apk update && apk upgrade && \
    apk add --no-cache \
      openssl \
      libssl3 \
      libcrypto3
COPY --from=builder /srv/pizzahut /srv/pizzahut
WORKDIR /srv/pizzahut

ENTRYPOINT ["node", "index.js","--env","production"]

```