import { NextResponse } from "next/server";
import { conn } from "../../../../libs/mysql";

export async function GET(request, { params }) {
  if (params.idj == 0 || params.idpais == 0) {
    return NextResponse.json({
      message: "Falta Seleccionar",
      status: 400,
    });
  } else {
    try {
      const results = await conn.query("SELECT * FROM paquetes WHERE idj=?", [
        params.idj,
      ]);
      if (results.length > 0) {
        for (let i = 0; i < results.length; i++) {
          const verifica = await conn.query(
            "SELECT * FROM precios_compra WHERE idj=? and idp=? and idpais=?",
            [params.idj, results[i].id, params.idpais]
          );
          if (verifica.length == 0) {
            const guarda = await conn.query(
              "INSERT INTO precios_compra SET ?",
              {
                idj: params.idj,
                idp: results[i].id,
                idpais: params.idpais,
              }
            );
          }
        }
      }
      const resultstotal = await conn.query(
        "SELECT * FROM precios_compra WHERE idj=? and idpais= ?",
        [params.idj, params.idpais]
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
}
