import { NextResponse } from "next/server";
import { conn } from "@/app/libs/mysql";

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    console.log(data);
    const updateData = {
      nombre: data.nombre,
      precio: data.precio,
      abreviacion: data.abreviacion,
      descripcion: data.descripcion,
    };

    const result = await conn.query("UPDATE paises SET ? WHERE id = ?", [
      updateData,
      params.idpais,
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
