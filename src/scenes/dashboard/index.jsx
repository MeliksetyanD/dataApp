import { Box, Button, useTheme } from '@mui/material'
import { useState } from 'react'
import CryptoInfo from '../../components/CryptoInfo'
import GlobalCountryInfo from '../../components/GlobalCountryInfo'
import HomePage from '../../components/HomePage'
import Topbar from '../../scenes/global/Topbar'
import { tokens } from '../../theme'

const Dashboard = () => {
	const theme = useTheme()
	const colors = tokens(theme.palette.mode)
	const [isSidebar] = useState(true)

	const [data, setData] = useState()
	const [uploadDataName, setUploadDataName] = useState()

	const getData = async dataName => {
		await fetch(`http://localhost:8000/${dataName}`)
			.then(res => {
				if (!res.ok) {
					throw Error('Error fetching users data')
				}
				return res.json()
			})
			.then(data => {
				setData(data)
			})
			.catch(error => {
				console.log(error)
			})
	}

	const handelUploadData = UploadData => {
		setUploadDataName(UploadData)
		getData(UploadData)
	}
	const handelGoHomePage = () => {
		setData(null)
	}
	return (
		<>
			{!data && <HomePage handelUploadData={handelUploadData} />}
			{data && (
				<>
					{/*Header*/}
					<Box
						display='flex'
						justifyContent='space-around'
						alignItems='center'
						sx={{ height: '7vh' }}
					>
						<Button
							style={{
								color: colors.primary[100],
								fontSize: '18px',
								border: colors.primary[100],
								margin: '10px 0',
							}}
							onClick={handelGoHomePage}
						>
							Home
						</Button>
						<Topbar setIsSidebar={isSidebar} />
					</Box>
					{/*Crypto or Global info*/}
					{uploadDataName === 'countries' ? (
						<GlobalCountryInfo data={data} />
					) : (
						<CryptoInfo data={data} />
					)}
				</>
			)}
		</>
	)
}

export default Dashboard
