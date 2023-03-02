export interface ICIData {
	title: string;
	userId: string;
	date: string;
	interaction: ICILabel;
	primary: ICILabel;
	secondary: ICILabel;
	imageUrl: string;
}

export interface ICILabel {
	label: string;
	value: string;
	color: string;
}
