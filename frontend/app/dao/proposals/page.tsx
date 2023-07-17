import ProposalRowButton from "@/components/ProposalRowItem";

export default function Page() {
  return (
    <div>
      <ProposalRowButton
        type="pending"
        name="Give Kevin a thousand cookies"
        number={1000}
        startDate={1690206824000}
        endDate={1690206824000}
      />
      <ProposalRowButton
        type="executed"
        name="Give Matthew a thousand cookies"
        number={999}
        startDate={1690206824000}
        endDate={1690206824000}
      />
      <ProposalRowButton
        type="defeated"
        name="Take a cookie away from Matthew"
        number={998}
        startDate={1690206824000}
        endDate={1690206824000}
      />
      <ProposalRowButton
        type="queued"
        name="Bake cookies for everyone"
        number={997}
        startDate={1690206824000}
        endDate={1690206824000}
      />
    </div>
  );
}
