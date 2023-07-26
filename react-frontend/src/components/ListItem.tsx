import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  label?: string;
  onClick: () => void;
}

//  TODO: Refactor for reusability
function ListItem({ children, label, onClick }: Props) {
  return (
    <div
      className="capitalize text-left rounded border-solid border-2 cursor-pointer
    border-stone-800 w-[220px] m-2 bg-blue-300 font-pokemon
      hover:bg-gradient-to-t from-indigo-300 to-red-500 relative z-0"
    >
      <div className="p-3" onClick={onClick}>
        {label}
      </div>
      {children}
    </div>
  );
}

export default ListItem;
