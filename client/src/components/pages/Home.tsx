import Button from "@ui/Button/Button"
import Input from "@ui/InputLabel/InputLabel"
import Text from "@ui/Text/Text"
import TextLink from "@ui/TextLink/TextLink"
import Heading from "@ui/Heading/Heading"

export default function Home() {
  return (
    <div className="text-white">
      <div className="mt-32">
        <Heading size="2xl"><h1>Catalog your game Collection</h1></Heading>
        <Heading size="xl"><h2>Organize all your finished games into one master collection</h2></Heading>
        <Text><TextLink href="#">Sign Up</TextLink>  or <TextLink href="#">Log in</TextLink> to start</Text>
      </div>
    </div>
  )
}