


## Prerequisities

- Docker & docker compose Installed
- K6 installed 

## Run the app 

```
docker compose up -d
```

## Run the test

```
k6 run --out csv=test_results.csv ws-load-test.js

```