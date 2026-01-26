import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const profile = await prisma.profile.findUnique({
      where: { id: "singleton" },
    });
    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const profile = await prisma.profile.upsert({
      where: { id: "singleton" },
      update: {
        name: data.name,
        role: data.role,
        bio: data.bio,
        email: data.email,
        github: data.github,
        linkedin: data.linkedin,
        telegram: data.telegram,
        instagram: data.instagram,
        resumeUrl: data.resumeUrl,
      },
      create: {
        id: "singleton",
        name: data.name,
        role: data.role,
        bio: data.bio,
        email: data.email,
        github: data.github,
        linkedin: data.linkedin,
        telegram: data.telegram,
        instagram: data.instagram,
        resumeUrl: data.resumeUrl,
      },
    });
    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
