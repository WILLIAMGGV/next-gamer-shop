import { NextResponse } from "next/server";
import { conn } from "../../libs/mysql";

export async function GET() {
  try {
    const results = await conn.query("SELECT * FROM bancos");
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
    const { nombre, cuenta, tipo, idp } = await request.json();

    const result = await conn.query("INSERT INTO bancos SET ?", {
      nombre: nombre,
      cuenta: cuenta,
      tipo: tipo,
      idp: idp,
    });

    return NextResponse.json({
      nombre: nombre,
      cuenta: cuenta,
      tipo: tipo,
      idp: idp,
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
