import { useTheme } from '@mui/material'
import { ResponsiveLine } from '@nivo/line'
import { useEffect, useState } from 'react'
import { clacOriginalNum } from '../scenes/utils/clacOriginalNum'
import { tokens } from '../theme'

const LineChart = ({
	isCustomLineColors = false,
	isDashboard = false,
	country,
}) => {
	const theme = useTheme()
	const colors = tokens(theme.palette.mode)
	const [countryCPI, setCountryCPI] = useState(null)

	useEffect(() => {
		setCountryCPI([
			{
				id: country['Country'],
				color: tokens('dark').greenAccent[500],
				data: [
					{
						x: '2022',

						y: clacOriginalNum(country['CPI'], country['CPI Change (%)']),
					},
					{
						x: '2023',
						y: country['CPI'],
					},
				],
			},
		])
	}, [country])
	return (
		<ResponsiveLine
			data={countryCPI}
			theme={{
				axis: {
					domain: {
						line: {
							stroke: colors.grey[100],
						},
					},
					legend: {
						text: {
							fill: colors.grey[100],
						},
					},
					ticks: {
						line: {
							stroke: colors.grey[100],
							strokeWidth: 1,
						},
						text: {
							fill: colors.grey[100],
						},
					},
				},
				legends: {
					text: {
						fill: colors.grey[100],
					},
				},
				tooltip: {
					container: {
						color: colors.primary[500],
					},
				},
			}}
			colors={isDashboard ? { datum: 'color' } : { scheme: 'nivo' }} // added
			margin={{ top: 45, right: 100, bottom: 20, left: 120 }}
			xScale={{ type: 'point' }}
			yScale={{
				type: 'linear',
				min: 'auto',
				max: 'auto',
				stacked: true,
				reverse: false,
			}}
			yFormat=' >-.2f'
			curve='catmullRom'
			axisTop={null}
			axisRight={null}
			axisBottom={{
				orient: 'bottom',
				tickSize: 0,
				tickPadding: 8,
				tickRotation: 0,
				legend: isDashboard ? undefined : 'transportation', // added
				legendOffset: 36,
				legendPosition: 'middle',
			}}
			axisLeft={{
				orient: 'left',
				tickValues: 5, // added
				tickSize: 3,
				tickPadding: 4,
				tickRotation: 0,
				legend: isDashboard ? undefined : 'count', // added
				legendOffset: -40,
				legendPosition: 'middle',
			}}
			enableGridX={false}
			enableGridY={false}
			pointSize={8}
			pointColor={{ theme: 'background' }}
			pointBorderWidth={2}
			pointBorderColor={{ from: 'serieColor' }}
			pointLabelYOffset={-12}
			useMesh={true}
		/>
	)
}

export default LineChart
