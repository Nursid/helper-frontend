import React, { Fragment } from 'react'
import { FaMonero, FaMoneyCheck } from 'react-icons/fa';
import { useState } from 'react';

const StackBox = ({ title, amount, rupee, className, style, handleFilterChange,selectedFilterData, hidden}) => {

    const [selectedFilter, setSelectedFilter] = useState(selectedFilterData);

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedFilter(value);
        handleFilterChange(value);
    };

    return (
        <Fragment>
            <div className={`StackAnalyticsBox d-flex align-items-center justify-content-center border rounded-3 p-3 ${className}`} style={{ ...style}}>
                {/* <div className='d-flex flex-column align-items-start jusity-content-center gap-3'>
                    <FaMonero size={25} />
                   
                </div> */}
                <h5 className='mr-2'>{title}</h5>
                <div className={`AmountSection d-flex flex-column align-items-end justify-content-center gap-3 `}>
                    <select className={`StackSelectBox bg-transparent cursor-p ${hidden}`}
                    onChange={handleChange} defaultValue={selectedFilter}
                    >
                        <option value="1">Today</option>
                        <option value="3">This Month</option>
                        <option value="6">Last 6 Month</option>
                        <option value="">Total</option>
                    </select>
                    {/* <h6>{rupee === true ? "₹" : ""}  { (!amount) ? '0' : amount }</h6> */}
                    <h6>₹ {amount}</h6>
                </div>
            </div>
        </Fragment>
    )
}

export default StackBox