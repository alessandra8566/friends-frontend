export const commonUse = ["null", "notSet"] as const
export type CommonUse = (typeof commonUse)[number]

export const commonEnumTran: Record<CommonUse, string> = {
  null: "--請選擇--",
  notSet: "未設定",

}