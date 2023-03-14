import clsx from "clsx"

type TextProps = {
  size?: 'xs' | 'sm' | 'md'
  children: React.ReactNode
  href: string
  className?: string
}

export default function TextLink({ children, href = '#', size = 'sm', className }: TextProps) {
  return (
    <a className={clsx('underline font-semibold',
      {
        'text-xs': size === 'xs',
        'text-sm': size === 'sm',
        'text-md': size === 'md',
      }, className
    )
    } href={href}>
      {children}
    </a>
  )
}