import { twMerge } from "tailwind-merge";
import { env } from "@/env.mjs";

export default async function FactionMeter({ className }: { className?: string }) {
  const res = await fetch(`${env.HOST}/api/dps/getTotalStaked`);
  const results = await (res.json() as Promise<{ totalDogFactionAmount: number, totalFrogFactionAmount: number }>)
  const { totalDogFactionAmount, totalFrogFactionAmount } = results

  const totalStaked = totalDogFactionAmount + totalFrogFactionAmount
  const dogFactionWidth = Math.round(totalDogFactionAmount / totalStaked * 100)
  const frogFactionWidth = Math.round(totalFrogFactionAmount / totalStaked * 100)

  return (
    <div className={twMerge('flex h-2 w-full', className)}>
      <div className={`h-full bg-green-400/90`} style={{ width: `${frogFactionWidth}%`}} />
      <div className={`h-full bg-orange-500/90`} style={{ width: `${dogFactionWidth}%`}} /> 
    </div>
  )
}
