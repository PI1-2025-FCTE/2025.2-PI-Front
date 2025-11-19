
export function validateCommandString(commandString: string): boolean {
  if (!commandString || commandString.trim().length === 0) return false;
  const trimmed = commandString.trim();
  let i = 0;
  while (i < trimmed.length) {
    const char = trimmed[i];
    if (char === "d" || char === "e") {
      i++;
    } else if (char === "a") {
      if (i + 4 >= trimmed.length) return false;
      const fourDigits = trimmed.substring(i + 1, i + 5);
      if (!/^\d{4}$/.test(fourDigits)) return false;
      i += 5;
    } else return false;
  }
  return true;
}
