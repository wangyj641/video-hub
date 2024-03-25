# video-hub

Video collection

Developed with Next.js, react, TailwindCSS, Prisma, postgreSQL, Docker.

### Key Features:

- Login/Logout/Register a new user
- Credential authentication with NextAuth
- Github authentication integration
- Manage video list
- Play a video
- TailwindCSS UI design

### Getting Started

##### Start DB service in Docker
```shell
docker-compose up -d
```

##### Setup .env file
```js
DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/median-db"

GITHUB_ID='81be641fa35f0b0e7044'
GITHUB_SECRET='467f95c35cbcb795f8086a5ebb78a2de74d40dcb'

EMAIL_SERVER_PASSWORD=MWRSQATPFJDEHWJJ
EMAIL_SERVER_HOST=smtp.126.com
EMAIL_SERVER_PORT=25
EMAIL_FROM=Video Hub Admin <to_wyj@126.com>
```

##### Setup DB
```shell
npx prisma migrate dev --name "init"
```

##### Generate test data
```shell
npx ts-node ./prisma/seed.ts
```

##### Start the app
```shell
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
