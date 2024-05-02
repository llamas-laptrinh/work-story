import { ReactTinyLink } from "react-tiny-link";

export default function Works() {
  return (
    <div className="h-full">
      <p>Test</p>
      <ReactTinyLink
        cardSize="small"
        showGraphic={true}
        maxLine={2}
        minLine={1}
        url="https://twitter.com/GamesSPL/status/1785941583721853085"
      />
    </div>
  );
}
