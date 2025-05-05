import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  href: string;
};
export function BackButton(props: Props) {
  return (
    <Link href={props.href} className="flex items-center gap-1 py-2 mb-4">
      <ArrowLeftIcon size={16} /> Back
    </Link>
  );
}
