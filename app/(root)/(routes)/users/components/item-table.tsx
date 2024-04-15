import React from 'react'

interface ItemTableProps {
    fullName: string;
    email: string;
    company: string;
}

const ItemTable = ({ fullName, email, company }: ItemTableProps) => {
    return (
        <tr className="border-b border-dashed last:border-b-0">
            <td className="p-3 pl-0">
                <div className="flex items-center">
                    <div className="relative inline-block shrink-0 rounded-2xl me-3">
                    </div>
                    <div className="flex flex-col justify-start">
                        <a href="javascript:void(0)" className="mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary"> {fullName} </a>
                    </div>
                </div>
            </td>
            <td className="p-3 pr-0 text-end">
                <span className="font-semibold text-light-inverse text-md/normal">{email}</span>
            </td>
            <td className="p-3 pr-0 text-end">
                <span className="text-center align-baseline inline-flex px-2 py-1 mr-auto items-center font-semibold text-base/none text-success bg-success-light rounded-lg">
                    {company}
                </span>
            </td>
        </tr>
    )
}

export default ItemTable