import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	useTheme,
} from '@mui/material'
import React, { useState } from 'react'
import { tokens } from '../theme'

const HomePage = ({ handelUploadData }) => {
	const theme = useTheme()
	const colors = tokens(theme.palette.mode)

	const [dataName, setDataName] = useState('')
	const handleDataChange = event => {
		setDataName(event.target.value)
	}

	return (
		<div
			style={{
				width: '100%',
				height: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundImage: 'url("/bg.jpg")',
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
				backgroundPosition: 'center center',
			}}
		>
			<FormControl
				style={{
					width: '200px',
					margin: '20px',
				}}
			>
				<InputLabel id='demo-simple-select-label'>Data</InputLabel>
				<Select
					style={{
						color: colors.primary[100],
						backgroundColor: colors.primary[500],

						fontSize: '18px',
						border: colors.primary[900],
						margin: '10px 0',
					}}
					labelId='demo-simple-select-label'
					id='demo-simple-select'
					label='Data'
					value={dataName}
					onChange={handleDataChange}
				>
					<MenuItem value={'countries'}>Global Country Information</MenuItem>
					<MenuItem value={'cryptocurrency'}>
						Cryptocurrency Information
					</MenuItem>
				</Select>
				<Button
					style={{
						color: colors.primary[100],
						backgroundColor: colors.primary[500],

						fontSize: '18px',
						border: colors.primary[900],
						margin: '10px 0',
					}}
					onClick={() => handelUploadData(dataName)}
				>
					UPLOAD
				</Button>
			</FormControl>
		</div>
	)
}

export default HomePage
