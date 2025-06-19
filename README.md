
# 🦚 Peacock Feeder – Документация

## 📦 Как се изграждат и стартират контейнерите

### 1. Изграждане на образ (Build)
```bash
docker build -t peacock-feeder
```

### 2. Стартиране на контейнерите (Run)
```bash
docker compose up --build
```

### 3. Стартиране на фонов режим
```bash
docker compose up -d
```

---

## 🗂️ Структура на проекта

```
Peacock-feeder-main/
├── Dockerfile                  
├── docker-compose.yml         
├── main.py                    
├── motor_functionality.py     
├── requirements.txt           
├── index.html                 
├── auto.html / auto.js        
├── main.js                    
├── customstyle.css            
├── bootstrap.min.css/.js      
```

---

## ⚙️ Описание на компонентите

| Компонент                 | Описание |
|--------------------------|----------|
| `main.py`                | Основният backend сървър на Flask, който приема HTTP заявки |
| `motor_functionality.py` | Обработва командите за физическото устройство (хранилка) |
| `index.html`             | Начален потребителски интерфейс |
| `main.js`                | JavaScript логика за клиентски заявки |
| `docker-compose.yml`     | Управлява средата чрез единна конфигурация |
| `Dockerfile`             | Генерира изолирана среда с нужните зависимости |

---

## 🔗 Комуникация между компонентите

- **Вътрешна комуникация (един контейнер):**
  - `index.html` + `main.js` комуникират чрез HTTP заявки с Flask сървъра (`main.py`)
  - Flask обработва заявките и използва `motor_functionality.py` за хардуерно управление

- **Портове:**
  - Уеб интерфейсът е достъпен на: `http://localhost:5000` (освен ако не е променен в `docker-compose.yml`)

---

## 📌 Инсталация и първи стъпки

1. Необходими Docker + Docker Compose (или Docker Desktop)
2. Клонирайте проекта:
```bash
git clone <https://github.com/nikolai-kostadinov/Peacock-feeder.git>
cd Peacock-feeder
```
3. Изградете и стартирайте:
```bash
docker compose up --build
```
4. Отворете браузър и отидете на `http://localhost:5000`

---
