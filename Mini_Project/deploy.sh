#!/bin/bash
set -e

VERSION=$1
if [ -z "$VERSION" ]; then
  echo "❌ Usage: ./deploy.sh <version>"
  exit 1
fi

IMAGE_NAME="nasirhayat028/docker-k8s-project:$VERSION"

echo "🚀 Building Docker image: $IMAGE_NAME"
docker build -t $IMAGE_NAME -f docker/Dockerfile .

echo "📤 Pushing image to Docker Hub..."
docker push $IMAGE_NAME

echo "📝 Updating deployment.yaml with new image..."
sed -i "s|image: .*|image: $IMAGE_NAME|" k8s/deployment.yaml

echo "📦 Deploying to Kubernetes..."
kubectl apply -f k8s/

echo "⏳ Waiting for pods to be ready..."
kubectl rollout status deployment/mini-game

echo "✅ Deployment complete! Current services:"
kubectl get svc
