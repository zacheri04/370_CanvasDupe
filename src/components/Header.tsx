"use client";

import Section from "./section";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <Section bgColor={2}>
      <div className="w-[60rem] flex flex-row justify-between items-center">
        <Link href={"/"}>
          <Image src={logo} alt={"Logo"} width={192} height={256} />
        </Link>
        <div className="flex flex-row gap-[2rem]">
          {pathname === "/" ? (
            <Link href={"/"} className="text-tangerine">
              Import
            </Link>
          ) : (
            <Link href={"/"} className="hover:text-tangerine duration-100">
              Import
            </Link>
          )}

          {pathname === "/reports" ? (
            <Link href={"/reports"} className="text-tangerine">
              Reports
            </Link>
          ) : (
            <Link
              href={"/reports"}
              className="hover:text-tangerine duration-100"
            >
              Reports
            </Link>
          )}
        </div>
      </div>
    </Section>
  );
}
