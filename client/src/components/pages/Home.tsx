import Text from "@ui/Text/Text"
import TextLink from "@ui/TextLink/TextLink"
import Heading from "@ui/Heading/Heading"
import HomeImages from "@components/HomeImages"

export default function Home() {
  return (
    <div className="text-white grid grid-cols-2 tablet:grid-cols-1">
      <div className="mt-32">
        <Heading size="2xl"><h1 className="mb-8">Catalog your game Collection</h1></Heading>
        <Heading size="xl"><h2 className="mb-16">Organize all your finished games into one master collection</h2></Heading>
        <Text><TextLink href="#">Sign Up</TextLink> or <TextLink href="#">Log in</TextLink> to start</Text>
      </div >
      <div className="mt-44 tablet:mt-16">
        <HomeImages />
      </div>
    </div>
  )
}