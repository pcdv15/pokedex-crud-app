import Button from "@app/components/Button";
import cn from "classnames";

interface Props {
  gotoPrevPage: (() => void) | null;
  gotoNextPage: (() => void) | null;
  className?: string;
}

const BasicPagination = ({ gotoPrevPage, gotoNextPage, className }: Props) => {
  return (
    <div className={cn("mt-10 flex space-x-2", className)}>
      {gotoPrevPage && <Button onClick={gotoPrevPage}>Prev</Button>}
      {gotoNextPage && <Button onClick={gotoNextPage}>Next</Button>}
    </div>
  );
};

export default BasicPagination;
