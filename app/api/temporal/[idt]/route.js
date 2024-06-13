import { NextResponse } from "next/server";
import { conn } from "@/app/libs/mysql";

export async function DELETE(request, { params }) {
  try {
    const result = await conn.query("DELETE FROM temporal WHERE id = ?", [
      params.idt,
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
