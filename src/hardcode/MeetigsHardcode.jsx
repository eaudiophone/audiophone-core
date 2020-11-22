export const idServices = Object.freeze({
	RENTAL: 1,
	RECORD: 2
});

export const STATUS_MEETINGS = [ 'INGRESADO', 'ACEPTADO', 'POSPUESTO', 'RECHAZADO', 'CERRADO' ];

export const MEETINGS = [
	{ 
		id: 1,
		icon: 'microphone',
		title: 'Sr. Martínez',
		date: '2020-11-15',
		startingTime: '10:00',
		totalHours: 2,
		finalHour: '12:00',
		description: 'Grabacion con el Sr. Martinez',
		addressMeeting: 'Estudio principal',
		idService: 1  
	},
	{ 
		id: 2,
		icon: 'microphone',
		title: 'Sr. Alejandro',
		date: '2020-04-08',
		startingTime: '13:00',
		totalHours: 4,
		finalHour: '17:00',
		description: 'Grabacion con el Sr. Martinez',
		addressMeeting: 'Estudio principal',
		idService: 1   
	},
	{ 
		id: 3,
		icon: 'microphone',
		title: 'Sr. Jesús',
		date: '2020-04-23',
		startingTime: '10:00',
		totalHours: 3,
		finalHour: '13:00',
		description: 'Grabacion con el Sr. Martinez',
		addressMeeting: 'Estudio principal',
		idService: 1    
	},
	{ 
		id: 4,
		icon: 'microphone',
		title: 'Sr. Martínez',
		date: '2020-04-12',
		startingTime: '13:00',
		totalHours: 2,
		finalHour: '15:00',
		description: 'Grabacion con el Sr. Martinez',
		addressMeeting: 'Estudio principal',
		idService: 1   
	},
	{
		id: 5,
		icon: 'truck',
		title: 'Fiesta Sr. Martínez',
		date: '2020-04-05',
		startingTime: '21:00',
		totalHours: 6,
		finalHour: '04:00',
		description: 'Fiesta del hijo del Sr. Martinez',
		addressMeeting: 'Caracas Venezuela',
		idService: 2 
	},
	{
		id: 6,
		icon: 'truck',
		title: 'Fiesta Sr. Martínez',
		date: '2020-04-13',
		startingTime: '00:00',
		totalHours: 2,
		finalHour: '02:00',
		description: 'Fiesta del hijo del Sr. Martinez',
		addressMeeting: 'Caracas Venezuela',
		idService: 2  
	},
	{
		id: 7,
		icon: 'truck',
		title: 'Fiesta Sr. Martínez',
		date: '2020-04-15',
		startingTime: '15:00',
		totalHours: 5,
		finalHour: '20:00',
		description: 'Fiesta del hijo del Sr. Martinez',
		addressMeeting: 'Caracas Venezuela',
		idService: 2  
	},
	{
		id: 8,
		icon: 'truck',
		title: 'Fiesta Sr. Martínez',
		date: '2020-04-20',
		startingTime: '21:00',
		totalHours: 2,
		finalHour: '23:00',
		description: 'Fiesta del hijo del Sr. Martinez',
		addressMeeting: 'Caracas Venezuela',
		idService: 2  
	},
];