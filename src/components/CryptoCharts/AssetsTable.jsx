import { Table } from 'antd'
import React from 'react'
const columns = [
	{
		title: 'Name',
		dataIndex: 'name',
		showSorterTooltip: {
			target: 'full-header',
		},
		sorter: (a, b) => a.name.length - b.name.length,
		sortDirections: ['descend'],
	},
	{
		title: 'Price, $',
		dataIndex: 'price',
		defaultSortOrder: 'descend',
		sorter: (a, b) => a.price - b.price,
	},
	{
		title: 'Amount',
		dataIndex: 'amount',
		defaultSortOrder: 'descend',
		sorter: (a, b) => a.amount - b.amount,
	},
]

const AssetsTable = ({ data, assets = [] }) => {
	const dataset = assets.map(a => ({
		key: a.id + Math.random() * 10,
		name: a.name,
		price: a.price,
		amount: a.amount,
	}))
	return (
		<Table
			pagination={null}
			columns={columns}
			dataSource={dataset}
			showSorterTooltip={{
				target: 'sorter-icon',
			}}
		/>
	)
}

export default AssetsTable
