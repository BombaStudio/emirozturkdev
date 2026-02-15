export default function NavItem({ href, children }: { href: string; children: React.ReactNode }) {
    return (
      <a className="max-w-md text-sm leading-8 text-black dark:text-zinc-50 transition hover:text-zinc-600 dark:hover:text-zinc-400" href={href}> {children} </a>  
    );
}