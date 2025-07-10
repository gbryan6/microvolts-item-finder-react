/* eslint-disable @next/next/no-img-element */
'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import items from './items.json' assert { type: 'json' }
import icons from './icons.json' assert { type: 'json' }

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Search } from 'lucide-react'

import { useEffect, useMemo, useState } from 'react'
import { IItem, IIcon, IUniqueItems } from './types'
import { itemTypeMap, itemTypes } from './constants'
import useDebounce from '@/hooks/useDebounce'

export default function Home() {
  const [localItems] = useState<IItem[]>(items as unknown as IItem[])
  const [localIcons] = useState<IIcon[]>(icons as unknown as IIcon[])
  const [itemList, setItemList] = useState<IItem[]>([])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('0')

  const debouncedSearchTerm = useDebounce(searchTerm, 600)

  useEffect(() => {
    const uniqueItems: IUniqueItems = {}

    localItems.forEach((item) => {
      const key = item.ii_iconsmall

      if (!uniqueItems[key]) {
        const iconData = localIcons.find(
          (icon) => icon.ii_id === Number(item.ii_iconsmall)
        )

        if (!iconData) {
          return
        }

        uniqueItems[key] = {
          ...item,
          ii_id_list: [],
          imageUrl: `/icons/${iconData.ii_filename.replace('.dds', '.png')}`,
          imageStyle: {
            width: iconData.ii_width,
            height: iconData.ii_height,
            objectFit: 'none',
            objectPosition: `${-(
              Math.floor(iconData.ii_offset % 5) * iconData.ii_width
            )}px ${-(
              Math.floor(iconData.ii_offset / 5) * iconData.ii_height
            )}px`,
            clip: `rect(0px, ${iconData.ii_width}px, ${iconData.ii_height}px, 0px)`,
          },
        }
      }

      uniqueItems[key].ii_id_list.push(item.ii_id)
    })

    const processedItemList = Object.values(uniqueItems)
    setItemList(processedItemList)
  }, [localItems, localIcons])

  const filteredItems = useMemo(() => {
    return itemList.filter((item) => {
      const matchesType =
        selectedType === '0' || item.ii_type_inven === Number(selectedType)

      const search = debouncedSearchTerm.trim().toLowerCase()
      const isSearchLongEnough = search.length > 3
      const matchesSearch =
        search === '' ||
        (isSearchLongEnough &&
          (item.ii_name.toLowerCase().includes(search) ||
            item.ii_desc.toLowerCase().includes(search)))

      return matchesType && matchesSearch
    })
  }, [itemList, debouncedSearchTerm, selectedType])

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">
          Microvolts Item Finder React Version
        </h1>
        <p className="text-sm text-muted-foreground">
          0.1 React Version -{' '}
          <a
            href="https://github.com/gbryan6/microvolts-item-finder-react"
            className="text-blue-600 hover:underline"
          >
            Source
          </a>
        </p>

        <p className="text-sm text-muted-foreground">
          Original Version -{' '}
          <a
            href="https://www.microvolts.dev/"
            className="text-blue-600 hover:underline"
          >
            Preview
          </a>
          {' - '}
          <a
            href="https://github.com/microvolts/MicrovoltsItemFinder"
            className="text-blue-600 hover:underline"
          >
            Source
          </a>
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium whitespace-nowrap">
            Inventory Type:
          </span>
          <Select
            value={selectedType}
            defaultValue="0"
            onValueChange={setSelectedType}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {itemTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        Showing {filteredItems.length} item
        {filteredItems.length !== 1 ? 's' : ''}
      </div>

      <div className="space-y-4">
        {filteredItems.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No items found matching your criteria.
          </div>
        ) : (
          filteredItems.map((item, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="px-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <img
                      src={item.imageUrl}
                      alt={item.ii_name}
                      className="rounded-md border"
                      style={item.imageStyle}
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{item.ii_name}</h3>
                      <Badge className="text-xs">
                        {itemTypeMap[item.ii_type_inven]}
                      </Badge>
                    </div>

                    <p className="text-muted-foreground text-sm">
                      {item.ii_desc}
                    </p>

                    <div className="space-y-1 flex gap-2 items-start">
                      <p className="text-xs font-medium text-muted-foreground">
                        IDs:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {item.ii_id_list.map((id, index) => (
                          <Badge key={index} className="text-xs font-mono">
                            {id}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
