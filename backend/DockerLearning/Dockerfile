# Bazowy obraz z Pythonem
FROM python:3.10-slim

# Wyłączenie buforowania i zapisu .pyc
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

# Wymagane do instalacji sterownika MsSQL (msodbcsql17)
RUN apt-get update && apt-get install -y curl gnupg2 apt-transport-https unixodbc-dev

# Dodanie repozytorium Microsoftu (dla msodbcsql17)
RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - && \
    curl https://packages.microsoft.com/config/debian/11/prod.list > /etc/apt/sources.list.d/mssql-release.list && \
    apt-get update && ACCEPT_EULA=Y apt-get install -y msodbcsql17

WORKDIR /app

# Kopiujemy zależności
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Kopiujemy kod Django
COPY . /app/

# Port, na którym będzie Django
EXPOSE 8000

# Domyślna komenda (nadpisana w docker-compose.yml)
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
