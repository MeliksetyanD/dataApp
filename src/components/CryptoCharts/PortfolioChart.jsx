import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const PortfolioChart = ({ data, assets = [] }) => {
	const dataset = {
		labels: assets.map(c => c.name),
		datasets: [
			{
				label: '$',
				data: assets.map(c => c.totalAmount),
				backgroundColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
				],
			},
		],
	}
	return (
		<div
			style={{
				display: 'flex',
				marginBottom: '1rem',
				justifyContent: 'center',
				height: '400px',
			}}
		>
			<Pie type='pie' data={dataset} />
		</div>
	)
}

export default PortfolioChart
