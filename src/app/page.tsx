// import { api } from "@/services/api-sw";
// import { People } from "@/types/sw-types";

export default function Home() {
  // const tableData: People = api.getPeople(1) // TODO: use serverApi to get page 1 for server rendering
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
