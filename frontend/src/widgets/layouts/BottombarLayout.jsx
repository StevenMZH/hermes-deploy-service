import { useState } from "react";

export function BottombarLayout({ elements, className = '' }) {
  const [open, setOpen] = useState(false);
  
  return (
  <>
    <div className={`bottombar ${className}`}>      
      {elements.map((element, index) => (
        <div key={index} className="bottombar-element short">
        <a href={element.url}>
            <img src={element.icon} alt={element.name} className="icon"/>
        </a>
    </div>
      ))}
      
    </div>  
  </>
  
  );
}

export default BottombarLayout;
