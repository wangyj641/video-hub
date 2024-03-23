# Video Hub

Video collection

Developed with Next.js, react, TailwindCSS, Prisma, postgreSQL, Docker.

### Key Features:

- Manage videos and browse video list
- TailwindCSS UI design
- Credential authentication with NextAuth
- Github authentication integration

## Getting Started

### Start DB service in Docker
docker-compose up -d

### Setup .env file


```js
DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/median-db"

GITHUB_ID='Iv1.92fee79258464330'
GITHUB_SECRET='57f14c11716ca87e03573181ac8f168cde43f714'

EMAIL_SERVER_PASSWORD=MWRSQATPFJDEHWJJ
EMAIL_SERVER_HOST=smtp.126.com
EMAIL_SERVER_PORT=25
EMAIL_FROM=Video Hub Admin <to_wyj@126.com>
```

### Setup DB

```shell
npx prisma migrate dev --name "init"
```

### Generate test data

```shell
npx ts-node ./prisma/seed.ts
```

### Start the app

```shell
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
