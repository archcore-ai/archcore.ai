export const ENV_CONTENT = `# Archcore Team — Environment Configuration

# PostgreSQL
POSTGRES_USER=archcore
POSTGRES_PASSWORD=CHANGE_ME
POSTGRES_DB=archcore

# Web port (default: 80)
WEB_PORT=80

# Optional: Git token for private repositories
# GIT_TOKEN=`;

export const COMPOSE_CONTENT = `services:
  postgres:
    image: pgvector/pgvector:pg16
    container_name: archcore-postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: \${POSTGRES_USER:-archcore}
      POSTGRES_PASSWORD: \${POSTGRES_PASSWORD}
      POSTGRES_DB: \${POSTGRES_DB:-archcore}
    ports:
      - '\${POSTGRES_PORT:-5432}:5432'
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test:
        [
          'CMD-SHELL',
          'pg_isready -U \${POSTGRES_USER:-archcore} -d \${POSTGRES_DB:-archcore}',
        ]
      interval: 5s
      timeout: 5s
      retries: 5
    networks:
      - archcore-network

  backend:
    image: ghcr.io/archcore-ai/archcore-team-backend:latest
    container_name: archcore-backend
    restart: unless-stopped
    depends_on:
      postgres:
        condition: service_healthy
    environment:
      ARCHCORE_DATABASE_URL: postgres://\${POSTGRES_USER:-archcore}:\${POSTGRES_PASSWORD}@postgres:5432/\${POSTGRES_DB:-archcore}?sslmode=disable
      GIT_TOKEN: \${GIT_TOKEN:-}
    expose:
      - '8080'
    volumes:
      - archcore_data:/data
    healthcheck:
      test:
        [
          'CMD',
          'wget',
          '--no-verbose',
          '--tries=1',
          '--spider',
          'http://localhost:8080/api/v1/status',
        ]
      interval: 30s
      timeout: 10s
      start_period: 10s
      retries: 3
    networks:
      - archcore-network

  frontend:
    image: ghcr.io/archcore-ai/archcore-team-frontend:latest
    container_name: archcore-frontend
    restart: unless-stopped
    depends_on:
      backend:
        condition: service_healthy
    ports:
      - '\${WEB_PORT:-80}:80'
    healthcheck:
      test:
        [
          'CMD',
          'wget',
          '--no-verbose',
          '--tries=1',
          '--spider',
          'http://localhost/',
        ]
      interval: 30s
      timeout: 10s
      start_period: 5s
      retries: 3
    networks:
      - archcore-network

volumes:
  postgres_data:
    name: archcore-postgres-data
  archcore_data:
    name: archcore-app-data

networks:
  archcore-network:
    name: archcore-network
    driver: bridge`;

export const RUN_COMMAND = "docker compose up -d";
