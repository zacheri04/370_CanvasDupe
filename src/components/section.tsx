export default function Section({
  bgColor,
  children,
}: {
  bgColor: number;
  children?: React.ReactNode;
}) {
  if (bgColor === 0) {
    return (
      <div
        className={`bg-charcoal p-8 text-white flex flex-col gap-[2rem] items-center justify-center text-xl font-bold`}
      >
        {children}
      </div>
    );
  } else if (bgColor === 1) {
    return (
      <div
        className={`bg-linen p-8 flex flex-col gap-[2rem] items-center justify-center text-xl font-bold`}
      >
        {children}
      </div>
    );
  }
  return (
    <div
      className={`bg-lapis p-8 text-white flex flex-col gap-[2rem] items-center justify-center text-xl font-bold`}
    >
      {children}
    </div>
  );
}
