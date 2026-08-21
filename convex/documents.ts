import { ConvexError, v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

import { mutation, query } from "./_generated/server";

export const getDocuments = query({
  args: {
    paginationOpts: paginationOptsValidator,
    search: v.optional(v.string()),
  },

  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      return {
        page: [],
        isDone: true,
        continueCursor: "",
      };
    }

    const organizationId = (user.organization_id ?? undefined) as
      string | undefined;

    if (args.search && organizationId) {
      const search = args.search;

      return await ctx.db
        .query("documents")
        .withSearchIndex("search_title", (q) => {
          return q.search("title", search).eq("organizationID", organizationId);
        })
        .paginate(args.paginationOpts);
    }

    if (organizationId) {
      return await ctx.db
        .query("documents")
        .withIndex("by_organization_id", (q) =>
          q.eq("organizationID", organizationId),
        )
        .order("desc")
        .paginate(args.paginationOpts);
    }

    if (args.search) {
      const search = args.search;

      return await ctx.db
        .query("documents")
        .withSearchIndex("search_title", (q) => {
          return q.search("title", search).eq("ownerID", user.subject);
        })
        .paginate(args.paginationOpts);
    }

    return await ctx.db
      .query("documents")
      .withIndex("by_owner_id", (q) => q.eq("ownerID", user.subject))
      .order("desc")
      .paginate(args.paginationOpts);
  },
});

export const createDocument = mutation({
  args: {
    title: v.optional(v.string()),
    initialContent: v.optional(v.string()),
  },

  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new ConvexError("Not logged in");
    }

    const organizationId = (user.organization_id ?? undefined) as
      string | undefined;

    return await ctx.db.insert("documents", {
      title: args.title ?? "Untitled Document",
      initialContent: args.initialContent,
      ownerID: user.subject,
      organizationID: organizationId,
    });
  },
});

export const removeById = mutation({
  args: {
    id: v.id("documents"),
  },

  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new ConvexError("Not logged in");
    }

    const document = await ctx.db.get(args.id);
    if (!document) {
      throw new ConvexError("Document not found");
    }

    const organizationId = user.organization_role ?? undefined;

    const isOwner = document.ownerID === user.subject;
    const isOrganizationOwner = document.organizationID === organizationId;

    if (!isOwner && !isOrganizationOwner) {
      throw new ConvexError("Not the owner");
    }

    return await ctx.db.delete(args.id);
  },
});

export const updateById = mutation({
  args: {
    id: v.id("documents"),
    title: v.string(),
  },

  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new ConvexError("Not logged in");
    }

    const document = await ctx.db.get(args.id);
    if (!document) {
      throw new ConvexError("Document not found");
    }

    const organizationId = (user.organization_id ?? undefined) as
      string | undefined;

    const isOwner = document.ownerID === user.subject;
    const isOrganizationMember = document.organizationID === organizationId;

    if (!isOwner && !isOrganizationMember) {
      throw new ConvexError("Not the owner");
    }

    return await ctx.db.patch(args.id, { title: args.title });
  },
});
