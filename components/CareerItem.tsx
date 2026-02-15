import { Job } from "../src/data/portfolio";

export const CareerItem = ({ job, index }: { job: Job, index: number }) => {
    return (
        <div key={index} className="relative pl-8">
                <span className="absolute -left-[9px] top-2 h-4 w-4 rounded-full border-4 border-white bg-zinc-200 dark:border-black dark:bg-zinc-800" />
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="text-xl font-semibold text-black dark:text-zinc-50">{job.title}</h3>
                      <span className="text-sm text-zinc-500 dark:text-zinc-400">{job.startDate} - {job.endDate}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <span className="text-base font-medium text-zinc-700 dark:text-zinc-300">{job.company}</span>
                      <span className="text-sm text-zinc-500 dark:text-zinc-400">{job.location}</span>
                  </div>
                  <p className="max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
                      {job.description}
                  </p>
                </div>
              </div>
    );
};