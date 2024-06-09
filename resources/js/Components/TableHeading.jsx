import React from 'react'
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";


const TableHeading = ({ name, sort_field = null, sort_direction = null, sortChanged = () => { }, children }) => {
    return (
        <th onClick={(e) => sortChanged(name)}>
            <div className={`px-3 py-3 cursor-pointer flex items-center justify-between gap-1`}>
                <span>{children}</span>
                {name && <div>
                    <HiChevronUp className={`w-4 ${sort_field === name && sort_direction === 'asc' ? 'text-white' : ''}`} />
                    <HiChevronDown className={`w-4 ${sort_field === name && sort_direction === 'desc' ? 'text-white' : ''}`} />
                </div>}
            </div>
        </th >
    )
}

export default TableHeading