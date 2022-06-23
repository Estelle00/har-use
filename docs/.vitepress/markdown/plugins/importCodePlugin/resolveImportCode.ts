import * as path from "node:path";
import * as fs from "node:fs";
import type { ImportCodeTokenMeta } from "./types";
import type { MarkdownIt } from "../previewVuePlugin/utils";

export const resolveImportCode = (
  { importPath, lineStart, lineEnd }: ImportCodeTokenMeta,
  md: MarkdownIt
): {
  importFilePath: string | null;
  importCode: string;
} => {
  let importFilePath = importPath;

  if (!path.isAbsolute(importPath)) {
    // if the importPath is relative path, we need to resolve it
    // according to the markdown filePath
    if (!md.__path) {
      return {
        importFilePath: null,
        importCode: "Error when resolving path",
      };
    }
    importFilePath = path.resolve(md.__path, "..", importPath);
  }

  // check file existence
  if (!fs.existsSync(importFilePath)) {
    return {
      importFilePath,
      importCode: "File not found",
    };
  }

  // read file content
  const fileContent = fs.readFileSync(importFilePath).toString();

  // resolve partial import
  return {
    importFilePath,
    importCode: fileContent
      .split("\n")
      .slice(lineStart ? lineStart - 1 : lineStart, lineEnd)
      .join("\n")
      .replace(/\n?$/, "\n"),
  };
};
