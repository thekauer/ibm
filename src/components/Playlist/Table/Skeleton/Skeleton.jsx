import LoadingSkeleton from "react-loading-skeleton";
import "./Skeleton.css";

export const Skeleton = () => {
  const HEIGHT = 16;

  const Line = () => (
    <tr className="skeleton">
      <td>
        <LoadingSkeleton
          width="100%"
          height={HEIGHT}
          containerTestId="skeleton"
        />
      </td>
      <td>
        <LoadingSkeleton
          width={80}
          height={HEIGHT}
          containerTestId="skeleton"
        />
      </td>
      <td>
        <LoadingSkeleton
          width={40}
          height={HEIGHT}
          containerTestId="skeleton"
        />
      </td>
      <td>
        <LoadingSkeleton
          width="1rem"
          height="1rem"
          borderRadius="50%"
          containerTestId="skeleton"
        />
      </td>
    </tr>
  );

  return (
    <>
      {Array.from({ length: 5 }, (_, index) => (
        <Line key={index} />
      ))}
    </>
  );
};
