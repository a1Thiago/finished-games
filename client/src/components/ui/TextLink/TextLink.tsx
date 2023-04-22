import clsx from "clsx"
import { useNavigate } from "react-router"

type TextProps = {
  size?: 'xs' | 'sm' | 'md'
  children: React.ReactNode
  href: string
  className?: string
  externalLink?: boolean
}

export default function TextLink({ children, href = '#', size = 'sm', className, externalLink }: TextProps) {

  const navigate = useNavigate()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {

    if (externalLink) return

    e.preventDefault();
    navigate(href)

  }

  return (
    <a href={href} target={externalLink ? '_blank' : '_self'} onClick={handleClick} >

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