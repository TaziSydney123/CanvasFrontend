import { IonCol, IonGrid, IonRow } from '@ionic/react';

type CanvasProps = {
  colorData: string[][];
};

export default function Canvas(props: Readonly<CanvasProps>) {
  const { colorData } = props;
  return (
    <IonGrid fixed className="canvas-grid">
      {colorData.map((row, rowIndex) => {
        const edgeRow = rowIndex == 0 || rowIndex == colorData.length - 1;
        return (
          <IonRow key={row.join("")}>
            {row.map((color, colIndex) => {
              const edgeCol = colIndex == 0 || colIndex == colorData[rowIndex].length - 1;
              return (
                <Pixel color={color} corner={edgeRow && edgeCol ? {row: rowIndex, col: colIndex} : null} key={rowIndex.toString() + colIndex.toString()} />
              );
            })}
          </IonRow>
        );
      })}
    </IonGrid>
  );
};

type CornerPosition = {
  row: number,
  col: number
};

type PixelProps = {
  color: string,
  corner: CornerPosition | null,
};

function Pixel(props: Readonly<PixelProps>) {
  const { color, corner } = props;
  console.log(getCornerStyle());
  return (
    <IonCol className="canvas-pixel" style={{backgroundColor: color, ...getCornerStyle()}} />
  );

  function getCornerStyle() {
    if (!corner) {
      return {};
    }
    if (corner.row > 0) {
      if (corner.col > 0) {
        return {borderBottomRightRadius: 8};
      }
      return {borderBottomLeftRadius: 8};
    }
    if (corner.col > 0) {
      return {borderTopRightRadius: 8};
    }
    return {borderTopLeftRadius: 8};
  }
}