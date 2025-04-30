import Section from "./section";

export default function Footer() {
  return (
    <Section bgColor={0}>
      <div className="w-[60rem] flex flex-row justify-between items-center">
        <p>Not Canvas Administration System</p>
        <p>&copy; 2025 Team Dangling Pointers</p>
      </div>
    </Section>
  );
}
