# Rentals

> Simple Property Rental Application

## Requirements

- Install Node
  - on OSX , install git and type 'brew install git'
  - on OSX, install [home brew](http://brew.sh/) and type `brew install node`
  - on Windows, use the installer available at [nodejs.org](http://nodejs.org/)

## Getting Started

### Configuration

Install dependencies with the following command:

```sh
$ npm install
```

The backend is utilizing [Mongodb Atlas](https://www.mongodb.com/) to host the database. After creating an account and a cluster following the instructions on the service.

Create an environment variable `.env` in the `/api` directory with the following key values:

```env
PORT=9000
DB_USER=<username>
DB_USER_PASSWORD=<password>
DB_CLUSTER=<mongodb cluster>
G_CLIENT_ID=<Google OAuth client id>
G_CLIENT_SECRET=<Google OAuth API secret>
PUBLIC_URL=<http://localhost:5173>
SECRET=<some secret text>
NODE_ENV=<development for local dev>
```

Once your environment has been configured you can seed the cluster with mock data:

```
$ npm run seed
```

### api

```
$ npm run start:api
```

### web

```
$ npm run start:web
```
