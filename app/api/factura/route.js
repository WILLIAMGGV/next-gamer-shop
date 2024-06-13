import { NextResponse } from "next/server";
import { conn } from "../../libs/mysql";

export async function POST(request) {
  try {
    console.log(request);
    const { fecha, referencia, total, telefono, listatemporal } =
      await request.json();

    const result = await conn.query("INSERT INTO facturas SET ?", {
      fecha: fecha,
      referencia: referencia,
      total: total,
      telefono: telefono,
    });

    for (let i = 0; i < listatemporal.length; i++) {
      await conn.query("INSERT INTO detalles SET ?", {
        idf: result.insertId,
        idp: listatemporal[i].idp,
        precio: listatemporal[i].precio,
        prg: listatemporal[i].prg,
        total: listatemporal[i].total,
        abreviacion: listatemporal[i].abreviacion,
      });
    }

    const result2 = await conn.query("DELETE FROM temporal");

    return NextResponse.json({
      fecha: fecha,
      referencia: referencia,
      total: total,
      telefono: telefono,
      id: result.insertId,
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
