"use server"

//db
import { db } from "@/db"
import { users } from "@/db/schema/user";

//Drizzle
import { eq } from "drizzle-orm";

//Types
import { User } from "@/config/types";

export async function getUsers() {
    return db.select().from(users);
}

export async function getUser(username: string) {
    return db.select().from(users).where(eq(users.username, username));
}

export async function addUser({username, password}: Omit<User, "id" | "createdAt">){
    await db.insert(users).values({
        username: username,
        password: password,
    });
}

export async function updateUser({id, username}: Omit<User, "password" | "author" | "createdAt">){
    await db.update(users)
    .set({ username: username })
    .where(eq(users.id, id));
}

export async function deleteUser(id: number){
    await db.delete(users).where(eq(users.id, id));
}