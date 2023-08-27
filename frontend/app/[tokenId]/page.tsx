import Auction from "@/components/Auction";
import Info from "@/components/Info";

export default function Page({ params }: { params: { tokenId: string } }) {
  return (
    <div className="w-100 col-fs-c">
      <Auction tokenId={parseInt(params?.tokenId, 10)} />
      <Info />
    </div>
  );
}
