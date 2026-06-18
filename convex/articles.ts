import {mutation, query} from "./_generated/server";
import {v} from "convex/values"

export const getArticles = query({
    args: {
        listId: v.id("lists"),
    },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("articles")
            .withIndex("by_list", (q) => q.eq("listId", args.listId))
            .collect();
    },
});

export const setArticle = mutation({
    args: {
        quantity: v.string(),
        unit: v.string(),
        name: v.string(),
        listId: v.id("lists"),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("articles", {
            listId: args.listId,
            name: args.name,
            unit: args.unit,
            quantity: args.quantity,
            isCompleted: false,
        });
    },
});

export const deleteArticle = mutation({
    args: {
        id: v.id("articles"),
    },
    handler: async (ctx, args) => {
        await ctx.db.delete("articles", args.id);
    },
});

export const setComplete = mutation({
    args: {
        id: v.id("articles"),
        complete: v.boolean(),
    },
    handler: async (ctx, args) => {
        await ctx.db.patch("articles", args.id, {
            isCompleted: args.complete,
        });
    },
})