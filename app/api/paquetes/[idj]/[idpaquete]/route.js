import { NextResponse } from "next/server";
import { conn } from "../../../../libs/mysql";

export async function PUT(request, { params }) {
  try {
    const data = await request.json();

    const updateData = {
      prg: data.prg,
      seccion: data.seccion,
    };

    const result = await conn.query("UPDATE paquetes SET ? WHERE id = ?", [
      updateData,
      params.idpaquete,
    ]);

    if (result[0].affectedRows === 0) {
      return NextResponse.json(
        {
          message: "Producto no encontrado",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        message: "juego actualizado",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    //console.log(error);
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
