
# 🦚 Peacock Feeder

## 🛠 Как се изграждат и стартират контейнерите

1. **Изграждане на Docker образа:**
   ```bash
   docker build -t peacock-feeder .
   ```

2. **Стартиране с docker-compose:**
   ```bash
   docker-compose up --build
   ```

3. **Ръчно стартиране без docker-compose:**
   ```bash
   docker run -p 5000:5000 peacock-feeder
   ```

---

## 🧱 Структура на проекта

```
Peacock-feeder-main/
├── Dockerfile                  # Docker конфигурация
├── docker-compose.yml         # Compose конфигурация
├── main.py                    # Основният Python backend
├── motor_functionality.py     # Управление на мотор (функции за хранене)
├── requirements.txt           # Python зависимости
├── index.html                 # Основен HTML интерфейс
├── auto.html, auto.js         # Допълнителни frontend компоненти
├── main.js                    # JavaScript логика
├── customstyle.css            # Персонализиран CSS
├── bootstrap.min.css/js       # Bootstrap стил и функционалност
```

---

## ⚙️ Как работи всеки от компонентите

- **`main.py`** – стартира Flask сървър, управлява рутинг и комуникира с хардуера чрез `motor_functionality.py`.
- **`motor_functionality.py`** – съдържа функции за задействане на мотор, например за пускане на храна.
- **HTML/JS/CSS файлове** – предоставят уеб интерфейс за взаимодействие с потребителя.
- **`docker-compose.yml`** – дефинира услугите и мрежите за проекта.
- **`Dockerfile`** – създава Docker образ от Python база и инсталира нужните зависимости.

---

## 🔌 Комуникация между услугите

- Всички компоненти се намират в един и същ контейнер (в този проект не се използва многоконтейнерна архитектура).
- Комуникацията се осъществява вътрешно:
  - **Frontend** (HTML + JS) изпраща HTTP заявки (напр. `/feed`) към **Flask сървъра** в `main.py`.
  - **Flask** обработва заявките и използва `motor_functionality.py`, за да задейства хардуера.
