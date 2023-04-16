import clsx from "clsx"
import { useNavigate } from "react-router"

type TextProps = {
  size?: 'xs' | 'sm' | 'md'
  children: React.ReactNode
  href: string
  className?: string
}

export default function TextLink({ children, href = '#', size = 'sm', className }: TextProps) {

  const navigate = useNavigate()

  return (
    <a
      onClick={() => navigate(href)}
    >
      <button className={clsx('underline font-semibold cursor-pointer hover:opacity-90 px-1 py-0.5 ',
        {
          'text-xs': size === 'xs',
          'text-sm': size === 'sm',
          'text-md': size === 'md',
        }, className
      )
      }>
        {children}
      </button>
    </a>
  )
}