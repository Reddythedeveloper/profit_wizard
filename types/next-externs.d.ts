declare module 'next/link' {
  import type { ComponentType } from 'react'
  const Link: ComponentType<any>
  export default Link
}

declare module 'next/navigation' {
  export function useRouter(): any
  export function usePathname(): string | null
  export function useSearchParams(): URLSearchParams | null
}

declare module 'next/image' {
  import type { ComponentType, ImgHTMLAttributes } from 'react'
  const Image: ComponentType<ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean }>
  export default Image
}
