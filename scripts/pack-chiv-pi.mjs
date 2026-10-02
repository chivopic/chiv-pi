#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { isAbsolute, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = fileURLToPath(new URL("../", import.meta.url));
const codingAgentDir = join(repoRoot, "packages", "coding-agent");
const packageName = "@chivopic/chiv-pi";
const args = process.argv.slice(2);

if (args.length === 1 && args[0] === "--help") {
	console.log("Usage: npm run pack:chiv-pi -- [--out <new-directory-outside-repo>]");
	console.log("Build with npm run build:offline first. This command only creates a tarball; it never publishes.");
	process.exit(0);
}
if (args.length !== 0 && (args.length !== 2 || args[0] !== "--out" || !args[1])) {
	throw new Error("Usage: npm run pack:chiv-pi -- [--out <new-directory-outside-repo>]");
}

const sourcePackage = JSON.parse(readFileSync(join(codingAgentDir, "package.json"), "utf8"));
if (sourcePackage.piConfig?.name !== "chiv-pi" || sourcePackage.bin?.["chiv-pi"] !== "dist/bundle/cli.js") {
	throw new Error("The source package must expose the chiv-pi brand and executable.");
}
for (const file of ["dist/bundle/cli.js", "dist/bundle/rpc-entry.js", "dist/index.js", "dist/index.d.ts"]) {
	if (!existsSync(join(codingAgentDir, file))) {
		throw new Error(`Missing ${file}. Run npm run build:offline before packing.`);
	}
}

let outDir;
if (args[1]) {
	outDir = resolve(args[1]);
	const relativePath = relative(repoRoot, outDir);
	if (!relativePath || (!relativePath.startsWith("..") && !isAbsolute(relativePath))) {
		throw new Error("The output directory must be outside the repository.");
	}
	if (existsSync(outDir)) throw new Error(`Output directory already exists: ${outDir}`);
	mkdirSync(outDir, { recursive: true });
} else {
	outDir = mkdtempSync(join(tmpdir(), "chiv-pi-npm-"));
}

function pack(directory) {
	const result = spawnSync("npm", ["pack", "--ignore-scripts", "--workspaces=false", "--json", "--pack-destination", outDir], {
		cwd: directory,
		encoding: "utf8",
		shell: process.platform === "win32",
		stdio: ["ignore", "pipe", "inherit"],
	});
	if (result.status !== 0) throw new Error(`npm pack failed for ${directory}`);
	return JSON.parse(result.stdout)[0];
}

const sourceTarball = pack(codingAgentDir);
const stagingDir = join(outDir, "staging");
mkdirSync(stagingDir);
const extracted = spawnSync("tar", ["-xzf", join(outDir, sourceTarball.filename), "-C", stagingDir], {
	stdio: "inherit",
});
if (extracted.status !== 0) throw new Error("Could not extract the source npm tarball.");
const packageDir = join(stagingDir, "package");
const manifestPath = join(packageDir, "package.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
manifest.name = packageName;
manifest.repository = {
	type: "git",
	url: "git+https://github.com/chivopic/chiv-pi.git",
	directory: "packages/coding-agent",
};
manifest.homepage = "https://github.com/chivopic/chiv-pi#readme";
manifest.bugs = { url: "https://github.com/chivopic/chiv-pi/issues" };
manifest.publishConfig = { access: "public", registry: "https://registry.npmjs.org/" };
writeFileSync(manifestPath, `${JSON.stringify(manifest, null, "\t")}\n`);

const shrinkwrapPath = join(packageDir, "npm-shrinkwrap.json");
const shrinkwrap = JSON.parse(readFileSync(shrinkwrapPath, "utf8"));
shrinkwrap.name = packageName;
shrinkwrap.packages[""].name = packageName;
writeFileSync(shrinkwrapPath, `${JSON.stringify(shrinkwrap, null, "\t")}\n`);
cpSync(join(repoRoot, "LICENSE"), join(packageDir, "LICENSE"));
writeFileSync(
	join(packageDir, "README.md"),
	`# chiv-pi

Terminal AI coding agent based on [Pi v1.0.0](https://github.com/earendil-works/pi/tree/v1.0.0).

## Install

Requires Node.js 22.19 or newer. Dependency lifecycle scripts are not needed.

\`\`\`bash
npm install -g --ignore-scripts ${packageName}
cd /path/to/your/project
chiv-pi
\`\`\`

Run \`/login\` to configure a model provider, then \`/model\` to choose a model. Enter a task to start working.

User configuration lives in \`~/.chiv-pi/agent/\`; project resources live in \`.chiv-pi/\`. Override the locations with \`CHIV_PI_CODING_AGENT_DIR\` and \`CHIV_PI_CODING_AGENT_SESSION_DIR\`.

The CLI supports interactive, print, JSON, and RPC modes. Run \`chiv-pi --help\` for options. The SDK is available from \`${packageName}\`.

Internal library dependencies and services such as model catalogs, Radius, session sharing, and bug reporting remain upstream. npm update checks use this package's own release channel. Inherited reference pages may use \`pi\` and \`.pi\`; use \`chiv-pi\` and \`.chiv-pi\` for this fork.

See [the repository](https://github.com/chivopic/chiv-pi) and the bundled \`docs/\` directory for more information.

## License

MIT. The original Mario Zechner copyright notice is included in LICENSE.
`,
);

const tarball = pack(packageDir);
if (tarball.name !== packageName || tarball.version !== sourcePackage.version) {
	throw new Error("Packed npm identity does not match the requested fork release.");
}
for (const file of ["dist/bundle/cli.js", "dist/bundle/rpc-entry.js", "dist/index.d.ts", "npm-shrinkwrap.json", "LICENSE"]) {
	if (!tarball.files.some((entry) => entry.path === file)) throw new Error(`Packed release is missing ${file}`);
}
rmSync(join(outDir, sourceTarball.filename));
writeFileSync(join(outDir, "pack.json"), `${JSON.stringify(tarball, null, "\t")}\n`);
console.log(JSON.stringify({ name: tarball.name, version: tarball.version, tarball: join(outDir, tarball.filename), integrity: tarball.integrity }, null, 2));
