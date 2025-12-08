#!/bin/sh

REALM_FILE=$1
KEYCLOAK_URL=${KEYCLOAK_HOST:-keycloak:8080}
ADMIN_USER=${KEYCLOAK_ADMIN:-admin}
ADMIN_PASSWORD=${KEYCLOAK_ADMIN_PASSWORD:-admin}

echo "Waiting for Keycloak at $KEYCLOAK_URL to be ready..."
i=1
while [ $i -le 60 ]; do
  if curl -s "http://${KEYCLOAK_URL}/realms/master" > /dev/null 2>&1; then
    echo "Keycloak is ready!"
    break
  fi
  echo "Attempt $i/60 - Keycloak not ready yet, waiting..."
  i=$((i + 1))
  sleep 2
done

if [ $i -gt 60 ]; then
  echo "Keycloak did not become ready in time."
  exit 1
fi

echo "Keycloak is ready. Getting admin token..."
TOKEN=$(curl -s -X POST "http://$KEYCLOAK_URL/realms/master/protocol/openid-connect/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=$ADMIN_USER" \
  -d "password=$ADMIN_PASSWORD" \
  -d "grant_type=password" \
  -d "client_id=admin-cli" | jq -r '.access_token')

if [ -z "$TOKEN" ] || [ "$TOKEN" = "null" ]; then
  echo "Failed to get admin token."
  exit 1
fi

echo "Importing realm from $REALM_FILE..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "http://$KEYCLOAK_URL/admin/realms" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d @$REALM_FILE)

if [ "$HTTP_CODE" = "201" ]; then
  echo "Realm imported successfully."
elif [ "$HTTP_CODE" = "409" ]; then
  echo "Realm already exists."
else
  echo "Failed to import realm. HTTP Code: $HTTP_CODE"
  exit 1
fi
