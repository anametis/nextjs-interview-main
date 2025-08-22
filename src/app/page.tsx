import { PeopleTable } from "@/features/people-table";
import { api } from "@/services/api-sw";
import { People } from "@/types/sw-types";


export default function Home() {
  const tableData: People = api.getPeople()

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

        <div className="text-lightsaber-yellow transition-colors duration-200 mb-4">
          <p>the table</p>
          {/* <Filters /> */}
          {/* <SortBy /> */}
          <PeopleTable data={tableData} search/>
          {/* <Pagination /> */}
        </div>

      </main>
    </div>
  );
}
