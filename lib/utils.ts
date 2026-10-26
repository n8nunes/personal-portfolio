/**
 * Joins conditional class names. Kept dependency-free because the project does
 * not use the shadcn `clsx` + `tailwind-merge` pair yet.
 */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
