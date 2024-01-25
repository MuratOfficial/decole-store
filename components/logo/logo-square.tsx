import clsx from "clsx";
import Image from "next/image";
// import LogoIcon from "../icons/logo";

export default function LogoSquare({ size }: { size?: "sm" | undefined }) {
  return (
    <div
      className={clsx(
        "flex flex-none items-center bg-cover bg-no-repeat bg-center justify-center border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-black",
        {
          "h-[40px] w-[40px] rounded-xl": !size,
          "h-[30px] w-[30px] rounded-lg": size === "sm",
        }
      )}
      style={{ backgroundImage: `url(/logo1.png)` }}
    ></div>
  );
}
