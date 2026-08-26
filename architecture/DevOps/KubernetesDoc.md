### 0. What is Kubernetes in simple terms? What Kubernetes solves the problem?
### 1. How Kubernetes works end to end?
### 2. LifeCycle of Kubernetes?
### 2. What is a Pod, and why not deploy containers directly?
### 3. What's the difference between a Deployment, ReplicaSet, and StatefulSet?
### 4. What is a Service, and what's the difference between ClusterIP, NodePort, and LoadBalancer?
### 5. What is an Ingress, and how is it different from a Service?
### 6. What's the difference between a ConfigMap and a Secret?
### 7. How does Kubernetes handle rolling updates and rollbacks?
### 8. What are liveness probes vs readiness probes?
### 9. What is a Namespace and why use one?
### 10. How does horizontal pod autoscaling (HPA) work?
### 11. What happens when a Pod crashes — how does Kubernetes recover it?
### 12. What's the difference between kubectl apply and kubectl create?
### 13. How do resource requests and limits (CPU/memory) work, and why do they matter?

---

# Beginner answers

## 0. What is Kubernetes in simple terms? What problem does it solve?

Kubernetes, often called **K8s**, manages many containers across one or more servers. Docker runs a container; Kubernetes keeps the right number of containers running and makes them reachable.

You describe the result you want, such as “run three copies of my API.” Kubernetes works continuously to make the real system match that description. If one copy crashes, it starts a replacement.

## 1. How does Kubernetes work end to end?

1. Build a container image and push it to a registry.
2. Write YAML files for the application, for example a Deployment and a Service.
3. Run `kubectl apply -f deployment.yaml`.
4. The Kubernetes API stores the desired state.
5. The scheduler chooses a worker machine for each Pod.
6. The selected machine downloads the image and starts it in a Pod.
7. A Service gives the Pods a stable network address.
8. Kubernetes keeps checking the Pods and replaces failed ones.

## 2. What is the Kubernetes lifecycle?

1. Build and publish an image.
2. Apply a Deployment to the cluster.
3. Kubernetes creates Pods and schedules them on worker nodes.
4. Ready Pods receive traffic through a Service or Ingress.
5. A new image replaces old Pods gradually during an update.
6. If a Pod crashes, Kubernetes restarts or replaces it.
7. Delete the Deployment when the application is no longer needed.

## 3. What is a Pod, and why not deploy containers directly?

A **Pod** is the smallest deployable unit in Kubernetes. It usually has one application container, but it can contain helper containers too.

Containers in the same Pod share a network address and can share storage. Kubernetes manages Pods so it has one unit to schedule, restart, and connect. Usually, a Deployment creates and manages Pods for you.

## 4. What is the difference between a Deployment, ReplicaSet, and StatefulSet?

| Resource | Use it for | Main idea |
| --- | --- | --- |
| Deployment | Stateless apps such as a Node.js API. | Keeps a desired number of Pods and supports rolling updates. |
| ReplicaSet | Usually created by a Deployment. | Ensures a number of identical Pods exists. |
| StatefulSet | Stateful apps such as databases. | Gives Pods stable names and ordered startup/shutdown. |

Use a Deployment for most web applications.

## 5. What is a Service? What are ClusterIP, NodePort, and LoadBalancer?

Pod IP addresses can change when Pods are replaced. A **Service** gives a group of Pods one stable name and virtual IP.

- **ClusterIP:** Available only inside the cluster. This is the default and is useful for internal APIs.
- **NodePort:** Opens the same port on every worker node. It is mainly useful for simple testing.
- **LoadBalancer:** Asks the cloud provider for an external load balancer. It is common for public services.

## 6. What is an Ingress, and how is it different from a Service?

A Service sends traffic to Pods. An **Ingress** defines HTTP/HTTPS rules for traffic coming from outside the cluster.

For example, an Ingress can send `example.com/api` to an API Service and `example.com` to a frontend Service. It needs an Ingress controller, such as NGINX Ingress, to enforce those rules.

## 7. What is the difference between a ConfigMap and a Secret?

- A **ConfigMap** stores non-sensitive configuration, such as `LOG_LEVEL=info`.
- A **Secret** stores sensitive values, such as a database password or API key.

Both can be passed to Pods as environment variables or files. Restrict who can read Secrets, and do not commit secret values to Git.

## 8. How does Kubernetes handle rolling updates and rollbacks?

During a rolling update, Kubernetes replaces old Pods a few at a time:

1. Change the image version in the Deployment.
2. Apply the YAML.
3. Kubernetes starts a new Pod.
4. When the new Pod is ready, Kubernetes removes an old Pod.
5. It repeats until all Pods use the new version.

If the release is bad, roll back:

```bash
kubectl rollout undo deployment/my-api
```

## 9. What are liveness probes and readiness probes?

- A **liveness probe** asks, “Is this container alive?” If it repeatedly fails, Kubernetes restarts it.
- A **readiness probe** asks, “Can this Pod safely receive traffic?” If it fails, the Pod stays running but is removed from Service traffic.

For example, an API can be alive while it is still connecting to a database. It should not receive traffic until it is ready.

## 10. What is a Namespace, and why use one?

A Namespace is a logical partition inside one Kubernetes cluster. It organizes resources and permissions.

Common namespaces are `development`, `staging`, and `production`. They help avoid name conflicts, limit resources, and give different teams different access.

```bash
kubectl get pods -n production
```

## 11. How does Horizontal Pod Autoscaling (HPA) work?

An HPA changes the number of Pods based on a metric, often CPU or memory use.

For example, it can keep at least two API Pods running, add Pods when average CPU is above 70%, and remove extras when traffic falls. HPA needs resource requests and a metrics source. It does not add new servers itself; cluster autoscaling is a separate feature.

## 12. What happens when a Pod crashes?

1. The node notices that the container stopped.
2. Kubernetes tries to restart it inside the Pod.
3. If it keeps failing, the Pod can enter `CrashLoopBackOff`; Kubernetes waits longer between restarts.
4. If a Pod is lost with its node, a Deployment creates a replacement on a healthy node.

Useful commands:

```bash
kubectl get pods
kubectl logs my-pod
kubectl describe pod my-pod
```

## 13. What is the difference between `kubectl apply` and `kubectl create`?

- `kubectl create -f file.yaml` creates a resource once and fails if it already exists.
- `kubectl apply -f file.yaml` creates it if missing or updates it if it already exists.

Use `apply` for YAML files stored in Git because it is repeatable.

## 14. How do CPU and memory requests and limits work?

Each container can declare:

- **Request:** The amount of CPU and memory Kubernetes reserves when choosing a node.
- **Limit:** The maximum amount the container may use.

```yaml
resources:
  requests:
    cpu: "100m"
    memory: "128Mi"
  limits:
    cpu: "500m"
    memory: "256Mi"
```

`100m` means one tenth of a CPU core. If a container exceeds its memory limit, it can be stopped with an `OOMKilled` error. Realistic requests and limits prevent one app from using all the resources on a node.
