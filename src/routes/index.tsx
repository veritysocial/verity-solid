import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TextArea } from "@/components/ui/textarea";
import { TextFieldRoot } from "@/components/ui/textfield";

export default function Home() {
  return (
    <main class="pt-8">
<form >
        <Card class="border-primary mx-auto w-11/12 rounded-lg md:w-1/2">
          <CardHeader>
            <CardTitle>Create Post</CardTitle>
            <CardDescription>
              Posting from Verity <span class="font-bold text-[#315A99]">Solid</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
          <TextFieldRoot>
  <TextArea />
</TextFieldRoot>

          </CardContent>
          <CardFooter>
            <Button type="submit" class="cursor-pointer">
              Post!
            </Button>
          </CardFooter>
        </Card>
      </form>
    </main>
  )
}
