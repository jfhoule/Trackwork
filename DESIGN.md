# UI Style Guide

This guide documents the shared UI patterns for list and detail pages so new pages match the current design style.

## Page Layout

- Structure: title on the left, primary action on the right.
- Spacing: wrap page content in a `div` with `space-y-4`.
- Heading: top-level title uses `<h1 className="text-2xl font-bold">`.

Example header block:

```tsx
<div className="flex items-center justify-between">
  <h1 className="text-2xl font-bold">Page Title</h1>
  <Link href="/resource/new">
    <Button className="inline-flex items-center gap-2 bg-black text-white hover:bg-black/90 transition-colors">
      <Plus className="h-4 w-4" />
      Create a new resource
    </Button>
  </Link>
  {/* import { Button } from '@/components/ui/button'; */}
  {/* import { Plus } from 'lucide-react'; */}
  {/* import Link from 'next/link'; */}
</div>
```

## Tables (List Views)

- Use the shared table primitives from `components/ui/table.tsx`.
- Do not wrap tables in cards; render the `<Table>` directly (as on Clients and Projects pages).
- Column order: domain fields first; if there are per-row actions, use two right‑aligned columns named `Edit` and `View`.
- Action cells use icon-only links with subtle hover.

Header example:

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Primary Column</TableHead>
      <TableHead className="hidden md:table-cell">Secondary</TableHead>
      <TableHead className="text-right">Edit</TableHead>
      <TableHead className="text-right">View</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>{/* rows */}</TableBody>
</Table>
```

Row action cells:

```tsx
<TableCell className="text-right">
  <Link
    href={`/resources/${row.id}/edit`}
    className="inline-flex items-center justify-center rounded-md border px-3 py-2 text-sm font-medium hover:bg-gray-50"
    aria-label={`Edit ${row.name}`}
    title="Edit"
  >
    <Pencil className="h-4 w-4" />
  </Link>
</TableCell>
<TableCell className="text-right">
  <Link
    href={`/resources/${row.id}`}
    className="inline-flex items-center justify-center rounded-md border px-3 py-2 text-sm font-medium hover:bg-gray-50"
    aria-label={`View ${row.name}`}
    title="View"
  >
    <Eye className="h-4 w-4" />
  </Link>
</TableCell>
// import { Eye, Pencil } from 'lucide-react';
```

## Primary Action Button

- Use the black button with white text and hover as the standard primary action.
- Include a leading icon when appropriate (Plus for create, etc.).

```tsx
<Button className="inline-flex items-center gap-2 bg-black text-white hover:bg-black/90 transition-colors">
  <Plus className="h-4 w-4" />
  Create a new …
</Button>
```

## Detail Pages (Read‑only)

- Header mirrors the list page: title left; `Edit` button on the right.
- Body uses a simple grid of labeled fields.

```tsx
<div className="space-y-6">
  <div className="flex items-center justify-between">
    <h1 className="text-2xl font-bold">Resource Details</h1>
    <Button asChild>
      <Link href={`/resources/${id}/edit`}>Edit</Link>
    </Button>
  </div>

  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <div>
      <div className="text-sm text-gray-500">Field Label</div>
      <div className="font-medium">Value</div>
    </div>
    {/* more fields... */}
  </div>

  <div>
    <Link href="/resources" className="text-blue-600 underline">Back to list</Link>
  </div>
</div>
```

## Accessibility & Icons

- Add `aria-label` and `title` to icon-only controls.
- Use `lucide-react` icons sized `h-4 w-4` inside controls.

## Data Fetching

- Prefer server components for lists and details; use helpers from `lib/data.ts`.
- Client components are for interactive forms/dialogs only.

## Tailwind Conventions

- Typography and spacing mirror the existing pages: `text-2xl font-bold` for titles, `space-y-4` between sections.
- Buttons and action chips: subtle borders; hover states via `hover:bg-gray-50`.

---

Reference implementations:
- Clients list: `app/clients/page.tsx`
- Projects list: `app/projects/page.tsx`
- Client details: `app/clients/[id]/page.tsx`
- Project details: `app/projects/[id]/page.tsx`

