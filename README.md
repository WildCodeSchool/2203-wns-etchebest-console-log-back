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

# D. Make sure you generated the prisma CRUD models and resolvers with
npx prisma generate
```

## STEP 2 CONFIGURATION (see below for Homebrew)
To run the mongodb database locally, follow these steps:
Make sure you shut down mongod's instance.
Start mongod (configured for replication) with the command below :

```bash
mongod --port 27017 --dbpath /path/to/mongodb --replSet rs0 --bind_ip localhost,CustomHostName
# (keep this terminal open)
```

## OR
## STEP 2bis (if you're using a service like Homebrew)
```brew services stop mongodb-community@5.0```

Then change mongod options for the homebrew service (add these 2 lines at the end of the file) :
```mongod.conf
# /etc/mongod.conf (Linux)
# /usr/local/etc/mongod.conf (MacOS Intel) or /opt/homebrew/etc/mongod.conf (MacOS M1)
# <install directory>\bin\mongod.cfg (Windows)
replication:
  replSetName: "rs0"
```

Then start the service again in shell command with
```bash
brew services start mongodb-community@5.0
```

## STEP 3 INITIATE MONGOSH, only needed once (with replication settings for prisma)
While mongod is running, open a new terminal & run `mongosh`, then :
```bash
rs.initiate({_id: 'rs0', members: [{_id: 0, host: 'localhost:27017'}]});
```

## STEP 4 run the server locally
```
#You might need to reproduce step 2 if you closed your mongod instance
npm start
# or
yarn start
```
