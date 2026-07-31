const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

export function normalizeRecords(responseBody) {
  if (Array.isArray(responseBody)) {
    return responseBody;
  }

  const paginatedKeys = ['data', 'results', 'items', 'documents', 'records'];
  const records = paginatedKeys
    .map((key) => responseBody?.[key])
    .find((value) => Array.isArray(value));

  return records ?? [];
}

export async function fetchCollection(collectionName) {
  const response = await fetch(`${apiBaseUrl}/${collectionName}/`);

  if (!response.ok) {
    throw new Error(`Request failed for ${collectionName}: ${response.status}`);
  }

  return normalizeRecords(await response.json());
}