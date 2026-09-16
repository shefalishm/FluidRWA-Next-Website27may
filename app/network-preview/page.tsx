import { redirect } from "next/navigation";

export const metadata = {
  title: "FluidRWA Network Explorer | Preview",
  robots: { index: false, follow: false }
};

export default function Page() {
  redirect("/network-preview/rwa-ecosystem");
}
