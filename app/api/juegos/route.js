import { NextResponse } from "next/server";
import { conn } from "../../libs/mysql";

export async function GET() {
  try {
    const results = await conn.query("SELECT * FROM juegos");
    //console.log(results[0]);
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

export async function POST(request) {
  try {
    //console.log(request);
    const { nombre, categoria, prg, seccion1, seccion2, encabezado } =
      await request.json();

    const result = await conn.query("INSERT INTO juegos SET ?", {
      nombre: nombre,
      categoria: categoria,
      prg: prg,
      seccion1: seccion1,
      seccion2: seccion2,
      encabezado: encabezado,
    });

    //console.log(result[0].insertId);

    const result2 = await conn.query("INSERT INTO asignacion SET ?", {
      idp: 0,
      nombre: nombre,
      idj: result[0].insertId,
    });

    return NextResponse.json({
      nombre: nombre,
      categoria: categoria,
      prg: prg,
      id: result[0].insertId,
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
