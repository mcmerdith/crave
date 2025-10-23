# Crave

Monorepo for the Crave app

## Architecture

`crave-app` A React Native mobile app

`crave-api` A NextJS API server

## Setup

Run `npm install` in the root directory (do NOT run in either `crave-app` or `crave-api`)

Create a `config.ts` from `config.example.ts` in `crave-api`.

## Running

All commands should be run from the root directory

`npm run dev -w crave-api` Run the API dev server

`npm run start -w crave-app` Run the Expo dev server
