### 1. What are Jenkins stages and steps?
### 2. What's the difference between a freestyle job and a pipeline job?
### 3. How do you trigger a Jenkins build automatically on a Git push? (webhooks)
### 4. How do you handle secrets/credentials securely in a Jenkins pipeline?
### 5. What are Jenkins agents/nodes, and why would you use multiple agents?
### 6. How do you parallelize stages in a Jenkins pipeline?
### 7. How do you set up a pipeline that builds a Docker image and pushes it to a registry?

---

# Beginner answers

## 1. What are Jenkins stages and steps?

A Jenkins **Pipeline** is the complete automation workflow. A pipeline is divided into **stages**. Each stage is a meaningful phase, such as Test, Build, or Deploy. A **step** is one command or action inside a stage.

```groovy
pipeline {
  agent any
  stages {
    stage('Test') {
      steps {
        sh 'npm test'
      }
    }
  }
}
```

Here, `Test` is a stage and `sh 'npm test'` is its step.

## 2. What is the difference between a freestyle job and a pipeline job?

- A **freestyle job** is configured mainly by clicking options in the Jenkins web interface. It is simple for a small task but difficult to review and copy.
- A **pipeline job** uses a `Jenkinsfile` stored with the code. It can describe multiple stages, conditions, approvals, and parallel work.

Use pipeline jobs for most application CI/CD work because the workflow can be reviewed in pull requests and stays with the project.

## 3. How do you trigger a Jenkins build automatically on a Git push?

1. Create a Jenkins pipeline job connected to the Git repository.
2. Give Jenkins permission to read the repository.
3. Copy the webhook URL shown by Jenkins or its GitHub plugin.
4. In GitHub, open the repository settings and add a webhook for push events.
5. Push a test commit and confirm that Jenkins starts a build.

The webhook tells Jenkins that new code is available. This is better than making Jenkins check the repository every few minutes.

## 4. How do you handle secrets and credentials securely in Jenkins?

1. Store passwords, tokens, and private keys in **Manage Jenkins → Credentials**.
2. Give each credential a clear ID, such as `docker-registry-token`.
3. Read the credential inside the pipeline only for the step that needs it.
4. Do not hard-code secrets in a `Jenkinsfile`.
5. Limit which jobs and users can use production credentials.

Example:

```groovy
withCredentials([string(credentialsId: 'api-token', variable: 'API_TOKEN')]) {
  sh 'curl -H "Authorization: Bearer $API_TOKEN" https://example.com'
}
```

Jenkins masks many secrets in logs, but scripts should still avoid printing them.

## 5. What are Jenkins agents or nodes? Why use multiple agents?

The Jenkins **controller** coordinates jobs. An **agent** (also called a node) is the machine that performs the actual work.

Multiple agents help because:

- Several builds can run at the same time.
- Linux, Windows, and macOS jobs can use different machines.
- Heavy builds do not slow down the Jenkins controller.
- An agent can contain special tools, such as Docker, Android SDKs, or cloud CLIs.

For example, a frontend test can run on a Node.js agent while a deployment runs on a secure agent with Kubernetes access.

## 6. How do you run Jenkins stages in parallel?

Use `parallel` when tasks do not depend on each other. For example, frontend tests and backend tests can run together.

```groovy
stage('Test') {
  parallel {
    stage('Frontend') {
      steps { sh 'cd frontend && npm ci && npm test' }
    }
    stage('Backend') {
      steps { sh 'cd backend && npm ci && npm test' }
    }
  }
}
```

Parallel stages reduce pipeline time. Do not run dependent tasks in parallel; deploy only after the required tests and image build succeed.

## 7. How do you set up a pipeline that builds a Docker image and pushes it to a registry?

The basic flow is:

1. Check out the source code.
2. Install dependencies and run tests.
3. Build an image with a clear version tag.
4. Log in to the Docker registry using Jenkins credentials.
5. Push the image.
6. Optionally deploy that exact image tag.

Example `Jenkinsfile`:

```groovy
pipeline {
  agent any
  environment {
    IMAGE = "my-registry.example.com/my-team/my-api:$BUILD_NUMBER"
  }
  stages {
    stage('Test') {
      steps {
        sh 'npm ci'
        sh 'npm test'
      }
    }
    stage('Build image') {
      steps {
        sh 'docker build -t $IMAGE .'
      }
    }
    stage('Push image') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'registry-login', usernameVariable: 'REGISTRY_USER', passwordVariable: 'REGISTRY_PASSWORD')]) {
          sh 'echo "$REGISTRY_PASSWORD" | docker login my-registry.example.com -u "$REGISTRY_USER" --password-stdin'
          sh 'docker push $IMAGE'
        }
      }
    }
  }
}
```

The Jenkins agent must have Docker installed and permission to use it. In production, prefer a short-lived registry token and use an image tag tied to the build number or Git commit.
