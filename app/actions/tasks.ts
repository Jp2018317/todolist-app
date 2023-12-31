"use server"

//db
import { db } from "@/db"
import { tasks } from "@/db/schema/tasks";

//Drizzle
import { eq, sql } from "drizzle-orm";
import { datetime } from "drizzle-orm/mysql-core";

//Types
import { Task } from "@/config/types";

export async function getTasks(username: string) {
    return db.select().from(tasks).where(eq(tasks.author, username));
}

export async function getTasksByStatus(status: "Complete" | "Incomplete", username: string) {
    return db.select().from(tasks).where(sql`${tasks.status} = ${status} and ${tasks.author} = ${username}`);
}

export async function addTask({title, author}: Omit<Task, "id" | "status" | "createdAt" | "updatedAt">){
    await db.insert(tasks).values({
        title: title,
        author: author,
    });
}

export async function updateTask({id, title, status}: Omit<Task, "author" | "createdAt">){
    await db.update(tasks)
    .set({ title: title, status: status, updatedAt: datetime.toString() })
    .where(eq(tasks.id, id));
}

export async function deleteTask(id: number){
    await db.delete(tasks).where(eq(tasks.id, id));
}