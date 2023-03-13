import clsx from "clsx"
import Text from "./Text"

type ButtonProps = {
  label: string,
  type: 'primary' | 'secondary' | 'warn'
}

export default function Button({ label, type }: ButtonProps) {
  return (
    <button className={clsx('w-48 py-2 px-4 rounded text-white font-semibold transition-colors', {
      'bg-blue-500 hover:bg-blue-450': type === 'primary',
      'bg-blue-400 hover:bg-blue-300': type === 'secondary',
      'bg-redAlert-100 hover:bg-redAlert-60': type === 'warn',
    })}
    > <Text size="sm">{label}</Text></button >
  )


}

