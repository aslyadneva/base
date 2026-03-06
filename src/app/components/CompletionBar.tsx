const MIN = 0;
const MAX = 100;

export const CompletionBar = ({ progress }: { progress: number }) => {
  // valueNotAboveMax makes sure progress that is above 100 is clamped to 100 or less
  // progress that is below hundred gets returned because Math.min returns the smaller of the two values
  const valueNotAboveMax = Math.min(progress, MAX);
  const clampedProgress = Math.max(valueNotAboveMax, MIN);

  return (
    <div
      style={{
        width: "100px",
        backgroundColor: "#e0e0e0",
      }}
      className="h-5 w-24 bg-gray-300"
    >
      <div
        style={{
          width: `${clampedProgress}%`,
        }}
        className="bg-blue-500 h-full text-center"
        role="progressbar"
        aria-valuemin={MIN}
        aria-valuenow={clampedProgress}
        aria-valuemax={MAX}
      >
        {clampedProgress}%
      </div>
    </div>
  );
};
