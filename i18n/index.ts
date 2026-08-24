import type { Locale } from "./config";
import { messages } from "./messages";
import type { Messages } from "./messages";

export function getMessages(locale: Locale): Messages {
  return messages[locale] ?? messages.es;
}
