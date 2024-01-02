"use server"

//db
import { db } from "@/db"
import { tasks } from "@/db/schema/tasks";

//Drizzle
import { eq, sql } from "drizzle-orm";

//Types
import { Task } from "@/config/types";
import { getFormattedDate } from "@/config/config";

export async function getTasks(username: string, filter: string) {
    if(filter === "ALL"){
        return db.select().from(tasks).where(eq(tasks.author, username));
    }
    return db.select().from(tasks).where(sql`${tasks.status} = ${filter} and ${tasks.author} = ${username}`);
}

export async function getTask(id: number) {
    return db.select().from(tasks).where(eq(tasks.id, id));
}

export async function addNewTask({title, status, author}: Omit<Task, "id" | "createdAt" | "updatedAt">){
    await db.insert(tasks).values({
        title: title,
        status: status,
        author: author,
        createdAt: getFormattedDate(Date.now())
    });
}

export async function updateTask({id, title, status}: Omit<Task, "author" | "createdAt" | "updatedAt">){
    await db.update(tasks)
    .set({ title: title, status: status, updatedAt: getFormattedDate(Date.now()) })
    .where(eq(tasks.id, id));
}

export async function deleteTask(id: number){
    await db.delete(tasks).where(eq(tasks.id, id));
}