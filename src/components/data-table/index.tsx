import NoData from "@/assets/images/no-data.png"
import { cn } from "@/utils/shadcn"
import { cva } from "class-variance-authority"
import { Loader2, MinusSquare, MoveDown, MoveUp, PlusSquare } from "lucide-react"
import React, { Fragment, ReactNode, useMemo, useState } from "react"
import { FieldValues } from "react-hook-form"
import { Pagination } from "../pagination"
import { Checkbox } from "../ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

type HeaderAlignValue = "center" | "right" | "left"
type SortTypeValue = "asc" | "desc"

const cellVariants = cva("", {
  variants: {
    headerAlign: {
      right: ["text-right"],
      center: ["text-center"],
      left: ["text-left"],
    },
  },
  defaultVariants: {
    headerAlign: "center",
  },
})
export interface Columns {
  field: string
  headerName: string
  headerAlign?: HeaderAlignValue
  renderCell?: (row: FieldValues) => ReactNode
  enableTitle?: boolean
  enableSorting?: boolean
}

export interface Setting {
  rowKey: string
  showCheckBox: boolean
  totalCount?: number
  selectedRows?: string[]
  pageSize?: number
  onRowDoubleClick?: (row: FieldValues) => void
  checkBoxClick?: (checkValue: string[], row: FieldValues) => void
  pageNum: number
  setPageNum: React.Dispatch<React.SetStateAction<number>>
  isExpand?: boolean
  expendToggleCallback?: (row: FieldValues) => void
  renderExpandCell?: (id: string, row?: FieldValues) => ReactNode
  isApiList?: boolean
}

interface DataTableProps extends React.HTMLAttributes<HTMLDivElement> {
  columns: Columns[]
  rows: FieldValues[]
  setting: Setting
  isLoading?: boolean
  isError?: boolean
  errorMessage?: string
}

const DataTable = React.forwardRef<HTMLDivElement, DataTableProps>(
  ({ className, columns, rows, setting, isError, errorMessage, isLoading = false, ...props }, ref) => {
    const [innerCheckboxValue, setInnerCheckboxValue] = useState<string[]>([])
    const [expandValue, setExpandValue] = useState<string[]>([])
    const [sortColumn, setSortColumn] = useState<string>("")
    const [sortType, setSortType] = useState<SortTypeValue>("asc")

    const checkboxValue = setting.selectedRows ?? innerCheckboxValue

    const {
      pageSize = 10,
      pageNum = 1,
      totalCount,
      setPageNum,
      isExpand,
      expendToggleCallback,
      showCheckBox,
      renderExpandCell,
      rowKey,
      isApiList,
    } = setting

    const currentData = useMemo(() => {
      if (totalCount) return [...rows]
      let sortedSlice = [...rows].sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return sortType === "desc" ? 1 : -1
        if (a[sortColumn] > b[sortColumn]) return sortType === "desc" ? -1 : 1
        return 0
      })
      if (!isApiList) sortedSlice = sortedSlice.slice((pageNum - 1) * pageSize, pageNum * pageSize)
      return sortedSlice
    }, [totalCount, rows, isApiList, pageNum, pageSize, sortColumn, sortType])
    const checkboxOnClick = (item: FieldValues) => {
      const value = item[rowKey]
      let newCheckboxValue: string[] = []
      const hasValue = checkboxValue.includes(item[rowKey])
      if (!hasValue) {
        newCheckboxValue = [...checkboxValue, value]
      } else {
        newCheckboxValue = checkboxValue.filter((x) => x !== value)
      }
      setInnerCheckboxValue(newCheckboxValue)
      if (setting?.checkBoxClick) setting?.checkBoxClick(newCheckboxValue, item)
    }

    function onDoubleClick(item: FieldValues) {
      if (setting?.onRowDoubleClick) setting?.onRowDoubleClick(item)
    }

    const onClickSort = (col: Columns) => {
      if (!col.enableSorting) return
      setSortType(sortColumn === col.field && sortType === "asc" ? "desc" : "asc")
      setSortColumn(col.field)
    }

    const toggleExpand = (id: string, row: FieldValues, toggleCallback?: (value: FieldValues) => void) => {
      let newExpandValue: string[] = []

      if (expandValue.includes(id)) {
        newExpandValue = expandValue.filter((x) => x !== id)
      } else {
        newExpandValue = [...expandValue, id]
      }
      setExpandValue(newExpandValue)
      toggleCallback?.(row)
    }

    const colSpan = useMemo(() => {
      let columnCount = columns.length
      if (showCheckBox) {
        columnCount++
      }
      if (isExpand) {
        columnCount++
      }
      return columnCount
    }, [columns, showCheckBox, isExpand])

    return (
      <div ref={ref} className={className}>
        <Table className="border" {...props}>
          <TableHeader>
            <TableRow className="bg-th-bg bg-bottom">
              {showCheckBox && <TableHead className="w-10"></TableHead>}
              {isExpand && <TableHead className="w-10"></TableHead>}
              {columns.map((x) => (
                <TableHead
                  key={x.field}
                  onClick={() => onClickSort(x)}
                  className={cn("bg-bottom bg-no-repeat", cellVariants({ headerAlign: x.headerAlign }))}
                >
                  <span className="relative bottom-1">{x.headerName}</span>
                  {sortColumn === x.field && (
                    <div className="inline-block">
                      {sortType === "asc" ? <MoveUp size={15} /> : <MoveDown size={15} />}
                    </div>
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          {!isLoading && (
            <TableBody>
              {currentData.map((item) => (
                <Fragment key={item[rowKey] + "fragment"}>
                  <TableRow key={item[rowKey]} className="group border bg-white shadow-sm hover:bg-slate-100">
                    {showCheckBox && (
                      <TableCell className="w-10 items-center">
                        <Checkbox
                          className={`${checkboxValue.includes(item[rowKey]) ? "visible" : "invisible"}
                  group-hover:visible
                  `}
                          defaultChecked={checkboxValue.includes(item[rowKey])}
                          onCheckedChange={() => checkboxOnClick(item)}
                        ></Checkbox>
                      </TableCell>
                    )}
                    {isExpand && (
                      <TableCell
                        className="w-10 items-center"
                        onClick={() => toggleExpand(item[rowKey], item, expendToggleCallback)}
                      >
                        {expandValue.includes(item[rowKey]) ? <MinusSquare></MinusSquare> : <PlusSquare></PlusSquare>}
                      </TableCell>
                    )}
                    {columns.map((x) => (
                      <TableCell
                        key={x.field}
                        title={x.enableTitle && (x?.renderCell ? x?.renderCell(item) : item[x.field])}
                        onDoubleClick={() => onDoubleClick(item)}
                        className={cn(
                          "max-w-md overflow-hidden text-ellipsis whitespace-nowrap",
                          cellVariants({ headerAlign: x.headerAlign })
                        )}
                      >
                        {x?.renderCell ? x?.renderCell(item) : item[x.field]}
                      </TableCell>
                    ))}
                  </TableRow>
                  {expandValue.includes(item[rowKey]) && (
                    <TableRow className="bg-white">
                      <TableCell className="p-0" colSpan={colSpan}>
                        {renderExpandCell?.(item[rowKey], item)}
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              ))}
            </TableBody>
          )}
        </Table>
        {isLoading && <Loader2 className="m-auto h-6 w-6 animate-spin text-primary" />}
        {!isLoading && currentData.length === 0 && <img src={NoData} alt="no data" className="m-auto h-60" />}
        {isError && <p className="mt-2 w-full text-center text-red-500">{isError && errorMessage}</p>}
        <Pagination
          className="float-right pt-3"
          totalCount={totalCount ?? rows.length}
          pageSize={pageSize}
          pageNum={pageNum}
          setPageNum={setPageNum}
        ></Pagination>
      </div>
    )
  }
)
DataTable.displayName = "DataTable"

export { DataTable }
