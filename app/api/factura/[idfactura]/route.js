import { NextResponse } from "next/server";
import { conn } from "@/app/libs/mysql";

export async function GET(request, { params }) {
  try {
    const results = await conn.query(
      "SELECT * FROM facturas WHERE referencia=?",
      [params.idfactura]
    );
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

export async function PUT(request, { params }) {
  try {
    const data = await request.json();

    console.log(params.idfactura);
    const updateData = {
      estatus: data.estatus,
    };

    const result = await conn.query("UPDATE facturas SET ? WHERE id = ?", [
      updateData,
      params.idfactura,
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
    //console.log(error);
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
