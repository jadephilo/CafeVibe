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
  const discord_url = String(formData.get("discord_url") || "").trim();
  const open_to_social = formData.get("open_to_social") === "on";
  const work_today = String(formData.get("work_today") || "").trim();

if (!nickname || !place_name || !work_today || Number.isNaN(lat) || Number.isNaN(lng)) {
  throw new Error("Please complete all required fields.");
}

const { error } = await supabase.from("user_statuses").insert({
  nickname,
  place_name,
  lat,
  lng,
  mood,
  work_today,
  open_to_social,
  discord_url: null,
});

  if (error) {
    throw new Error(error.message);
  }

  redirect("/posted");
}

export default function PostPage() {
  return (
    <main style={{ maxWidth: 640, margin: "40px auto", padding: 24 }}>
      <h1 style={{ fontSize: 28, marginBottom: 24 }}>Post your study/work status</h1>
      <PostStatusForm action={createStatus} />
    </main>
  );
}