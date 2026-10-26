import ContactForm from "./ContactForm";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const dynamic = "force-dynamic";

/* FastAPI 動作確認*/

type Profile = {
  id: number;
  name: string;
  bio: string;
  image_id: number | null;
};

type Skill = {
  id: number;
  name: string;
};

type Work = {
  id: number;
  title: string;
  description: string
  url: string | null;
}

export default async function Home() {
  const profileResponse = await fetch(
    `${process.env.FASTAPI_URL}/profile`
  );

  if (!profileResponse.ok) {
    return (
      <main>
        <p>データの取得に失敗しました。</p>
      </main>
    );
  }

  const profile: Profile = await profileResponse.json();

  const skillsResponse = await fetch(
    `${process.env.FASTAPI_URL}/skills`
  );

  if (!skillsResponse.ok) {
    return (
      <main>
        <p>データの取得に失敗しました。</p>
      </main>
    );
  }

  const skills: Skill[] = await skillsResponse.json();

  const worksResponse = await fetch(
    `${process.env.FASTAPI_URL}/works`
  );

  if (!worksResponse.ok) {
    return (
      <main>
        <p>データの取得に失敗しました。</p>
      </main>
    );
  }

  const works: Work[] = await worksResponse.json();

  return (
    <div className="min-h-screen bg-gray-50">

      <main className="mx-auto max-w-4xl p-8">
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">
                {profile.name}
              </CardTitle>
            </CardHeader>

            <CardContent>
              {profile.image_id && (
                <img
                  src={`${process.env.FASTAPI_URL}/images/${profile.image_id}`}
                  alt={profile.name}
                  width={200}
                  className="rounded-lg"
                />
              )}

              <p className="mt-4">{profile.bio}</p>
            </CardContent>
          </Card>
        </section>

        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">
                <h2 className="mb-4 text-2xl font-bold">Skills</h2>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <li
                    key={skill.id}
                    className="rounded border px-3 py-1"
                  >
                    {skill.name}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold">Works</h2>

          <div className="space-y-4">
            {works.map((work) => (
              <Card key={work.id}>
                <CardHeader>
                  <CardTitle>{work.title}</CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="whitespace-pre-line">{work.description}</p>

                  {work.url && (
                    <a
                      href={work.url}
                      className="mt-2 block underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {work.url}
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        <section className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                Contact
              </CardTitle>

            </CardHeader>

            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}