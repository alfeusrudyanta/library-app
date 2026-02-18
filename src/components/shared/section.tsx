type SectionProps = {
  children: React.ReactNode;
};

export const Section: React.FC<SectionProps> = ({ children }) => {
  return (
    <section className='px-4 pt-20 pb-4 md:px-30 md:pt-32 md:pb-29'>
      {children}
    </section>
  );
};
