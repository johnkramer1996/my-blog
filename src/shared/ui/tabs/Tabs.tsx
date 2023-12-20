import { ReactNode, useState } from 'react'
import { Button } from 'shared/ui'

type PropsTabs = {
  tabs: string[]
  children: ((setActiveTab: React.Dispatch<React.SetStateAction<number>>) => ReactNode)[]
  activeTab?: number
}
export const Tabs = (props: PropsTabs) => {
  const [activeTab, setActiveTab] = useState(props.activeTab ?? 0)

  return (
    <>
      <div className='tabs'>
        <div className='tabs--buttons'>
          {props.tabs.map((el, i) => {
            return (
              <Button key={i} onClick={() => setActiveTab(i)} withoutColor={!(activeTab === i)}>
                {el}
              </Button>
            )
          })}
        </div>
        {props.children[activeTab](setActiveTab)}
      </div>
    </>
  )
}
