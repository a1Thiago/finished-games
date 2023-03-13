import clsx from "clsx"

type TextProps = {
  size?: 'xs' | 'sm' | 'md'
  children: React.ReactNode
  href: string
}

export default function TextLink({ children, href, size = 'sm' }: TextProps) {
  return (
    <a className={clsx('underline font-semibold',
      {
        'text-xs': size === 'xs',
        'text-sm': size === 'sm',
        'text-md': size === 'md',
      }
    )} href={href}>
      {children}
    </a>
  )
}