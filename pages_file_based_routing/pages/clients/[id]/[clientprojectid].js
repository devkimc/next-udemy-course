import React from "react";
import { useRouter } from "next/router";

export default function SelectedClientProjectPage() {
  const router = useRouter();
  console.log(router.query);

  return <div>SelectedClientProjectPage</div>;
}
