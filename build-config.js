/* Runs at deploy time on Vercel (see vercel.json). Generates config.js from
   the AN_CALENDAR_ID and AN_API_KEY environment variables, so the API key
   never lives in the git repo.

   Locally there is already a config.js (gitignored) with real values — if
   this script is ever run locally without the env vars set, it leaves that
   file untouched rather than clobbering it. */
const fs = require("fs");

const calendarId = process.env.AN_CALENDAR_ID || "";
const apiKey     = process.env.AN_API_KEY || "";

if (!calendarId || !apiKey) {
  if (fs.existsSync("config.js")) {
    console.warn("build-config: env vars missing — keeping existing config.js");
    process.exit(0);
  }
  console.warn("build-config: env vars missing — config.js will be empty");
}

fs.writeFileSync("config.js",
`/* Generated at build time from Vercel environment variables. */
window.AN_CONFIG = {
  calendarId: ${JSON.stringify(calendarId)},
  apiKey: ${JSON.stringify(apiKey)},
};
`);
console.log("build-config: config.js written");
