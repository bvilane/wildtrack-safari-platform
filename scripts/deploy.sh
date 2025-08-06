#!/bin/bash

set -e

# Update these if needed
APP_NAME="wildtrack-app"
REGION="us-east-1"
ECR_REPO="wildtrack-safari-platform"
IMAGE_TAG="latest"

# Get AWS Account ID
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
FULL_IMAGE_URI="$ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/$ECR_REPO:$IMAGE_TAG"

echo "Deploying image: $FULL_IMAGE_URI"

# Get existing App Runner service ARN
SERVICE_ARN=$(aws apprunner list-services \
  --query "ServiceSummaryList[?ServiceName=='$APP_NAME'].ServiceArn" \
  --output text)

if [ -z "$SERVICE_ARN" ]; then
  echo "❌ App Runner service '$APP_NAME' not found. Create it first via AWS Console."
  exit 1
fi

# Trigger deployment
aws apprunner update-service \
  --service-arn "$SERVICE_ARN" \
  --source-configuration "ImageRepository={ImageIdentifier=\"$FULL_IMAGE_URI\",ImageRepositoryType=\"ECR\"}"

echo "✅ App Runner service updated with new image."
