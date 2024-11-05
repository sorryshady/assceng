const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-7xl mx-auto p-5 space-y-16 mt-[6rem] lg:mt-[8rem] min-h-[44.7svh]">
      {children}
    </div>
  );
};
export default Wrapper;
