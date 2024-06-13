import { NextResponse } from "next/server";
import { conn } from "../../libs/mysql";

export async function GET() {
  try {
    const results = await conn.query("SELECT * FROM temporal");
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
    const { idp, precio, prg, idpais, total, abreviacion } =
      await request.json();

    const result = await conn.query("INSERT INTO temporal SET ?", {
      idp: idp,
      precio: precio,
      prg: prg,
      idpais: idpais,
      total: total,
      abreviacion: abreviacion,
    });

    return NextResponse.json({
      idp: idp,
      precio: precio,
      prg: prg,
      idpais: idpais,
      total: total,
      abreviacion: abreviacion,
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
