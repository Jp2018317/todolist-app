"use server"

//db
import { db } from "@/db"
import { tasks } from "@/db/schema/tasks";

//Drizzle
import { eq } from "drizzle-orm";
import { datetime } from "drizzle-orm/mysql-core";

//Types
import { Task } from "@/config/types";

export async function getTasks() {
    return db.select().from(tasks);
}

export async function getTasksByStatus(status: "Complete" | "Incomplete") {
    return db.select().from(tasks).where(eq(tasks.status, status));
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