import { NextResponse } from "next/server";
import { conn } from "../../libs/mysql";

export async function GET() {
  try {
    const results = await conn.query("SELECT * FROM temporal");
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

export async function POST(request) {
  try {
    const { idp, precio, precioc, idpais, abreviacion, datos_id, datos_email } =
      await request.json();

    /*console.log(
      idp + " " + precio + " " + precioc + " " + idpais + " " + abreviacion
    );*/

    const result = await conn.query("INSERT INTO temporal SET ?", {
      idp: idp,
      precio: precio,
      precioc: precioc,
      idpais: idpais,
      abreviacion: abreviacion,
      datos_email: datos_email,
      datos_id: datos_id,
    });

    return NextResponse.json({
      idp: idp,
      precio: precio,
      precioc: precioc,
      idpais: idpais,
      abreviacion: abreviacion,
      id: result[0].insertId,
    });
  } catch (error) {
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
