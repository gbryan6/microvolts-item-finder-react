import { CSSProperties } from 'react'

export interface IItem {
  ii_id: number
  ii_name: string
  ii_desc: string
  ii_iconsmall: string
  ii_type_inven: number
  ii_id_list: number[]
  imageUrl: string
  imageStyle: CSSProperties
}

export interface IIcon {
  ii_id: number
  ii_filename: string
  ii_width: number
  ii_height: number
  ii_offset: number
}

export type IUniqueItems = Record<string, IItem>
