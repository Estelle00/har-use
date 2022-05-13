import { setCache } from "./cache";
import marked, { getCode } from "./marked";
import { pascalCase } from "change-case";
import { getDemoVue, getMainVue } from "./vue-template";
import { isDemo, getVirtualPath } from "./utils";

export function transformMain(
  code: string
) {
  const imports: string[] = [];
  const tokens = marked.lexer(code);
  let sliceIndex = 0;
  for (const token of tokens) {
    // @ts-ignore
    if (token.type === "frontMatter") {
      // @ts-ignore
      sliceIndex = token.raw.length;
    }
    // @ts-ignore
    if (token.type === "fileImport") {
      // @ts-ignore
      const componentName = pascalCase(`demo-${token.basename}`);
      // @ts-ignore
      code = code.replace(token.raw, `<${componentName} />\n`);
      // @ts-ignore
      imports.push(`import ${componentName} from "${token.filename}"`);
    }
  }
  const content =  code.slice(sliceIndex);
  const main = getMainVue({ content, imports });
  return code.slice(0, sliceIndex) + main;
}
export function transformDemo(
  code: string,
  filename: string
) {
  const virtualPath = getVirtualPath(filename);
  setCache(virtualPath, code);
  return getDemoVue({
    code: getCode(code),
    virtualPath
  });
}
