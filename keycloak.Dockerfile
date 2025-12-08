FROM quay.io/keycloak/keycloak:24.0
RUN /opt/keycloak/bin/kc.sh build --db=postgres --health-enabled=true
