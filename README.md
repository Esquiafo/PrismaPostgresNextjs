# Database: Postgress
# ORM: Prisma
# API: Next.js

1. yarn install
2. yarn build
3. yarn dev
4. yarn prisma studio (to see online database, dont forget to add in URL PATH .env and deploy Postgress in localhost)
5. yarn ts-node prisma.ts (running all the queries in prisma.ts file)

## API PATHS

- ***/api/***    \*get
    - ***/api/product***    \* get/post
        - ***/api/product/:id***    \*get/delete/put
    - ***/api/user***    \* get/post
        - ***/api/user/:id***    \*get/delete/put
    - ***/api/sell***    \* get/post
        - ***/api/sell/:id***    \* get/delete/put


## ENV
DATABASE_URL="postgresql://(USER):(PASSWORD)@(HOSTNAME)(PORT)/(DB)"