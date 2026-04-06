import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">About</h1>
      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4 text-muted">
        <p>
          I am a Senior product designer at{" "}
          <a href="https://www.revolut.com/" target="_blank" rel="noopener noreferrer" className="text-foreground underline">
            Revolut
          </a>
          , where I work with the Expansion department to bring Revolut to the
          world. Apart from the expansion department I am also a part of the
          design operations team where we build internal products to optimise
          internal workflows.
        </p>
        <p>
          In addition to my day-to-day responsibilities, I am also committed to
          giving back to the design community. I have been developing{" "}
          <a href="https://www.figma.com/@tushar" target="_blank" rel="noopener noreferrer" className="text-foreground underline">
            Figma Plugins
          </a>
          , creating design resources, and speaking at{" "}
          <a href="https://www.youtube.com/watch?v=FhXXEM1_aP4&t=55s" target="_blank" rel="noopener noreferrer" className="text-foreground underline">
            Config
          </a>{" "}
          Design conferences to share my knowledge and experience.
        </p>
        <p>
          Before Revolut, I was at{" "}
          <a href="https://en.wikipedia.org/wiki/Zomato" target="_blank" rel="noopener noreferrer" className="text-foreground underline">
            Zomato
          </a>{" "}
          where I helped develop multiple products like Grocery delivery (now{" "}
          <a href="https://en.wikipedia.org/wiki/Blinkit" target="_blank" rel="noopener noreferrer" className="text-foreground underline">
            Blinkit
          </a>
          ), order tracking system and much more.
        </p>
        <p>
          Before that, I was at{" "}
          <a href="https://en.wikipedia.org/wiki/Expedia_Group" target="_blank" rel="noopener noreferrer" className="text-foreground underline">
            Expedia
          </a>{" "}
          helping build the Car rental product. I was also a part of the Expedia
          design systems team building internal tools and frameworks.
        </p>
        <p>
          I got my first real taste of product design at{" "}
          <a href="https://en.wikipedia.org/wiki/MakeMyTrip" target="_blank" rel="noopener noreferrer" className="text-foreground underline">
            MakeMyTrip
          </a>{" "}
          where I was part of their app redesign followed by{" "}
          <a href="https://en.wikipedia.org/wiki/Hike_Messenger" target="_blank" rel="noopener noreferrer" className="text-foreground underline">
            Hike Messenger
          </a>{" "}
          where I worked on building India&apos;s first social chat app.
        </p>

        <h2 className="text-xl font-semibold text-foreground pt-4">My Skills</h2>
        <p>
          <strong className="text-foreground">Design:</strong> I have over a decade of experience in
          building high quality and scalable products for some of the largest
          product companies in the world.
        </p>
        <p>
          <strong className="text-foreground">Development:</strong> I have a background in engineering
          and I specialize in building websites, internal tools, Figma plugins,
          and high fidelity prototypes.
        </p>
        <p>
          <strong className="text-foreground">Design Ops:</strong> I have been involved in design
          operations work and have actively contributed to setting up processes,
          and frameworks for world class design teams.
        </p>

        <h2 className="text-xl font-semibold text-foreground pt-4">Outside of work</h2>
        <p>
          I was born in New Delhi, India in the early 90&apos;s and then grew up
          in a boarding school in Mussoorie which is a hill station in the
          Himalayas. I am a bit introverted but once I open up it&apos;s hard to
          keep me shut. I like to spend my free time reading Fantasy books or
          listening to music from the 90s, watching old movies and travelling
          with my wife.
        </p>
      </div>
    </div>
  );
}
