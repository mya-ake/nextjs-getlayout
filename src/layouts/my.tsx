import { GetLayout } from "@/types";
import { RecoilRoot } from "recoil";
import { Header } from "./shared/Header";

export const MyLayout: GetLayout = (page) => (
  <RecoilRoot>
    <Header />
    {page}
  </RecoilRoot>
);
