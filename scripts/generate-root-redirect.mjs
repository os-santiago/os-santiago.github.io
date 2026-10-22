import path from "node:path";
import { rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUT_DIR = path.resolve(__dirname, "..", "out");

const baseUrl = "https://opensourcesantiago.io";
const locales = ["es", "en"];
const defaultLocale = "es";

const indexHtml = `<!DOCTYPE html>
<html lang="${defaultLocale}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Open Source Santiago | Comunidad, Tecnología y Propósito</title>
  <meta name="description" content="Comunidad de código abierto iniciada en Chile, abierta al mundo. Tecnología como motor para el desarrollo personal, profesional y comunitario." />
  <meta name="robots" content="noindex, follow" />
  <link rel="canonical" href="${baseUrl}/${defaultLocale}/" />
  <link rel="alternate" hreflang="es" href="${baseUrl}/es/" />
  <link rel="alternate" hreflang="en" href="${baseUrl}/en/" />
  <link rel="alternate" hreflang="x-default" href="${baseUrl}/${defaultLocale}/" />
  <link rel="icon" href="/logo.png" />
  <meta http-equiv="refresh" content="0; url=/${defaultLocale}/" />
  <script>
    (function () {
      var languages = window.navigator.languages || [window.navigator.language];
      for (var i = 0; i < languages.length; i++) {
        var language = (languages[i] || "").toLowerCase();
        if (language.indexOf("es") === 0) {
          window.location.replace("/es/");
          return;
        }
        if (language.indexOf("en") === 0) {
          window.location.replace("/en/");
          return;
        }
      }
      window.location.replace("/${defaultLocale}/");
    })();
  </script>
</head>
<body></body>
</html>
`;

const rootArtifact = path.join(OUT_DIR, "index.txt");
await rm(rootArtifact, { force: true });
await writeFile(path.join(OUT_DIR, "index.html"), indexHtml, "utf8");

console.log(
  `Generated ${path.join(OUT_DIR, "index.html")} (redirects to /${defaultLocale}/)`,
);
