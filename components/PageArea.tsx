export const PageArea = ({id, title, children }: { id: string, title?: string, children: React.ReactNode }) => {
    return (
        <div id={id} className="mt-24 w-full flex flex-col items-start gap-8 text-left">
            {title && <h2 className="text-3xl font-bold tracking-tight text-black dark:text-zinc-50">{title}</h2>}
            {children}
        </div>
    );
};