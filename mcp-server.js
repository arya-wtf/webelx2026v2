#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CONTENT_DIR = path.join(__dirname, "src", "content", "md");
const SRC_DIR = path.join(__dirname, "src");

const ALLOWED_SRC_EXTENSIONS = new Set([".jsx", ".js", ".css"]);

const serverInfo = {
  name: "website-copy-mcp",
  version: "1.0.0",
};

function send(message) {
  process.stdout.write(`${JSON.stringify(message)}\n`);
}

function sendResult(id, result) {
  send({
    jsonrpc: "2.0",
    id,
    result,
  });
}

function sendError(id, code, message, data) {
  send({
    jsonrpc: "2.0",
    id,
    error: {
      code,
      message,
      ...(data ? { data } : {}),
    },
  });
}

async function ensureContentDir() {
  await fs.mkdir(CONTENT_DIR, { recursive: true });
}

function resolveMarkdownFile(filename) {
  if (typeof filename !== "string" || filename.trim() === "") {
    throw new Error("filename wajib diisi.");
  }

  const normalizedName = filename.replaceAll("\\", "/").trim();

  if (!normalizedName.endsWith(".md")) {
    throw new Error("Hanya file dengan ekstensi .md yang boleh dibaca/ditulis.");
  }

  const resolvedPath = path.resolve(CONTENT_DIR, normalizedName);
  const relativePath = path.relative(CONTENT_DIR, resolvedPath);

  if (
    relativePath === "" ||
    relativePath.startsWith("..") ||
    path.isAbsolute(relativePath)
  ) {
    throw new Error("Path file harus berada di dalam folder content.");
  }

  return resolvedPath;
}

async function readCopy(args = {}) {
  await ensureContentDir();

  const filePath = resolveMarkdownFile(args.filename);
  const content = await fs.readFile(filePath, "utf8");

  return {
    content: [
      {
        type: "text",
        text: content,
      },
    ],
  };
}

async function writeCopy(args = {}) {
  await ensureContentDir();

  const filePath = resolveMarkdownFile(args.filename);
  const content = typeof args.content === "string" ? args.content : null;

  if (content === null) {
    throw new Error("content wajib berupa string.");
  }

  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, content, "utf8");

  return {
    content: [
      {
        type: "text",
        text: `Copywriting berhasil disimpan ke content/${path.relative(CONTENT_DIR, filePath).replaceAll("\\", "/")}`,
      },
    ],
  };
}

async function readComponent(args = {}) {
  if (typeof args.filename !== "string" || args.filename.trim() === "") {
    throw new Error("filename wajib diisi.");
  }

  const normalizedName = args.filename.replaceAll("\\", "/").trim();
  const ext = path.extname(normalizedName).toLowerCase();

  if (!ALLOWED_SRC_EXTENSIONS.has(ext)) {
    throw new Error(`Hanya file .jsx, .js, atau .css yang boleh dibaca. Extension '${ext}' tidak diizinkan.`);
  }

  const resolvedPath = path.resolve(SRC_DIR, normalizedName);
  const relativePath = path.relative(SRC_DIR, resolvedPath);

  if (relativePath === "" || relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    throw new Error("Path file harus berada di dalam folder src.");
  }

  const content = await fs.readFile(resolvedPath, "utf8");

  return {
    content: [
      {
        type: "text",
        text: content,
      },
    ],
  };
}

async function writeComponent(args = {}) {
  if (typeof args.filename !== "string" || args.filename.trim() === "") {
    throw new Error("filename wajib diisi.");
  }

  const normalizedName = args.filename.replaceAll("\\", "/").trim();
  const ext = path.extname(normalizedName).toLowerCase();

  if (!ALLOWED_SRC_EXTENSIONS.has(ext)) {
    throw new Error(`Hanya file .jsx, .js, atau .css yang boleh ditulis. Extension '${ext}' tidak diizinkan.`);
  }

  const resolvedPath = path.resolve(SRC_DIR, normalizedName);
  const relativePath = path.relative(SRC_DIR, resolvedPath);

  if (relativePath === "" || relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    throw new Error("Path file harus berada di dalam folder src.");
  }

  const content = typeof args.content === "string" ? args.content : null;

  if (content === null) {
    throw new Error("content wajib berupa string.");
  }

  await fs.mkdir(path.dirname(resolvedPath), { recursive: true });
  await fs.writeFile(resolvedPath, content, "utf8");

  return {
    content: [
      {
        type: "text",
        text: `Komponen berhasil disimpan ke src/${relativePath.replaceAll("\\", "/")}`,
      },
    ],
  };
}

const tools = [
  {
    name: "read_copy",
    description: "Baca isi file copywriting Markdown dari folder /content.",
    inputSchema: {
      type: "object",
      properties: {
        filename: {
          type: "string",
          description: "Nama file .md di folder content, contoh: 01-hero.md atau 07-services-by-stage.md",
        },
      },
      required: ["filename"],
      additionalProperties: false,
    },
  },
  {
    name: "write_copy",
    description: "Tulis atau replace isi file copywriting Markdown di folder /content.",
    inputSchema: {
      type: "object",
      properties: {
        filename: {
          type: "string",
          description: "Nama file .md di folder content, contoh: 01-hero.md atau 07-services-by-stage.md",
        },
        content: {
          type: "string",
          description: "Isi Markdown baru yang akan disimpan.",
        },
      },
      required: ["filename", "content"],
      additionalProperties: false,
    },
  },
  {
    name: "read_component",
    description:
      "Baca isi file komponen React (.jsx/.js) atau CSS (.css) langsung dari folder /src. Gunakan untuk melihat kode komponen sebelum mengeditnya.",
    inputSchema: {
      type: "object",
      properties: {
        filename: {
          type: "string",
          description:
            "Path relatif file dari folder src, contoh: sections/01_Hero.jsx atau components/Nav.jsx atau index.css",
        },
      },
      required: ["filename"],
      additionalProperties: false,
    },
  },
  {
    name: "write_component",
    description:
      "Tulis atau replace isi file komponen React (.jsx/.js) atau CSS (.css) langsung di folder /src. Gunakan untuk mengedit teks/copywriting yang ada di dalam kode JSX tanpa perantara file .md.",
    inputSchema: {
      type: "object",
      properties: {
        filename: {
          type: "string",
          description:
            "Path relatif file dari folder src, contoh: sections/01_Hero.jsx atau components/Nav.jsx atau index.css",
        },
        content: {
          type: "string",
          description: "Isi file baru yang akan disimpan (full file content).",
        },
      },
      required: ["filename", "content"],
      additionalProperties: false,
    },
  },
];

async function handleRequest(request) {
  const { id, method, params = {} } = request;

  try {
    if (method === "initialize") {
      sendResult(id, {
        protocolVersion: params.protocolVersion ?? "2024-11-05",
        capabilities: {
          tools: {},
        },
        serverInfo,
      });
      return;
    }

    if (method === "notifications/initialized") {
      return;
    }

    if (method === "tools/list") {
      sendResult(id, { tools });
      return;
    }

    if (method === "tools/call") {
      const toolName = params.name;
      const args = params.arguments ?? {};

      if (toolName === "read_copy") {
        sendResult(id, await readCopy(args));
        return;
      }

      if (toolName === "write_copy") {
        sendResult(id, await writeCopy(args));
        return;
      }

      if (toolName === "read_component") {
        sendResult(id, await readComponent(args));
        return;
      }

      if (toolName === "write_component") {
        sendResult(id, await writeComponent(args));
        return;
      }

      sendError(id, -32601, `Tool tidak dikenal: ${toolName}`);
      return;
    }

    if (id !== undefined) {
      sendError(id, -32601, `Method tidak dikenal: ${method}`);
    }
  } catch (error) {
    sendError(id, -32000, error.message);
  }
}

let buffer = "";
let requestQueue = Promise.resolve();

process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => {
  buffer += chunk;

  const lines = buffer.split(/\r?\n/);
  buffer = lines.pop() ?? "";

  for (const line of lines) {
    if (!line.trim()) {
      continue;
    }

    requestQueue = requestQueue.then(async () => {
      try {
        const request = JSON.parse(line);
        await handleRequest(request);
      } catch (error) {
        sendError(null, -32700, "JSON tidak valid.", error.message);
      }
    });
  }
});

process.stdin.on("end", () => {
  void requestQueue.finally(() => {
    process.exit(0);
  });
});
