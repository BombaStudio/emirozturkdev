import { portfolio } from "@/data/portfolio";
import ProjectsGrid from "../../../components/projects/projects-grid";

export default function ProjectsPage() {
  return <ProjectsGrid portfolio={portfolio} />;
}
