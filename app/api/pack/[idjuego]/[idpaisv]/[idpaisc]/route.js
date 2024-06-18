import { NextResponse } from "next/server";
import { conn } from "../../../../../libs/mysql";

export async function GET(request, { params }) {
  try {
    console.log("este es el idjuego " + params.idjuego);
    console.log("este es el idpaisv " + params.idpaisv);
    console.log("este es el idpaisc " + params.idpaisc);
    const resultstotal = await conn.query(
      "SELECT * FROM paquetes_compra WHERE idj=? and idpaisv= ? and idpaisc=?",
      [params.idjuego, params.idpaisv, params.idpaisc]
    );
    return NextResponse.json(resultstotal);
  } catch (error) {
    console.log(error);
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
