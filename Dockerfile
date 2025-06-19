# Use ARM-based Python image for Raspberry Pi (adjust if needed)
FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && \
    apt-get install -y python3-dev gcc && \
    apt-get clean

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python", "main.py"]

