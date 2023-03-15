import TextLink from "./ui/TextLink/TextLink";

type FooterProps = {
  className?: string
}

export default function Footer({ className }: FooterProps) {

  return (
    <footer className={`w-full bg-blue-300 h-12 ${className}`}>
      <div className="max-w-7xl h-full m-auto flex gap-4 justify-center items-center">
        <TextLink href="#"><p className="text-white">Github</p></TextLink>
        <TextLink href="#"><p className="text-white">Figma</p></TextLink>
      </div>
    </footer>
  )
}