import { getProjectsMenuProps } from '@/components/common/ProjectsSubMenu/ProjectsSubMenu'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const locale = url.searchParams.get('locale') || 'en'
  const data = await getProjectsMenuProps(locale)
  return Response.json(data)
}
