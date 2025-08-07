const CheckIcon = ( { size, bg }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size ? size : "24px"}
      height={size ? size : "24px"}
      className="icon icon-tabler icon-tabler-check"
      viewBox="0 0 24 24"
      fill="none"
      stroke={bg ? bg : "currentColor"}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default CheckIcon;
// This CheckIcon component renders a simple checkmark icon using SVG.