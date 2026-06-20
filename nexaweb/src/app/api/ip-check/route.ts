import { NextRequest, NextResponse } from "next/server"
import { getClientIp } from "@/lib/api-security"
import { checkVpn } from "@/lib/ip-check"

export async function GET(req: NextRequest) {
  const ip = getClientIp(req)
  const result = await checkVpn(ip)
  return NextResponse.json(result)
}
