import { createContext, useEffect, useState, useRef, useContext } from 'react';
import styled from 'styled-components';

const DropdownContext = createContext();

const Dropdown = ({children}) => {
  const [open, setOpen] = useState(false)

  const ref = useRef(null);

  useEffect(() =>{
    function handleClickOutside(event) {
      if (ref.current && !ref?.current?.contains(event.target)) {
        setOpen(false);
      }
    } 

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    
  }, [ref]);

  const sendValues = {open, setOpen};

  return (
    <DropdownContext.Provider value={sendValues}>
      <div ref={ref}>
        {children}
      </div>
    </DropdownContext.Provider>
  )
};

const Button = ({children}) => {
  const {setOpen} =  useContext(DropdownContext);

  const onClick = () => {
    setOpen(prev => !prev);
  }

  return (
    <div onClick={onClick}>
      {children}
    </div>
  )
};

const Group = ({children}) => {
  const {open} = useContext(DropdownContext);

  return open ? <div>{children}</div> : null
};

const DropdownObject = ({children}) => {
  const {setOpen} = useContext(DropdownContext);

  const onClick = () => {
      setOpen(false)
  }

  return <div onClick={onClick} className={'dropdown-object'}>{children}</div>
}

Dropdown.Button = Button;
Dropdown.Group = Group;
Dropdown.DropdownObject = DropdownObject;

export default Dropdown;