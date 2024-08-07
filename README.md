## Client

**Change directory to client :**

```bash
cd client
```

**Create a `.env` file in the root directory of the server :**

```bash
touch .env
```

**Add the following environment variables to the `.env` file :**

```bash
NEXT_PUBLIC_API_URL=http://localhost:5056/search
```

**Install dependencies :**

```bash
npm i
```

**Run the development server :**

```bash
npm run dev
```

---

## Server

**Change directory to server :**

```bash
cd server
```

**Create a `.env` file in the root directory of the server :**

```bash
touch .env
```

**Add the following environment variables to the `.env` file :**

```bash
DB_NAME=your_db_name
PORT=port_number
```

**Install dependencies :**

```bash
npm i
```

**Run the development server :**

```bash
npm run dev
```

---

## MongoDB on Docker

**Locally setup MongoDB with Docker :**

```bash
docker run --name mongodb-local -p 27017:27017 -d mongodb/mongodb-community-server:latest
```

**Import `data.json` to MongoDB running in Docker container :**

```bash
docker cp ~/Documents/data.json mongodb-local:/tmp/data.json
```
