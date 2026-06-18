import {defineSchema, defineTable} from "convex/server";
import {v} from "convex/values";

export default defineSchema({
    articles: defineTable({
        listId: v.id("lists"),
        name: v.string(),
        quantity: v.string(),
        unit: v.string(),
        isCompleted: v.boolean(),
    }).index("by_list", ["listId"]),
    lists: defineTable({
        name: v.string(),
    })
});