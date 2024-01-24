import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Link from "next/link";

export default function Banner() {
  return (
    <>
      <Navbar>
        <NavbarBrand>
          <p>LAU</p>
        </NavbarBrand>
        <NavbarContent>
          <NavbarItem>
            <Link href="/">Accueil</Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/lecteur">Lecteur</Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  );
}
