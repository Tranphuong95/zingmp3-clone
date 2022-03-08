import './index.scss'
import React, { JSXElementConstructor } from 'react'

type ToolTipType = {
  children: JSX.Element,
  toolTipText: string
}
const ToolTip: React.FC<ToolTipType> = ({ children, toolTipText }) => {
  return (
    <div>
      <div className='tooltip'>{children}
        <span className='tooltip-text'>{toolTipText}</span>
      </div>
    </div>
  )
}
ToolTip.defaultProps = {
  toolTipText: ""
}
export default ToolTip