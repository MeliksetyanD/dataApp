import {
	Abc,
	Agriculture,
	Language,
	LocationCity,
	Money,
	Nature,
} from '@mui/icons-material'
import {
	Box,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Typography,
	useTheme,
} from '@mui/material'
import React, { useState } from 'react'
import Flag from 'react-flagkit'
import { tokens } from '../theme'
import BarChart from './BarChart'
import LineChart from './LineChart'
import MyMapComponent from './Map'
import StatBox from './StatBox'

const GlobalCountryInfo = ({ data }) => {
	const [countryName, setCountryName] = useState(data[0].Country)
	const [country, setCountry] = useState(data[0])
	const theme = useTheme()
	const colors = tokens(theme.palette.mode)
	const handleChange = event => {
		setCountryName(event.target.value)
	}
	console.log(countryName)
	console.log(country)
	return (
		<>
			<Box
				style={{
					width: '100%',
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<FormControl style={{ width: '120px' }}>
					<InputLabel id='demo-simple-select-label'>Countries</InputLabel>
					<Select
						labelId='demo-simple-select-label'
						id='demo-simple-select'
						value={countryName}
						label='country'
						onChange={handleChange}
					>
						{data &&
							data.map(element => (
								<MenuItem
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between',
									}}
									key={element.Country}
									value={element.Country}
									onClick={() => setCountry(element)}
								>
									{element.Country}
								</MenuItem>
							))}
					</Select>
				</FormControl>
			</Box>
			<Box m='20px'>
				<Box
					display='grid'
					gridTemplateColumns='repeat(12, 1fr)'
					gridAutoRows='140px'
					gap='20px'
				>
					{/* ROW 1 */}
					<Box
						gridColumn='span 3'
						backgroundColor={colors.primary[400]}
						display='flex'
						justifyContent='space-around'
						alignItems='center'
						padding={2}
					>
						<Typography variant='h3' component='h3'>
							{country?.Country}
						</Typography>
						<Flag country={country?.Abbreviation} size={60} />
					</Box>
					<Box
						gridColumn='span 3'
						backgroundColor={colors.primary[400]}
						display='flex'
						alignItems='center'
						justifyContent='center'
					>
						<Typography variant='h5' component='h3'>
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<Abc
									sx={{
										color: colors.greenAccent[600],
										fontSize: '26px',
										margin: '2px 10px',
									}}
									colorInterpolationFilters=''
								/>
								Abbreviation: {country?.Abbreviation}
							</div>
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<LocationCity
									sx={{
										color: colors.greenAccent[600],
										fontSize: '26px',
										margin: '2px 10px',
									}}
									colorInterpolationFilters=''
								/>
								Capital/Major City : {country?.['Capital/Major City']}
							</div>
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<Money
									sx={{
										color: colors.greenAccent[600],
										fontSize: '26px',
										margin: '2px 10px',
									}}
									colorInterpolationFilters=''
								/>
								Currency Code : {country?.['Currency-Code']}
							</div>
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<Language
									sx={{
										color: colors.greenAccent[600],
										fontSize: '26px',
										margin: '2px 10px',
									}}
									colorInterpolationFilters=''
								/>
								Official Language : {country?.['Official language']}
							</div>
						</Typography>
					</Box>

					<Box
						gridColumn='span 3'
						backgroundColor={colors.primary[400]}
						display='flex'
						alignItems='center'
						justifyContent='center'
					>
						<StatBox
							title={'Agricultural Land( %)'}
							progress={(
								country?.['Agricultural Land( %)'].replace(/%/g, '') / 100
							).toFixed(2)}
							increase={country?.['Agricultural Land( %)']}
							icon={
								<Agriculture
									sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
									colorInterpolationFilters=''
								/>
							}
						/>
					</Box>

					<Box
						gridColumn='span 3'
						backgroundColor={colors.primary[400]}
						display='flex'
						alignItems='center'
						justifyContent='center'
					>
						<StatBox
							title={'Forested Area (%)'}
							progress={(
								country?.['Forested Area (%)'].replace(/%/g, '') / 100
							).toFixed(2)}
							increase={country?.['Forested Area (%)']}
							icon={
								<Nature
									sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
								/>
							}
						/>
					</Box>
					<Box
						gridColumn='span 4'
						gridRow='span 2'
						backgroundColor={colors.primary[400]}
					>
						<Typography
							variant='h5'
							fontWeight='600'
							sx={{ padding: '30px 30px 0 30px' }}
						>
							Key Demographic Indicators
						</Typography>
						<Box height='250px' mt='-20px'>
							<BarChart country={country} isDashboard={true} />
						</Box>
					</Box>
					{/* ROW 2 */}
					<Box
						gridColumn='span 8'
						gridRow='span 2'
						backgroundColor={colors.primary[400]}
					>
						<Box
							mt='25px'
							p='0 30px'
							display='flex '
							justifyContent='space-between'
							alignItems='center'
						>
							<Box>
								<Typography
									variant='h5'
									fontWeight='600'
									color={colors.grey[100]}
								>
									Percentage change in the Consumer Price Index compared to the
									previous year.
								</Typography>
							</Box>
						</Box>
						<Box height='250px' m='-20px 0 0 0'>
							<LineChart country={country} isDashboard={true} />{' '}
						</Box>
					</Box>
				</Box>
				<MyMapComponent
					lat={country?.Latitude}
					lng={country?.Longitude}
					zoom={4}
				/>
				)
			</Box>
		</>
	)
}

export default GlobalCountryInfo
