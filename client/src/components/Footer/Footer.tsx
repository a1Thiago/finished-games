import { TextLink } from "@ui/TextLink";

type FooterProps = {
  className?: string
}

export default function Footer({ className }: FooterProps) {

  return (
    <footer className={`w-full bg-blue-300 h-12 ${className}`}>
      <div className="max-w-7xl h-full m-auto flex gap-4 justify-center items-center">
        <TextLink externalLink href="https://github.com/a1Thiago/finished-games" className="text-white">Github</TextLink>
        <TextLink externalLink href="https://www.figma.com/file/BchVqf1f8wS0iZtFl4d7IY/Finished-Games" className="text-white">Figma</TextLink>
      </div>
    </footer>
  )
}