import React, { Fragment } from "react"
import { ChevronLeft, ChevronRight, Dot } from "lucide-react"
import { cn } from "@/utils/shadcn"
interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  totalCount: number
  pageSize: number
  pageNum: number
  setPageNum: React.Dispatch<React.SetStateAction<number>>
}

const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  ({ className, totalCount, pageSize, pageNum, setPageNum, ...props }, ref) => {
    const visiblePage = 2
    const totalPage = Math.ceil(totalCount / pageSize) || 1
    const rangeArray = Array.from({ length: totalPage }, (_, index) => index + 1)
    const minVisibleNum = visiblePage + (pageNum <= visiblePage ? 1 : 0)
    const maxVisibleNum = totalPage - visiblePage - (totalPage - pageNum <= visiblePage ? 1 : 0)

    function isHiddenPage(x: number): boolean {
      return pageNum != x && x > minVisibleNum && x <= maxVisibleNum
    }

    function isShowEllipsis(x: number): boolean {
      if (totalPage <= visiblePage * 2 + 1) return false
      if (!isHiddenPage(x)) return false
      if (pageNum > minVisibleNum && pageNum <= maxVisibleNum) {
        return x === minVisibleNum + 1 || x === maxVisibleNum
      } else if (pageNum < minVisibleNum) {
        return x === minVisibleNum + 1
      } else {
        return x === maxVisibleNum
      }
    }

    return (
      <nav className={className} ref={ref} {...props}>
        <ul className="inline-flex items-center shadow-sm">
          <li
            onClick={() => setPageNum(Math.max(pageNum - 1, 1))}
            className="ml-0 cursor-pointer rounded-l-lg border border-gray-300 bg-white px-1 py-1 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <ChevronLeft size={20} />
          </li>
          {rangeArray.map((x) => (
            <Fragment key={x}>
              <li
                className={cn("border border-gray-300 bg-white px-3 py-1 leading-tight", {
                  hidden: !isShowEllipsis(x),
                })}
              >
                <Dot size={10} className="inline-block" />
                <Dot size={10} className="inline-block" />
                <Dot size={10} className="inline-block" />
              </li>
              <li
                onClick={() => setPageNum(x)}
                className={cn(
                  "cursor-pointer border border-gray-300 px-3 py-1 leading-tight",
                  pageNum === x
                    ? "bg-primary text-white"
                    : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700",
                  { hidden: isHiddenPage(x) }
                )}
              >
                {x}
              </li>
            </Fragment>
          ))}

          <li
            onClick={() => setPageNum(Math.min(pageNum + 1, totalPage))}
            className="cursor-pointer rounded-r-lg border border-gray-300 bg-white px-1 py-1 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <ChevronRight size={20}></ChevronRight>
          </li>
        </ul>
      </nav>
    )
  }
)
Pagination.displayName = "Pagination"

export { Pagination }
