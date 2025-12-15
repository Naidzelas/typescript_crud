## Tech stack
- TypeScript
- Vite
- Model Federation
- Primevue
- VueJs
- MSSQL
----
## Instructions
```
// Installs all dependencies in all of the micro frontends
npm run install:all

// Runs all micro frondends and server
npm run dev:all
```

env.example using dotenv
```
# Database Configuration
DB_SERVER=localhost
DB_DATABASE=your_db
DB_USER=your_user
DB_PASSWORD=your_password
DB_PORT=1433

# Server Configuration
PORT=3000

# Postit.lt API Configuration for Testing Environment
POSTIT_API_URL=https://postit.lt/API/v2/
POSTIT_API_KEY=your_api_key
```
----

## Preview
https://github.com/user-attachments/assets/6cb0d6f4-2f80-4b0e-ae6e-e8b385eac7cf

----
## TODO's
- [x] i18n for localization
- [ ] TypeORM or any equivalent for migration managing.
- [ ] Fix PrimeVue passthrough (currently styles not applying)
- [ ] Schedules with jobs for API calls


