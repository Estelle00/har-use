import { setCache } from "./cache";
import { getCode } from "./highlight";
import { getDemoVue } from "./vue-template";
import { getVirtualPath } from "./utils";
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
