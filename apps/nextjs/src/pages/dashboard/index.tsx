import Link from "next/link";

import { Layout } from "~/components/Layout";

export default function Dashboard() {
  return (
    <Layout>
      <Link href="/dashboard/profile">Profile</Link>
    </Layout>
  );
}
