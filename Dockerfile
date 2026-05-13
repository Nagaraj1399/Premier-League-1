# Stage 1: Build Frontend
FROM node:20-slim as frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Final Image
FROM python:3.11-slim
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy backend requirements and install
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source
COPY backend/ .

# Copy built frontend from Stage 1 into the backend folder's 'dist' subfolder
COPY --from=frontend-builder /app/dist /app/dist

# Cloud Run environment
ENV PORT 8080
EXPOSE 8080

# Run with python directly for maximum port binding reliability
CMD ["python", "app.py"]
