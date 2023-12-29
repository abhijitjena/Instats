import React, { ReactElement } from 'react';

interface IProps {
  title: string;
}

const SectionTitle = (props: IProps): ReactElement => {
  const { title } = props;
  return (
    <div className="w-96 flex flex-col items-center">
      <h3 className="font-poppins text-white text-lg lg:text-2xl font-bold z-10">
        {title}
      </h3>
      <div className="w-3/5 lg:w-4/5 bg-purple-500 h-2 lg:h-5 relative bottom-3 lg:bottom-4" />
    </div>
  );
};

const memoizedComponent = React.memo(SectionTitle);

export default memoizedComponent;
