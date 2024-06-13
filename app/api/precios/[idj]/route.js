import { NextResponse } from "next/server";
import { conn } from "@/app/libs/mysql";

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    var preciodos = parseFloat(data.precioc) * 0.02;

    preciodos = parseFloat(data.precioc) + preciodos;
    preciodos = preciodos.toFixed(2);

    const updateData = {
      precioc: parseFloat(data.precioc).toFixed(2),
      preciodos: preciodos,
    };

    const result = await conn.query(
      "UPDATE precios_compra SET ? WHERE id = ?",
      [updateData, params.idj]
    );

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
