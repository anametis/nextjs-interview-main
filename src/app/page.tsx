// import { MOCK_DATA } from "@/constants/moc-data";
import { PeopleTable } from "@/features/people-table";
import { People } from "@/types/sw-types";
import { Hero } from "@/features/hero";
import { api } from "@/services/api-sw";

export default async function Home() {
  const tableData: People = await api.getPeople();

  return (
    <main className="flex h-auto min-h-screen my-20 flex-col items-center justify-center bg-gradient-to-b from-background to-star-primary transition-all duration-300">
      <Hero />
      <div className="w-full max-w-6xl px-4">
        <PeopleTable data={tableData} />
      </div>
    </main>
  );
}
