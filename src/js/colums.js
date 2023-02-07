
// {
//   title,
//   align,
//   colSpan,
//   customCell,
//   customFilterDropdown,
//   customHeaderCell,
//   customRender,
//   dataIndex,
//   defaultFilteredValue,
//   defaultSortOrder,
//   ellipsis,
//   filterDropdown,
//   filterDropdownVisible,
//   filtered,
//   filteredValue,
//   filterIcon,
//   filterMode,
//   filterMultiple,
//   filters,
//   filterSearch,
//   fixed,
//   key,
//   maxWidth,
//   minWidth,
//   resizable,
//   responsive,
//   sortDirections,
//   sorter,
//   sortOrder,
//   width,
//   onFilter,
//   onFilterDropdownVisibleChange,
// }

// dataIndex: 'name',
// sorter: true,
const titles = [
  ["設備名稱", "name"],
  ["分類", "category"],
  ["財產編號", "id"],
  ["購買日期", "date"],
  ["發票", "receipt"],
  ["購入金額", "price"],
  ["殘值", "salvage"],
  ["型號", "type"],
  ["規格", "format"],
  ["部門", "department"],
  ["地點", "location"],
  ["負責人", "person"],
  ["狀態", "state"],
  ["相片", "photo"],
  ["操作", "operation"],
]

const sorters = {
  category: {
    compare: (a,b) => {
      const label = ['pc', 'eq', 'of']
      return label.findIndex((t)=>t===a.category) - label.findIndex((t)=>t===b.category)
    },
    multiple: 2
  },
  name: {
    compare: (a,b) => a.name.length - b.name.length,
    multiple: 1
  },
  id: {
    compare: (a,b) => a.id - b.id,
    multiple: 1
  },
  price: {
    compare: (a,b) => a.price - b.price,
    multiple: 1
  },
  salvage: {
    compare: (a,b) => a.salvage - b.salvage,
    multiple: 1
  },
}

const widths = {
  name: 200
}

const filters = {
// TODO value key 統整
  category:[{
    text: '電腦',
    value: 'pc'
  },{
    text: '設備',
    value: 'eq'
  },{
    text: '辦公',
    value: 'of'
  }],

  state: [{
    text: '使用中',
    value: 'inuse',
  }, {
    text: '報廢',
    value: 'scrap',
  },{
    text: '維修',
    value: 'maintenance',
  }]
}
const onFilter = {
  category: (current, row)=>(row.category === current),
  state: (current, row)=>(row.state === current),
}

export default titles.map(([title, key])=>({
  title,
  dataIndex: key,
  sorter: sorters[key] || false,
  width: widths[key] || undefined,
  filters: filters[key] || undefined,
  onFilter: onFilter[key] || undefined
}))