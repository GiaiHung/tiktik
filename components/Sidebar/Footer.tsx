import React from 'react'

import { footerList1, footerList2, footerList3 } from '../../utils/constants'

function Footer() {
  const FooterLink = ({ items }: { items: string[] }) => (
    <div className="flex flex-wrap gap-3 cursor-pointer">
      {items.map((item) => (
        <p
          className="text-gray-500 font-semibold text-md hover:text-gray-700 hover:underline"
          key={item}
        >
          {item}
        </p>
      ))}
    </div>
  )
  return (
    <div className="hidden m-4 lg:block">
      <FooterLink items={footerList1} />
      <FooterLink items={footerList2} />
      <FooterLink items={footerList3} />
    </div>
  )
}

export default Footer
