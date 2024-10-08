import { NextResponse } from "next/server";
import { conn } from "@/app/libs/mysql";

export async function GET(request, { params }) {
  try {
    const results = await conn.query("SELECT * FROM facturas WHERE id=?", [
      params.idfactura,
    ]);
    console.log(results[0]);
    return NextResponse.json(results[0]);
  } catch (error) {
    //console.log(error);
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
