### 0. What do you mean by Docker? What it solve the problem?
### 1. How Docker works from end to end?
### 2. LifeCycle of Docker?
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

---

# Beginner answers

## 0. What is Docker? What problem does it solve?

Docker packages an application with the software it needs to run. The package is called an **image**. Docker starts an image as a **container**.

It solves the common “it works on my machine” problem. Instead of every developer and server installing the right Node.js version and libraries manually, they run the same image.

## 1. How does Docker work end to end?

1. Write the application code.
2. Write a `Dockerfile` with instructions for running the application.
3. Build an image:

   ```bash
   docker build -t my-api .
   ```

4. Start a container from the image:

   ```bash
   docker run -p 3000:3000 my-api
   ```

5. Docker runs the startup command, for example `node index.js`.
6. Push the image to a registry such as Docker Hub or Amazon ECR so a server can download and run the exact same image.

## 2. What is the Docker lifecycle?

The usual lifecycle is:

1. **Build** an image: `docker build -t my-api .`
2. **Run** a new container: `docker run --name api my-api`
3. **Stop** it: `docker stop api`
4. **Start** the stopped container again: `docker start api`
5. **Remove** the old container: `docker rm api`

An image is the reusable blueprint. A container is one running or stopped copy of that image.

## 3. What are the advantages and disadvantages of Docker?

### Advantages

- The same application image runs in development, testing, and production.
- New developers can start the project quickly.
- Applications are isolated from each other.
- Containers start faster and use fewer resources than full virtual machines.
- Docker works well with CI/CD and Kubernetes.

### Disadvantages

- There are new concepts to learn: images, containers, volumes, networks, and registries.
- Container data can disappear unless it is stored in a volume or external database.
- Docker is not a complete security solution; images and permissions still need care.
- Debugging a container can be unfamiliar at first.

## 4. What is the difference between a Docker image and a container?

| Image | Container |
| --- | --- |
| A read-only template or blueprint. | A running or stopped copy of an image. |
| Can be reused many times. | Has its own name and temporary writable layer. |
| Example: `node:22-alpine`. | Example: a running Node.js API. |

Think of an image as a recipe and a container as the cooked meal.

## 5. What is the difference between `CMD` and `ENTRYPOINT`?

Both tell Docker what to run when the container starts.

- `CMD` provides the default command or default arguments. It is easy to replace with `docker run`.
- `ENTRYPOINT` defines the main program that the container should run. Values passed to `docker run` become its arguments.

```dockerfile
ENTRYPOINT ["node", "index.js"]
CMD ["--port", "3000"]
```

Running `docker run my-api --port 4000` starts `node index.js --port 4000`.

## 6. What is the difference between `COPY` and `ADD`?

- `COPY` copies files from the build folder into the image. It is the normal and clearer choice.
- `ADD` can also unpack local tar files and download from a URL. Those extra features can be surprising.

Prefer `COPY` unless you specifically need an `ADD` feature.

```dockerfile
COPY package.json ./
```

## 7. How do you reduce Docker image size?

1. Use a small trusted base image when it suits the app, for example `node:22-alpine`.
2. Use a `.dockerignore` file so Docker does not copy `node_modules`, `.git`, logs, or local `.env` files.
3. Install only production dependencies in the final image.
4. Use a multi-stage build so compilers and build tools stay out of the final image.
5. Remove build caches that are no longer needed.

Example `.dockerignore`:

```text
node_modules
.git
.env
npm-debug.log
coverage
```

## 8. What is a multi-stage build and why use one?

A multi-stage build uses more than one `FROM` line. The first stage builds the app. The final stage copies only the files needed to run it.

```dockerfile
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
RUN npm ci --omit=dev
CMD ["node", "dist/index.js"]
```

The final image is smaller because it does not contain development dependencies or build tools.

## 9. How does Docker layer caching work?

Each Dockerfile instruction creates a layer. Docker can reuse a layer if the instruction and its input files have not changed.

For Node.js applications, copy dependency files first:

```dockerfile
COPY package*.json ./
RUN npm ci
COPY . .
```

When only application code changes, Docker can reuse the dependency-installation layer. This makes builds faster.

## 10. What is the difference between `docker run`, `docker start`, and `docker exec`?

- `docker run image-name` creates a new container and starts it.
- `docker start container-name` starts a container that already exists but is stopped.
- `docker exec -it container-name sh` runs an extra command inside a container that is already running.

```bash
docker run -d --name api -p 3000:3000 my-api
docker exec -it api sh
docker stop api
docker start api
```

## 11. How do you persist data in Docker?

Files written only inside a container can disappear when the container is removed. Store important data outside the container.

- **Volume:** Docker manages the storage. This is the best default choice for database data.
- **Bind mount:** A folder on the host machine is mounted into the container. This is useful in local development.
- **tmpfs:** Data is stored in memory and disappears when the container stops.

```bash
docker volume create postgres-data
docker run -v postgres-data:/var/lib/postgresql/data postgres:16
```

## 12. What is the difference between a Docker volume and a bind mount?

| Volume | Bind mount |
| --- | --- |
| Managed by Docker. | Points to a specific host folder. |
| More portable between machines. | Useful for seeing local code changes immediately. |
| Example: `db-data:/data`. | Example: `./src:/app/src`. |

Use volumes for databases. Use bind mounts for local development.

## 13. How does Docker networking work?

Docker gives containers their own network space. Common network types are:

- **bridge:** The default network on one machine.
- **host:** The container shares the host network. Use carefully because it has less isolation.
- **none:** The container has no network access.
- **custom bridge:** A network created for one application; containers can find each other by name.

```bash
docker network create app-network
docker run -d --name api --network app-network my-api
docker run -d --name web --network app-network my-web
```

## 14. How do containers on the same network communicate?

On a custom Docker network, a container name works like a hostname. If the API container is called `api`, another container can call `http://api:3000`.

Do not use `localhost` to reach another container. Inside a container, `localhost` means that same container.

## 15. What is Docker Compose used for?

Docker Compose defines a multi-container application in one `compose.yaml` file. It is useful when an app needs a frontend, backend, database, and cache.

```yaml
services:
  api:
    build: .
    ports:
      - "3000:3000"
  mongodb:
    image: mongo:8
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

Start all services with `docker compose up`. Plain Docker commands manage one container at a time; Compose keeps related configuration together.

## 16. How do you pass environment variables and secrets securely?

Use environment variables for normal settings:

```bash
docker run -e PORT=3000 -e LOG_LEVEL=info my-api
```

For secrets such as passwords and API keys:

1. Never put them in a Dockerfile, image, or Git repository.
2. Keep local `.env` files in `.gitignore` and `.dockerignore`.
3. In production, use a secret manager or a platform secret feature such as Kubernetes Secrets or AWS Secrets Manager.
4. Give each application only the secrets it needs.

## 17. What is the difference between `EXPOSE` and `-p`?

`EXPOSE` documents the port used inside the image. It does not open the port to the host.

```dockerfile
EXPOSE 3000
```

`-p` publishes the container port to the host:

```bash
docker run -p 3000:3000 my-api
```

The first port is on the host; the second port is inside the container.

## 18. How do you debug a container that keeps crashing?

1. See all containers: `docker ps -a`.
2. Read logs: `docker logs container-name`.
3. Follow startup logs: `docker logs -f container-name`.
4. Check its settings and exit code: `docker inspect container-name`.
5. If it stays running, open a shell: `docker exec -it container-name sh`.
6. Check the startup command, environment variables, ports, and missing files.

Do not print passwords or tokens in logs while debugging.

## 19. What is a Docker registry?

A registry stores Docker images so other machines can download them.

- **Docker Hub** is a popular public registry and can also host private images.
- A **private registry** is restricted to an organization, for example Amazon ECR, Google Artifact Registry, Azure Container Registry, or Harbor.

```bash
docker build -t my-org/my-api:1.0.0 .
docker push my-org/my-api:1.0.0
```

Use version tags such as `1.0.0` or a Git commit SHA in production. Do not rely only on `latest`.

## 20. How do you write a production-ready Dockerfile for a Node.js app?

The basics are: use `npm ci`, use layer caching, leave development dependencies out of the final image, run as a non-root user, and use an explicit startup command.

```dockerfile
FROM node:22-alpine AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN addgroup -S app && adduser -S app -G app && chown -R app:app /app
USER app
EXPOSE 3000
CMD ["node", "index.js"]
```

## 21. What is the difference between `docker stop` and `docker kill`?

- `docker stop` asks the application to shut down gracefully. Docker sends `SIGTERM`, waits briefly, then forces a stop only if needed.
- `docker kill` stops the process immediately by default with `SIGKILL`. The application cannot finish open requests or clean up.

Use `docker stop` normally. Use `docker kill` only when a container does not respond.

## 22. Explain the example Dockerfile line by line

1. `FROM node:22-alpine3.19 AS builder` starts the first stage, named `builder`, with Node.js on Alpine Linux.
2. `RUN apk ...` updates Alpine packages and installs tools needed to build Node.js dependencies. `apk` is Alpine's package manager.
3. `ARG AZURE_PRIVATE_TOKEN_BASE64` creates a build-time variable for the Azure token.
4. `curl ... | sh` downloads a script and runs it. `2>&1` sends error output into the same pipe.
5. `WORKDIR /srv/pizzahut` sets the working folder for later commands.
6. `COPY ./package.json .` copies the package file. Copying `package-lock.json` too would make installs repeatable.
7. `COPY . .` copies the remaining project files.
8. `rm -rf ./node_modules` removes copied local dependencies.
9. `npm install` installs dependencies; `npm ci` is usually better when a lock file exists.
10. `npm run build` creates build output. `npm cache clean` removes npm cache. `rm -rf .git` removes Git metadata from the image.
11. The second `FROM` starts a clean final image with only runtime libraries.
12. `COPY --from=builder ...` copies the finished app from the build stage into the final stage.
13. `ENTRYPOINT ["node", "index.js", "--env", "production"]` starts the Node.js application in production mode.

### Security note

Avoid `curl ... | sh` when possible, especially when it uses a token. Pin and verify the downloaded script, and use BuildKit secrets so the token is not saved in an image layer or build history.
