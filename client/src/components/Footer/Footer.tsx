import { TextLink } from "@ui/TextLink";

type FooterProps = {
  className?: string
}

export default function Footer({ className }: FooterProps) {

  return (
    <footer className={`w-full bg-blue-300 h-12 ${className}`}>
      <div className="max-w-7xl h-full m-auto flex gap-4 justify-center items-center">
        <TextLink href="https://finished-games-client.vercel.app/" className="text-white">Github</TextLink>
        <TextLink href="https://finished-games-client.vercel.app/" className="text-white">Figma</TextLink>
      </div>
    </footer>
  )
}