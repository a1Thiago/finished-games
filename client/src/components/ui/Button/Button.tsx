import clsx from "clsx"
import Text from "../Text/Text"

type ButtonProps = {
  label: string,
  style: 'primary' | 'secondary' | 'warn',
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<any>
}

export default function Button({ label, style, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} className={clsx('w-48 py-2 px-4 rounded text-white font-semibold transition-colors', {
      'bg-blue-500 hover:bg-blue-450': style === 'primary',
      'bg-blue-400 hover:bg-blue-300': style === 'secondary',
      'bg-redAlert-100 hover:bg-redAlert-60': style === 'warn',
    })}
    > <Text size="sm">{label}</Text></button >
  )


}

