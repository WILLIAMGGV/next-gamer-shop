import { NextResponse } from "next/server";
import { conn } from "@/app/libs/mysql";

export async function PUT(request, { params }) {
  try {
    const data = await request.json();

    const updateData = {
      idp: data.idp,
    };

    const result = await conn.query("UPDATE asignacion SET ? WHERE id = ?", [
      updateData,
      params.idasig,
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

export async function GET(request, { params }) {
  try {
    const results = await conn.query("SELECT * FROM asignacion where idj=?", [
      params.idasig,
    ]);

    if (results.affectedRows === 0) {
      return NextResponse.json(
        {
          message: "Producto no encontrado",
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
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
