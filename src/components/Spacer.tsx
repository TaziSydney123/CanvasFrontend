type SpacerProps = {
    size: number
};

export default function Spacer(props: SpacerProps) {
    const { size } = props;
    return (
        <span style={{width: size + "em"}} />
    );
}