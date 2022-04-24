import Konva from "konva";
import { Stage as StageType } from "konva/lib/Stage";
import React, { useEffect } from "react";
import { Image, Layer, Rect, Stage } from "react-konva";
import useImage from "use-image";
import config from "../config/index";
import { useGrid } from "../context/GridContext";
import Modal from "./Modal";

function Canvas() {
  const [grid] = useGrid();
  // loading Images
  const [bgImage] = useImage("images/background.png");
  const buildings: (HTMLImageElement | undefined)[] = new Array(
    config.noOfTile
  );
  for (let i = 0; i < config.noOfTile; i++) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    buildings[i] = useImage(`images/buildings/asset${i + 1}.png`)[0];
  }
  const permAssets: (HTMLImageElement | undefined)[] = new Array(9);
  for (let i = 0; i < config.noOfTile; i++) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    permAssets[i] = useImage(`images/permanent-asset/permanent${i + 1}.png`)[0];
  }

  //setup correct size for stage
  const [widthAspect, setWidthAspect] = React.useState(0);
  const [heightAspect, setHeightAspect] = React.useState(0);

  useEffect(() => {
    const canvasParent = document.getElementsByClassName("canv")[0];
    if (canvasParent) {
      const width = canvasParent.clientWidth;
      const height = canvasParent.clientHeight;
      setWidthAspect(width / 1410);
      setHeightAspect(height / 700);
    }
  }, []);

  // handle Filters on draggable image
  const draggableRef = React.useRef<Konva.Image>(null);
  React.useEffect(() => {
    draggableRef.current?.cache();
  }, [draggableRef]);

  // handle drag over for stage
  const [active, setActive] = React.useState({
    building: 1,
    x: -200,
    y: -200,
    slot: -1,
  });
  const modalState = React.useState(false);
  const stageRef = React.useRef<StageType>({} as StageType);
  useEffect(() => {
    const stage = stageRef.current;
    const onDragOver = (e: DragEvent) => {
      const building = e.dataTransfer?.types.find((type) =>
        type.includes("building")
      );
      if (building) {
        e.preventDefault();
        const slot = config.slots.reduce((p, c, i) => {
          const cap = 20;
          if (
            e.offsetX > (c.x + cap) * widthAspect &&
            e.offsetX < (c.x + 161 - cap) * widthAspect &&
            e.offsetY > (c.y + cap) * heightAspect &&
            e.offsetY < (c.y + 105 - cap) * heightAspect
          ) {
            return i;
          }
          return p;
        }, -1);

        setActive({
          building: parseInt(building.split("-")[1]),
          x: e.offsetX,
          y: e.offsetY,
          slot: slot === -1 || grid[slot] !== -1 ? -1 : slot,
        });
      }
    };
    const onDrop = (e: DragEvent) => {
      e.preventDefault();
      const building = e.dataTransfer?.types.find((type) =>
        type.includes("building")
      );
      if (building) {
        if (active.slot !== -1) {
          modalState[1](true);
        }
        setActive((v) => ({
          ...v,
          x: -200,
          y: -200,
        }));
      }
    };
    if (stage) {
      stage.container().addEventListener("dragover", onDragOver);
      stage.container().addEventListener("drop", onDrop);
    }

    return () => {
      if (stage) {
        stage.container().removeEventListener("dragover", onDragOver);
        stage.container().removeEventListener("drop", onDrop);
      }
    };
  }, [active, grid, heightAspect, modalState, widthAspect]);

  //Draw
  return (
    <div className={`canv`}>
      <Modal activeState={[active, setActive]} modalState={modalState} />
      <Stage
        width={1410 * widthAspect}
        height={700 * heightAspect}
        ref={stageRef}
      >
        <Layer>
          <Rect
            x={0}
            y={0}
            width={1410 * widthAspect}
            height={700 * heightAspect}
            fill="#eee"
          />
          <Image
            x={0}
            y={0}
            width={1410 * widthAspect}
            height={700 * heightAspect}
            image={bgImage}
          />
          <Image
            x={widthAspect * 373}
            y={heightAspect * 304}
            width={widthAspect * (permAssets[3]?.width || 0)}
            height={heightAspect * (permAssets[3]?.height || 0)}
            image={permAssets[3]}
          />

          <Image
            x={widthAspect * 427}
            y={heightAspect * 140}
            width={widthAspect * (permAssets[2]?.width || 0)}
            height={heightAspect * (permAssets[2]?.height || 0)}
            image={permAssets[2]}
          />
          <Image
            x={widthAspect * 384}
            y={heightAspect * 362}
            width={widthAspect * (permAssets[4]?.width || 0)}
            height={heightAspect * (permAssets[4]?.height || 0)}
            image={permAssets[4]}
          />
          <Image
            x={widthAspect * 558}
            y={heightAspect * 380}
            width={widthAspect * (permAssets[5]?.width || 0)}
            height={heightAspect * (permAssets[5]?.height || 0)}
            image={permAssets[5]}
          />
          {grid.map((b, index) => {
            const building = buildings[b];
            if (b !== -1 && building) {
              return (
                <Image
                  key={index}
                  x={config.slots[index].x * widthAspect}
                  y={config.slots[index].y * heightAspect}
                  width={161 * widthAspect}
                  height={105 * heightAspect}
                  image={building}
                />
              );
            }
            return <></>;
          })}
        </Layer>
        <Layer>
          <Image
            x={widthAspect * 599}
            y={heightAspect * 11}
            width={widthAspect * (permAssets[0]?.width || 0)}
            height={heightAspect * (permAssets[0]?.height || 0)}
            image={permAssets[0]}
          />
          <Image
            x={widthAspect * 599}
            y={heightAspect * 11}
            width={widthAspect * (permAssets[0]?.width || 0)}
            height={heightAspect * (permAssets[0]?.height || 0)}
            image={permAssets[0]}
          />
          <Image
            x={widthAspect * 573}
            y={heightAspect * 109}
            width={widthAspect * 19}
            height={heightAspect * 44}
            image={permAssets[6]}
          />
          <Image
            x={widthAspect * 608}
            y={heightAspect * 123}
            width={widthAspect * 19}
            height={heightAspect * 44}
            image={permAssets[6]}
          />
          <Image
            x={widthAspect * 632}
            y={heightAspect * 127}
            width={widthAspect * 19}
            height={heightAspect * 44}
            image={permAssets[6]}
          />
          <Image
            x={widthAspect * 815}
            y={heightAspect * 239}
            width={widthAspect * 19}
            height={heightAspect * 44}
            image={permAssets[6]}
          />
          <Image
            x={widthAspect * 852}
            y={heightAspect * 230}
            width={widthAspect * 19}
            height={heightAspect * 44}
            image={permAssets[6]}
          />
          <Image
            x={widthAspect * 864}
            y={heightAspect * 308}
            width={widthAspect * 19}
            height={heightAspect * 44}
            image={permAssets[6]}
          />
          <Image
            x={widthAspect * 898}
            y={heightAspect * 312}
            width={widthAspect * 19}
            height={heightAspect * 44}
            image={permAssets[6]}
          />
          <Image
            x={widthAspect * 886}
            y={heightAspect * 356}
            width={widthAspect * 19}
            height={heightAspect * 44}
            image={permAssets[6]}
          />
          <Image
            x={widthAspect * 918}
            y={heightAspect * 341}
            width={widthAspect * 19}
            height={heightAspect * 44}
            image={permAssets[6]}
          />
          <Image
            x={widthAspect * 961}
            y={heightAspect * 335}
            width={widthAspect * 19}
            height={heightAspect * 44}
            image={permAssets[6]}
          />
          <Image
            x={widthAspect * 986}
            y={heightAspect * 330}
            width={widthAspect * 19}
            height={heightAspect * 44}
            image={permAssets[6]}
          />
          <Image
            x={widthAspect * 928}
            y={heightAspect * 379}
            width={widthAspect * 19}
            height={heightAspect * 44}
            image={permAssets[6]}
          />
          <Image
            x={widthAspect * 978}
            y={heightAspect * 369}
            width={widthAspect * 19}
            height={heightAspect * 44}
            image={permAssets[6]}
          />
          <Image
            x={widthAspect * 1020}
            y={heightAspect * 352}
            width={widthAspect * 19}
            height={heightAspect * 44}
            image={permAssets[6]}
          />
          <Image
            x={widthAspect * 589}
            y={heightAspect * 157}
            width={widthAspect * 15}
            height={heightAspect * 11}
            image={permAssets[7]}
          />
          <Image
            x={widthAspect * 846}
            y={heightAspect * 292}
            width={widthAspect * 15}
            height={heightAspect * 11}
            image={permAssets[7]}
          />
          <Image
            x={widthAspect * 846}
            y={heightAspect * 361}
            width={widthAspect * 15}
            height={heightAspect * 11}
            image={permAssets[7]}
          />
          <Image
            x={widthAspect * 1049}
            y={heightAspect * 394}
            width={widthAspect * 15}
            height={heightAspect * 11}
            image={permAssets[7]}
          />
          <Image
            x={widthAspect * 646}
            y={heightAspect * 176}
            width={widthAspect * 8}
            height={heightAspect * 11}
            image={permAssets[8]}
          />
          <Image
            x={widthAspect * 951}
            y={heightAspect * 368}
            width={widthAspect * 8}
            height={heightAspect * 11}
            image={permAssets[8]}
          />
          <Image
            x={widthAspect * 590}
            y={heightAspect * 184}
            width={widthAspect * 235}
            height={heightAspect * 228}
            image={permAssets[1]}
          />
          <Image
            x={active.x - (161 * widthAspect) / 2}
            y={active.y - (105 * heightAspect) / 2}
            width={161 * widthAspect}
            height={105 * heightAspect}
            image={buildings[active.building]}
            opacity={0.5}
            filters={[Konva.Filters.RGB]}
            red={255}
            green={active.slot !== -1 ? 255 : 0}
            blue={active.slot !== -1 ? 255 : 0}
            ref={draggableRef}
          />
        </Layer>
      </Stage>
    </div>
  );
}

export default Canvas;
