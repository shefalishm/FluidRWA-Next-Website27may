import { apiResponse, coverage } from "@/lib/network-api";

export function GET() {
  return apiResponse(coverage());
}
