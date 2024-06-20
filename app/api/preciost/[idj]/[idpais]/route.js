import { NextResponse } from "next/server";
import { conn } from "../../../../libs/mysql";

export async function GET(request, { params }) {
  try {
    const resultstotal = await conn.query(
      "SELECT * FROM precios_compra WHERE idj=? and idpais= ?",
      [params.idj, params.idpais]
    );
    return NextResponse.json(resultstotal[0]);
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
