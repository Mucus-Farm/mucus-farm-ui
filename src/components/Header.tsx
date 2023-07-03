// components
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import Clock from "@/components/Clock";
import CenterLogo from "@/components/CenterLogo";
import Back from "@/components/Back"

// Icons
import Question from "@/images/icons/question"
import Paper from "@/images/icons/paper"
import Twitter from "@/images/icons/twitter"
import Discord from "@/images/icons/discord"

type IconHolderProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
}
const IconHolder = ({ children, href, onClick }: IconHolderProps) => (
  <Button className='px-6 border-2 border-white rounded-lg bg-mc-brown' href={href} onClick={onClick} >
    {children}
  </Button>
)

export default function Header() {
  return (
    <header>
      <Container>
        <nav className='relative z-50 flex justify-between items-center'>
          <div className='flex gap-x-4'>
            <Back />
            <IconHolder href='/about' >
              <Question className='h-6 w-6 fill-white' />
            </IconHolder>
            <IconHolder href='/whitepaper'>
              <Paper className='h-6 w-6 fill-white' />
            </IconHolder>
            <Clock />
          </div>

          <CenterLogo />

          <div className='flex gap-x-4'>
            <IconHolder onClick={() => window.open('https://twitter.com/mucushq', '_blank')} >
              <Twitter className='h-6 w-6 fill-white' />
            </IconHolder>
            <IconHolder onClick={() => window.open('https://discord.gg/xHctHNgf', '_blank')} >
              <Discord className='h-6 w-6 fill-white' />
            </IconHolder>
          </div>
        </nav> 
      </Container> 
    </header>
  )
}

