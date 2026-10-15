import { apiResponse, filterRelationships, networkApiVersion, pagination } from "@/lib/network-api";
import { registryUpdated } from "@/lib/network-intelligence";

export function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const { limit, offset } = pagination(params);
  const rows = filterRelationships(params);
  return apiResponse({ version: networkApiVersion, updated: registryUpdated, total: rows.length, limit, offset, records: rows.slice(offset, offset + limit) });
}
