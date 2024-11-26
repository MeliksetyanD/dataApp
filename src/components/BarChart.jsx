import { useTheme } from '@mui/material'
import { ResponsiveBar } from '@nivo/bar'
import { useEffect, useState } from 'react'
import { tokens } from '../theme'

const BarChart = ({ isDashboard = false, country }) => {
	const theme = useTheme()
	const colors = tokens(theme.palette.mode)

	const [countryData, setCountryData] = useState(null)
	useEffect(() => {
		setCountryData([
			{
				country: 'BR',
				'Birth Rate': country['Birth Rate'],
			},
			{
				country: 'IM',
				'Infant mortality': country['Infant mortality'],
			},
			{
				country: 'FR',
				'Fertility Rate': country['Fertility Rate'],
			},
			{
				country: 'LE',
				'Life expectancy': country['Life expectancy'],
			},
		])
	}, [country])

	return (
		<ResponsiveBar
			data={countryData}
			theme={{
				// added
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
			}}
			keys={[
				'Birth Rate',
				'Infant mortality',
				'Fertility Rate',
				'Life expectancy',
			]}
			indexBy='country'
			margin={{ top: 50, right: 200, bottom: 50, left: 40 }}
			padding={0.3}
			valueScale={{ type: 'linear' }}
			indexScale={{ type: 'band', round: true }}
			colors={{ scheme: 'nivo' }}
			borderColor={{
				from: 'color',
				modifiers: [['darker', '1.6']],
			}}
			axisTop={null}
			axisRight={null}
			axisBottom={{
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legend: isDashboard ? undefined : 'country', // changed
				legendPosition: 'middle',
				legendOffset: 32,
			}}
			axisLeft={{
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legend: isDashboard ? undefined : 'food', // changed
				legendPosition: 'middle',
				legendOffset: -40,
			}}
			enableLabel={false}
			labelSkipWidth={12}
			labelSkipHeight={12}
			labelTextColor={{
				from: 'color',
				modifiers: [['darker', 1.6]],
			}}
			legends={[
				{
					dataFrom: 'keys',
					anchor: 'bottom-right',
					direction: 'column',
					justify: false,
					translateX: 120,
					translateY: 0,
					itemsSpacing: 2,
					itemWidth: 100,
					itemHeight: 20,
					itemDirection: 'left-to-right',
					itemOpacity: 0.85,
					symbolSize: 20,
					effects: [
						{
							on: 'hover',
							style: {
								itemOpacity: 1,
							},
						},
					],
				},
			]}
			role='application'
			barAriaLabel={function (e) {
				return e.id + ': ' + e.formattedValue + ' in country: ' + e.indexValue
			}}
		/>
	)
}

export default BarChart
