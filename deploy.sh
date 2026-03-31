#!/bin/bash
KEY_PATH="/home/hopeyclarkey/.ssh/StackMates.pem"
REMOTE_USER="ec2-user"
REMOTE_HOST="18.223.34.170"
REMOTE_DIR="~/SigiLife"

echo "--- Local Build & Sync Deployment ---"
echo "Building locally..."
npm run build

echo "Syncing files to server..."
rsync -avz --progress \
    -e "ssh -i $KEY_PATH -o ServerAliveInterval=60 -o ServerAliveCountMax=3 -o ConnectTimeout=30" \
    --exclude 'node_modules' \
    --exclude '.git' \
    --exclude '.env' \
    --exclude 'dist/assets/*.png' \
    --exclude 'dist/assets/*.woff2' \
    --exclude 'dist/assets/mapbox-gl-*.js' \
    --exclude 'dist/assets/index-*.js' \
    --exclude 'dist/assets/' \
    ./ "$REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR/"

echo "Restarting application on server..."
ssh -i "$KEY_PATH" -o ServerAliveInterval=60 -o ServerAliveCountMax=3 "$REMOTE_USER@$REMOTE_HOST" "export PATH=\$PATH:/home/ec2-user/.nvm/versions/node/v20.20.0/bin && cd $REMOTE_DIR && npm install --omit=dev && pm2 restart ecosystem.config.js"

echo "--- Deployment Complete ---"