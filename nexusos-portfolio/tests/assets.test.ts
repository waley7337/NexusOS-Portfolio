import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { describe, expect, it } from "vitest";
import {
  DEGREE_PRIVACY_NOTICE,
  caseStudy,
  currentDesignShots,
  cv,
  degree,
  folders,
  ghostLibraryFolders,
  ghostProtocolArchitecture,
  nexusCaseStudyPreviews,
  nexusLibraryFolders,
  portfolio2026Redacted,
  projectSummaryRedacted,
} from "~/data/assets";

const root = path.resolve(__dirname, "..");
const publicDir = path.join(root, "public");
const all = [
  ...new Map(
    [...folders.flatMap((f) => f.assets), ...nexusCaseStudyPreviews].map((a) => [a.id, a]),
  ).values(),
];
const onDisk = (p: string) => fs.existsSync(path.join(publicDir, p));
const served = (p: string) => fs.readFileSync(path.join(publicDir, p));

/** Raw bytes plus every inflatable stream, so text inside compressed content streams is visible. */
function pdfPlainBytes(file: Buffer): string {
  const parts = [file.toString("latin1")];
  let at = 0;
  for (;;) {
    const start = file.indexOf("stream", at, "latin1");
    if (start < 0) break;
    const body = start + (file[start + 6] === 0x0d ? 8 : 7);
    const end = file.indexOf("endstream", body, "latin1");
    if (end < 0) break;
    try {
      parts.push(zlib.inflateSync(file.subarray(body, end)).toString("latin1"));
    } catch {
      /* not a flate stream */
    }
    at = end + 9;
  }
  return parts.join("\n");
}

const walk = (dir: string): string[] =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]));

describe("asset registry", () => {
  it("every published asset and its preview exists under public/", () => {
    for (const a of all.filter((x) => x.status === "published")) {
      expect(onDisk(a.src), a.src).toBe(true);
      if (a.preview) expect(onDisk(a.preview), a.preview).toBe(true);
    }
  });

  it("withheld documents are never shipped as static files", () => {
    for (const a of all.filter((x) => x.status === "withheld")) {
      expect(onDisk(a.src), `${a.src} must not be in public/ while withheld`).toBe(false);
    }
  });

  it("asset ids are unique across folders", () => {
    const ids = folders.flatMap((f) => f.assets.map((a) => `${f.id}/${a.id}`));
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("personal documents", () => {
  it("publishes the German CV as the only CV", () => {
    expect(cv.status).toBe("published");
    expect(all.filter((a) => /(^|-)cv(-|$)/.test(a.id)).map((a) => a.id)).toEqual(["cv-de"]);
  });

  it("keeps the outdated NexusOS case study at its published bytes", () => {
    expect(caseStudy.src).toBe("/documents/technical-documentation/nexusos-case-study.pdf");
    expect(caseStudy.meta.en).toBe(
      "PDF · 3 pages · 202 KB · outdated relative to main @ 1974025 (2026-10-18)",
    );
    const bytes = served(caseStudy.src);
    expect(bytes.byteLength).toBe(206478);
    expect(crypto.createHash("sha256").update(bytes).digest("hex")).toBe(
      "d4354ed5ac2a07d012e05ee737e3d7c035f31b9e90c870a89238c008de5dc5c8",
    );
  });

  it("serves the original degree certificate byte-for-byte", () => {
    expect(degree.status).toBe("published");
    const sha = crypto.createHash("sha256").update(served(degree.src)).digest("hex");
    expect(sha).toBe("6de4e19490780c64cf733d43860ddf7ef5453e0694894a7484e2ca077566a735");
  });

  it("shows the exact privacy notice and no preview that would reveal the certificate", () => {
    expect(degree.notice?.en).toBe(
      "Privacy notice: This original degree certificate contains personal information, including date and place of birth, a diploma number, and signatures. Opening or downloading it will reveal these details.",
    );
    expect(degree.notice).toBe(DEGREE_PRIVACY_NOTICE);
    expect(degree.preview).toBeUndefined();
  });

  it("labels the redacted project summary at the nearest kilobyte", () => {
    const bytes = served(projectSummaryRedacted.src);
    expect(bytes.byteLength).toBe(189208);
    const kb = Math.round(bytes.byteLength / 1024);
    expect(kb).toBe(185);
    expect(projectSummaryRedacted.meta).toEqual({
      en: "PDF · 4 pages · 185 KB",
      de: "PDF · 4 Seiten · 185 KB",
      fr: "PDF · 4 pages · 185 KB",
    });
  });

  it.each([portfolio2026Redacted, projectSummaryRedacted])("$id has the removed values gone from every layer", (asset) => {
    expect(asset.label?.en).toBe("Redacted copy");
    expect(asset.src).toMatch(/-redacted\.pdf$/);
    const plain = pdfPlainBytes(served(asset.src));
    expect(plain).toContain("REDACTED COPY");
    for (const gone of ["11/12/1997", "1997", "28 years", "waley7337/NexusOS", "nexusos.com"]) {
      expect(plain.includes(gone), `${asset.src} still contains ${gone}`).toBe(false);
    }
    expect(plain).toContain("https://nexuops.com/login");
  });
});

describe("links and screenshots", () => {
  it("never links the private repository", () => {
    const files = [...walk(path.join(root, "src")), path.join(root, "index.html")];
    for (const f of files) {
      const text = fs.readFileSync(f, "utf8");
      // The NexusOS demo card links to github.com/waley7337/NexusOS, the repository the owner named.
      // Redacted PDFs still must not contain that path. nexusos.com stays unpublished.
      expect(text, f).not.toMatch(/nexusos\.com/i);
    }
  });

  it("keeps each library on its own images and pins the Ghost Protocol architecture diagram", () => {
    const nexusSrcs = nexusLibraryFolders.flatMap((folder) => folder.assets.map((asset) => asset.src));
    const ghostSrcs = ghostLibraryFolders.flatMap((folder) => folder.assets.map((asset) => asset.src));
    expect(nexusSrcs.some((src) => src.includes("ghost-protocol"))).toBe(false);
    expect(ghostSrcs.some((src) => src.includes("/images/screenshots/") || src.includes("/images/architecture/"))).toBe(false);
    expect(new Set(ghostSrcs).size).toBe(ghostSrcs.length);
    expect(ghostProtocolArchitecture.map((asset) => asset.src)).toEqual([
      "/images/ghost-protocol/system-architecture.png",
      "/images/ghost-protocol/security-architecture.png",
    ]);
    const pngs = fs
      .readdirSync(path.join(publicDir, "images/ghost-protocol"))
      .filter((name) => name.endsWith(".png"))
      .sort();
    expect(pngs).toHaveLength(19);
    expect(ghostSrcs.map((src) => src.split("/").pop()).sort()).toEqual(pngs);
    const bytes = fs.readFileSync(path.join(publicDir, "images/ghost-protocol/system-architecture.png"));
    expect(crypto.createHash("sha256").update(bytes).digest("hex")).toBe(
      "26d18cc9ea19383df38c9eb3f706977daaf9d76759a0741e0cde0878998c52dd",
    );
    expect(onDisk("/images/ghost-protocol/system-architecture.preview.webp")).toBe(true);
    expect(nexusLibraryFolders.map((folder) => [folder.label.en, folder.assets.length])).toEqual([
      ["Architecture & System Design", 2],
      ["Security & Access Control", 1],
      ["System & interface", 15],
      ["Project Documentation", 2],
    ]);
    expect(nexusLibraryFolders.every((folder) => folder.assets.length > 0)).toBe(true);
    expect(nexusCaseStudyPreviews.map((asset) => asset.title.en)).toEqual([
      "NexusOS — Engineering Case Study",
      "NexusOS — Project Summary (redacted copy)",
      "Software Developer Portfolio 2026 (redacted copy)",
    ]);
    expect(nexusCaseStudyPreviews.some((asset) => asset.id === "nexusos-portfolio-summary")).toBe(false);
    expect(ghostLibraryFolders.map((folder) => [folder.label.en, folder.assets.length])).toEqual([
      ["Architecture & System Design", 1],
      ["Security & Access Control", 1],
      ["Workflow", 2],
      ["Web client", 3],
      ["Interface", 12],
    ]);
    expect(ghostLibraryFolders.every((folder) => folder.assets.length > 0)).toBe(true);
  });

  it("shows current-design screenshots only; legacy originals are not served", () => {
    for (const s of currentDesignShots) expect(s.src).toMatch(/^\/images\/screenshots\/current-design\//);
    expect(fs.existsSync(path.join(publicDir, "images/screenshots/legacy"))).toBe(false);
    expect(fs.existsSync(path.join(publicDir, "images/system"))).toBe(false);
    expect(fs.readdirSync(path.join(root, "assets/screenshots/legacy")).filter((f) => f.endsWith(".png"))).toHaveLength(16);
  });
});
