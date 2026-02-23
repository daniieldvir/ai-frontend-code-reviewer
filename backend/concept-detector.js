import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DOCS_DIR = path.join(__dirname, "docs");

/**
 * Loads all documentation JSON files for a given framework.
 * @param {string} framework - The framework name (angular, react, vue)
 * @returns {Array} Array of doc objects
 */
function loadFrameworkDocs(framework) {
    const frameworkDir = path.join(DOCS_DIR, framework.toLowerCase());

    if (!fs.existsSync(frameworkDir)) {
        return [];
    }

    const files = fs.readdirSync(frameworkDir).filter((f) => f.endsWith(".json"));
    const docs = [];

    for (const file of files) {
        try {
            const content = fs.readFileSync(path.join(frameworkDir, file), "utf-8");
            docs.push(JSON.parse(content));
        } catch (err) {
            console.warn(`Warning: Could not load doc file ${file}:`, err.message);
        }
    }

    return docs;
}

/**
 * Detects which concepts from the documentation are present in the submitted code.
 * Uses keyword and regex pattern matching.
 *
 * @param {string} code - The source code to analyze
 * @param {string} framework - The framework name
 * @returns {Array} Array of matched doc objects with relevance scores
 */
export function detectConcepts(code, framework) {
    const docs = loadFrameworkDocs(framework);

    if (docs.length === 0) {
        return [];
    }

    const matchedDocs = [];

    for (const doc of docs) {
        let score = 0;
        const matchedKeywords = [];
        const matchedDeprecated = [];
        let usesDeprecated = false;

        // Check modern keywords (simple string matching)
        if (doc.keywords) {
            for (const keyword of doc.keywords) {
                if (code.includes(keyword)) {
                    score += 2;
                    matchedKeywords.push(keyword);
                }
            }
        }

        // Check modern regex patterns
        if (doc.patterns) {
            for (const pattern of doc.patterns) {
                try {
                    const regex = new RegExp(pattern, "g");
                    const matches = code.match(regex);
                    if (matches) {
                        score += matches.length;
                    }
                } catch {
                    // Skip invalid regex patterns
                }
            }
        }

        // Check DEPRECATED keywords (old-style code)
        if (doc.deprecatedKeywords) {
            for (const keyword of doc.deprecatedKeywords) {
                if (code.includes(keyword)) {
                    score += 3; // Higher weight — deprecated patterns are important to flag
                    matchedDeprecated.push(keyword);
                    usesDeprecated = true;
                }
            }
        }

        // Check DEPRECATED regex patterns
        if (doc.deprecatedPatterns) {
            for (const pattern of doc.deprecatedPatterns) {
                try {
                    const regex = new RegExp(pattern, "g");
                    const matches = code.match(regex);
                    if (matches) {
                        score += matches.length * 2;
                        usesDeprecated = true;
                    }
                } catch {
                    // Skip invalid regex patterns
                }
            }
        }

        if (score > 0) {
            matchedDocs.push({
                ...doc,
                relevanceScore: score,
                matchedKeywords,
                matchedDeprecated,
                usesDeprecated,
            });
        }
    }

    // Sort by relevance score (highest first)
    matchedDocs.sort((a, b) => b.relevanceScore - a.relevanceScore);

    return matchedDocs;
}

/**
 * Builds a documentation context string for the AI prompt.
 * Only includes the most relevant docs to stay within token limits.
 * When deprecated patterns are detected, adds explicit instructions for the AI
 * to point out outdated patterns and suggest modern alternatives.
 *
 * @param {string} code - The source code to analyze
 * @param {string} framework - The framework name
 * @param {number} maxDocs - Maximum number of doc sections to include (default: 3)
 * @returns {string} Formatted documentation context string
 */
export function buildDocsContext(code, framework, maxDocs = 3) {
    const matchedDocs = detectConcepts(code, framework);

    if (matchedDocs.length === 0) {
        return "";
    }

    // Take only the top N most relevant docs
    const topDocs = matchedDocs.slice(0, maxDocs);

    // Check if any matched docs flagged deprecated patterns
    const hasDeprecatedCode = topDocs.some((doc) => doc.usesDeprecated);
    const allDeprecated = topDocs.flatMap((doc) => doc.matchedDeprecated || []);

    let context = `\n--- OFFICIAL DOCUMENTATION REFERENCE (${framework.toUpperCase()}) ---\n`;
    context += `Use the following official documentation to ensure your review is accurate and up-to-date:\n\n`;

    // Add strong deprecation warning if old patterns detected
    if (hasDeprecatedCode) {
        context += `⚠️ DEPRECATED PATTERNS DETECTED IN THIS CODE:\n`;
        context += `The following outdated patterns were found: ${[...new Set(allDeprecated)].join(", ")}\n`;
        context += `You MUST flag these as issues with severity "medium" or "high" and suggest the modern alternatives shown below.\n`;
        context += `Using deprecated patterns should significantly LOWER the score (subtract 5-15 points per deprecated pattern found).\n\n`;
    }

    for (const doc of topDocs) {
        const info = doc.documentation;
        context += `## ${info.title}\n`;
        context += `${info.summary}\n\n`;

        if (info.bestPractices) {
            context += `Best Practices:\n`;
            for (const practice of info.bestPractices) {
                context += `• ${practice}\n`;
            }
            context += `\n`;
        }

        if (info.commonMistakes) {
            context += `Common Mistakes to Check:\n`;
            for (const mistake of info.commonMistakes) {
                context += `⚠ ${mistake}\n`;
            }
            context += `\n`;
        }

        // Add code examples for modern approach if deprecated code was found
        if (doc.usesDeprecated && info.codeExamples) {
            context += `Modern Code Examples (suggest these as replacements):\n`;
            for (const [name, example] of Object.entries(info.codeExamples)) {
                context += `[${name}]:\n${example}\n\n`;
            }
        }

        context += `---\n\n`;
    }

    return context;
}

/**
 * Returns a summary of available documentation for all frameworks.
 * Useful for debugging and status checks.
 */
export function getDocsStatus() {
    const frameworks = ["angular", "react", "vue"];
    const status = {};

    for (const fw of frameworks) {
        const docs = loadFrameworkDocs(fw);
        status[fw] = {
            totalDocs: docs.length,
            concepts: docs.map((d) => d.concept),
        };
    }

    return status;
}
