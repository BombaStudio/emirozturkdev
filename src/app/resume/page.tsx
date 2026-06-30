import { portfolio } from "@/data/portfolio";
import ResumeClient from "./resume-client";

export default function ResumePage() {
  return <ResumeClient portfolio={portfolio} />;
}
