import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="p-4 max-w-3xl mx-auto w-full h-full flex flex-col gap-4">
      {children}
    </div>
  );
}
