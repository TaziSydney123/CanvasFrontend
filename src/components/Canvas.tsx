import { IonCol, IonGrid, IonRow } from '@ionic/react';
import { ReactNode, useState } from 'react';

type CanvasProps = {
  colorData: string[][];
};

export default function Canvas(props: CanvasProps) {
  const { colorData } = props;
  return (
    <IonGrid fixed>
      {colorData.map(row => (
        <IonRow>
          {row.map(color => (
            <Pixel color={color}></Pixel>
          ))}
        </IonRow>
      ))}
    </IonGrid>
  );
};

type PixelProps = {
  color: string,
};

function Pixel(props: PixelProps) {
  const { color } = props;
  return (
    <IonCol className="canvas-pixel" style={{backgroundColor: color}} />
  );
}