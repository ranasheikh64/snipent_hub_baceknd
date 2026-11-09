import { NextRequest, NextResponse } from "next/server";
import { uploadToCloudinary } from "@/backend/config/cloudinary";

export async function POST(request: NextRequest) {
  try {
    const { imageBase64, folder } = await request.json();
    if (!imageBase64) {
      return NextResponse.json(
        { success: false, message: "No imageBase64 provided" },
        { status: 400 }
      );
    }

    const result = await uploadToCloudinary(imageBase64, folder || "devvault");
    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || "Cloudinary upload failed" },
      { status: 500 }
    );
  }
}

