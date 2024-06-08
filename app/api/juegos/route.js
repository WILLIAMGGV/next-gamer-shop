import { NextResponse } from "next/server";
import { conn } from "../../libs/mysql";

export async function GET() {
  try {
    const results = await conn.query("SELECT * FROM juegos");
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

export async function POST(request) {
  try {
    console.log(request);
    const { nombre, categoria, prg } = await request.json();

    const result = await conn.query("INSERT INTO juegos SET ?", {
      nombre: nombre,
      categoria: categoria,
      prg: prg,
    });

    const result2 = await conn.query("INSERT INTO asignacion SET ?", {
      idp: 0,
      nombre: nombre,
      idj: result.insertId,
    });

    return NextResponse.json({
      nombre: nombre,
      categoria: categoria,
      prg: prg,
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
