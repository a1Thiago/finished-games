import { Text } from "@ui/Text"
import { Envelope, Lock, IdentificationBadge } from "@phosphor-icons/react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  invalid?: string
  icon?: 'userName' | 'password' | 'email'
}

export default function Input({ label, invalid, icon, ...props }: InputProps) {
  return (
    <div className="flex flex-col">
      <label className="mb-2 font-semibold" htmlFor={label}>
        <Text size="sm">{label}</Text>
      </label>
      <div className="flex gap-2 items-center rounded px-2 h-10 bg-blue-200 focus-within:ring-2 ring-blue-700 focus-within:text-black-100 text-black-60">
        {icon === 'userName' && <IdentificationBadge />}
        {icon === 'password' && <Lock />}
        {icon === 'email' && <Envelope />}
        <input className="bg-transparent outline-none flex-1"
          name={label} id={label}  {...props} />
      </div>
      <Text className="text-redAlert-100">{invalid}</Text>
    </div>
  )
}