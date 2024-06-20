import { NextResponse } from "next/server";
import { conn } from "@/app/libs/mysql";

export async function DELETE(request, { params }) {
  try {
    const result = await conn.query("DELETE FROM paises WHERE id = ?", [
      params.idpais,
    ]);

    const result2 = await conn.query(
      "UPDATE asignacion SET idp=0 WHERE idp = ?",
      [params.idpais]
    );

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
      precio: data.precio,
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

export async function GET(request, { params }) {
  try {
    const results = await conn.query("SELECT * FROM paises where id=?", [
      params.idpais,
    ]);
    //console.log(params.idpais);
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
