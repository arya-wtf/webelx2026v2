import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO        = process.env.GITHUB_REPO  || "arya-wtf/webelx2026v2";
const BRANCH      = process.env.GITHUB_BRANCH || "devel";
const BASE_PATH   = "src/content/md";

if (!GITHUB_TOKEN) {
  console.error("Missing GITHUB_TOKEN env variable");
  process.exit(1);
}

async function githubRequest(path, method = "GET", body = null) {
  const url = `https://api.github.com/repos/${REPO}/contents/${path}?ref=${BRANCH}`;
  const opts = {
    method,
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
      "User-Agent": "elux-mcp-server",
    },
  };
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(url, opts);
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub API error ${res.status}: ${err}`);
  }
  return res.json();
}

const server = new McpServer({ name: "copywriting-editor", version: "2.0.0" });

// ── tool: list_files ──────────────────────────────────────────────────────────
server.tool("list_files", {}, async () => {
  const url = `https://api.github.com/repos/${REPO}/contents/${BASE_PATH}?ref=${BRANCH}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      "User-Agent": "elux-mcp-server",
    },
  });
  const files = await res.json();
  const names = files.map((f) => f.name).join("\n");
  return { content: [{ type: "text", text: names }] };
});

// ── tool: read_copy ───────────────────────────────────────────────────────────
server.tool("read_copy", { filename: z.string() }, async ({ filename }) => {
  const data = await githubRequest(`${BASE_PATH}/${filename}.md`);
  const content = Buffer.from(data.content, "base64").toString("utf8");
  return { content: [{ type: "text", text: content }] };
});

// ── tool: write_copy ──────────────────────────────────────────────────────────
server.tool(
  "write_copy",
  { filename: z.string(), content: z.string() },
  async ({ filename, content }) => {
    const filePath = `${BASE_PATH}/${filename}.md`;

    // get current SHA (required by GitHub API to update a file)
    const current = await githubRequest(filePath);
    const sha = current.sha;

    const encoded = Buffer.from(content, "utf8").toString("base64");

    const url = `https://api.github.com/repos/${REPO}/contents/${filePath}`;
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
        "User-Agent": "elux-mcp-server",
      },
      body: JSON.stringify({
        message: `chore: update ${filename}.md via MCP`,
        content: encoded,
        sha,
        branch: BRANCH,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Failed to write: ${err}`);
    }

    return {
      content: [{ type: "text", text: `${filename}.md berhasil diupdate!` }],
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
