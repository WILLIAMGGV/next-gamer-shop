import { NextResponse } from "next/server";
import { conn } from "../../libs/mysql";

export async function GET() {
  try {
    var ventas = [];
    const currentYear = new Date().getFullYear();

    for (let i = 1; i <= 12; i++) {
      var results = await conn.query(
        "SELECT * FROM facturas WHERE MONTH(fecha) = ? AND YEAR(fecha) = ?",
        [i, currentYear]
      );

      ventas.push(results[0].length);
    }
    //console.log(ventas);
    return NextResponse.json(ventas[0]);
  } catch (error) {
    //console.log(error);
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 400,
      }
    );
  }
}
