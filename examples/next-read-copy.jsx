import fs from "node:fs/promises";
import path from "node:path";

const contentDir = path.join(process.cwd(), "content");

async function readCopy(filename) {
  const filePath = path.join(contentDir, filename);
  return fs.readFile(filePath, "utf8");
}

export default async function Page() {
  const heroCopy = await readCopy("01-hero.md");

  return (
    <main>
      <article style={{ whiteSpace: "pre-wrap" }}>
        {heroCopy}
      </article>
    </main>
  );
}
