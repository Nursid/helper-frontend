import React, { useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'

const DropdownBtn = ({ buttonTitle, isMenu, activeTab, setActiveTab, options }) => {
    const [open, setOpen] = useState(false)
    const toggle = () => setOpen(!open)
    const navigate = useNavigate()
    return (
        <>
            {
                isMenu ?
                    <Dropdown isOpen={open} toggle={toggle}>
                        < DropdownToggle className={`Dash_dropDownBtn py-3 ${options.includes(activeTab) === true ? "Dash_dropDownBtn_Active" : ""}`} >
                            {buttonTitle} < FiChevronDown style={{ transition: "all 0.2s ease-in-out", transform: `rotate(${open ? "0deg" : "180deg"})` }
                            } />
                        </DropdownToggle >
                        {console.log(activeTab)}
                        <DropdownMenu className='Dash_dropdown_Menu' >
                            {options.map((item, index) => (
                                <DropdownItem className='Dash_dropdown_item' onClick={() => { setActiveTab(item); navigate(`/${buttonTitle.split(" ").join("").toLowerCase()}/${item.split(" ").join("-").toLowerCase()}`) }}>{item}</DropdownItem>
                            ))}
                            {/* <DropdownItem>Option 2</DropdownItem>
                            <DropdownItem>Option 3</DropdownItem> */}
                        </DropdownMenu>
                    </Dropdown >
                    : <Button onClick={() => { setActiveTab(buttonTitle); buttonTitle === "Dashboard" ? navigate('/admin') : navigate(`${buttonTitle.split(" ").join("-").toLowerCase()}`) }} className={`Dash_dropDownBtn py-3 ${activeTab === buttonTitle ? "Dash_dropDownBtn_Active" : ""}`} > {buttonTitle}</Button>}
        </>
    )
}

export default DropdownBtn