// This script scans your src/app directory for routes
// and updates a specific section of your Notion Base page.
// It only touches the routes section — everything else on the page stays untouched.
 
const { Client } = require("@notionhq/client");
const fs = require("fs");
const path = require("path");
 
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const PAGE_ID = process.env.NOTION_PAGE_ID;
 
// ─── Find all routes ───
// In Next.js App Router, a folder with page.tsx = a route
// src/app/page.tsx → /
// src/app/matter/page.tsx → /matter
 
function findRoutes(dir, basePath = "") {
  const routes = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
 
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const fullPath = path.join(dir, entry.name);
      const routePath = basePath + "/" + entry.name;
 
      if (fs.existsSync(path.join(fullPath, "page.tsx"))) {
        routes.push(routePath);
      }
 
      // Check nested folders
      routes.push(...findRoutes(fullPath, routePath));
    }
  }
 
  return routes;
}
 
function findAllRoutes() {
  const appDir = path.join(process.cwd(), "src", "app");
  const routes = [];
 
  // Check root route
  if (fs.existsSync(path.join(appDir, "page.tsx"))) {
    routes.push("/");
  }
 
  // Check all nested routes
  routes.push(...findRoutes(appDir));
 
  return routes;
}
 
// ─── Find the "Routes" heading on the page ───
// Looks for a heading_2 block that says "Routes"
// Returns the block ID so we can update the content below it
 
async function findRoutesHeading(pageId) {
  const response = await notion.blocks.children.list({ block_id: pageId });
 
  for (const block of response.results) {
    if (
      block.type === "heading_2" &&
      block.heading_2.rich_text.length > 0 &&
      block.heading_2.rich_text[0].plain_text === "Routes"
    ) {
      return block.id;
    }
  }
 
  return null;
}
 
// ─── Delete old route items below the heading ───
// After the "Routes" heading, delete every bulleted_list_item and paragraph
// Stop when we hit a different block type (like another heading)
 
async function deleteOldRoutes(pageId) {
  const response = await notion.blocks.children.list({ block_id: pageId });
  const blocks = response.results;
 
  let foundHeading = false;
 
  for (const block of blocks) {
    if (
      block.type === "heading_2" &&
      block.heading_2.rich_text.length > 0 &&
      block.heading_2.rich_text[0].plain_text === "Routes"
    ) {
      foundHeading = true;
      continue;
    }
 
    if (foundHeading) {
      // Stop if we hit something that's not a bullet or paragraph
      if (
        block.type !== "bulleted_list_item" &&
        block.type !== "paragraph"
      ) {
        break;
      }
 
      await notion.blocks.update({ block_id: block.id, archived: true });
    }
  }
}
 
// ─── Add new route items after the heading ───
 
async function addRoutes(headingId, routes) {
  const now = new Date().toISOString().split("T")[0];
 
  const blocks = routes.map((route) => ({
    object: "block",
    type: "bulleted_list_item",
    bulleted_list_item: {
      rich_text: [
        {
          type: "text",
          text: { content: route },
          annotations: { code: true },
        },
      ],
    },
  }));
 
  blocks.push({
    object: "block",
    type: "paragraph",
    paragraph: {
      rich_text: [
        {
          type: "text",
          text: {
            content: `Last synced: ${now}`,
          },
          annotations: { italic: true, color: "gray" },
        },
      ],
    },
  });
 
  await notion.blocks.children.append({
    block_id: PAGE_ID,
    children: blocks,
    after: headingId,
  });
}
 
// ─── Run ───
 
async function main() {
  console.log("Scanning routes...");
  const routes = findAllRoutes();
  console.log(`Found ${routes.length} routes:`, routes);
 
  console.log("Looking for Routes heading on page...");
  const headingId = await findRoutesHeading(PAGE_ID);
 
  if (!headingId) {
    console.log("No 'Routes' heading found. Creating one...");
 
    const blocks = [
      {
        object: "block",
        type: "heading_2",
        heading_2: {
          rich_text: [{ type: "text", text: { content: "Routes" } }],
        },
      },
      ...routes.map((route) => ({
        object: "block",
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: [
            {
              type: "text",
              text: { content: route },
              annotations: { code: true },
            },
          ],
        },
      })),
      {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [
            {
              type: "text",
              text: {
                content: `Last synced: ${new Date().toISOString().split("T")[0]}`,
              },
              annotations: { italic: true, color: "gray" },
            },
          ],
        },
      },
    ];
 
    await notion.blocks.children.append({
      block_id: PAGE_ID,
      children: blocks,
    });
 
    console.log("Done! Created Routes section.");
    return;
  }
 
  console.log("Found Routes heading. Clearing old routes...");
  await deleteOldRoutes(PAGE_ID);
 
  console.log("Adding new routes...");
  await addRoutes(headingId, routes);
 
  console.log("Done! Routes updated.");
}
 
main().catch((error) => {
  console.error("Failed to sync:", error);
  process.exit(1);
});
 
