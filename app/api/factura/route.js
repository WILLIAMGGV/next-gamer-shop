import { NextResponse } from "next/server";
import { conn } from "../../libs/mysql";

export async function POST(request) {
  try {
    const { fecha, referencia, total, telefono, listatemporal, ruta, estatus } =
      await request.json();
    console.log("MOSTRANDO LISTA");
    console.log(listatemporal);
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
      ruta: ruta,
      estatus: estatus,
    });

    for (let i = 0; i < listatemporal.length; i++) {
      await conn.query("INSERT INTO detalles SET ?", {
        idf: result[0].insertId,
        idp: listatemporal[i].idp,
        precio: listatemporal[i].precio,
        precioc: listatemporal[i].precioc,
        abreviacion: listatemporal[i].abreviacion,
        datos_id: listatemporal[i].datos_id,
        datos_email: listatemporal[i].datos_email,
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
