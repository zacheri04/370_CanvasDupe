export function CustomButton({ label }: { label: string }) {
  return (
    <div className="bg-lapis hover:bg-tangerine duration-100 p-[1rem] rounded-lg text-white">
      {label}
    </div>
  );
}
