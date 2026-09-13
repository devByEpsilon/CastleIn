type ClassValue = string | number | null | undefined | false | ClassValue[];

function flatten(input: ClassValue[], out: string[]) {
  for (const value of input) {
    if (!value) continue;
    if (Array.isArray(value)) flatten(value, out);
    else out.push(String(value));
  }
}

/** Minimal classnames joiner — avoids pulling in a dependency for this alone. */
export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];
  flatten(inputs, out);
  return out.join(" ");
}
