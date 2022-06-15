# 2203-wns-etchebest-console-log-back

# GETTING STARTED

## STEP 1 Installation
```bash
# A. Clone
git clone git@github.com:WildCodeSchool/2203-wns-etchebest-console-log-back.git
# or
https://github.com/WildCodeSchool/2203-wns-etchebest-console-log-back.git

# B. Go to the cloned folder
cd 2203-wns-etchebest-console-log-back

# C. install dependencies
npm install
# or
yarn

# D. Change your local environment variables according to .env.example

# E. Make sure you generated the prisma CRUD models and resolvers with
npx prisma generate
```

## STEP 2 Create a local postgresql database if not existing
in `psql` :

```bash
CREATE DATABASE consolelogdb;
# THEN EXIT PSQL
\q
```

## STEP 3 Initialize your database according to prisma schema
```bash
npx prisma db push
```
Later in the project, after this first initialization,
we will use the `npx prisma migrate dev` tool

## STEP 4 run the server locally
```
npm start
# or
yarn start
```
