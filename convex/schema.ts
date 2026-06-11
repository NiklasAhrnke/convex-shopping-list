import {defineSchema, defineTable} from "convex/server";
import {v} from "convex/values";

export default defineSchema({
    articles: defineTable({
        name: v.string(),
        quantity: v.string(),
        unit: v.string(),
        isCompleted: v.boolean(),
    }),
});