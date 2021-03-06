/* bootstrap database in your FaunaDB account */
const readline = require("readline");
const faunadb = require("faunadb");
const chalk = require("chalk");
const insideNetlify = insideNetlifyBuildContext();
const q = faunadb.query;

if (!process.env.FAUNADB_SERVER_SECRET) {
  console.log("No FAUNADB_SERVER_SECRET found");
  console.log("Please run `netlify addons:create fauna-staging` and redeploy");
  return false;
}

// // NOT SECURE to leave uncommented - but this is handy for debugging
// console.log('server', process.env.FAUNADB_SERVER_SECRET);
// console.log('admin', process.env.FAUNADB_ADMIN_SECRET);

console.log(chalk.cyan("Creating your FaunaDB Database...\n"));
if (insideNetlify) {
  // Run idempotent database creation
  createFaunaDB(process.env.FAUNADB_SERVER_SECRET).then(() => {
    console.log("Database created");
  });
} else if (process.env.FAUNADB_SERVER_SECRET) {
  createFaunaDB(process.env.FAUNADB_SERVER_SECRET).then(() => {
    console.log("Database created");
  });
} else {
  console.log();
  console.log(
    "You can create fauna DB keys here: https://dashboard.fauna.com/db/keys"
  );
  console.log();
  ask(chalk.bold("Enter your faunaDB server key"), (err, answer) => {
    if (err) {
      console.log(err);
    }
    if (!answer) {
      console.log("Please supply a faunaDB server key");
      process.exit(1);
    }
    createFaunaDB(process.env.FAUNADB_SERVER_SECRET).then(() => {
      console.log("Database created");
    });
  });
}

/* idempotent operation */
function createFaunaDB(key) {
  console.log("Create the database!");
  const client = new faunadb.Client({
    secret: key
  });

  /* Based on your requirements, change the schema here */
  return client
    .query(
      q.CreateClass({
        name: "users"
      })
    )
    .then(
      () =>
        console.log("==> createusers success") ||
        client.query(
          q.Do(
            q.CreateClass({
              name: "sessionRegistrations",
              permissions: {
                create: q.Class("users")
              }
            })
          )
        )
    )
    .then(
      () =>
        console.log("==> create sessionRegistrations success") ||
        client.query(
          q.Do(
            q.CreateIndex({
              name: "users_by_id",
              source: q.Class("users"),
              terms: [
                {
                  field: ["data", "id"]
                }
              ],
              unique: true
            }),
            q.CreateIndex({
              name: "sessionRegistration_by_session",
              source: q.Class("sessionRegistrations"),
              terms: [
                {
                  field: ["data", "session"]
                }
              ],
              permissions: {
                read: q.Class("users")
              }
            }),
            q.CreateIndex({
              // this index is optional but useful in development for browsing users
              name: `all_users`,
              source: q.Class("users")
            }),
            q.CreateIndex({
              name: "all_sessionRegistrations",
              source: q.Class("sessionRegistrations"),
              permissions: {
                read: q.Class("users")
              }
            })
          )
        )
    )
    .then(
      console.log("==> create indexes success") || console.log.bind(console)
    )
    .then(
      console.log("==> create  everything success") || console.log.bind(console)
    )
    .catch(e => {
      if (e.message === "instance not unique") {
        console.log("schema already created... skipping");
      } else {
        console.error(e);
        throw e;
      }
    });
}

/* util methods */

// Test if inside netlify build context
function insideNetlifyBuildContext() {
  if (process.env.DEPLOY_PRIME_URL) {
    return true;
  }
  return false;
}

// Readline util
function ask(question, callback) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question(question + "\n", function(answer) {
    rl.close();
    callback(null, answer);
  });
}
