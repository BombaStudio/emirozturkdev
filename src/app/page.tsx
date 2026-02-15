import Image from "next/image";
import Header from "../../components/Header";
import { portfolio } from "../data/portfolio";

export default function Home() {
  return (
    <>
    <div className="flex flex-col items-center justify-between w-full">
      
      <main className="flex flex-col items-center w-full py-16 px-8">
        
        <div className="flex flex-col items-start gap-8 text-left">
          <h1 className="max-w-5xl text-4xl font-bold tracking-tight text-black dark:text-zinc-50 sm:text-6xl">
            {portfolio.personal.intro}
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            A software developer and physics student fueled by complex problems.
            <br />
            <br />
            This industry is very painful, but i think pain is the result of crisis and crisis is the harbinger of opportunity. 
            If crying doesn't ease the pain, then we'll have to work.
            So i have developed many projects and demos to find the opportunity.
            Sometimes, my ideas keep me awake at night, pushing the limits of my mind.
            The important thing is being able to manage ideas and bring them to life with the right strategy.
            This requires production and hard work.
            Now i am trying to learn new things for developing projects better and trying to make batter projects.
            For this reason i feel like a underground rapper that fighting the world.

            <br/>
            <br/>
            Dont wait the benefits from the world, coding your pain.
          </p>
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-8 text-background transition-colors hover:opacity-90 sm:w-fit"
            href="#work-experience"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
            Work Experience
          </a>
        </div>
        
        <div id="work-experience" className="mt-24 w-full flex flex-col items-start gap-8 text-left">
          <h2 className="text-3xl font-bold tracking-tight text-black dark:text-zinc-50">Career</h2>
          <div className="w-full space-y-8 border-l-2 border-zinc-200 dark:border-zinc-800 ml-3">
            {portfolio.jobs.map((job, index) => (
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
            ))}
          </div>
        </div>

      </main>
    </div>
    </>
  );
}

