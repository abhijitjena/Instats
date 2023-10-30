import React, { ReactElement } from 'react';

interface IProps {
  title: string;
}

const SectionTitle = (props: IProps): ReactElement => {
  const { title } = props;
  return (
    <div className="w-96 flex flex-col items-center">
      <h3 className="font-martian text-white text-lg z-10">{title}</h3>
      <div className="w-3/5 bg-purple-500 h-3 relative bottom-3" />
    </div>
  );
};

const memoizedComponent = React.memo(SectionTitle);

export default memoizedComponent;
