import { tool } from "@anthropic-ai/claude-agent-sdk";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";

const ALLOWED_TABLES = [
  "columns",
  "topics",
  "posts",
  "inquiries",
  "reviews",
  "feedback",
  "content_ideas",
  "outreach_contacts",
  "social_leads",
  "social_connections",
  "generated_visuals",
  "agent_preferences",
  "daily_progress",
  "deployed_agents",
] as const;

const tableEnum = z.enum(ALLOWED_TABLES);

const FILTER_OPERATORS = [
  "eq",
  "neq",
  "gt",
  "gte",
  "lt",
  "lte",
  "like",
  "ilike",
] as const;

// --- list_tables ---
export const listTables = tool(
  "list_tables",
  "Returns all queryable table names with approximate row counts. Use this first to understand what data is available.",
  {},
  async () => {
    const supabase = createAdminClient();
    const results: { table: string; count: number }[] = [];

    for (const table of ALLOWED_TABLES) {
      const { count, error } = await supabase
        .from(table)
        .select("*", { count: "exact", head: true });

      results.push({
        table,
        count: error ? -1 : (count ?? 0),
      });
    }

    const text = results
      .map(
        (r) =>
          `- **${r.table}**: ${r.count === -1 ? "error reading" : `${r.count} rows`}`
      )
      .join("\n");

    return {
      content: [
        {
          type: "text" as const,
          text: `Available tables (${results.length}):\n\n${text}`,
        },
      ],
    };
  }
);

// --- describe_table ---
export const describeTable = tool(
  "describe_table",
  "Returns column names, types, and a sample row for a given table. Use this to understand a table's schema before querying.",
  {
    table: tableEnum.describe("The table to describe"),
  },
  async ({ table }) => {
    const supabase = createAdminClient();

    // Fetch a single row to infer schema
    const { data, error } = await supabase.from(table).select("*").limit(1);

    if (error) {
      return {
        content: [
          {
            type: "text" as const,
            text: `Error describing table "${table}": ${error.message}`,
          },
        ],
      };
    }

    if (!data || data.length === 0) {
      return {
        content: [
          {
            type: "text" as const,
            text: `Table "${table}" exists but has no rows. Cannot infer schema from empty table.`,
          },
        ],
      };
    }

    const sample = data[0];
    const columns = Object.entries(sample).map(([name, value]) => ({
      name,
      type: value === null ? "unknown" : typeof value,
      sample: value === null ? "null" : String(value).slice(0, 100),
    }));

    const schemaText = columns
      .map((c) => `- **${c.name}** (${c.type}): \`${c.sample}\``)
      .join("\n");

    return {
      content: [
        {
          type: "text" as const,
          text: `Schema for "${table}" (${columns.length} columns):\n\n${schemaText}`,
        },
      ],
    };
  }
);

// --- query_table ---
export const queryTable = tool(
  "query_table",
  "Query a table with optional column selection, filters, ordering, and limit. Returns up to 100 rows. Use this for reading and analyzing data.",
  {
    table: tableEnum.describe("The table to query"),
    select: z
      .string()
      .optional()
      .describe(
        'Columns to select (comma-separated). Defaults to "*". Supports Supabase select syntax like "id, title, posts(count)"'
      ),
    filters: z
      .array(
        z.object({
          column: z.string().describe("Column name to filter on"),
          operator: z
            .enum(FILTER_OPERATORS)
            .describe("Comparison operator"),
          value: z
            .union([z.string(), z.number(), z.boolean()])
            .describe("Value to compare against"),
        })
      )
      .optional()
      .describe("Optional array of filter conditions"),
    order_by: z
      .string()
      .optional()
      .describe("Column to order by"),
    ascending: z
      .boolean()
      .optional()
      .describe("Sort ascending (true) or descending (false). Defaults to true."),
    limit: z
      .number()
      .optional()
      .describe("Max rows to return (1-100). Defaults to 20."),
  },
  async ({ table, select, filters, order_by, ascending, limit }) => {
    const supabase = createAdminClient();
    const rowLimit = Math.min(Math.max(limit ?? 20, 1), 100);

    let query = supabase.from(table).select(select || "*");

    // Apply filters
    if (filters) {
      for (const f of filters) {
        switch (f.operator) {
          case "eq":
            query = query.eq(f.column, f.value);
            break;
          case "neq":
            query = query.neq(f.column, f.value);
            break;
          case "gt":
            query = query.gt(f.column, f.value);
            break;
          case "gte":
            query = query.gte(f.column, f.value);
            break;
          case "lt":
            query = query.lt(f.column, f.value);
            break;
          case "lte":
            query = query.lte(f.column, f.value);
            break;
          case "like":
            query = query.like(f.column, String(f.value));
            break;
          case "ilike":
            query = query.ilike(f.column, String(f.value));
            break;
        }
      }
    }

    if (order_by) {
      query = query.order(order_by, { ascending: ascending ?? true });
    }

    query = query.limit(rowLimit);

    const { data, error } = await query;

    if (error) {
      return {
        content: [
          {
            type: "text" as const,
            text: `Error querying "${table}": ${error.message}`,
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text" as const,
          text:
            !data || data.length === 0
              ? `No rows found in "${table}" matching your query.`
              : `Query returned ${data.length} row(s) from "${table}":\n\n\`\`\`json\n${JSON.stringify(data, null, 2)}\n\`\`\``,
        },
      ],
    };
  }
);

// --- count_rows ---
export const countRows = tool(
  "count_rows",
  "Count rows in a table with optional filters. Useful for aggregations and summaries.",
  {
    table: tableEnum.describe("The table to count rows in"),
    filters: z
      .array(
        z.object({
          column: z.string().describe("Column name to filter on"),
          operator: z.enum(FILTER_OPERATORS).describe("Comparison operator"),
          value: z
            .union([z.string(), z.number(), z.boolean()])
            .describe("Value to compare against"),
        })
      )
      .optional()
      .describe("Optional array of filter conditions"),
  },
  async ({ table, filters }) => {
    const supabase = createAdminClient();

    let query = supabase
      .from(table)
      .select("*", { count: "exact", head: true });

    if (filters) {
      for (const f of filters) {
        switch (f.operator) {
          case "eq":
            query = query.eq(f.column, f.value);
            break;
          case "neq":
            query = query.neq(f.column, f.value);
            break;
          case "gt":
            query = query.gt(f.column, f.value);
            break;
          case "gte":
            query = query.gte(f.column, f.value);
            break;
          case "lt":
            query = query.lt(f.column, f.value);
            break;
          case "lte":
            query = query.lte(f.column, f.value);
            break;
          case "like":
            query = query.like(f.column, String(f.value));
            break;
          case "ilike":
            query = query.ilike(f.column, String(f.value));
            break;
        }
      }
    }

    const { count, error } = await query;

    if (error) {
      return {
        content: [
          {
            type: "text" as const,
            text: `Error counting rows in "${table}": ${error.message}`,
          },
        ],
      };
    }

    const filterDesc =
      filters && filters.length > 0
        ? ` (with ${filters.length} filter${filters.length > 1 ? "s" : ""})`
        : "";

    return {
      content: [
        {
          type: "text" as const,
          text: `"${table}"${filterDesc}: **${count ?? 0}** rows`,
        },
      ],
    };
  }
);

export const allTools = [listTables, describeTable, queryTable, countRows];
