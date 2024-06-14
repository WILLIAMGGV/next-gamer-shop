import { NextResponse } from "next/server";
import { conn } from "@/app/libs/mysql";

export async function PUT(request, { params }) {
  try {
    const data = await request.json();

    const updateData = {
      prg: data.prg,
    };

    const result = await conn.query("UPDATE juegos SET ? WHERE id = ?", [
      updateData,
      params.idjuego,
    ]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          message: "Producto no encontrado",
        },
        {
          status: 404,
        }
      );
    }

    const updatedProduct = await conn.query(
      "SELECT * FROM juegos WHERE id = ?",
      [params.idjuego]
    );

    return NextResponse.json(
      {
        message: "juego actualizado",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
