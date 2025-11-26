type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`h-[60px] w-[140px] lg:h-[100px] lg:w-[400px] bg-[#7398B7] rounded-xl flex items-center justify-center transition hover:scale-[1.02] ${props.className}`}
    >
      <span className="text-white font-bold lg:text-[25px]">{children}</span>
    </button>
  );
}