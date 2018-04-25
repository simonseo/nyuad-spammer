'use strict'

var sqlite3 = require('sqlite3').verbose();
var db;

function createDatabase() {
  console.log("Creating Spammer Database");
  db = new sqlite3.Database('spammerDatabase.db');
}

function createUsersTable() {
  console.log("Creating Users Table");
  db.run("CREATE TABLE IF NOT EXISTS users (userid TEXT NOT NULL, timestamp TEXT NOT NULL)");
}

function createCategoriesTable() {
  console.log("Creating Categories Table");
  db.run("CREATE TABLE IF NOT EXISTS categories (categoryid TEXT NOT NULL, categoryString TEXT NOT NULL)", addCategoriesToTable);
}

function addCategoriesToTable() {
  console.log("Inserting categories");
  //need to grab the categories from csv
  var list = ['studentlife', 'athletics', 'resed'];

  var categories = db.prepare("INSERT INTO categories VALUES (?, ?)");
  for (var i = 0; i < list.length; i++) {
      categories.run(i, list[i]);
  }
  categories.finalize(readValues);
}

function readValues() {
  console.log("Reading values");
  db.all("SELECT categoryid, categoryString FROM categories", function(err, rows) {
      rows.forEach(function (row) {
          console.log(row.categoryid + ": " + row.categoryString);
      });
  });
}

function createUserSubscriptionsTable() {
  console.log("Creating User Subscription Table");
  db.run("CREATE TABLE IF NOT EXISTS userSubscription (userid TEXT NOT NULL, categoryString TEXT NOT NULL)");
}

function closeDatabase() {
  console.log("Closing Database");
  db.close();
}

createDatabase();
createUsersTable();
createCategoriesTable();
createUserSubscriptionsTable();
closeDatabase();
