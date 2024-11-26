import { Layout, Typography } from 'antd'
import AssetsTable from '../CryptoCharts/AssetsTable'
import PortfolioChart from '../CryptoCharts/PortfolioChart'

const contentStyle = {
	textAlign: 'center',
	minHeight: 'calc(100vh - 60px)',
	color: '#fff',
	backgroundColor: '#001529',
	padding: '1rem',
}

export default function AppContent({ data, assets }) {
	const cryptoPriceMap = data.reduce((acc, c) => {
		acc[c.id] = c.price
		return acc
	}, {})

	return (
		<Layout.Content style={contentStyle}>
			<Typography.Title level={3} style={{ color: 'white', textAlign: 'left' }}>
				Portfolio :{' '}
				{assets &&
					assets
						.map(asset => asset.amount * cryptoPriceMap[asset.id])
						.reduce((acc, v) => (acc += v), 0)
						.toFixed(2)}
				$
			</Typography.Title>
			<PortfolioChart data={data} assets={assets} />
			<AssetsTable data={data} assets={assets} />
		</Layout.Content>
	)
}
