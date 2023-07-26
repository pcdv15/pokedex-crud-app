import loading from '@app/assets/loading.svg'
import cn from 'classnames'

interface Props {
  className?: string;
}

const Loading = ({ className }: Props) => {
  return <div className={cn(className)}><img src={loading} alt="loading" /></div>;
};

export default Loading;
