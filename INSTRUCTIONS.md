# Portfolio Terminal Integration Instructions

This project has been updated to support a **shadcn-like structure** with Tailwind CSS v4 and TypeScript.

## 1. Why `/components/ui`?

In the shadcn/ui ecosystem, the `/components/ui` folder is reserved for **reusable primitive components** (like Buttons, Inputs, Dialogs, etc.). These are the building blocks of your application.
- **Organization**: Keeping primitives separate from feature-specific components (located in `/components`) makes the codebase easier to navigate.
- **Convention**: shadcn tools and CLI expect this structure by default, allowing for seamless updates and additions of new UI components.

## 2. Setting up shadcn/ui

If you want to fully initialize shadcn/ui (e.g., to use the `npx shadcn@latest add ...` commands), follow these steps:

1. **Initialize shadcn**:
   ```bash
   npx shadcn@latest init
   ```
2. **Follow the prompts**:
   - Style: New York (Recommended)
   - Base Color: Zinc
   - CSS Variables: Yes
   - Aliases: `@/components` and `@/lib/utils`

## 3. Tailwind CSS & TypeScript Setup

The project is already configured with:
- **Tailwind CSS v4**: Processed via `@tailwindcss/vite`.
- **TypeScript**: Configured with path aliases (`@/*` pointing to `src/*`).

### Installation of Dependencies
The new component relies on standard React hooks. To ensure everything runs smoothly, the following packages are already in your `package.json`:
- `lucide-react`: For icons (if added later).
- `clsx` & `tailwind-merge`: For dynamic class naming (standard in shadcn).

## 4. Using the Component

The component is located at `src/components/ui/interactive-portfolio-terminal-component.tsx`.
A demo usage can be found in `src/demo.tsx`.

To see it in action, you can update your `src/App.tsx`:

```tsx
import DemoOne from "./demo";

function App() {
  return <DemoOne />;
}

export default App;
```
