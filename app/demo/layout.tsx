export default function DemoLayout({ children }: LayoutProps<"/demo">) {
    return (
        <div className="min-h-screen w-full">
            {children}
        </div>
    );
}
