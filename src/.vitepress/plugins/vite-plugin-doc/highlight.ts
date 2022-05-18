import { parse } from "@vue/compiler-sfc";
import Prism from "prismjs";
import loadLanguages from "prismjs/components/index";
const languages = ["shell", "js", "ts", "jsx", "tsx", "less", "java"];
loadLanguages(languages);
function loadHighlighted(code: string, lang: string) {
  return Prism.highlight(code, Prism.languages[lang], lang);
}
export function highlight(code: string, lang: string): string {
  if (lang === "vue") {
  const { descriptor } = parse(code);
  const { script, styles } = descriptor;
  let htmlContent = code;
  const hasStyles = styles.length > 0;
  if (script?.content) {
    htmlContent = htmlContent.replace(script.content, "$script$");
  }
  if (hasStyles) {
    styles.forEach((style, index) => {
      htmlContent = htmlContent.replace(style.content, `$style-${index}$`);
    });
  }
  let highlighted = loadHighlighted(htmlContent, "html");
  if (script?.content) {
    const lang = script.lang ?? "js";
    const highlightedScript = loadHighlighted(script.content, lang);
    highlighted = highlighted.replace("$script$", highlightedScript);
  }
  if (hasStyles) {
    styles.forEach((style, index) => {
      const lang = style.lang ?? "css";
      const highlightedStyle = loadHighlighted(style.content, lang);
      highlighted = highlighted.replace(
        `$style-${index}$`,
        highlightedStyle
      );
    });
  }
  return highlighted;
}
if (languages.includes(lang)) {
  return loadHighlighted(code, lang);
}
return code;
}
function getContent(code: string, lang?: string) {
  return `<pre class="code-content language-${lang}"><code>${code}</code></pre>\n`;
}
export function getCode(code: string, language = "vue") {
  const lang = language.match(/\S*/)?.[0];
  const out = highlight(code, lang || "");
  code = out.replace(/{{|}}/g, (str) => {
    if (str === "{{") {
      return "&#123;&#123;";
    }
    return "&#125;&#125;";
  });
  code = `${code.replace(/\n$/, "")}\n`;
  return getContent(code, lang);
}
