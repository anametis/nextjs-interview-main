import { MOCK_DATA } from "@/constants/moc-data";
import { PeopleTable } from "@/features/people-table";
import { People } from "@/types/sw-types";
// import { api } from "@/services/api-sw";

export default async function Home() {
  const tableData: People = MOCK_DATA;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-star-primary transition-all duration-300">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-lightsaber-yellow transition-colors duration-200">
            Welcome to the Galaxy
          </h1>
          <p className="text-lg text-lightsaber-yellow transition-colors duration-200">
            May the Force be with you
          </p>
        </div>

        <div className="w-full max-w-6xl px-4">
          <PeopleTable data={tableData} />
        </div>
      </main>
    </div>
  );
}
