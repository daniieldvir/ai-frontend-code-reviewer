/**
 * Documentation Fetcher Script
 *
 * Fetches key documentation pages from official framework GitHub repos
 * and caches them locally as JSON files.
 *
 * Usage: node docs-fetcher.js [framework]
 * Example: node docs-fetcher.js angular
 *          node docs-fetcher.js          (updates all frameworks)
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DOCS_DIR = path.join(__dirname, "docs");

// GitHub raw content base URLs for documentation repos
const DOC_SOURCES = {
    angular: {
        baseUrl:
            "https://raw.githubusercontent.com/angular/angular/main/adev/src/content/guide",
        pages: [
            {
                path: "/signals",
                concept: "signals",
                url: "https://raw.githubusercontent.com/angular/angular/main/adev/src/content/guide/signals.md",
            },
            {
                path: "/templates/control-flow",
                concept: "control-flow",
                url: "https://raw.githubusercontent.com/angular/angular/main/adev/src/content/guide/templates/control-flow.md",
            },
            {
                path: "/di/dependency-injection",
                concept: "inject",
                url: "https://raw.githubusercontent.com/angular/angular/main/adev/src/content/guide/di/dependency-injection.md",
            },
            {
                path: "/components",
                concept: "standalone",
                url: "https://raw.githubusercontent.com/angular/angular/main/adev/src/content/guide/components/importing.md",
            },
        ],
    },
    react: {
        pages: [
            {
                concept: "hooks",
                url: "https://raw.githubusercontent.com/reactjs/react.dev/main/src/content/reference/react/useState.md",
            },
            {
                concept: "hooks-effect",
                url: "https://raw.githubusercontent.com/reactjs/react.dev/main/src/content/reference/react/useEffect.md",
            },
            {
                concept: "server-components",
                url: "https://raw.githubusercontent.com/reactjs/react.dev/main/src/content/reference/rsc/use-client.md",
            },
        ],
    },
    vue: {
        pages: [
            {
                concept: "composition-api",
                url: "https://raw.githubusercontent.com/vuejs/docs/main/src/guide/essentials/reactivity-fundamentals.md",
            },
            {
                concept: "reactivity",
                url: "https://raw.githubusercontent.com/vuejs/docs/main/src/guide/extras/reactivity-in-depth.md",
            },
        ],
    },
};

/**
 * Fetches and saves raw markdown from a documentation source.
 * The raw markdown is saved alongside the curated JSON docs for reference.
 */
async function fetchDocPage(framework, page) {
    console.log(`  📥 Fetching: ${page.concept} from ${page.url}`);

    try {
        const response = await fetch(page.url);

        if (!response.ok) {
            console.warn(
                `  ⚠️  Failed to fetch ${page.concept}: ${response.status} ${response.statusText}`,
            );
            return null;
        }

        const markdown = await response.text();

        // Save raw markdown for reference
        const rawDir = path.join(DOCS_DIR, framework, "_raw");
        if (!fs.existsSync(rawDir)) {
            fs.mkdirSync(rawDir, { recursive: true });
        }

        const rawPath = path.join(rawDir, `${page.concept}.md`);
        fs.writeFileSync(rawPath, markdown, "utf-8");
        console.log(`  ✅ Saved: ${rawPath} (${markdown.length} chars)`);

        return { concept: page.concept, content: markdown };
    } catch (err) {
        console.warn(`  ❌ Error fetching ${page.concept}: ${err.message}`);
        return null;
    }
}

/**
 * Updates documentation for a specific framework.
 */
async function updateFramework(framework) {
    const source = DOC_SOURCES[framework];
    if (!source) {
        console.error(`Unknown framework: ${framework}`);
        return;
    }

    console.log(`\n🔄 Updating ${framework} documentation...`);

    const frameworkDir = path.join(DOCS_DIR, framework);
    if (!fs.existsSync(frameworkDir)) {
        fs.mkdirSync(frameworkDir, { recursive: true });
    }

    let successCount = 0;
    let failCount = 0;

    for (const page of source.pages) {
        const result = await fetchDocPage(framework, page);
        if (result) {
            successCount++;
        } else {
            failCount++;
        }
    }

    console.log(
        `  📊 ${framework}: ${successCount} succeeded, ${failCount} failed`,
    );
}

/**
 * Updates documentation for all frameworks or a specific one.
 */
async function main() {
    const targetFramework = process.argv[2];

    console.log("╔══════════════════════════════════════════════╗");
    console.log("║   📚 Documentation Fetcher for AI Reviewer  ║");
    console.log("╚══════════════════════════════════════════════╝");
    console.log(`Docs directory: ${DOCS_DIR}`);

    if (targetFramework) {
        await updateFramework(targetFramework.toLowerCase());
    } else {
        // Update all frameworks
        for (const framework of Object.keys(DOC_SOURCES)) {
            await updateFramework(framework);
        }
    }

    // Save metadata
    const metadataPath = path.join(DOCS_DIR, "metadata.json");
    const metadata = {
        lastUpdated: new Date().toISOString(),
        frameworks: Object.keys(DOC_SOURCES),
        sources: DOC_SOURCES,
    };
    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2), "utf-8");

    console.log(`\n✨ Done! Metadata saved to ${metadataPath}`);
    console.log(
        `💡 Curated JSON docs in docs/<framework>/ are used for code review.`,
    );
    console.log(
        `💡 Raw markdown in docs/<framework>/_raw/ is saved for reference.`,
    );
}

main().catch(console.error);
