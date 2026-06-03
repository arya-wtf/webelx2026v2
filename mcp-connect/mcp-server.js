import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import fs from "fs";
import path from "path";
import { z } from "zod";

const server = new McpServer({ name: "copywriting-editor", version: "1.0.0" });

server.tool("read_copy", { filename: z.string() }, async ({ filename }) => {
  const filePath = path.join(
    "C:\\Ayleen\\Code\\webelx2026v2\\src\\content\\md",
    `${filename}.md`,
  );
  const content = fs.readFileSync(filePath, "utf8");
  return { content: [{ type: "text", text: content }] };
});

server.tool(
  "write_copy",
  { filename: z.string(), content: z.string() },
  async ({ filename, content }) => {
    const filePath = path.join(
      "C:\\Ayleen\\Code\\webelx2026v2\\src\\content\\md",
      `${filename}.md`,
    );
    fs.writeFileSync(filePath, content, "utf8");
    return {
      content: [{ type: "text", text: `${filename}.md berhasil diupdate!` }],
    };
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);
