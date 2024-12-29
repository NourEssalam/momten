import Team from "@/components/about/Team";
import Container from "@/components/shared-components/Container";
import Zpattern from "@/components/shared-components/Zpattern";
import { infoIntro } from "@/lib/data-placeholders";
export default function About() {
  return (
    <section>
      <Container className="flex flex-col justify-center items-center gap-16">
        {infoIntro.map((info, index) => (
          <Zpattern
            key={index}
            title={info.title}
            description={info.description}
            image={info.image}
            links={info.links}
            zorder={index}
          />
        ))}
      </Container>
      <Team />
    </section>
  );
}
