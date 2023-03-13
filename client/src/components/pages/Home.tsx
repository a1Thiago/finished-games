import Button from "@ui/Button/Button"
import Input from "@ui/InputLabel/InputLabel"
import Text from "@ui/Text/Text"
import TextLink from "@ui/TextLink/TextLink"
import Heading from "@ui/Heading/Heading"

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <Input label="username" type="text" placeholder="username" />
      <Input label="username" type="date" placeholder="username" />

      <Text>Test</Text>
      <TextLink href="#">Test</TextLink>
      <Heading size="lg"><h1>gg</h1></Heading>

      {/* <Button label="test" type="primary" />
      <Button label="secondary" type="secondary" />
      <Button label="warn" type="warn" /> */}
      <br />
      HOME
    </div>
  )
}