import ActivityRowItem from "@/components/ActivityRowItem";

export default function Page() {
  return (
    <div className="w-100">
      <ActivityRowItem type="bought" name="Matthew" item={323} timestamp={1689328717000} />
      <ActivityRowItem type="sold" name="Matthew" item={320} timestamp={1689328717000} />
      <ActivityRowItem type="voted" name="Matthew" item={189302931093} timestamp={1689328717000} />
      <ActivityRowItem type="proposed" name="Matthew" item={493428} timestamp={1689328717000} />
    </div>
  );
}
