import { apiGetProfileById } from "@/api/profile"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import EmptyImg from "@/assets/images/empty-image.jpg"
import { Heart, MessageCircleMore, Star } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useEffect, useState } from "react"
import { cn } from "@/utils/shadcn"

const View = () => {
  const { id } = useParams()
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [, setCount] = useState(0)

  const { data: user } = useQuery({
    queryKey: ["profile", id],
    queryFn: () => apiGetProfileById(id ?? ""),
    select: (res) => res.data,
    enabled: !!id,
  })

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div className="mx-auto flex w-full flex-col flex-wrap items-start justify-center gap-6 p-6 sm:flex-row sm:p-8">
      <div className="flex w-full gap-6 max-sm:flex-col">
        <Card className="max-w-xs p-4">
          <div className="relative">
            <Carousel opts={{ align: "start" }} setApi={setApi}>
              <CarouselContent>
                {user?.images.length ? (
                  user?.images.map((img, index) => (
                    <CarouselItem key={index}>
                      <img className="w-fill rounded-sm" src={img.url} />
                    </CarouselItem>
                  ))
                ) : (
                  <CarouselItem>
                    <img className="w-fill" src={EmptyImg} />
                  </CarouselItem>
                )}
              </CarouselContent>
            </Carousel>
            <div className="absolute bottom-2 flex w-full justify-center">
              <div className="flex w-4/5 gap-2">
                {user?.images.map((_, index) => (
                  <span
                    key={index}
                    className={cn("block h-1 w-full bg-slate-300 cursor-pointer", {
                      "bg-slate-600": index === current - 1,
                    })}
                    onClick={() => api?.scrollTo(index)}
                  />
                ))}
              </div>
            </div>
          </div>
          <CardHeader className="space-y-0 p-2">
            <CardTitle className="flex items-center justify-between text-xl tabular-nums">
              {user?.name}
              <div className="flex gap-4">
                <Star className="w-5 cursor-pointer text-yellow-500" fill="#eab308" />
                <Heart className="w-5 cursor-pointer text-red-500" fill="#ef4444" />
                <MessageCircleMore className="w-5 cursor-pointer" />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-0 px-2 py-0">
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <p className="text-sm text-muted-foreground">性別： 女</p>
              <p className="text-sm text-muted-foreground">地區： 台北市</p>
              <p className="text-sm text-muted-foreground">體重： 45KG</p>
              <p className="text-sm text-muted-foreground">星座： 雙子</p>
              <p className="text-sm text-muted-foreground">已驗證： 無</p>
            </div>
          </CardContent>
        </Card>
        <div className="flex w-full flex-grow flex-col gap-6">
          <div className="w-full">
            <p className="flex items-center gap-2 text-xl font-bold">
              <Star className="w-5 text-yellow-500" fill="#eab308" />
              自我介紹
            </p>
            <Separator className="my-2" />
            <div className="min-h-32 overflow-y-auto px-2 sm:min-h-48">
              <p>{user?.description}</p>
            </div>
          </div>
          <div className="w-full">
            <p className="flex items-center gap-2 text-xl font-bold">
              <Heart className="w-5 cursor-pointer text-red-500" fill="#ef4444" />
              我的菜
            </p>
            <Separator className="my-2" />
            <div className="min-h-32 overflow-y-auto px-2 sm:min-h-48">
              <p>{user?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default View
