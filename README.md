# 2203-wns-etchebest-console-log-back

## Getting Started
Installation
```bash
git clone git@github.com:WildCodeSchool/2203-wns-etchebest-console-log-back.git
# or
https://github.com/WildCodeSchool/2203-wns-etchebest-console-log-back.git
# then
cd 2203-wns-etchebest-console-log-back
npm install
# or
yarn
```


Now, run the development server:

```bash
npm start
# or
yarn start
```

To run the server locally, run: 

```bash
mongod --port 27017 --dbpath /path/to/mongodb --replSet rs0 --bind_ip localhost,CustomHostName

#on MacOS (Homebrew)
mongod --port 27017 --dbpath /opt/homebrew/var/mongodb/ --replSet rs0 --bind_ip localhost,HomeHost ```

 While running, open a new terminal & run `mongosh` :
```bash
rs.initiate({_id: 'rs0', members: [{_id: 0, host: 'localhost:27017'}]});
```