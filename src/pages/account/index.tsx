import { apiGetProfilesDetails } from "@/api/profile"
import { Columns, DataTable, Setting } from "@/components/data-table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Image } from "@/utils/types"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Accounts = () => {
  const navigate = useNavigate()
  const [pageNum, setPageNum] = useState(1)

  const { data: users } = useQuery({
    queryKey: ["profile", "details"],
    queryFn: apiGetProfilesDetails,
    select: (res) => res.data,
    refetchOnWindowFocus: false,
  })

  const columns: Columns[] = [
    {
      field: "avatar",
      headerName: "",
      enableSorting: true,
      renderCell: (row) => {
        const avatar = row.images.filter((img: Image) => !!img.avatar)?.[0]
        return (
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatar?.url || ""} alt="avatar" />
            <AvatarFallback>{(row?.name ?? "").toUpperCase().substring(0, 2)}</AvatarFallback>
          </Avatar>
        )
      },
    },
    {
      field: "name",
      headerName: "暱稱",
      enableSorting: true,
    },
    {
      field: "role",
      headerName: "角色",
      enableSorting: true,
      renderCell: (row) => row.role === "admin" ? "管理員" : "一般會員",
    },
    {
      field: "email",
      headerName: "信箱",
      enableSorting: true,
    },
    {
      field: "operate",
      headerName: "操作",
      renderCell: (row) => {
        return (
          <div className="flex justify-center gap-2">
            <Button size="sm" onClick={() => navigate(`/profile/info/${row.id}`)}>
              編輯
            </Button>
          </div>
        )
      },
    },
  ]

  const setting: Setting = {
    rowKey: "id",
    showCheckBox: false,
    pageNum: pageNum,
    setPageNum: setPageNum,
  }

  return (
    <div className="">
      <p className="py-4 text-xl">會員管理</p>
      <DataTable className="" columns={columns} setting={setting} rows={users || []} />
    </div>
  )
}

export default Accounts
