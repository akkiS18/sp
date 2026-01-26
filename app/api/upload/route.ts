import { NextResponse } from "next/server";
import { r2Client, bucketName } from "@/lib/cloudflare-r2";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const contentType = file.type || "application/octet-stream";

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      Body: buffer,
      ContentType: contentType,
    });

    await r2Client.send(command);

    // Note: You need to set up a public domain or use the R2 dev domain to access the file
    // If you have a custom domain attached to R2:
    // const publicUrl = `https://your-custom-domain.com/${fileName}`;
    
    // For now, we'll return a placeholder or the key if the domain isn't known
    // But usually R2 files are accessed via a custom domain.
    const publicUrl = `https://${bucketName}.r2.cloudflarestorage.com/${fileName}`; 
    // ^ Replace this with your actual public URL/Worker URL if different.

    return NextResponse.json({ url: publicUrl });
  } catch (error) {
    console.error("R2 upload error:", error);
    return NextResponse.json({ error: "Failed to upload to R2" }, { status: 500 });
  }
}
