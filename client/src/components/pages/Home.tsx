import Text from "@ui/Text/Text"
import TextLink from "@ui/TextLink/TextLink"
import Heading from "@ui/Heading/Heading"
import HomeImages from "@components/HomeImages"

export default function Home() {
  return (
    <div className="text-white grid grid-cols-2 tablet:grid-cols-1">
      <div className="mt-32 xsmobile:mt-4 mobile:mt-8">
        <Heading><h1 className="text-2xl mb-8 xsmobile:mb-4 xsmobile:text-xl">Catalog your game Collection</h1></Heading>
        <Heading ><h2 className="text-xl mb-16 xsmobile:mb-8 ">Organize all your finished games into one master collection</h2></Heading>
        <Text><TextLink href="#">Sign Up</TextLink> or <TextLink href="#">Log in</TextLink> to start</Text>
      </div >
      <div className="mt-44 tablet:mt-16">
        <HomeImages />
      </div>
    </div>
  )
}