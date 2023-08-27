export default function Shimmer({
  width = "auto",
  height = "auto",
  flex = false,
  borderRadius = 4,
  margin = 0,
  style,
}: ShimmerProps): JSX.Element {
  return (
    <div
      className="shimmer-loader"
      style={{ flex: flex ? 1 : "none", width, height, borderRadius, margin, ...style }}
    />
  );
}

export type ShimmerProps = {
  width?: string | number;
  height?: string | number;
  flex?: boolean;
  borderRadius?: number;
  margin?: string | number;
  style?: React.CSSProperties;
};
