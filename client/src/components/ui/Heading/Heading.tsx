import clsx from "clsx"

type HeadingProps = {
  size?: 'lg' | 'xl' | '2xl'
  children: React.ReactNode
}

export default function Heading({ children, size = 'lg' }: HeadingProps) {
  return (
    <span className={clsx('font-bold',
      {
        'text-lg': size === 'lg',
        'text-xl': size === 'xl',
        'text-2xl': size === '2xl',
      }
    )}>
      {children}
    </span>
  )
}

