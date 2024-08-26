import { NextResponse } from "next/server";
import { conn } from "../../../../../libs/mysql";

export async function GET(request, { params }) {
  if (params.idj == 0 || params.idpais == 0) {
    return NextResponse.json({
      message: "Falta Seleccionar",
      status: 400,
    });
  } else {
    try {
      const resultstotal = await conn.query(
        "SELECT * FROM paquetes_compra WHERE idj=? and idpaisv=? and idpaisc=?",
        [params.idj, params.idpais, params.idasignacion]
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
}
