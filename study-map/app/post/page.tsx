import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";
import PostStatusForm from "@/components/PostStatusForm";

async function createStatus(formData: FormData) {
  "use server";

  const nickname = String(formData.get("nickname") || "").trim();
  const place_name = String(formData.get("place_name") || "").trim();
  const lat = Number(formData.get("lat"));
  const lng = Number(formData.get("lng"));
  const mood = String(formData.get("mood") || "").trim();
  const activity = String(formData.get("activity") || "").trim();
  const discord_url = String(formData.get("discord_url") || "").trim();
  const open_to_social = formData.get("open_to_social") === "on";

  if (!nickname || !place_name || Number.isNaN(lat) || Number.isNaN(lng)) {
    throw new Error("Missing required fields.");
  }

  const { error } = await supabase.from("user_statuses").insert({
    nickname,
    place_name,
    lat,
    lng,
    mood,
    activity,
    open_to_social,
    discord_url: discord_url || null,
  });

  if (error) {
    throw new Error(error.message);
  }

  redirect("/");
}

export default function PostPage() {
  return (
    <main style={{ maxWidth: 640, margin: "40px auto", padding: 24 }}>
      <h1 style={{ fontSize: 28, marginBottom: 24 }}>Post your study/work status</h1>
      <PostStatusForm action={createStatus} />
    </main>
  );
}