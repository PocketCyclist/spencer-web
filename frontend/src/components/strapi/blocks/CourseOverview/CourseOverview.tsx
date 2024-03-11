import { TStrapiCourseSection, TStrapiStat } from '@/data/strapi/types/course'

export const CourseOverview = ({
  title,
  stats,
  sections,
}: {
  title: string
  stats: TStrapiStat[]
  sections: TStrapiCourseSection[]
}) => {
  return (
    <section>
      <div className="border-b border-gray-300 flex flex-col items-center">
        <ul className="grid grid-cols-2 lg:flex lg:flex-row justify-between w-full py-12 gap-4 md:gap-12 px-18 max-w-[1728px]">
          {stats.map((stat) => (
            <li key={stat.id} className="">
              <span className="text-[24px] leading-[30px] sm:text-[36px] sm:leading-[45px]">
                {stat.value}
              </span>
              <br />
              <span className="text-[18px] leading-[24px] sm:text-[20px] sm:leading-[28px]">
                {stat.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
