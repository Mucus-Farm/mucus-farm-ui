// components
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import Clock from "@/components/Clock";
import CenterLogo from "@/components/CenterLogo";
import SocialLinks from "./SocialLinks";
import Back from "@/components/Back"
import { ConnectButton } from "@/components/ConnectButton"

// Icons
import Question from "@/images/icons/question"
import Paper from "@/images/icons/paper"

type IconHolderProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
}
const IconHolder = ({ children, href, onClick }: IconHolderProps) => (
  <Button className='px-6 border-2 border-white rounded-lg bg-mc-brown-300/90 hover:bg-mc-brown-300/80 active:bg-mc-brown-300' href={href} onClick={onClick} >
    {children}
  </Button>
)

export default function Header() {
  return (
    <header className='absolute top-0 inset-x-0 flex items-center px-3 xl:px-8 2xl:px-10 h-[125px]'>
      <Container className="flex-grow mx-0 max-w-none xl:max-w-none">
        <nav className='flex-grow relative z-50 flex justify-between items-center'>
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
            <SocialLinks />
            <ConnectButton className='px-6 border-2 border-mc-brown-300 rounded-lg bg-white/70 text-mc-brown-300' loadingClassName='bg-mc-brown-400' />
          </div> 
        </nav> 
      </Container> 
    </header>
  )
}

