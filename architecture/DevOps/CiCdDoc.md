### 1. What's the difference between Continuous Integration, Continuous Delivery, and Continuous Deployment?
### 2. What are the typical stages of a CI/CD pipeline for a full-stack app? (lint → test → build → containerize → deploy)
### 3. How do you handle environment-specific configs across dev/staging/prod in a pipeline?
### 4. What is a blue-green deployment, and how is it different from a canary deployment?
### 5. How do you roll back a bad deployment quickly?
### 6. How do you run automated tests as part of a pipeline, and what happens if they fail?
### 7. What's the difference between CI/CD tools like Jenkins, GitHub Actions, and GitLab CI — when would you pick one over another?
### 8. How do you manage secrets/API keys in a CI/CD pipeline securely?
### 9. What is Infrastructure as Code (Terraform/CloudFormation), and how does it fit into a CI/CD pipeline?
### 10. How would you design a CI/CD pipeline for a React frontend + Node.js backend deployed to Kubernetes?

---

# Beginner answers

## 1. What is the difference between Continuous Integration, Continuous Delivery, and Continuous Deployment?

- **Continuous Integration (CI):** Developers merge code often. An automated system runs checks such as linting, tests, and builds for every change.
- **Continuous Delivery:** After CI succeeds, the application is always ready to release. A person usually chooses when to release to production.
- **Continuous Deployment:** After CI succeeds, every approved change is released to production automatically without a manual release decision.

In short: CI checks the code; Delivery keeps it ready to release; Deployment releases it automatically.

## 2. What are the usual stages of a CI/CD pipeline for a full-stack app?

1. **Checkout:** Download the code for the commit.
2. **Install:** Install frontend and backend dependencies.
3. **Lint:** Check formatting and common code mistakes.
4. **Test:** Run unit and integration tests.
5. **Build:** Build the React frontend and compile backend code if needed.
6. **Containerize:** Build Docker images for the frontend and backend.
7. **Publish:** Push tested images to a registry.
8. **Deploy:** Update the staging or production environment.
9. **Verify:** Run a health check or smoke test after deployment.

If an important step fails, the pipeline stops. A failed build should not be deployed.

## 3. How do you handle development, staging, and production configuration?

Keep the application code the same, but provide different values when it runs.

| Environment | Example purpose |
| --- | --- |
| Development | Local testing with a local database. |
| Staging | Testing a production-like release before users see it. |
| Production | The live system used by real users. |

Use environment variables, ConfigMaps, and a secret manager. Keep passwords, tokens, and production URLs out of the source code. The pipeline selects the right configuration for the environment being deployed.

## 4. What is blue-green deployment? How is it different from canary deployment?

### Blue-green deployment

There are two complete environments:

- **Blue:** The currently live version.
- **Green:** The new version.

Test Green, then switch all traffic from Blue to Green. Rollback is fast because traffic can switch back to Blue.

### Canary deployment

Release the new version to a small percentage of users first, for example 5%. Monitor it, then gradually send more traffic to it.

Blue-green switches all traffic after testing. Canary moves traffic gradually and reduces risk for a new release.

## 5. How do you roll back a bad deployment quickly?

1. Detect the problem using alerts, error logs, health checks, or user reports.
2. Stop sending more traffic to the bad version.
3. Deploy the last known-good image version or use the deployment tool's rollback command.
4. Verify the application health and important user flows.
5. Investigate the problem before attempting the release again.

For Kubernetes Deployments:

```bash
kubectl rollout undo deployment/my-api
```

Always use versioned image tags. It is difficult to roll back safely if every image is only called `latest`.

## 6. How do automated tests work in a pipeline? What happens if they fail?

The pipeline runs commands such as `npm test` after dependencies are installed. A test expects a result; if the actual result is different, the command exits with an error.

When a test fails:

1. The pipeline marks the run as failed.
2. Later stages, such as publishing and deployment, should not run.
3. The developer reads the test output, fixes the code or test, and pushes another commit.

Tests should be fast and reliable. A slow or flaky test makes developers ignore useful pipeline feedback.

## 7. What is the difference between Jenkins, GitHub Actions, and GitLab CI?

| Tool | Good choice when |
| --- | --- |
| Jenkins | You need a highly customizable, self-managed server or have existing Jenkins jobs. |
| GitHub Actions | Code is hosted on GitHub and you want CI/CD close to pull requests and GitHub events. |
| GitLab CI | Code is hosted on GitLab and you want its built-in pipelines and runners. |

All three can run tests, build images, and deploy applications. The best choice usually fits the source-control platform, team skills, security needs, and operating cost.

## 8. How do you manage secrets and API keys securely in a pipeline?

1. Store secrets in the CI/CD platform's secret store or a dedicated secret manager.
2. Give the pipeline only the permissions it needs.
3. Use different secrets for development, staging, and production.
4. Never commit `.env` files, passwords, private keys, or access tokens to Git.
5. Do not print secrets in logs.
6. Rotate a secret quickly if it is exposed.

The pipeline should provide a secret only to the step that needs it. Do not bake secrets into a Docker image.

## 9. What is Infrastructure as Code (IaC), and how does it fit CI/CD?

Infrastructure as Code means defining cloud resources in version-controlled files instead of creating them manually in a web console.

For example, Terraform can describe a network, database, Kubernetes cluster, and permissions. A pipeline can:

1. Check the infrastructure code.
2. Show the planned change.
3. Require review for production.
4. Apply the approved change.

IaC makes infrastructure changes reviewable, repeatable, and easier to recover.

## 10. How would you design a pipeline for React + Node.js on Kubernetes?

1. Run on every pull request: install dependencies, lint, test, and build both applications.
2. On a merge to `main`, build a frontend image and backend image.
3. Tag each image with the Git commit SHA, for example `api:a1b2c3d`.
4. Push both images to a private registry.
5. Deploy those exact tags to staging using Kubernetes manifests, Helm, or Kustomize.
6. Run smoke tests against staging.
7. After approval, deploy the same image tags to production using a rolling, blue-green, or canary strategy.
8. Monitor error rate, latency, and health checks. Roll back to the earlier image tags if needed.

The key rule is: build once, then promote the exact same tested image through each environment.
