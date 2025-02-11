'use client'

import Link from 'next/link'
type TSubroute = {
  id: number
  title: string
}
export const HeaderSubmenu = ({ subroutes }: { subroutes?: TSubroute[] }) => {
  if (!Array.isArray(subroutes)) {
    return []
  }

  return (
    <ul className="projects_submenu" id="projects_submenu">
      {subroutes.map((item) => (
        <li key={item.id}>
          <Link href={`/projects/${item.id}`}>{item.title}</Link>
        </li>
      ))}
    </ul>
  )
}
