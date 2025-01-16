type InfoConnectionProps = {
	connectionURI: string;
};

export const InfoConnection: React.FC<InfoConnectionProps> = ({ connectionURI }: InfoConnectionProps) => (
	<>
		<div className="block-info block-medium block-info-connection text-small">
			<p className="text-bold">
				connectionURI set to <span className="block-info block-snippet">{connectionURI}</span>
			</p>
			<p>
				You are connected to an instance of SuperTokens core hosted for demo purposes, this instance should not
				be used for production apps.
			</p>
		</div>
	</>
);

export default InfoConnection;
