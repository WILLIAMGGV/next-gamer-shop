import { NextResponse } from "next/server";
import { conn } from "../../libs/mysql";

export async function GET() {
  try {
    const results = await conn.query("SELECT * FROM paises");
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
    const { nombre, precio, abreviacion, descripcion } = await request.json();

    const result = await conn.query("INSERT INTO paises SET ?", {
      nombre: nombre,
      precio: precio,
      abreviacion: abreviacion,
      descripcion: descripcion,
    });

    return NextResponse.json({
      nombre: nombre,
      precio: precio,
      abreviacion: abreviacion,
      descripcion: descripcion,
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
