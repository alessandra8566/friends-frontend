import { apiGetProfileAvatars } from "@/api/profile"
import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
  const navigate = useNavigate()

  const { data: users } = useQuery({
    queryKey: ["profile", "avatars"],
    queryFn: apiGetProfileAvatars,
    select: (res) => res.data.filter((user) => user.images.some(img => img.avatar)),
  })

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5 max-w-5xl">
        <p className="py-4 text-xl col-span-full">推薦會員</p>
        {users?.map((user) => (
          <div className="relative" key={user.id}>
            <img
              src={user.images[0].url}
              alt="emptyImg"
              className="max-w-52 w-full cursor-pointer rounded-lg"
              onClick={() => navigate(`/view/${user.id}`)}
            />
            <p className="absolute bottom-2 right-2 font-bold text-white">{user.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
