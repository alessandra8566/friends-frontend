import { apiGetProfileById } from "@/api/profile"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

const View = () => {
  const { id } = useParams()

  const { data: user } = useQuery({
    queryKey: ["profile", id],
    queryFn: () => apiGetProfileById(id ?? ""),
    select: (res) => res.data,
    enabled: !!id,
  })

  console.log(user)

  return (
    <div className="chart-wrapper mx-auto flex max-w-6xl flex-col flex-wrap items-start justify-center gap-6 p-6 sm:flex-row sm:p-8">
      <div className="grid w-full gap-6 sm:grid-cols-2 lg:max-w-[22rem] lg:grid-cols-1 xl:max-w-[25rem]">
        {/* <Card className="lg:max-w-md">
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="text-4xl tabular-nums">
              {user?.name}
            </CardTitle>
          </CardHeader>
        </Card> */}
      </div>
    </div>
  )
}

export default View
