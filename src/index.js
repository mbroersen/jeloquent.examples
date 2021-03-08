import { Database, Store } from "jeloquent";
import { User, Team, Comment, Avatar, UserAddress } from "./models.js";

const models = [User, Team, Comment, Avatar, UserAddress];

const store = new Store();
store.add(new Database("app", models));
store.use("app");

Team.insert([{ id: 1, name: "Test Team" }]);
User.insert([{ id: 1, name: "Hello Mister", team_id: 1 }]);

console.log(User.find(1).team);
