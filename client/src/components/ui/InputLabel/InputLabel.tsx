import Text from "../Text/Text"

type InputProps = {
  label: string
  type: string
  placeholder: string
}

export default function Input({ type, label, placeholder }: InputProps) {
  return (
    <div className="flex flex-col">
      <label className="mb-2 font-semibold" htmlFor={label}>
        <Text size="sm">{label}</Text>
      </label>
      <input className="focus:outline-blue-700 focus:text-black-100 text-black-60 rounded px-2 h-10 bg-blue-200" name={label} id={label} type={type} placeholder={placeholder} />
    </div>
  )
}