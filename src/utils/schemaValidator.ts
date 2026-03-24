export function validateSchema(body: object, requiredFields: string[]): void {
  const missingFields: string[] = [];

  for (const field of requiredFields) {
    if (!(field in body)) {
      missingFields.push(field);
    }
  }

  if (missingFields.length > 0) {
    throw new Error(`Schema validation failed. Missing fields: ${missingFields.join(', ')}`);
  }
}
