export interface ICIData {
	title: string;
	userId: string;
	date: string;
	interaction: ICILabel;
	primary: ICILabel;
	secondary: ICILabel;
	imageUrl: string;
	consumerInfo: ICIConsumerInfo;
}

export interface ICILabel {
	label: string;
	value: string;
	color: string;
}

export interface ICIConsumerInfo {
	customerRecord: ICICustomerRecord;
	contractType: ICICustomerRecord;
	additionalInfo: ICIAdditionalInfo;
}
export interface ICICustomerRecord {
	title: string;
	content: Array<ICIKeyVal>;
}

export interface ICIKeyVal {
	key: string;
	value: string;
}

export interface ICIAdditionalInfo {
	title: string;
	lifeCycle: ICIKeyVal;
	icons: Array<string>;
}
