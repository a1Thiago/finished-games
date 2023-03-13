import Button from "@ui/Button"
import Input from "@ui/Input"
import Text from "@ui/Text"
import TextLink from "@ui/TextLink"
import Header from "@ui/Header"

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <Input label="username" type="text" placeholder="username" />
      <Input label="username" type="date" placeholder="username" />

      <Text>Test</Text>
      <TextLink href="#">Test</TextLink>
      <Header size="lg"><h1>gg</h1></Header>

      <Button label="test" type="primary" />
      <Button label="secondary" type="secondary" />
      <Button label="warn" type="warn" />
      <br />
      HOME
    </div>
  )
}