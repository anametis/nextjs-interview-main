// import { MOCK_DATA } from "@/constants/moc-data";
import { PeopleTable } from "@/features/people-table";
import { People } from "@/types/sw-types";
import { Hero } from "@/features/hero";
import { api } from "@/services/api-sw";
import { ErrorText } from "@/components/error-text";

export const revalidate = 3600;

export default async function Home() {
  let tableData: People | null = null;

  try {
    tableData = await api.getPeople();
  } catch (error) {
    console.error("Failed to fetch people data:", error);
  }

  return (
    <main className="my-20 flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-star-primary transition-all duration-300">
      <Hero />

      <div className="w-full max-w-6xl px-4">
        {tableData ? (
          <PeopleTable data={tableData} />
        ) : (
          <ErrorText message="There was an issue loading data, please try again later." />
        )}
      </div>
    </main>
  );
}
