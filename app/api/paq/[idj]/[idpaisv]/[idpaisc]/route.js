import { NextResponse } from "next/server";
import { conn } from "../../../../../libs/mysql";

export async function GET(request, { params }) {
  if (params.idpaisv == 0 || params.idpaisc == 0) {
    return NextResponse.json({
      message: "Falta Seleccionar",
      status: 400,
    });
  } else {
    try {
      const results = await conn.query("SELECT * FROM paquetes WHERE idj=?", [
        params.idj,
      ]);
      if (results[0].length > 0) {
        for (let i = 0; i < results[0].length; i++) {
          const verifica = await conn.query(
            "SELECT * FROM paquetes_compra WHERE idj=? and idp=? and idpaisv=? and idpaisc=?",
            [params.idj, results[0][i].id, params.idpaisv, params.idpaisc]
          );
          if (verifica[0].length == 0) {
            const guarda = await conn.query(
              "INSERT INTO paquetes_compra SET ?",
              {
                idj: params.idj,
                idp: results[0][i].id,
                idpaisv: params.idpaisv,
                idpaisc: params.idpaisc,
              }
            );
          }
        }
      }
      const resultstotal = await conn.query(
        "SELECT * FROM paquetes_compra WHERE idj=? and idpaisv= ? and idpaisc=?",
        [params.idj, params.idpaisv, params.idpaisc]
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
