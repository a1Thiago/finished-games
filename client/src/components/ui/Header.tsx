import clsx from "clsx"

type HeaderProps = {
  size?: 'lg' | 'xl' | '2xl'
  children: React.ReactNode
}

export default function Header({ children, size = 'lg' }: HeaderProps) {
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

