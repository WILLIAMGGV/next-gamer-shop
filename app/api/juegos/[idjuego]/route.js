import { NextResponse } from "next/server";
import { conn } from "@/app/libs/mysql";

export async function DELETE(request, { params }) {
  try {
    const result = await conn.query("DELETE FROM juegos WHERE id = ?", [
      params.idjuego,
    ]);

    const result2 = await conn.query("DELETE FROM paquetes WHERE idj = ?", [
      params.idjuego,
    ]);

    const result3 = await conn.query("DELETE FROM asignacion WHERE idj = ?", [
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

    return new Response(null, {
      status: 204,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();

    const updateData = {
      nombre: data.nombre,
      categoria: data.categoria,
      prg: data.prg,
      seccion1: data.seccion1,
      seccion2: data.seccion2,
      encabezado: data.encabezado,
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
