export function normalizeIntakeWebsite(value: string) {
  const trimmed = value.trim();
  if (/^(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)+(?:[/:?#].*)?$/i.test(trimmed)
    && !/^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed)) {
    return `https://${trimmed}`;
  }
  return trimmed;
}

export function prepareIntakeWebsite(input: HTMLInputElement) {
  input.value = normalizeIntakeWebsite(input.value);
  let valid = !input.value;
  if (input.value) {
    try {
      const url = new URL(input.value);
      valid = ["http:", "https:"].includes(url.protocol) && url.hostname.includes(".")
        && !url.username && !url.password;
    } catch { /* Show the same simple example for malformed addresses. */ }
  }
  input.setCustomValidity(valid ? "" : "Please enter a website such as www.company.com.");
}
