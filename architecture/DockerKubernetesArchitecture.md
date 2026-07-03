# Docker and Kubernetes Architecture Interview Questions

## 1. How does Docker work?

### What it is

Docker packages an application with its runtime, dependencies, and configuration into an image that runs as a container.

### Where I used it

I used Docker for Node APIs, frontend builds, local development, CI builds, and production deployments.

### How I implemented it

I write Dockerfiles with pinned base images, copy only required files, install production dependencies, expose the app port, run as non-root, and build images in CI with version tags.

### Why I chose it

It makes environments consistent across local, CI, staging, and production.

### Trade-offs

Images must be optimized and patched. Containers do not remove the need for secure configuration.

### Failure cases

Large images, secrets in image layers, wrong base images, and missing health checks can cause issues.

### How I monitored/debugged it

I inspect image layers, container logs, resource usage, vulnerability scans, and startup failures.

## 2. How do you reduce Docker image size?

### What it is

Reducing image size means removing unnecessary files, using smaller base images, and separating build-time from runtime dependencies.

### Where I used it

I used multi-stage builds for frontend apps and Node services.

### How I implemented it

I use a builder stage for installing dependencies and compiling code, then copy only built assets and production dependencies into a smaller runtime image.

### Why I chose it

Smaller images build faster, deploy faster, and reduce attack surface.

### Trade-offs

Minimal images can make debugging harder because common tools may be missing.

### Failure cases

Copying `node_modules`, source maps, tests, or secrets unnecessarily increases risk and size.

### How I monitored/debugged it

I use image size reports, layer inspection, vulnerability scans, and build logs.

## 3. How does Kubernetes work?

### What it is

Kubernetes orchestrates containers by scheduling pods, managing deployments, services, scaling, health checks, and rollouts.

### Where I used it

I used Kubernetes for running APIs, frontend services, workers, cron jobs, and internal services.

### How I implemented it

I define Deployments for apps, Services for stable networking, Ingress for external traffic, ConfigMaps/Secrets for config, probes for health, and HPA for autoscaling.

### Why I chose it

It provides self-healing, scaling, service discovery, and deployment control.

### Trade-offs

Kubernetes adds operational complexity and requires strong observability.

### Failure cases

Bad resource limits, failed probes, misconfigured services, and image pull errors can break deployments.

### How I monitored/debugged it

I use `kubectl describe`, pod logs, events, readiness/liveness probes, metrics, and tracing.

## 4. How does auto-scaling work in Kubernetes?

### What it is

Kubernetes can scale pods based on CPU, memory, or custom metrics using Horizontal Pod Autoscaler.

### Where I used it

I used autoscaling for APIs, workers, and services with traffic spikes.

### How I implemented it

I set CPU/memory requests, configure HPA with CPU or custom metrics, define min/max replicas, and monitor whether scaling keeps latency and queue depth under control.

### Why I chose it

It improves availability and cost efficiency.

### Trade-offs

Autoscaling reacts after metrics change, so sudden spikes may still need buffers.

### Failure cases

Wrong metrics, missing resource requests, slow startup, and database bottlenecks can make autoscaling ineffective.

### How I monitored/debugged it

I monitor HPA status, pod count, CPU/memory, request latency, queue depth, and service saturation.

## 5. How do you debug a failing pod?

### What it is

Debugging a pod means checking why a container is not starting, not ready, crashing, or failing traffic.

### Where I used it

I debugged crash loops, config issues, image pull errors, failing probes, and resource limits.

### How I implemented it

I run `kubectl describe pod`, check events, inspect logs including previous container logs, verify env/secrets, check probes, and review resource limits and image pull status.

### Why I chose it

Pod-level debugging is the fastest way to resolve Kubernetes production issues.

### Trade-offs

Kubernetes adds multiple layers, so you must check app logs and cluster events together.

### Failure cases

Wrong env vars, missing secrets, bad probes, memory limits, and network policies are common causes.

### How I monitored/debugged it

I use pod logs, `kubectl describe pod`, events, previous logs, exec shells, metrics, and deployment rollout history.

## 6. What are Dockerfile best practices?

### What it is

Dockerfile best practices create secure, small, repeatable, and efficient images.

### Where I used it

I used multi-stage builds, non-root users, `.dockerignore`, pinned base images, and minimal runtime layers.

### How I implemented it

I add `.dockerignore`, avoid copying secrets, use multi-stage builds, install only production dependencies, run as non-root, and scan images in CI.

### Why I chose it

It improves security, build speed, and deployment reliability.

### Trade-offs

Minimal images can make debugging harder.

### Failure cases

Running as root, copying secrets, and installing dev dependencies in production images are common issues.

### How I monitored/debugged it

I inspect layers, scan images, review Dockerfiles, and test containers locally and in CI.

## 7. ConfigMap vs Secret in Kubernetes?

### What it is

ConfigMaps store non-sensitive configuration. Secrets store sensitive values like passwords and tokens.

### Where I used it

I used ConfigMaps for feature config and Secrets for database URLs, API keys, and JWT secrets.

### How I implemented it

I mount ConfigMaps for non-sensitive config and Secrets for sensitive values. For production, I restrict RBAC and often sync secrets from a cloud secret manager.

### Why I chose it

It separates configuration from container images and supports environment-specific deployment.

### Trade-offs

Kubernetes Secrets still need proper encryption and access control.

### Failure cases

Putting secrets in ConfigMaps or logs can expose sensitive values.

### How I monitored/debugged it

I review RBAC, secret access, environment injection, deployment manifests, and audit logs.

## 8. What are liveness and readiness probes?

### What it is

Liveness checks whether a container should be restarted. Readiness checks whether it should receive traffic.

### Where I used it

I used probes for Node APIs, workers, and services with database dependencies.

### How I implemented it

I use liveness for process health and readiness for traffic eligibility. Readiness checks critical dependencies so pods do not receive traffic before they are ready.

### Why I chose it

They allow Kubernetes to self-heal and route traffic safely.

### Trade-offs

Bad probes can restart healthy apps or route traffic too early.

### Failure cases

Using the same shallow endpoint for both checks can hide dependency issues.

### How I monitored/debugged it

I check probe failures, pod events, app logs, restart count, and readiness transitions.

## 9. How do Kubernetes services and ingress work?

### What it is

A Service provides stable networking for pods. Ingress routes external HTTP traffic to services.

### Where I used it

I used services for internal communication and ingress for public APIs and frontend routes.

### How I implemented it

I create Services that select pods by labels, expose stable DNS names, and configure Ingress rules to route host/path traffic to the correct service.

### Why I chose it

Pods are temporary, so stable routing needs Kubernetes abstractions.

### Trade-offs

Ingress behavior depends on the controller and cloud load balancer configuration.

### Failure cases

Wrong service selectors, ports, or ingress rules can make apps unreachable.

### How I monitored/debugged it

I inspect endpoints, service selectors, ingress events, DNS, load balancer health, and access logs.

## 10. How do resource requests and limits work?

### What it is

Requests reserve CPU/memory for scheduling. Limits cap the maximum resources a container can use.

### Where I used it

I set requests and limits for APIs, workers, and frontend containers.

### How I implemented it

I start with observed baseline CPU/memory, set requests for normal usage, limits for safety, and adjust based on throttling, OOM kills, and production metrics.

### Why I chose it

They help Kubernetes schedule reliably and protect cluster resources.

### Trade-offs

Too low limits cause throttling or OOM kills. Too high requests waste capacity.

### Failure cases

Missing requests break autoscaling accuracy and resource planning.

### How I monitored/debugged it

I monitor CPU throttling, memory usage, OOM kills, HPA behavior, and pod scheduling.

## 11. How do rolling deployments work in Kubernetes?

### What it is

Rolling deployment gradually replaces old pods with new pods.

### Where I used it

I used rolling updates for APIs and workers with readiness probes.

### How I implemented it

I configure rolling update strategy, readiness probes, max unavailable/surge, and watch rollout status. The new pod must become ready before old pods are removed.

### Why I chose it

It allows deployment without downtime when the app is backward compatible.

### Trade-offs

Old and new versions may run together temporarily.

### Failure cases

Breaking API or database compatibility can fail during mixed-version rollout.

### How I monitored/debugged it

I watch rollout status, pod readiness, error rates, logs, and deployment events.

## 12. How do you handle logs in Kubernetes?

### What it is

Kubernetes logs are written to stdout/stderr and collected by logging agents.

### Where I used it

I used centralized logging for APIs, workers, ingress, and system components.

### How I implemented it

I write app logs to stdout/stderr, collect them with a logging agent, add service/version/request id fields, and search them in a centralized logging platform.

### Why I chose it

Pods are temporary, so logs need external storage.

### Trade-offs

High log volume increases cost and can create noise.

### Failure cases

Logging only inside container files can lose logs when pods restart.

### How I monitored/debugged it

I search logs by pod, namespace, request id, service, version, and timestamp.

## 13. How do you manage secrets in Kubernetes?

### What it is

Secret management controls how sensitive values are stored, encrypted, mounted, and accessed by pods.

### Where I used it

I used Kubernetes Secrets, cloud secret managers, and external secret operators.

### How I implemented it

I keep secrets out of Git, restrict RBAC, encrypt secrets at rest, rotate credentials, and use external secret operators to sync from cloud secret stores.

### Why I chose it

Secrets should not be baked into images or committed to Git.

### Trade-offs

External secret systems add setup but improve rotation and auditability.

### Failure cases

Overly broad RBAC or plaintext secrets in manifests can expose credentials.

### How I monitored/debugged it

I audit secret access, RBAC, deployment manifests, secret rotation, and failed mounts.

## 14. How do you debug Kubernetes networking issues?

### What it is

Networking debugging checks DNS, services, endpoints, network policies, ingress, and pod connectivity.

### Where I used it

I debugged API-to-database connectivity, service routing, ingress failures, and DNS issues.

### How I implemented it

I check DNS resolution, service endpoints, pod labels, ports, network policies, ingress rules, and run temporary debug pods for connectivity tests.

### Why I chose it

Networking problems often look like application failures.

### Trade-offs

Kubernetes networking has multiple layers, so debugging requires systematic checks.

### Failure cases

Wrong labels, blocked network policies, DNS failures, and port mismatch are common.

### How I monitored/debugged it

I inspect services, endpoints, DNS, pod logs, ingress logs, network policies, and connectivity tests.

## 15. How do you design Kubernetes namespaces?

### What it is

Namespaces logically separate resources in a Kubernetes cluster.

### Where I used it

I used namespaces for environments, teams, applications, and shared infrastructure.

### How I implemented it

I separate workloads by environment or team, apply RBAC and quotas per namespace, add network policies where needed, and standardize naming/labels.

### Why I chose it

They improve organization, access control, quotas, and operational clarity.

### Trade-offs

Too many namespaces can make management complex.

### Failure cases

Weak namespace RBAC can allow teams to access resources they should not manage.

### How I monitored/debugged it

I review RBAC, quotas, resource usage, network policies, and namespace-level alerts.

## 16. How Docker works step by step in simple terms?

### Simple idea

Docker packages an application with everything it needs to run, then runs that package as an isolated container.

Think of Docker like this:

- **Dockerfile** tells Docker how to prepare the app.
- **Docker image** is the final packaged app.
- **Docker container** is the running version of that image.

### Step by step

1. **Developer writes application code**

   Example: React app, Node.js API, Express server, or any backend service.

2. **Developer creates a Dockerfile**

   The Dockerfile contains instructions like:

   - Which base image to use
   - Which dependencies to install
   - Which files to copy
   - Which command should start the app

   Example:

   ```dockerfile
   FROM node:20
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

3. **Docker builds an image**

   Command:

   ```bash
   docker build -t my-node-app .
   ```

   Docker reads the Dockerfile line by line and creates an image.

4. **The image contains app code and dependencies**

   The image contains:

   - Application code
   - Runtime like Node.js
   - Installed packages
   - Startup command
   - Required OS-level files from the base image

5. **Docker runs a container from the image**

   Command:

   ```bash
   docker run -p 3000:3000 my-node-app
   ```

   This creates a running container.

6. **The container runs as an isolated process**

   The app runs separately from the host machine and other containers.

   It has its own:

   - File system
   - Environment variables
   - Network space
   - Running process

7. **Port mapping exposes the app**

   If the app runs on port `3000` inside the container, we map it to the host machine:

   ```bash
   -p 3000:3000
   ```

   This means:

   - Left side `3000` is host machine port.
   - Right side `3000` is container port.

8. **Environment variables configure the app**

   Instead of hardcoding values, we pass config from outside:

   ```bash
   docker run -e MONGO_URL=mongodb://mongo:27017/app my-node-app
   ```

9. **Volumes store persistent data**

   Containers are temporary. If the container is removed, its internal data can be lost.

   For databases or uploaded files, we use volumes so data stays safe outside the container lifecycle.

10. **Logs come from the container**

   Apps usually write logs to console.

   Docker captures them:

   ```bash
   docker logs container_id
   ```

11. **Container can be stopped and recreated**

   If we stop a container, the image is still available.

   We can run a new container again from the same image.

### Interview answer

Docker works by creating an image from a Dockerfile. The image contains the application, runtime, dependencies, and startup command. When we run the image, Docker creates a container, which is an isolated running process. We expose ports, pass environment variables, use volumes for persistent data, and collect logs from the container. This makes the app run the same way on every machine.

### Common failure cases

- Dockerfile copies wrong files.
- Port is not exposed or mapped correctly.
- Environment variables are missing.
- Container starts and exits because the startup command fails.
- Image works locally but fails in production due to missing config.
- Large images slow down builds and deployments.

### How I debug it

- Check container logs using `docker logs`.
- Check running containers using `docker ps`.
- Check stopped containers using `docker ps -a`.
- Enter the container using `docker exec`.
- Rebuild the image when Dockerfile changes.
- Verify ports, env variables, and startup command.

## 17. How Kubernetes works step by step in simple terms?

### Simple idea

Kubernetes runs and manages containers across many machines.

Docker runs containers. Kubernetes decides:

- Where containers should run
- How many copies should run
- What to do if one crashes
- How to expose the app
- How to roll out new versions

### Step by step

1. **Developer builds a Docker image**

   First, we package the app as a Docker image.

   Example:

   ```bash
   docker build -t my-node-api .
   ```

2. **Image is pushed to a registry**

   Kubernetes needs to pull the image from somewhere.

   Common registries:

   - Docker Hub
   - AWS ECR
   - Azure Container Registry
   - Google Artifact Registry

3. **Developer creates Kubernetes YAML files**

   Common files are:

   - Deployment
   - Service
   - ConfigMap
   - Secret
   - Ingress

4. **Deployment defines the desired app state**

   A Deployment says:

   - Which image to run
   - How many replicas are needed
   - Which port the container uses
   - What health checks are required

   Example:

   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: user-api
   spec:
     replicas: 3
     selector:
       matchLabels:
         app: user-api
     template:
       metadata:
         labels:
           app: user-api
       spec:
         containers:
           - name: user-api
             image: my-node-api:latest
             ports:
               - containerPort: 3000
   ```

5. **Developer applies YAML to Kubernetes**

   Command:

   ```bash
   kubectl apply -f deployment.yaml
   ```

6. **Kubernetes API Server receives the request**

   The API Server is the entry point of Kubernetes.

   It stores the desired state, for example:

   "I want 3 pods running for this app."

7. **Scheduler chooses the best node**

   Kubernetes checks available worker machines and decides where pods should run.

   It considers:

   - CPU
   - Memory
   - Node availability
   - Scheduling rules

8. **Kubelet starts the pod on the selected node**

   Kubelet runs on every worker node.

   It pulls the Docker image and starts the container inside a pod.

9. **Pod runs the container**

   A pod is the smallest deployable unit in Kubernetes.

   Usually one pod runs one main application container.

10. **ReplicaSet keeps the desired number of pods**

   If the Deployment says `replicas: 3`, Kubernetes tries to keep 3 pods running.

   If one pod crashes, Kubernetes creates a new one.

11. **Service gives a stable internal address**

   Pods are temporary and their IPs can change.

   A Service gives a stable name and IP for accessing pods.

   Example:

   - Pods may change.
   - Service name remains `user-api-service`.

12. **Ingress exposes the app outside the cluster**

   Service is mostly for internal traffic.

   Ingress helps external users access the app through domain and path rules.

13. **Health checks keep traffic away from broken pods**

   Kubernetes uses:

   - Readiness probe: Is the pod ready to receive traffic?
   - Liveness probe: Is the pod still alive?

14. **Rolling deployment updates the app safely**

   When a new image version is deployed, Kubernetes does not stop everything at once.

   It gradually:

   - Starts new pods
   - Checks if they are healthy
   - Removes old pods

15. **Auto-scaling can increase or decrease pods**

   Horizontal Pod Autoscaler can increase pod count when CPU, memory, or custom metrics are high.

### Interview answer

Kubernetes works by accepting a desired state through YAML files. We tell Kubernetes which container image to run, how many replicas are needed, and how to expose the app. The API Server stores this desired state, the Scheduler selects worker nodes, and Kubelet starts pods on those nodes. If a pod crashes, Kubernetes recreates it. Services provide stable internal access, Ingress exposes apps externally, and rolling deployments update the app safely.

### Common failure cases

- Image pull fails because image name or registry credentials are wrong.
- Pods crash due to missing environment variables.
- Service selector does not match pod labels.
- App is running but readiness probe is failing.
- Pods are pending because CPU or memory is not available.
- Ingress is configured but DNS or controller is missing.

### How I debug it

- Check pods using `kubectl get pods`.
- Describe pod using `kubectl describe pod pod_name`.
- Check logs using `kubectl logs pod_name`.
- Check services using `kubectl get svc`.
- Check endpoints using `kubectl get endpoints`.
- Check deployment rollout using `kubectl rollout status deployment/name`.
- Check events because Kubernetes usually explains failures there.

## 18. How Ingress works step by step in simple terms?

### Simple idea

Ingress controls how external traffic enters a Kubernetes cluster.

It usually handles:

- Domain-based routing
- Path-based routing
- HTTPS/TLS termination
- Sending requests to the correct service

Important difference:

- **Ingress Resource** is the rule file.
- **Ingress Controller** is the actual component that reads those rules and routes traffic.
- **Service** sends traffic to the correct pods.

### Step by step

1. **User opens a website or API URL**

   Example:

   ```text
   https://example.com/api/users
   ```

2. **DNS sends the request to a load balancer**

   The domain `example.com` points to a load balancer created for the Ingress Controller.

3. **Load balancer sends traffic to the Ingress Controller**

   The Ingress Controller is usually NGINX Ingress, AWS ALB Controller, Traefik, or another controller.

4. **Ingress Controller checks Ingress rules**

   The Ingress Resource may say:

   ```text
   /api    -> backend-service
   /       -> frontend-service
   ```

5. **Controller matches host and path**

   For this request:

   ```text
   https://example.com/api/users
   ```

   It matches:

   - Host: `example.com`
   - Path: `/api`

6. **Controller forwards request to the correct Service**

   Since `/api` points to `backend-service`, traffic goes to that Service.

7. **Service forwards traffic to a healthy pod**

   The Service checks matching pods using labels and forwards traffic to one healthy backend pod.

8. **Pod handles the request**

   The backend application receives the request and returns the response.

9. **Response goes back through the same path**

   Response flow:

   ```text
   Pod -> Service -> Ingress Controller -> Load Balancer -> User
   ```

10. **TLS can be handled at Ingress**

   Ingress can terminate HTTPS.

   This means:

   - User talks to Ingress using HTTPS.
   - Ingress forwards traffic inside the cluster.
   - Certificates can be managed using tools like cert-manager.

### Simple example

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress
spec:
  rules:
    - host: example.com
      http:
        paths:
          - path: /api
            pathType: Prefix
            backend:
              service:
                name: backend-service
                port:
                  number: 3000
          - path: /
            pathType: Prefix
            backend:
              service:
                name: frontend-service
                port:
                  number: 80
```

### Interview answer

Ingress works as the entry point for external HTTP or HTTPS traffic in Kubernetes. The user request reaches a load balancer, then the Ingress Controller. The controller reads Ingress rules and decides which Service should receive the request based on host and path. The Service then forwards traffic to a healthy pod. Ingress is commonly used for routing, HTTPS, and exposing multiple services under one domain.

### Common failure cases

- Ingress Controller is not installed.
- DNS does not point to the load balancer.
- Host or path rule is wrong.
- Service name or port is incorrect.
- Service selector does not match pod labels.
- TLS certificate is missing or expired.
- Backend pod is not ready, so traffic has nowhere to go.

### How I debug it

- Check Ingress using `kubectl get ingress`.
- Describe Ingress using `kubectl describe ingress ingress_name`.
- Check Ingress Controller pods and logs.
- Verify DNS points to the correct load balancer.
- Check Service name and port.
- Check Service endpoints using `kubectl get endpoints`.
- Check backend pod readiness and application logs.
