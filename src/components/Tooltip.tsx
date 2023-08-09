const directionMap = {
  'top': 'bottom-full',
  'bot': 'top-full',
  'left': 'right-full',
  'right': 'left-full',
}

export default function Tooltip({ tooltip, direction='top', children }: { tooltip: React.ReactNode; direction?: keyof typeof directionMap; children: React.ReactNode }) {
  return (
    <div className='group/tooltip relative'>
      <span 
        className={`pointer-events-none absolute whitespace-nowrap ${directionMap[direction]} left-1/2 -translate-x-1/2 opacity-0 transition group-hover/tooltip:opacity-100 z-10`}
      >
        {tooltip}
      </span>

      {children}
    </div>
  )
}
