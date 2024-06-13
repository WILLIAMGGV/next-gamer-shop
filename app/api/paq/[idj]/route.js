import { NextResponse } from "next/server";
import { conn } from "../../../libs/mysql";

export async function PUT(request, { params }) {
  try {
    const data = await request.json();

    const updateData = {
      preciov: data.preciov,
    };

    const result = await conn.query(
      "UPDATE paquetes_compra SET ? WHERE id = ?",
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
        message: "paquete actualizado",
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
