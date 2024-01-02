"use server"

//db
import { db } from "@/db"
import { users } from "@/db/schema/user";

//Drizzle
import { eq, sql } from "drizzle-orm";

//Types
import { User } from "@/config/types";

//Config
import { getFormattedDate } from "@/config/config";

export async function getUsers() {
    return db.select().from(users);
}

export async function getUser(username: string) {
    return db.select().from(users).where(eq(users.username, username));
}

export async function updateUser({id, username}: Omit<User, "password" | "author" | "createdAt">){
    await db.update(users)
    .set({ username: username })
    .where(eq(users.id, id));
}

export async function deleteUser(id: number){
    await db.delete(users).where(eq(users.id, id));
}

export async function signup(username: string, password: string) {
    await db.insert(users).values({
        username: username,
        password: password,
        createdAt: getFormattedDate(Date.now())
    });
}

export async function login(username: string, password: string) {
    return db.select().from(users).where(sql`${users.username} = ${username} and ${users.password} = ${password}`);
}