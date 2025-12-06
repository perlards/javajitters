import { NextResponse } from "next/server";
import getAllCoffees from "@/lib/getAllCoffees";

export async function GET() {
    try {
        const coffees = await getAllCoffees();
        return NextResponse.json(coffees);
    } catch (error) {
        console.error("Error fetching coffee posts:", error);
        return NextResponse.json({ error: "Error loading coffees" }, { status: 500 });
    }
}
