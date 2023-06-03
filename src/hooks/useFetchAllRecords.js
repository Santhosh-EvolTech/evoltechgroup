import { client } from "../lib/pocketbase";

export async function getUsers() {
  return await client.collection("users").getFullList();
}
