import { Form, useNavigation } from "react-router";
import PageHero from "../components/PageHero";
import Button from "../components/ui/Button";
import { createMessage } from "../lib/shop";

export function meta() {
  return [{ title: "Contact · Alder Coffee" }];
}

export async function action({ request }) {
  const form = await request.formData();
  const name = String(form.get("name") || "").trim();
  const email = String(form.get("email") || "").trim();
  const topic = String(form.get("topic") || "general").trim();
  const body = String(form.get("body") || "").trim();

  if (!name || !email || !body) {
    return { error: "Please fill in name, email, and your message." };
  }

  await createMessage({ name, email, topic, body });
  return { ok: true };
}

export default function ContactPage({ actionData }) {
  const navigation = useNavigation();
  const busy = navigation.state !== "idle";

  return (
    <>
      <PageHero
        compact
        title="Say hello"
        text="Questions about catering, beans, or just stopping by? Send us a note."
        image="https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1800&q=80"
      />

      <section className="page-panel">
        {actionData?.ok ? (
          <div className="success-note">
            <h2>Thanks for writing</h2>
            <p>We read every note and usually reply within a day.</p>
          </div>
        ) : (
          <Form method="post" className="form-stack narrow">
            <label>
              Name
              <input name="name" required />
            </label>
            <label>
              Email
              <input name="email" type="email" required />
            </label>
            <label>
              Topic
              <select name="topic" defaultValue="general">
                <option value="general">General</option>
                <option value="catering">Catering</option>
                <option value="wholesale">Wholesale beans</option>
                <option value="careers">Careers</option>
              </select>
            </label>
            <label>
              Message
              <textarea name="body" rows={5} required />
            </label>
            {actionData?.error && (
              <p className="form-error">{actionData.error}</p>
            )}
            <Button type="submit" disabled={busy}>
              {busy ? "Sending..." : "Send message"}
            </Button>
          </Form>
        )}
      </section>
    </>
  );
}
