import {mutation, query} from "./_generated/server";
import {v} from "convex/values"

export const getLists = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("lists").collect();
    },
});

export const getById  = query({
    args: {id: v.id("lists")},
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    }
})

export const setList = mutation({
    args: {
        name: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("lists", {
            name: args.name,
        });
    },
});