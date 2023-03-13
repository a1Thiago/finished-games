import clsx from "clsx"

type TextProps = {
  size?: 'xs' | 'sm' | 'md'
  children: React.ReactNode
}

export default function Text({ children, size = 'sm' }: TextProps) {
  return (
    <span className={clsx('',
      {
        'text-xs': size === 'xs',
        'text-sm': size === 'sm',
        'text-md': size === 'md',
      }
    )}>
      {children}
    </span>
  )
}