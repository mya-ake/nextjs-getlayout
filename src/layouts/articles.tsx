import { GetLayout } from "@/types";
import { Header } from "./shared/Header";

export const ArticlesLayout: GetLayout = (page) => (
  <>
    <Header />
    {page}
  </>
);
