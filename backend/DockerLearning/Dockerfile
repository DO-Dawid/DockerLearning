FROM python:3.10-slim-bullseye

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

RUN apt-get update && apt-get install -y \
    curl gnupg2 apt-transport-https software-properties-common \
    build-essential libpq-dev

RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - && \
    curl https://packages.microsoft.com/config/debian/11/prod.list > /etc/apt/sources.list.d/mssql-release.list && \
    apt-get update

RUN rm -f /etc/odbc.ini || true

RUN ACCEPT_EULA=Y apt-get install -y msodbcsql17 unixodbc unixodbc-dev --allow-downgrades --allow-change-held-packages || \
    dpkg --configure -a

WORKDIR /app

COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app/

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
