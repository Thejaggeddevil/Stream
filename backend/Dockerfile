# Production image for Flask API
FROM python:3.11-slim
WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

COPY backend/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt && pip install --no-cache-dir gunicorn
COPY backend/ ./

# Gunicorn config: 2 workers, threads for I/O bound, bind 0.0.0.0:5002
EXPOSE 5002
CMD ["gunicorn", "-w", "2", "-k", "gthread", "-b", "0.0.0.0:5002", "app:app"]