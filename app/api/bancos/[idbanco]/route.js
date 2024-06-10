import { NextResponse } from "next/server";
import { conn } from "@/app/libs/mysql";

export async function DELETE(request, { params }) {
  try {
    const result = await conn.query("DELETE FROM bancos WHERE id =?", [
      params.idbanco,
    ]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          message: "Banco no encontrado",
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
      cuenta: data.cuenta,
      tipo: data.tipo,
      idp: data.idp,
    };

    const result = await conn.query("UPDATE bancos SET? WHERE id =?", [
      updateData,
      params.idbanco,
    ]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          message: "Banco no encontrado",
        },
        {
          status: 404,
        }
      );
    }

    const updatedBank = await conn.query("SELECT * FROM bancos WHERE id =?", [
      params.idbanco,
    ]);

    return NextResponse.json(
      {
        message: "Banco actualizado",
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
