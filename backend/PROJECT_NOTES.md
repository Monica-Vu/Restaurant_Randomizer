# Technologies
* Node
* Express: build REST api
* `body-parser`: an Express middleware to parse the request and create `rew.body` object
* `cors`: an Express middleware to enable CORS

# Vocabulary
**cross-origin resource sharing (CORS)**: 

# Configuration Notes
* The first five parameters are for PostgreSQL connection. `pool` is optional: it'll be used for Sequelize connection pool configuration:
    * max: maximum number of connection in pool
    * min: minimum number of connection in pool
    * idle: maximum time, in milliseconds, that a connection can be idle before being released
    * acquire: maximum time, in milliseconds, that pool will try to get connection before throwing error

# Sequelize Model Notes
* Columns that are automatically generated: `id`, `createdAt`, `updatedAt` 

# Tutorials
https://www.geeksforgeeks.org/postgresql-naming-conventions/ -> learn about naming convetions

# Action Items
- [ ] Add a One-to-Many Relationship
- [ ] Add a Many-to-Many Relationship

# Sources
https://www.bezkoder.com/react-node-express-postgresql/#Reactjs_Front-end

Running `create-react-app` first to connect it