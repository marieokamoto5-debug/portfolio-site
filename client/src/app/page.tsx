import ContactForm from "./ContactForm";

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
    <main className="mx-auto max-w-4xl p-8">
      <section className="mb-12">
        <h1 className="text-3xl font-bold">{profile.name}</h1>

        {profile.image_id && (
          <img
            src={`${process.env.FASTAPI_URL}/images/${profile.image_id}`}
            alt={profile.name}
            width={200}
            className="mt-4 rounded-lg"
          />
        )}

        <p className="mt-4">{profile.bio}</p>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold">Skills</h2>

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
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">Works</h2>

        <div className="space-y-4">
          {works.map((work) => (
            <article
              key={work.id}
              className="rounded-lg border p-4"
            >
              <h3 className="font-bold">{work.title}</h3>
              <p className="mt-2">{work.description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="mt-12">
        <h2 className="mb-4 text-2xl font-bold">Contact</h2>
        <ContactForm />
      </section>
    </main>
  );
}