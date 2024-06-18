import { NextResponse } from "next/server";
import { conn } from "../../../libs/mysql";

export async function GET(request, { params }) {
  try {
    const results = await conn.query("SELECT * FROM paquetes WHERE idj=?", [
      params.idj,
    ]);
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

export async function POST(request, { params }) {
  try {
    console.log(request);
    const { nombre, prg, seccion } = await request.json();
    console.log(nombre + prg + seccion);
    const result = await conn.query("INSERT INTO paquetes SET ?", {
      nombre: nombre,
      prg: prg,
      idj: params.idj,
      seccion: seccion,
    });

    return NextResponse.json({
      nombre: nombre,
      prg: prg,
      idj: params.idj,
      id: result.insertId,
    });
  } catch (error) {
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

export async function DELETE(request, { params }) {
  try {
    const result = await conn.query("DELETE FROM paquetes WHERE id = ?", [
      params.idj,
    ]);

    const result2 = await conn.query(
      "DELETE FROM paquetes_compra WHERE idp = ?",
      [params.idj]
    );

    const result3 = await conn.query(
      "DELETE FROM precios_compra WHERE idp = ?",
      [params.idj]
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
      prg: data.prg,
      seccion: data.seccion,
    };

    const result = await conn.query("UPDATE paquetes SET ? WHERE id = ?", [
      updateData,
      params.idj,
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
