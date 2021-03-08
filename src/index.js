import { Database, Store } from "jeloquent";
import { User, Team, Comment, Avatar, UserAddress } from "./models.js";

const models = [User, Team, Comment, Avatar, UserAddress];

const store = new Store();
store.add(new Database("app", models));
store.use("app");

Team.insert([
  { id: 1, name: "Test Team" },
  { id: 2, name: "Second Team" }
]);
User.insert([
  { id: 1, name: "Hello Mister", team_id: 1 },
  { id: 2, name: "Mister Hello", team_id: 1 },
  { id: 3, name: "World Hello", team_id: 1 },
  { id: 4, name: "Hello Mark", team_id: 2 }
]);
Comment.insert([
  { id: 1, title: "hello", text: "world", user_id: 1 },
  { id: 2, title: "world", text: "hello", user_id: 1 },
  { id: 3, title: "new", text: "world", user_id: 1 },
  { id: 4, title: "old", text: "world", user_id: 2 },
  { id: 5, title: "old", text: "world", user_id: 2 },
  { id: 6, title: "old", text: "world", user_id: 4 },
  { id: 7, title: "old", text: "world", user_id: 4 },
  { id: 8, title: "old", text: "world", user_id: 4 }
]);

console.log(
  User.find(1).team.comments,
  User.find(4).comments,
  Team.all(),
  User.all(),
  Comment.all().first().user.team.comments
);
