import { NextResponse } from "next/server";
import { conn } from "../../libs/mysql";

export async function POST(request) {
  try {
    const { fecha, referencia, total, telefono, listatemporal } =
      await request.json();

    /*console.log(
      fecha +
        " " +
        referencia +
        " " +
        total +
        " " +
        telefono +
        " " +
        listatemporal
    );*/

    const result = await conn.query("INSERT INTO facturas SET ?", {
      fecha: fecha,
      referencia: referencia,
      total: total,
      telefono: telefono,
    });

    for (let i = 0; i < listatemporal.length; i++) {
      await conn.query("INSERT INTO detalles SET ?", {
        idf: result[0].insertId,
        idp: listatemporal[i].idp,
        precio: listatemporal[i].precio,
        precioc: listatemporal[i].precioc,
        abreviacion: listatemporal[i].abreviacion,
      });
    }

    const result2 = await conn.query("DELETE FROM temporal");

    return NextResponse.json({
      fecha: fecha,
      referencia: referencia,
      total: total,
      telefono: telefono,
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
