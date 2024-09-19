declare global {
  type EnvAttribute =
    | "VITE_API_URL"
    | "VITE_BASE_URL"
  interface Window {
    _env_: {
      [key in EnvAttribute]: string
    }
  }
}

const isDev = import.meta.env.DEV

function parseEnv(attribute: EnvAttribute) {
  let value = window._env_[attribute]
  if (isDev) {
    value = import.meta.env[attribute] ?? value
  }
  if (value == null || value === "") {
    console.error(`Environment variable "${attribute}" is missing`)
    value = "NOT_SET"
  }
  return value
}

export const API_URL = parseEnv("VITE_API_URL")
export const BASE_URL = parseEnv("VITE_BASE_URL")
