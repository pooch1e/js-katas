/**
 * loadConfig / ConfigError — wraps JSON syntax errors with a cause.
 * See README.md › loadConfig.
 */
export class ConfigError extends Error {}

export function loadConfig(text) {
  throw new Error("TODO: implement loadConfig");
}
